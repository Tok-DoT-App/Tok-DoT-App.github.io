
// =========================================
// 誘いの名人
// タッチボタン自由移動機能
// =========================================
//
// ・ゲーム開始後10秒間だけドラッグ可能
// ・スマホ画面全体を移動範囲とする
// ・既存のPRESS / RELEASE処理には触れない
// ・リトライ時は現在位置を維持
// ・戻る / OFF時は初期位置へ戻す
// ・ゲーム画面の外へ移動可能
//
// =========================================


(function(){

  "use strict";


  // =========================================
  // 設定
  // =========================================

  const MOVE_TIME =
    10000;

  // =========================================
  // 状態
  // =========================================

  let moveEnabled =
    false;

  let moveTimer =
    null;

  let isDragging =
    false;

  let dragPointerId =
    null;

  let dragOffsetX =
    0;

  let dragOffsetY =
    0;


  // =========================================
  // 初期位置保存
  // =========================================

  let initialPositionSaved =
    false;

  let initialStyle =
    null;


  // =========================================
  // 元の親要素保存
  // =========================================

  let originalParent =
    null;

  let originalNextSibling =
    null;


  // =========================================
  // ボタン取得
  // =========================================

  function getTouch(){

    return document.getElementById(
      "sasoiTouch"
    );

  }


  // =========================================
  // 初期位置を保存
  // =========================================

  function saveInitialPosition(){

    const touch =
      getTouch();


    if(
      !touch
    ){

      return;

    }


    if(
      initialPositionSaved
    ){

      return;

    }


    // ---------------------------------------
    // 元の親を保存
    // ---------------------------------------

    originalParent =
      touch.parentElement;


    originalNextSibling =
      touch.nextSibling;


    // ---------------------------------------
    // 元のCSSを保存
    // ---------------------------------------

    initialStyle = {

      position:
        touch.style.position,

      left:
        touch.style.left,

      right:
        touch.style.right,

      top:
        touch.style.top,

      bottom:
        touch.style.bottom,

      transform:
        touch.style.transform,

      zIndex:
        touch.style.zIndex

    };


    initialPositionSaved =
      true;


    console.log(
      "🎮 タッチボタン初期位置を保存"
    );

  }


  // =========================================
  // 現在位置を固定位置へ変換
  // =========================================
  //
  // ★重要
  //
  // ゲーム画面の中にあるままだと
  // overflow:hidden等の影響を受ける。
  //
  // そのため一時的にbody直下へ移動する。
  //
  // =========================================

  function convertToFixedPosition(){

    const touch =
      getTouch();


    if(
      !touch
    ){

      return;

    }


    // ---------------------------------------
    // 現在の画面上の位置を取得
    // ---------------------------------------

    const rect =
      touch.getBoundingClientRect();


    // ---------------------------------------
    // 現在位置を保存
    // ---------------------------------------

    const currentLeft =
      rect.left;

    const currentTop =
      rect.top;


    // ---------------------------------------
    // body直下へ移動
    // ---------------------------------------
    //
    // これによってゲーム画面の
    // overflow:hidden等から脱出する。
    //
    // ---------------------------------------

    if(
      touch.parentElement !==
      document.body
    ){

      document.body.appendChild(
        touch
      );

    }


    // ---------------------------------------
    // fixed化
    // ---------------------------------------

    touch.style.position =
      "fixed";

    touch.style.left =
      currentLeft + "px";

    touch.style.top =
      currentTop + "px";

    touch.style.right =
      "auto";

    touch.style.bottom =
      "auto";

    touch.style.transform =
      "none";


    // ---------------------------------------
    // 最前面
    // ---------------------------------------

    touch.style.zIndex =
      "999";


    console.log(
      "🎮 タッチボタン：画面全体移動モードへ移行",
      {
        left:
          currentLeft,

        top:
          currentTop
      }
    );

  }


  // =========================================
  // 画面内に位置を制限
  // =========================================

  function clampPosition(
    left,
    top
  ){

    const touch =
      getTouch();


    if(
      !touch
    ){

      return {

        left:
          left,

        top:
          top

      };

    }


    const width =
      touch.offsetWidth;


    const height =
      touch.offsetHeight;


    const maxLeft =
      Math.max(
        0,
        window.innerWidth -
        width
      );


    const maxTop =
      Math.max(
        0,
        window.innerHeight -
        height
      );


    return {

      left:
        Math.min(
          Math.max(
            0,
            left
          ),
          maxLeft
        ),

      top:
        Math.min(
          Math.max(
            0,
            top
          ),
          maxTop
        )

    };

  }


  // =========================================
  // 移動モード開始
  // =========================================

  function startMoveMode(){

    const touch =
      getTouch();


    if(
      !touch
    ){

      console.log(
        "🎮 タッチボタン移動開始失敗：sasoiTouchがありません"
      );

      return;

    }


    // ---------------------------------------
    // 初期位置保存
    // ---------------------------------------

    saveInitialPosition();


    // ---------------------------------------
    // ★ゲーム画面が表示された後に
    // 現在位置を取得する
    // ---------------------------------------
    //
    // スタート処理とのタイミング差によって
    // display:none状態の座標を取得するのを防ぐ。
    //
    // ---------------------------------------

    requestAnimationFrame(
      function(){

        // -----------------------------------
        // 現在の位置を固定位置へ変換
        // -----------------------------------

        convertToFixedPosition();


        // -----------------------------------
        // 移動モードON
        // -----------------------------------

        moveEnabled =
          true;


        console.log(
          "🎮 タッチボタン移動モード開始：10秒"
        );


        // -----------------------------------
        // 前回タイマー停止
        // -----------------------------------

        if(
          moveTimer
        ){

          clearTimeout(
            moveTimer
          );

          moveTimer =
            null;

        }


        // -----------------------------------
        // 10秒後に移動モード終了
        // -----------------------------------

        moveTimer =
          setTimeout(
            function(){

              moveEnabled =
                false;

              moveTimer =
                null;

              isDragging =
                false;

              dragPointerId =
                null;


              console.log(
                "🎮 タッチボタン移動モード終了"
              );

            },
            MOVE_TIME
          );

      }
    );

  }


  // =========================================
  // 移動モード終了
  // =========================================

  function stopMoveMode(){

    moveEnabled =
      false;


    isDragging =
      false;


    dragPointerId =
      null;


    if(
      moveTimer
    ){

      clearTimeout(
        moveTimer
      );

      moveTimer =
        null;

    }


    console.log(
      "🎮 タッチボタン移動モード停止"
    );

  }


  // =========================================
  // ドラッグ開始
  // =========================================

  function handlePointerDown(
    event
  ){

    if(
      !moveEnabled
    ){

      return;

    }


    const touch =
      getTouch();


    if(
      !touch
    ){

      return;

    }


    // =====================================
    // 移動モード中だけ
    // 既存PRESS処理を止める
    // =====================================

    event.preventDefault();

    event.stopPropagation();

    event.stopImmediatePropagation();


    dragPointerId =
      event.pointerId;


    const rect =
      touch.getBoundingClientRect();


    dragOffsetX =
      event.clientX -
      rect.left;


    dragOffsetY =
      event.clientY -
      rect.top;


    isDragging =
      true;


    try{

      touch.setPointerCapture(
        event.pointerId
      );

    }

    catch(error){

      console.log(
        "🎮 setPointerCapture失敗",
        error
      );

    }


    console.log(
      "🎮 タッチボタン：ドラッグ開始"
    );

  }


  // =========================================
  // ドラッグ中
  // =========================================

  function handlePointerMove(
    event
  ){

    if(
      !moveEnabled ||
      !isDragging
    ){

      return;

    }


    if(
      event.pointerId !==
      dragPointerId
    ){

      return;

    }


    const touch =
      getTouch();


    if(
      !touch
    ){

      return;

    }


    event.preventDefault();

    event.stopPropagation();

    event.stopImmediatePropagation();


    let left =
      event.clientX -
      dragOffsetX;


    let top =
      event.clientY -
      dragOffsetY;


    const position =
      clampPosition(
        left,
        top
      );


    touch.style.left =
      position.left + "px";


    touch.style.top =
      position.top + "px";

  }


  // =========================================
  // ドラッグ終了
  // =========================================

  function handlePointerUp(
    event
  ){

    if(
      !isDragging
    ){

      return;

    }


    if(
      event.pointerId !==
      dragPointerId
    ){

      return;

    }


    event.preventDefault();

    event.stopPropagation();

    event.stopImmediatePropagation();


    const touch =
      getTouch();


    if(
      touch
    ){

      try{

        touch.releasePointerCapture(
          event.pointerId
        );

      }

      catch(error){

        console.log(
          "🎮 releasePointerCapture失敗",
          error
        );

      }

    }


    isDragging =
      false;


    dragPointerId =
      null;


    console.log(
      "🎮 タッチボタン：ドラッグ終了"
    );

  }


  // =========================================
  // 初期位置へ戻す
  // =========================================

  function resetPosition(){

    const touch =
      getTouch();


    if(
      !touch
    ){

      return;

    }


    stopMoveMode();


    if(
      !initialPositionSaved ||
      !initialStyle
    ){

      return;

    }


    // =====================================
    // 元の親要素へ戻す
    // =====================================

    if(
      originalParent
    ){

      if(
        originalNextSibling &&
        originalNextSibling.parentNode ===
        originalParent
      ){

        originalParent.insertBefore(
          touch,
          originalNextSibling
        );

      }

      else{

        originalParent.appendChild(
          touch
        );

      }

    }


    // =====================================
    // 元のCSSへ戻す
    // =====================================

    touch.style.position =
      initialStyle.position;

    touch.style.left =
      initialStyle.left;

    touch.style.right =
      initialStyle.right;

    touch.style.top =
      initialStyle.top;

    touch.style.bottom =
      initialStyle.bottom;

    touch.style.transform =
      initialStyle.transform;

    touch.style.zIndex =
      initialStyle.zIndex;


    console.log(
      "🎮 タッチボタンを初期位置へリセット"
    );


  }

// =========================================
// ◎ 外部から初期位置リセットを呼べるようにする
// =========================================

window.sasoiResetTouchPosition =
  resetPosition;


// ========================================= // ◎ 外部から初期位置リセットを呼べるようにする // ========================================= window.sasoiResetTouchPosition = resetPosition;



  // =========================================
  // イベント登録
  // =========================================

  function init(){

    const touch =
      getTouch();


    if(
      !touch
    ){

      console.log(
        "🎮 タッチボタン移動機能：sasoiTouchが見つかりません"
      );

      return;

    }


    // ---------------------------------------
    // 初期位置保存
    // ---------------------------------------

    saveInitialPosition();


    // =======================================
    // 移動用イベント
    // =======================================

    touch.addEventListener(
      "pointerdown",
      handlePointerDown,
      true
    );


    touch.addEventListener(
      "pointermove",
      handlePointerMove,
      true
    );


    touch.addEventListener(
      "pointerup",
      handlePointerUp,
      true
    );


    touch.addEventListener(
      "pointercancel",
      handlePointerUp,
      true
    );


    touch.addEventListener(
      "pointerleave",
      handlePointerUp,
      true
    );


    // =======================================
    // ゲーム開始
    // =======================================

    const startBtn =
      document.getElementById(
        "sasoiStartBtn"
      );


    if(
      startBtn
    ){

      startBtn.addEventListener(
        "click",
        function(){

          startMoveMode();

        }
      );

    }

// =======================================
// モーダル表示中
// タッチボタンを一時的に非表示
// =======================================

function hideTouchForModal(){

  const touch =
    getTouch();


  if(
    !touch
  ){

    return;

  }


  touch.style.visibility =
    "hidden";


  console.log(
    "🎮 モーダル表示：タッチボタンを一時非表示"
  );

}


// =======================================
// モーダル終了後
// タッチボタンを再表示
// =======================================

function showTouchAfterModal(){

  const touch =
    getTouch();


  if(
    !touch
  ){

    return;

  }


  touch.style.visibility =
    "";


  console.log(
    "🎮 モーダル終了：タッチボタンを再表示"
  );

}


// =======================================
// 戻るモーダル監視
// =======================================

const backModal =
  document.getElementById(
    "sasoiBackConfirmModal"
  );


if(
  backModal
){

  const backModalObserver =
    new MutationObserver(
      function(){

        const display =
          getComputedStyle(
            backModal
          ).display;


        if(
          display !== "none"
        ){

          hideTouchForModal();

        }

        else{

          showTouchAfterModal();

        }

      }
    );


  backModalObserver.observe(
    backModal,
    {
      attributes:true,

      attributeFilter:[
        "style",
        "class"
      ]

    }
  );

}


// =======================================
// ハイスコアモーダル監視
// =======================================

const highScoreModal =
  document.getElementById(
    "sasoiHighScoreResetModal"
  );


if(
  highScoreModal
){

  const highScoreModalObserver =
    new MutationObserver(
      function(){

        const display =
          getComputedStyle(
            highScoreModal
          ).display;


        if(
          display !== "none"
        ){

          hideTouchForModal();

        }

        else{

          showTouchAfterModal();

        }

      }
    );


  highScoreModalObserver.observe(
    highScoreModal,
    {
      attributes:true,

      attributeFilter:[
        "style",
        "class"
      ]

    }
  );

}

    // =======================================
    // 戻る
    // =======================================

    const backOK =
      document.getElementById(
        "sasoiBackConfirmOK"
      );


    if(
      backOK
    ){

      backOK.addEventListener(
        "click",
        function(){

          resetPosition();

        }
      );

    }


    // =======================================
    // OFF
    // =======================================

    const toggle =
      document.getElementById(
        "sasoiToggleBtn"
      );


    if(
      toggle
    ){

      toggle.addEventListener(
        "change",
        function(){

          if(
            !this.checked
          ){

            resetPosition();

          }

        }
      );

    }


    // =======================================
    // 画面サイズ変更
    // =======================================

    window.addEventListener(
      "resize",
      function(){

        if(
          !moveEnabled
        ){

          return;

        }


        const touch =
          getTouch();


        if(
          !touch
        ){

          return;

        }


        const rect =
          touch.getBoundingClientRect();


        const position =
          clampPosition(
            rect.left,
            rect.top
          );


        touch.style.left =
          position.left + "px";


        touch.style.top =
          position.top + "px";

      }
    );


    console.log(
      "🎮 タッチボタン自由移動機能：初期化完了"
    );

  }


  // =========================================
  // DOM読み込み後
  // =========================================

  if(
    document.readyState ===
    "loading"
  ){

    document.addEventListener(
      "DOMContentLoaded",
      init
    );

  }

  else{

    init();

  }


// =========================================
// ◎ ホーム画面への戻るモーダル対応
// =========================================
//
// ホーム確認モーダルが表示されたら
// タッチボタンを一時的に非表示にする。
//
// モーダルを閉じたら
// タッチボタンを元に戻す。
//
// ※ タッチボタンの位置そのものは変更しない。
// ※ sasoiTouchMove.jsだけで完結。
// =========================================


function updateSasoiTouchForHomeModal(){

  const touch =
    getTouch();


  const homeModal =
    document.getElementById(
      "doubleCounterBackModal"
    );


  if(
    !touch ||
    !homeModal
  ){

    return;

  }


  // =================================
  // ホームモーダルが表示中
  // =================================

  const isVisible =
    window.getComputedStyle(
      homeModal
    ).display !== "none";


  if(
    isVisible
  ){

    // ---------------------------------
    // タッチボタンを非表示
    // ---------------------------------

    touch.style.visibility =
      "hidden";


  }

  else{

    // ---------------------------------
    // モーダルが閉じたら復帰
    // ---------------------------------

    touch.style.visibility =
      "";

  }

}


// =========================================
// ◎ ホームモーダルの表示状態を監視
// =========================================

function initSasoiHomeModalObserver(){

  const homeModal =
    document.getElementById(
      "doubleCounterBackModal"
    );


  if(
    !homeModal
  ){

    console.log(
      "🎮 ホームモーダルが見つかりません"
    );

    return;

  }


  // =================================
  // class / style の変更を監視
  // =================================

  const observer =
    new MutationObserver(
      function(){

        updateSasoiTouchForHomeModal();

      }
    );


  observer.observe(
    homeModal,
    {
      attributes:true,
      attributeFilter:[
        "class",
        "style"
      ]
    }
  );


  // =================================
  // 初期状態も確認
  // =================================

  updateSasoiTouchForHomeModal();


  console.log(
    "🎮 ホームモーダル監視開始"
  );

}


// =========================================
// ◎ DOM読み込み後に監視開始
// =========================================

if(
  document.readyState ===
  "loading"
){

  document.addEventListener(
    "DOMContentLoaded",
    initSasoiHomeModalObserver
  );

}

else{

  initSasoiHomeModalObserver();

}


// =========================================
// ◎ 誘いの名人
// タッチボタンのコンテキストメニュー抑止
// =========================================
//
// 長押し後に指を離した瞬間、Chrome等が
// コンテキストメニューを表示するのを防ぐ。
//
// ※ 自由移動処理・PRESS処理には触れない。
// =========================================

document.addEventListener(
  "contextmenu",
  function(event){

    const touch =
      event.target.closest(
        "#sasoiTouch"
      );


    if(
      !touch
    ){

      return;

    }


    event.preventDefault();

    event.stopPropagation();

  },
  true
);


})();

