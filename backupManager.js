
/* =========================================================
   backupManager.js
   Double Bite!! バックアップ管理
   Ver.2.0.0

   ・バックアップデータ収集
   ・gzip圧縮
   ・QRコード生成
   ・QRコード画像保存
   ・QRコード読み取り
   ・バックアップデータ検証
   ・既存データの完全上書き復元
   ・復元失敗時のロールバック
========================================================= */

window.BackupManager = (() => {

    "use strict";

    const BACKUP_FORMAT = "double-bite-backup";
    const BACKUP_VERSION = 1;

    // バックアップ対象の固定キー
    const BACKUP_KEYS = [
        "soloRecords",
        "sasoiCatchRecordHighScores",
        "sasoiClearHistory_v1",
        "partnerMindTrips",
        "partnerMindMemory",
        "partnerMindConversation"
    ];

    // 興味ゲージHIGHのキー接頭辞
    const GAUGE_HIGH_PREFIX = "sasoiGaugeHighScore_";


    /* =====================================================
       バックアップ対象キーか確認
    ===================================================== */

    function isManagedKey(key) {

        if (BACKUP_KEYS.includes(key)) {
            return true;
        }

        return (
            typeof key === "string" &&
            key.startsWith(GAUGE_HIGH_PREFIX) &&
            key.length > GAUGE_HIGH_PREFIX.length
        );

    }


    /* =====================================================
       現在のバックアップ対象データを収集
    ===================================================== */

    function collectData() {

        const data = {};

        BACKUP_KEYS.forEach(key => {

            const value = localStorage.getItem(key);

            if (value !== null) {
                data[key] = value;
            }

        });

        for (let i = 0; i < localStorage.length; i++) {

            const key = localStorage.key(i);

            if (
                key &&
                key.startsWith(GAUGE_HIGH_PREFIX) &&
                key.length > GAUGE_HIGH_PREFIX.length
            ) {

                const value = localStorage.getItem(key);

                if (value !== null) {
                    data[key] = value;
                }

            }

        }

        return data;

    }


    /* =====================================================
       現在のバックアップ対象キー一覧
    ===================================================== */

    function getManagedKeys() {

        const keys = [];

        for (let i = 0; i < localStorage.length; i++) {

            const key = localStorage.key(i);

            if (key && isManagedKey(key)) {
                keys.push(key);
            }

        }

        return keys;

    }


    /* =====================================================
       バックアップデータ生成
    ===================================================== */

    function createBackup() {

        try {

            const data = collectData();

            const backup = {
                format: BACKUP_FORMAT,
                version: BACKUP_VERSION,
                createdAt: new Date().toISOString(),
                data: data
            };

            const json = JSON.stringify(backup);

            const bytes = new TextEncoder().encode(json);

            const compressed = fflate.gzipSync(bytes, {
                level: 9
            });

            let binary = "";

            compressed.forEach(byte => {
                binary += String.fromCharCode(byte);
            });

            const base64 = btoa(binary);

            return {
                success: true,
                json: json,
                compressedData: base64,
                originalSize: bytes.length,
                compressedSize: compressed.length,
                dataCount: Object.keys(data).length,
                createdAt: backup.createdAt
            };

        } catch (error) {

            console.error(
                "バックアップデータ生成エラー:",
                error
            );

            return {
                success: false,
                error: error.message
            };

        }

    }


    /* =====================================================
       バックアップ情報取得
    ===================================================== */

    function getBackupInfo() {

        const data = collectData();

        return {
            dataCount: Object.keys(data).length,
            keys: Object.keys(data)
        };

    }


    /* =====================================================
       バックアップデータ検証
    ===================================================== */

    function validateBackup(backup) {

        if (!backup || typeof backup !== "object") {
            throw new Error("バックアップデータがありません。");
        }

        if (backup.format !== BACKUP_FORMAT) {
            throw new Error("バックアップ形式が違います。");
        }

        if (backup.version !== BACKUP_VERSION) {
            throw new Error("対応していないバックアップバージョンです。");
        }

        if (
            typeof backup.createdAt !== "string" ||
            !Number.isFinite(Date.parse(backup.createdAt))
        ) {
            throw new Error("バックアップ日時が正しくありません。");
        }

        if (
            !backup.data ||
            typeof backup.data !== "object" ||
            Array.isArray(backup.data)
        ) {
            throw new Error("バックアップデータの構造が正しくありません。");
        }

        const keys = Object.keys(backup.data);

        if (keys.length > 1000) {
            throw new Error("バックアップのデータ件数が多すぎます。");
        }

        keys.forEach(key => {

            if (!isManagedKey(key)) {
                throw new Error(
                    "バックアップに対象外のキーが含まれています: " + key
                );
            }

            const value = backup.data[key];

            if (typeof value !== "string") {
                throw new Error("保存データの形式が正しくありません: " + key);
            }

            let parsed;

            try {
                parsed = JSON.parse(value);
            } catch (error) {
                throw new Error("JSONデータが破損しています: " + key);
            }

            // 興味ゲージHIGHは数値
            if (key.startsWith(GAUGE_HIGH_PREFIX)) {

                if (
                    typeof parsed !== "number" ||
                    !Number.isFinite(parsed) ||
                    parsed < 0
                ) {
                    throw new Error(
                        "興味ゲージHIGHの値が正しくありません: " + key
                    );
                }

                return;

            }

            // soloRecordsとPartnerMind釣行履歴は配列
            if (
                key === "soloRecords" ||
                key === "partnerMindTrips"
            ) {

                if (!Array.isArray(parsed)) {
                    throw new Error(
                        "履歴データの形式が正しくありません: " + key
                    );
                }

                return;

            }

            // その他の固定キーはオブジェクト
            if (
                !parsed ||
                typeof parsed !== "object" ||
                Array.isArray(parsed)
            ) {
                throw new Error(
                    "保存データの形式が正しくありません: " + key
                );
            }

        });

        return {
            success: true,
            dataCount: keys.length
        };

    }


    /* =====================================================
       既存データの退避
    ===================================================== */

    function backupCurrentData() {

        const snapshot = {};

        const keys = getManagedKeys();

        keys.forEach(key => {

            snapshot[key] = localStorage.getItem(key);

        });

        return snapshot;

    }


    /* =====================================================
       現在の対象データをすべて削除
    ===================================================== */

    function clearManagedData() {

        const keys = getManagedKeys();

        keys.forEach(key => {

            localStorage.removeItem(key);

        });

    }


    /* =====================================================
       既存データへの復元
    ===================================================== */

    function restorePreviousData(snapshot) {

        clearManagedData();

        Object.keys(snapshot).forEach(key => {

            if (!isManagedKey(key)) {
                throw new Error("復元対象外のキーです: " + key);
            }

            localStorage.setItem(key, snapshot[key]);

        });

        // 元の状態と一致するか確認
        const restoredKeys = getManagedKeys();

        if (restoredKeys.length !== Object.keys(snapshot).length) {
            throw new Error("復元前データのロールバックに失敗しました。");
        }

        Object.keys(snapshot).forEach(key => {

            if (localStorage.getItem(key) !== snapshot[key]) {
                throw new Error("復元前データの照合に失敗しました: " + key);
            }

        });

    }


    /* =====================================================
       バックアップデータで完全上書き
    ===================================================== */

    function restoreBackup(backup) {

        let snapshot = null;

        try {

            // 最初に必ず検証
            validateBackup(backup);

            // 復元前の状態を退避
            snapshot = backupCurrentData();

            // 既存のバックアップ対象データを削除
            clearManagedData();

            // バックアップ側のデータを書き込む
            Object.keys(backup.data).forEach(key => {

                if (!isManagedKey(key)) {
                    throw new Error("不正な復元キーです: " + key);
                }

                localStorage.setItem(
                    key,
                    backup.data[key]
                );

            });

            // 書き込み結果を照合
            const restoredKeys = getManagedKeys();

            const expectedKeys = Object.keys(backup.data);

            if (restoredKeys.length !== expectedKeys.length) {
                throw new Error("復元データの件数が一致しません。");
            }

            expectedKeys.forEach(key => {

                if (
                    localStorage.getItem(key) !== backup.data[key]
                ) {
                    throw new Error(
                        "復元データの照合に失敗しました: " + key
                    );
                }

            });

            return {
                success: true,
                dataCount: expectedKeys.length
            };

        } catch (error) {

            console.error("復元処理エラー:", error);

            // 退避データがある場合は元に戻す
            if (snapshot !== null) {

                try {

                    restorePreviousData(snapshot);

                    console.warn(
                        "復元失敗のため、復元前のデータに戻しました。"
                    );

                } catch (rollbackError) {

                    console.error(
                        "ロールバックにも失敗しました:",
                        rollbackError
                    );

                    return {
                        success: false,
                        rollbackFailed: true,
                        error: error.message,
                        rollbackError: rollbackError.message
                    };

                }

            }

            return {
                success: false,
                rollbackFailed: false,
                error: error.message
            };

        }

    }


    /* =====================================================
       公開する機能
    ===================================================== */

    return {
        createBackup,
        getBackupInfo,
        validateBackup,
        restoreBackup
    };

})();


/* =========================================================
   データ引継ぎ モーダル制御
========================================================= */

function openRevivalModal() {

    const modal = document.getElementById("revivalModal");

    if (!modal) return;

    modal.style.display = "flex";

}

function closeRevivalModal() {

    const modal = document.getElementById("revivalModal");

    if (!modal) return;

    modal.style.display = "none";

}

document.addEventListener("click", function(event) {

    const modal = document.getElementById("revivalModal");

    if (!modal) return;

    if (event.target === modal) {
        closeRevivalModal();
    }

});


/* =========================================================
   QRコード生成
========================================================= */

function createRevivalBackup() {

    const result = BackupManager.createBackup();

    if (!result.success) {

        alert("バックアップの作成に失敗しました。");

        console.error(result.error);

        return;

    }

    const canvas = document.getElementById("revivalQrCanvas");
    const qrArea = document.getElementById("revivalQrArea");

    if (!canvas || !qrArea) {

        alert("QRコードの表示場所が見つかりません。");

        return;

    }

    try {

        const qrData = "DBBACKUP1:" + result.compressedData;

        new QRious({
            element: canvas,
            value: qrData,
            size: 500,
            level: "L",
            padding: 20,
            background: "#ffffff",
            foreground: "#000000"
        });

        qrArea.style.display = "block";

        console.log("QRバックアップ生成成功");
        console.log("保存データ数:", result.dataCount);
        console.log("圧縮サイズ:", result.compressedSize);
        console.log("QRデータ文字数:", qrData.length);
        console.log("QRコードサイズ:", canvas.width);

    } catch (error) {

        console.error("QRコード生成エラー:", error);

        alert("QRコードの生成に失敗しました。");

    }

}


/* =========================================================
   QRコード画像保存
========================================================= */

function saveRevivalQr() {

    const canvas = document.getElementById("revivalQrCanvas");

    if (!canvas) return;

    try {

        const link = document.createElement("a");

        link.download =
            "DoubleBite_Backup_" +
            new Date().toISOString().slice(0, 10) +
            ".png";

        link.href = canvas.toDataURL("image/png");

        link.click();

    } catch (error) {

        console.error("QR画像保存エラー:", error);

        alert("QRコード画像の保存に失敗しました。");

    }

}


/* =========================================================
   QRコード読み取り画面
========================================================= */

function openRevivalRestore() {

    const input = document.getElementById("revivalQrFile");

    if (!input) {

        alert("QRコード読み取り機能を準備できません。");

        return;

    }

    input.value = "";
    input.click();

}



/* =========================================================
   QRコード読み取り
========================================================= */

function readRevivalQrFile(event) {

    const file = event.target.files[0];

    if (!file) return;

    if (typeof jsQR !== "function") {

        alert("QRコード読み取りライブラリが読み込まれていません。");

        return;

    }

    const reader = new FileReader();

    reader.onload = function() {

        const image = new Image();

        image.onload = function() {

            try {

                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;

                context.drawImage(image, 0, 0);

                const imageData = context.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

                const code = jsQR(
                    imageData.data,
                    imageData.width,
                    imageData.height
                );

                if (!code) {

                    throw new Error("QRコードを読み取れませんでした。");

                }

                const prefix = "DBBACKUP1:";

                if (!code.data.startsWith(prefix)) {

                    throw new Error(
                        "Double Bite!! のバックアップQRではありません。"
                    );

                }

                const base64 = code.data.slice(prefix.length);

                const binary = atob(base64);

                const compressed = new Uint8Array(binary.length);

                for (let i = 0; i < binary.length; i++) {

                    compressed[i] = binary.charCodeAt(i);

                }

                // gzip解凍
                const decompressed = fflate.gunzipSync(compressed);

                // JSON変換
                const json = new TextDecoder().decode(decompressed);

                const backup = JSON.parse(json);

                // データ検証
                BackupManager.validateBackup(backup);

                // 読み取りデータを保持
                window.pendingRevivalBackup = backup;

                // 結果表示
                const resultArea = document.getElementById(
                    "revivalRestoreResult"
                );

                const message = document.getElementById(
                    "revivalRestoreMessage"
                );

                if (!resultArea || !message) {

                    throw new Error("復元確認画面が見つかりません。");

                }

                resultArea.style.display = "block";

                const dateText = new Date(
                    backup.createdAt
                ).toLocaleString("ja-JP");

                message.textContent =
                    "バックアップの読み取りに成功しました。\n" +
                    "作成日時：" + dateText + "\n\n" +
                    "このバックアップで現在の対象データを上書きできます。";

                // 復元ボタンを作成
                let restoreButton = document.getElementById(
                    "revivalApplyRestoreBtn"
                );

                if (!restoreButton) {

                    restoreButton = document.createElement("button");

                    restoreButton.id = "revivalApplyRestoreBtn";
                    restoreButton.className = "revival-save-btn";
                    restoreButton.textContent = "このバックアップで復元する";

                    restoreButton.style.marginTop = "12px";

                    restoreButton.onclick = restoreRevivalBackup;

                    resultArea.appendChild(restoreButton);

                }

                restoreButton.style.display = "block";

                console.log("バックアップ読み取り成功");
                console.log("作成日時:", backup.createdAt);
                console.log("保存データ数:", Object.keys(backup.data).length);
                console.log("保存データ:", backup.data);

            } catch (error) {

                window.pendingRevivalBackup = null;

                console.error("QR読み取りエラー:", error);

                alert(
                    "バックアップデータを正常に読み取れませんでした。\n" +
                    error.message
                );

            }

        };

        image.onerror = function() {

            alert("画像を読み込めませんでした。");

        };

        image.src = reader.result;

    };

    reader.onerror = function() {

        alert("ファイルの読み込みに失敗しました。");

    };

    reader.readAsDataURL(file);

}



/* =========================================================
   データ引継ぎ 確認モーダル
========================================================= */

function showRevivalRestoreConfirm(backup) {

    // 既存の確認モーダルがあれば削除
    const oldModal = document.getElementById(
        "revivalConfirmModal"
    );

    if (oldModal) {
        oldModal.remove();
    }

    const dateText = new Date(
        backup.createdAt
    ).toLocaleString("ja-JP");

    // モーダル本体
    const modal = document.createElement("div");

    modal.id = "revivalConfirmModal";

    Object.assign(modal.style, {
        position: "fixed",
        inset: "0",
        zIndex: "100000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.75)",
        padding: "20px",
        boxSizing: "border-box"
    });

    // 確認パネル
    const panel = document.createElement("div");

    Object.assign(panel.style, {
        width: "100%",
        maxWidth: "360px",
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px 20px",
        boxSizing: "border-box",
        textAlign: "center",
        boxShadow: "0 8px 30px rgba(0,0,0,0.3)"
    });

    // タイトル
    const title = document.createElement("div");

    title.textContent = "データを復元しますか？";

    Object.assign(title.style, {
        fontSize: "19px",
        fontWeight: "bold",
        color: "#222222",
        marginBottom: "18px"
    });

    // 説明
    const description = document.createElement("div");

    description.textContent =
        "次のバックアップデータで現在のデータを上書きします。";

    Object.assign(description.style, {
        fontSize: "14px",
        lineHeight: "1.7",
        color: "#444444",
        marginBottom: "16px"
    });

    // バックアップ情報
    const info = document.createElement("div");

    info.textContent =
        "作成日時：" + dateText;

    Object.assign(info.style, {
        whiteSpace: "pre-line",
        background: "#f2f5f8",
        borderRadius: "10px",
        padding: "14px 10px",
        fontSize: "13px",
        lineHeight: "1.8",
        color: "#333333",
        marginBottom: "16px"
    });

    // 注意書き
    const warning = document.createElement("div");

    warning.textContent =
        "この端末のデータは削除・上書きされます。\n" +
        "バックアップに存在しない対象データも削除されます。";

    Object.assign(warning.style, {
        fontSize: "12px",
        lineHeight: "1.7",
        color: "#d9534f",
        marginBottom: "22px"
    });

    // ボタン共通スタイル
    function styleButton(button, background) {

        Object.assign(button.style, {
            width: "100%",
            border: "none",
            borderRadius: "10px",
            padding: "13px",
            fontSize: "15px",
            fontWeight: "bold",
            color: "#ffffff",
            background: background,
            cursor: "pointer",
            marginTop: "10px"
        });

    }

    // 復元ボタン
    const restoreButton = document.createElement("button");

    restoreButton.textContent = "復元する";

    styleButton(restoreButton, "#e06b36");

    restoreButton.onclick = function() {

        modal.remove();

        executeRevivalRestore(backup);

    };

    // キャンセルボタン
    const cancelButton = document.createElement("button");

    cancelButton.textContent = "キャンセル";

    styleButton(cancelButton, "#888888");

    cancelButton.onclick = function() {

        modal.remove();

    };

    // 要素を組み立てる
    panel.appendChild(title);
    panel.appendChild(description);
    panel.appendChild(info);
    panel.appendChild(warning);
    panel.appendChild(restoreButton);
    panel.appendChild(cancelButton);

    modal.appendChild(panel);

    // 背景クリックで閉じる
    modal.addEventListener("click", function(event) {

        if (event.target === modal) {
            modal.remove();
        }

    });

    document.body.appendChild(modal);

}



/* =========================================================
   復元ボタン
   確認モーダルを表示
========================================================= */

function restoreRevivalBackup() {

    const backup = window.pendingRevivalBackup;

    if (!backup) {

        alert("復元するバックアップデータがありません。");

        return;

    }

    // 復元前に再検証
    try {

        BackupManager.validateBackup(backup);

    } catch (error) {

        alert(
            "バックアップデータが正しくありません。\n" +
            error.message
        );

        return;

    }

    // 独自確認モーダルを表示
    showRevivalRestoreConfirm(backup);

}




/* =========================================================
   データ引継ぎ 完了モーダル
========================================================= */

function showRevivalRestoreComplete(result) {

    const modal = document.createElement("div");

    modal.id = "revivalCompleteModal";

    Object.assign(modal.style, {
        position: "fixed",
        inset: "0",
        zIndex: "100001",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.75)",
        padding: "20px",
        boxSizing: "border-box"
    });

    const panel = document.createElement("div");

    Object.assign(panel.style, {
        width: "100%",
        maxWidth: "360px",
        background: "#ffffff",
        borderRadius: "16px",
        padding: "26px 20px",
        boxSizing: "border-box",
        textAlign: "center",
        boxShadow: "0 8px 30px rgba(0,0,0,0.3)"
    });

    const title = document.createElement("div");

    title.textContent = "データ引継ぎが完了しました";

    Object.assign(title.style, {
        fontSize: "19px",
        fontWeight: "bold",
        color: "#26945b",
        marginBottom: "18px"
    });

    const message = document.createElement("div");

    message.textContent =
        "バックアップデータを正常に復元しました。";

    Object.assign(message.style, {
        fontSize: "14px",
        lineHeight: "1.8",
        color: "#444444",
        marginBottom: "18px"
    });

    const description = document.createElement("div");

    description.textContent =
        "復元したデータを反映するため、アプリを再読み込みしてください。";

    Object.assign(description.style, {
        fontSize: "13px",
        lineHeight: "1.7",
        color: "#666666",
        marginBottom: "22px"
    });

    const reloadButton = document.createElement("button");

    reloadButton.textContent = "アプリを再読み込み";

    Object.assign(reloadButton.style, {
        width: "100%",
        border: "none",
        borderRadius: "10px",
        padding: "14px",
        fontSize: "15px",
        fontWeight: "bold",
        color: "#ffffff",
        background: "#26945b",
        cursor: "pointer"
    });

    reloadButton.onclick = function() {

        window.location.reload();

    };

    panel.appendChild(title);
    panel.appendChild(message);
    panel.appendChild(description);
    panel.appendChild(reloadButton);

    modal.appendChild(panel);

    document.body.appendChild(modal);

}



/* =========================================================
   復元実行
========================================================= */

function executeRevivalRestore(backup) {

    // 実行直前にも再検証
    try {

        BackupManager.validateBackup(backup);

    } catch (error) {

        alert(
            "バックアップデータが正しくありません。\n" +
            error.message
        );

        return;

    }

    // 復元実行
    const result = BackupManager.restoreBackup(backup);

    if (!result.success) {

        if (result.rollbackFailed) {

            alert(
                "重大なエラーが発生しました。\n" +
                "復元と元データへの復旧の両方に失敗しています。\n\n" +
                "エラー：" + result.error + "\n" +
                "復旧エラー：" + result.rollbackError
            );

        } else {

            alert(
                "復元に失敗しました。\n" +
                "復元前のデータに戻しました。\n\n" +
                result.error
            );

        }

        console.error("復元失敗:", result);

        return;

    }

    // 復元成功
    window.pendingRevivalBackup = null;

    console.log("バックアップ復元成功:", result);

    // 独自の復元完了モーダルを表示
    showRevivalRestoreComplete(result);

}

