
/* =========================================================
   backupManager.js
   Double Bite!! データ引継ぎ
   Smash!!!! UI統合版

   ・バックアップデータ収集
   ・gzip圧縮
   ・QRコード生成
   ・QRコード画像保存
   ・QRコード読み取り
   ・バックアップデータ検証
   ・既存データの完全上書き復元
   ・復元失敗時のロールバック
   ・独自確認／通知／完了モーダル
========================================================= */

(function () {

    "use strict";

    // ==========================================
    // バックアップ設定
    // ==========================================

    const BACKUP_FORMAT = "double-bite-backup";
    const BACKUP_VERSION = 1;
    const QR_PREFIX = "DBBACKUP1:";

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


    // ==========================================
    // 管理対象キーの判定
    // ==========================================

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


    // ==========================================
    // バックアップ対象データの収集
    // ==========================================

    function collectData() {

        const data = {};

        BACKUP_KEYS.forEach(function (key) {

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


    // ==========================================
    // 現在の管理対象キー一覧
    // ==========================================

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


    // ==========================================
    // バックアップデータ生成
    // ==========================================

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

            if (
                !window.fflate ||
                typeof window.fflate.gzipSync !== "function"
            ) {
                throw new Error(
                    "圧縮ライブラリ fflate が読み込まれていません。"
                );
            }

            const compressed = window.fflate.gzipSync(bytes, {
                level: 9
            });

            let binary = "";

            compressed.forEach(function (byte) {
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
                error: error.message ||
                    "バックアップの作成に失敗しました。"
            };

        }

    }


    // ==========================================
    // バックアップ情報取得
    // ==========================================

    function getBackupInfo(backup) {

        if (backup && backup.data) {

            return {
                createdAt: backup.createdAt,
                version: backup.version,
                dataCount: Object.keys(backup.data).length,
                keys: Object.keys(backup.data)
            };

        }

        const data = collectData();

        return {
            dataCount: Object.keys(data).length,
            keys: Object.keys(data)
        };

    }


    // ==========================================
    // バックアップデータ検証
    // ==========================================

    function validateBackup(backup) {

        if (
            !backup ||
            typeof backup !== "object" ||
            Array.isArray(backup)
        ) {
            throw new Error(
                "バックアップデータがありません。"
            );
        }

        if (backup.format !== BACKUP_FORMAT) {
            throw new Error(
                "Double Bite!!用のバックアップ形式ではありません。"
            );
        }

        if (backup.version !== BACKUP_VERSION) {
            throw new Error(
                "対応していないバックアップバージョンです。"
            );
        }

        if (
            typeof backup.createdAt !== "string" ||
            !Number.isFinite(Date.parse(backup.createdAt))
        ) {
            throw new Error(
                "バックアップ日時が正しくありません。"
            );
        }

        if (
            !backup.data ||
            typeof backup.data !== "object" ||
            Array.isArray(backup.data)
        ) {
            throw new Error(
                "バックアップデータの構造が正しくありません。"
            );
        }

        const keys = Object.keys(backup.data);

        if (keys.length > 1000) {
            throw new Error(
                "バックアップのデータ件数が多すぎます。"
            );
        }

        keys.forEach(function (key) {

            if (!isManagedKey(key)) {
                throw new Error(
                    "バックアップに対象外のキーが含まれています: " + key
                );
            }

            const value = backup.data[key];

            if (typeof value !== "string") {
                throw new Error(
                    "保存データの形式が正しくありません: " + key
                );
            }

            let parsed;

            try {
                parsed = JSON.parse(value);
            } catch (error) {
                throw new Error(
                    "JSONデータが破損しています: " + key
                );
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

            // 履歴データは配列
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


    // ==========================================
    // 既存データの退避
    // ==========================================

    function backupCurrentData() {

        const snapshot = {};

        const keys = getManagedKeys();

        keys.forEach(function (key) {

            snapshot[key] = localStorage.getItem(key);

        });

        return snapshot;

    }


    // ==========================================
    // 管理対象データをすべて削除
    // ==========================================

    function clearManagedData() {

        const keys = getManagedKeys();

        keys.forEach(function (key) {

            localStorage.removeItem(key);

        });

    }


    // ==========================================
    // 既存データへのロールバック
    // ==========================================

    function restorePreviousData(snapshot) {

        clearManagedData();

        Object.keys(snapshot).forEach(function (key) {

            if (!isManagedKey(key)) {
                throw new Error(
                    "復元対象外のキーです: " + key
                );
            }

            localStorage.setItem(key, snapshot[key]);

        });

        const restoredKeys = getManagedKeys();

        if (
            restoredKeys.length !==
            Object.keys(snapshot).length
        ) {
            throw new Error(
                "復元前データのロールバックに失敗しました。"
            );
        }

        Object.keys(snapshot).forEach(function (key) {

            if (
                localStorage.getItem(key) !== snapshot[key]
            ) {
                throw new Error(
                    "復元前データの照合に失敗しました: " + key
                );
            }

        });

    }


    // ==========================================
    // バックアップデータで完全上書き
    // ==========================================

    function restoreBackup(backup) {

        let snapshot = null;

        try {

            // 最初に必ず検証
            validateBackup(backup);

            // 復元前の状態を退避
            snapshot = backupCurrentData();

            // 既存の管理対象データを削除
            clearManagedData();

            // バックアップ側のデータを書き込む
            Object.keys(backup.data).forEach(function (key) {

                if (!isManagedKey(key)) {
                    throw new Error(
                        "不正な復元キーです: " + key
                    );
                }

                localStorage.setItem(
                    key,
                    backup.data[key]
                );

            });

            // 書き込み結果を照合
            const restoredKeys = getManagedKeys();

            const expectedKeys = Object.keys(backup.data);

            if (
                restoredKeys.length !== expectedKeys.length
            ) {
                throw new Error(
                    "復元データの件数が一致しません。"
                );
            }

            expectedKeys.forEach(function (key) {

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

            console.error(
                "復元処理エラー:",
                error
            );

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


    // ==========================================
    // QRコード文字列からバックアップを復元
    // ==========================================

    function decodeBackup(qrData) {

        try {

            if (
                typeof qrData !== "string" ||
                !qrData.startsWith(QR_PREFIX)
            ) {
                throw new Error(
                    "Double Bite!!用のバックアップQRではありません。"
                );
            }

            if (
                !window.fflate ||
                typeof window.fflate.gunzipSync !== "function"
            ) {
                throw new Error(
                    "圧縮ライブラリ fflate が読み込まれていません。"
                );
            }

            const base64 = qrData.substring(QR_PREFIX.length);

            const binary = atob(base64);

            const compressed = new Uint8Array(binary.length);

            for (let i = 0; i < binary.length; i++) {
                compressed[i] = binary.charCodeAt(i);
            }

            const decompressed =
                window.fflate.gunzipSync(compressed);

            const json = new TextDecoder().decode(decompressed);

            const backup = JSON.parse(json);

            validateBackup(backup);

            return {
                success: true,
                backup: backup
            };

        } catch (error) {

            console.error(
                "QRコード解析エラー:",
                error
            );

            return {
                success: false,
                message: error.message ||
                    "QRコードを読み取れませんでした。"
            };

        }

    }


    // ==========================================
    // BackupManager 公開
    // ==========================================

    window.BackupManager = {
        createBackup: createBackup,
        getBackupInfo: getBackupInfo,
        validateBackup: validateBackup,
        restoreBackup: restoreBackup,
        decodeBackup: decodeBackup,
        getManagedKeys: function () {
            return getManagedKeys();
        }
    };


    // ==========================================
    // データ引継ぎ画面の操作
    // ==========================================

    let pendingRevivalBackup = null;

    function openRevivalModal() {

        const modal = document.getElementById("revivalModal");

        if (modal) {
            modal.style.display = "flex";
        }

    }


    function closeRevivalModal() {

        const modal = document.getElementById("revivalModal");

        if (modal) {
            modal.style.display = "none";
        }

        clearRevivalQr();

    }


    // ==========================================
    // QRコード表示のクリア
    // ==========================================

    function clearRevivalQr() {

        const area = document.getElementById("revivalQrArea");

        const canvas = document.getElementById("revivalQrCanvas");

        const dateElement = document.getElementById("revivalBackupDate");

        const resultArea = document.getElementById("revivalRestoreResult");

        const message = document.getElementById("revivalRestoreMessage");

        const restoreButton = document.getElementById(
            "revivalApplyRestoreBtn"
        );

        const fileInput = document.getElementById("revivalQrFile");

        if (area) {
            area.style.display = "none";
        }

        if (canvas) {

            const context = canvas.getContext("2d");

            if (context) {
                context.clearRect(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
            }

        }

        if (dateElement) {
            dateElement.textContent = "";
        }

        if (resultArea) {
            resultArea.style.display = "none";
        }

        if (message) {
            message.textContent = "";
        }

        if (restoreButton) {
            restoreButton.remove();
        }

        if (fileInput) {
            fileInput.value = "";
        }

        pendingRevivalBackup = null;

        window.pendingRevivalBackup = null;

    }


    // ==========================================
    // 独自メッセージモーダル
    // ==========================================

    let revivalDialogElement = null;


    function closeRevivalDialog(callback) {

        if (revivalDialogElement) {
            revivalDialogElement.remove();
            revivalDialogElement = null;
        }

        if (typeof callback === "function") {
            callback();
        }

    }


    function showRevivalDialog(message, options) {

        options = options || {};

        // 既に表示中のダイアログがあれば閉じる
        if (revivalDialogElement) {
            revivalDialogElement.remove();
            revivalDialogElement = null;
        }

        const isConfirm = options.showCancel === true;

        const overlay = document.createElement("div");

        overlay.setAttribute("role", "presentation");

        Object.assign(overlay.style, {
            position: "fixed",
            inset: "0",
            zIndex: "20000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            boxSizing: "border-box",
            background: "rgba(0, 0, 0, 0.58)"
        });

        const dialog = document.createElement("div");

        dialog.setAttribute("role", "dialog");
        dialog.setAttribute("aria-modal", "true");
        dialog.setAttribute(
            "aria-labelledby",
            "smashRevivalDialogTitle"
        );

        Object.assign(dialog.style, {
            width: "100%",
            maxWidth: "420px",
            maxHeight: "calc(100vh - 40px)",
            overflowY: "auto",
            boxSizing: "border-box",
            padding: "24px 22px 20px",
            borderRadius: "16px",
            background: "#ffffff",
            color: "#222222",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.30)",
            fontFamily: "inherit"
        });

        const title = document.createElement("div");

        title.id = "smashRevivalDialogTitle";

        title.textContent =
            options.title ||
            (isConfirm ? "データ引継ぎの確認" : "データ引継ぎ");

        Object.assign(title.style, {
            marginBottom: "16px",
            fontSize: "19px",
            fontWeight: "700",
            lineHeight: "1.4",
            textAlign: "center"
        });

        const messageElement = document.createElement("div");

        messageElement.textContent = String(message || "");

        Object.assign(messageElement.style, {
            marginBottom: "24px",
            fontSize: "15px",
            lineHeight: "1.75",
            whiteSpace: "pre-wrap",
            overflowWrap: "anywhere",
            textAlign: "left"
        });

        const buttons = document.createElement("div");

        Object.assign(buttons.style, {
            display: "flex",
            justifyContent: "center",
            gap: "10px"
        });

        function styleButton(button, primary) {

            Object.assign(button.style, {
                minWidth: isConfirm ? "112px" : "140px",
                minHeight: "44px",
                padding: "10px 18px",
                border: primary ? "none" : "1px solid #b8b8b8",
                borderRadius: "9px",
                background: primary ? "#5b45b5" : "#ffffff",
                color: primary ? "#ffffff" : "#333333",
                fontSize: "15px",
                fontWeight: "700",
                cursor: "pointer",
                touchAction: "manipulation"
            });

        }

        const okButton = document.createElement("button");

        okButton.type = "button";

        okButton.textContent =
            options.confirmText ||
            (isConfirm ? "実行する" : "閉じる");

        styleButton(okButton, true);

        okButton.addEventListener("click", function () {
            closeRevivalDialog(options.onConfirm);
        });

        if (isConfirm) {

            const cancelButton = document.createElement("button");

            cancelButton.type = "button";
            cancelButton.textContent =
                options.cancelText || "キャンセル";

            styleButton(cancelButton, false);

            cancelButton.addEventListener("click", function () {
                closeRevivalDialog(options.onCancel);
            });

            buttons.appendChild(cancelButton);

        }

        buttons.appendChild(okButton);

        dialog.appendChild(title);
        dialog.appendChild(messageElement);
        dialog.appendChild(buttons);

        overlay.appendChild(dialog);

        // 背景タップでは確認操作を確定させない
        overlay.addEventListener("click", function (event) {

            if (event.target === overlay && !isConfirm) {
                closeRevivalDialog();
            }

        });

        revivalDialogElement = overlay;

        document.body.appendChild(overlay);

        okButton.focus();

    }


    // ==========================================
    // 通知表示
    // ==========================================

    function showRevivalNotice(message, isError) {

        showRevivalDialog(message, {
            title: isError ? "エラー" : "お知らせ",
            confirmText: "閉じる"
        });

    }


    // ==========================================
    // QRコードによるバックアップ作成
    // ==========================================

    function createRevivalBackup() {

        const result = window.BackupManager.createBackup();

        if (!result.success) {

            showRevivalNotice(
                result.error ||
                "バックアップの作成に失敗しました。",
                true
            );

            return;

        }

        if (typeof window.QRious !== "function") {

            showRevivalNotice(
                "QRコード作成ライブラリ QRious が読み込まれていません。",
                true
            );

            return;

        }

        const canvas = document.getElementById("revivalQrCanvas");

        const area = document.getElementById("revivalQrArea");

        if (!canvas || !area) {

            showRevivalNotice(
                "QRコード表示用のHTMLが見つかりません。",
                true
            );

            return;

        }

        try {

            const qrData = QR_PREFIX + result.compressedData;

            new window.QRious({
                element: canvas,
                value: qrData,
                size: 500,
                level: "L",
                padding: 20,
                background: "#ffffff",
                foreground: "#000000"
            });

            area.style.display = "block";

            const dateElement = document.getElementById(
                "revivalBackupDate"
            );

            if (dateElement) {

                dateElement.textContent =
                    "作成日時：" +
                    new Date(result.createdAt).toLocaleString("ja-JP");

            }

            console.log("QRバックアップ生成成功");
            console.log("保存データ数:", result.dataCount);
            console.log("圧縮サイズ:", result.compressedSize);
            console.log("QRデータ文字数:", qrData.length);
            console.log("QRコードサイズ:", canvas.width);

        } catch (error) {

            console.error(
                "QRコード生成エラー:",
                error
            );

            showRevivalNotice(
                "QRコードの生成に失敗しました。",
                true
            );

        }

    }


    // ==========================================
    // QRコード画像の保存
    // ==========================================

    function saveRevivalQr() {

        const canvas = document.getElementById("revivalQrCanvas");

        if (!canvas || !canvas.width || !canvas.height) {

            showRevivalNotice(
                "保存するQRコードがありません。",
                true
            );

            return;

        }

        try {

            const link = document.createElement("a");

            const date = new Date();

            const dateText =
                date.getFullYear() +
                String(date.getMonth() + 1).padStart(2, "0") +
                String(date.getDate()).padStart(2, "0");

            link.download = "DoubleBite_Backup_" + dateText + ".png";

            link.href = canvas.toDataURL("image/png");

            link.click();

        } catch (error) {

            console.error(
                "QRコード保存エラー:",
                error
            );

            showRevivalNotice(
                "QRコード画像を保存できませんでした。",
                true
            );

        }

    }


    // ==========================================
    // 復元用ファイル選択画面を開く
    // ==========================================

    function openRevivalRestore() {

        const fileInput = document.getElementById("revivalQrFile");

        if (!fileInput) {

            showRevivalNotice(
                "QRコード読み取り用のファイル入力欄がありません。",
                true
            );

            return;

        }

        fileInput.value = "";

        fileInput.click();

    }


    // ==========================================
    // QRコード画像ファイルの読み取り
    // ==========================================

    function readRevivalQrFile(event) {

        const file =
            event.target.files && event.target.files[0];

        if (!file) {
            return;
        }

        if (typeof window.jsQR !== "function") {

            showRevivalNotice(
                "QRコード読み取りライブラリ jsQR が読み込まれていません。",
                true
            );

            return;

        }

        const reader = new FileReader();

        reader.onload = function (loadEvent) {

            const image = new Image();

            image.onload = function () {

                try {

                    const canvas = document.createElement("canvas");

                    const context = canvas.getContext(
                        "2d",
                        {
                            willReadFrequently: true
                        }
                    );

                    if (!context) {
                        throw new Error(
                            "画像処理を開始できませんでした。"
                        );
                    }

                    canvas.width = image.naturalWidth;
                    canvas.height = image.naturalHeight;

                    context.drawImage(
                        image,
                        0,
                        0
                    );

                    const imageData = context.getImageData(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );

                    const qrResult = window.jsQR(
                        imageData.data,
                        imageData.width,
                        imageData.height,
                        {
                            inversionAttempts: "attemptBoth"
                        }
                    );

                    if (!qrResult || !qrResult.data) {

                        throw new Error(
                            "QRコードを読み取れませんでした。画像を確認してください。"
                        );

                    }

                    // QRデータの解凍と検証
                    const decoded =
                        window.BackupManager.decodeBackup(
                            qrResult.data
                        );

                    if (!decoded.success) {
                        throw new Error(decoded.message);
                    }

                    pendingRevivalBackup = decoded.backup;

                    window.pendingRevivalBackup = decoded.backup;

                    console.log("バックアップ読み取り成功");

                    console.log(
                        "作成日時:",
                        decoded.backup.createdAt
                    );

                    console.log(
                        "保存データ数:",
                        Object.keys(decoded.backup.data).length
                    );

                    // 読み取り成功後、復元確認画面を表示
                    showRevivalRestoreConfirm(decoded.backup);

                } catch (error) {

                    pendingRevivalBackup = null;

                    window.pendingRevivalBackup = null;

                    console.error(
                        "QRコード画像解析エラー:",
                        error
                    );

                    showRevivalNotice(
                        "バックアップデータを正常に読み取れませんでした。\n" +
                        error.message,
                        true
                    );

                }

            };

            image.onerror = function () {

                showRevivalNotice(
                    "画像ファイルを開けませんでした。",
                    true
                );

            };

            image.src = loadEvent.target.result;

        };

        reader.onerror = function () {

            showRevivalNotice(
                "ファイルの読み込みに失敗しました。",
                true
            );

        };

        reader.readAsDataURL(file);

    }


    // ==========================================
    // 復元前の確認
    // ==========================================

    function showRevivalRestoreConfirm(backup) {

        const info =
            window.BackupManager.getBackupInfo(backup);

        if (!info) {

            pendingRevivalBackup = null;

            window.pendingRevivalBackup = null;

            showRevivalNotice(
                "バックアップ情報を取得できませんでした。",
                true
            );

            return;

        }

        const dateText =
            new Date(info.createdAt).toLocaleString("ja-JP");

        const message =
            "バックアップを読み取りました。\n\n" +
            "バックアップ日時：\n" +
            dateText +
            "\n\n" +
            "現在の引継ぎ対象データは、バックアップの内容に置き換わります。\n" +
            "バックアップに含まれていない対象データは削除されます。\n\n" +
            "データ引継ぎを実行しますか？";

        showRevivalDialog(message, {
            title: "データ引継ぎの確認",
            showCancel: true,
            confirmText: "引継ぎする",
            cancelText: "キャンセル",

            onConfirm: function () {
                restoreRevivalBackup();
            },

            onCancel: function () {

                pendingRevivalBackup = null;

                window.pendingRevivalBackup = null;

                showRevivalNotice(
                    "データ引継ぎをキャンセルしました。",
                    false
                );

            }

        });

    }


    // ==========================================
    // データ引継ぎの実行
    // ==========================================

    function restoreRevivalBackup() {

        const backup = pendingRevivalBackup;

        if (!backup) {

            showRevivalNotice(
                "復元するバックアップデータがありません。",
                true
            );

            return;

        }

        // 復元直前に再検証
        try {

            window.BackupManager.validateBackup(backup);

        } catch (error) {

            showRevivalNotice(
                "バックアップデータが正しくありません。\n" +
                error.message,
                true
            );

            pendingRevivalBackup = null;

            window.pendingRevivalBackup = null;

            return;

        }

        const result =
            window.BackupManager.restoreBackup(backup);

        if (!result.success) {

            let message;

            if (result.rollbackFailed) {

                message =
                    "重大なエラーが発生しました。\n" +
                    "復元と元データへの復旧の両方に失敗しています。\n\n" +
                    "エラー：" + result.error + "\n" +
                    "復旧エラー：" + result.rollbackError;

            } else {

                message =
                    "復元に失敗しました。\n" +
                    "復元前のデータに戻しました。\n\n" +
                    result.error;

            }

            showRevivalNotice(message, true);

            console.error("復元失敗:", result);

            pendingRevivalBackup = null;

            window.pendingRevivalBackup = null;

            return;

        }

        pendingRevivalBackup = null;

        window.pendingRevivalBackup = null;

        console.log("バックアップ復元成功:", result);

        showRevivalRestoreComplete(result);

    }


    // ==========================================
    // データ引継ぎ完了
    // ==========================================

    function showRevivalRestoreComplete(result) {

        showRevivalDialog(
            "データ引継ぎが完了しました。\n\n" +
            "アプリを再読み込みして、引き継いだデータを反映しますか？",
            {
                title: "引継ぎ完了",
                showCancel: true,
                confirmText: "再読み込み",
                cancelText: "あとで",

                onConfirm: function () {
                    window.location.reload();
                },

                onCancel: function () {

                    showRevivalNotice(
                        "データ引継ぎは完了しています。反映するにはアプリを再読み込みしてください。",
                        false
                    );

                }

            }
        );

    }


    // ==========================================
    // 画面外クリックでメインモーダルを閉じる
    // ==========================================

    document.addEventListener("click", function (event) {

        const modal = document.getElementById("revivalModal");

        if (
            modal &&
            event.target === modal
        ) {
            closeRevivalModal();
        }

    });


    // ==========================================
    // HTMLから呼び出す関数を公開
    // ==========================================

    window.openRevivalModal = openRevivalModal;

    window.closeRevivalModal = closeRevivalModal;

    window.createRevivalBackup = createRevivalBackup;

    window.saveRevivalQr = saveRevivalQr;

    window.openRevivalRestore = openRevivalRestore;

    window.readRevivalQrFile = readRevivalQrFile;

    window.restoreRevivalBackup = restoreRevivalBackup;

})();
