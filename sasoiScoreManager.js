// ==========================================
// ◎ 譜面一覧
// ==========================================

const sasoiScoreList = [

// ==========================================
// 第壱譜
// ==========================================

{
id:"score01",

number:"第壱譜",

numberKana:"だいいっぷ",

title:"一誘一間・四段重",

titleKana:"いちゆういっかん・よんだんがさね",

difficulty:"★☆☆☆☆",

score:sasoiScore01,

background:"images/sasoi-score01-bg.png"

},

// ==========================================
// 第弐譜
// ==========================================

{
id:"score02",

number:"第弐譜",

numberKana:"だいにふ",

title:"二誘一間・三段重",

titleKana:"にゆういっかん・さんだんがさね",

difficulty:"★★☆☆☆",

score:sasoiScore02,

background:"images/sasoi-score02-bg.png"

},

// ==========================================
// 第参譜
// ==========================================

{
id:"score03",

number:"第参譜",

numberKana:"だいさんぷ",

title:"三誘一間・三段重",

titleKana:"さんゆういっかん・さんだんがさね",

difficulty:"★★★☆☆",

score:sasoiScore03,

background:"images/sasoi-score03-bg.png"

}

];


// =================================
// ◎ 譜面番号 → 譜面タイトル中央表示
// =================================
//
// ゲーム開始時に、現在選択されている
// 譜面番号を中央へ表示する。
//
// 譜面番号のアニメーション終了後、
// 譜面タイトルを中央へ表示する。
//
// 譜面タイトルのアニメーション終了後、
// callbackを実行する。
//
// callback:
// ・右上の譜面番号＋タイトル表示
// ・譜面開始
//
// 固定時間による待機は使用しない。
// CSSアニメーションの animationend を
// 実際に検知して次へ進む。
// =================================

function showSasoiScoreTitleAnimation(
  callback
){

  // ---------------------------------
  // ゲーム画面を取得
  // ---------------------------------

  const game =
    document.getElementById(
      "sasoiGame"
    );


  if(
    !game
  ){

    console.log(
      "🎣 譜面中央アニメーション失敗：sasoiGameが見つかりません"
    );

    return;

  }


  // ---------------------------------
  // 右上の譜面タイトルを取得
  // ---------------------------------

  const titleElement =
    document.getElementById(
      "sasoiGameScoreTitle"
    );


  if(
    !titleElement
  ){

    console.log(
      "🎣 譜面中央アニメーション失敗：sasoiGameScoreTitleが見つかりません"
    );

    return;

  }


  // ---------------------------------
  // 現在の譜面タイトルを取得
  // ---------------------------------

  const title =
    titleElement.textContent.trim();


  if(
    !title
  ){

    console.log(
      "🎣 譜面中央アニメーション失敗：譜面タイトルが空です"
    );

    return;

  }


  // =================================
  // ◎ 譜面番号を取得
  // =================================

  const numberElement =
    document.querySelector(
      ".sasoi-score-number"
    );


  const number =
    numberElement
      ? numberElement.textContent.trim()
      : "";


  console.log(
    "🎣 中央表示用 譜面番号:",
    number
  );


  // =================================
  // ◎ 前回の中央表示を完全削除
  // =================================

  const oldNumber =
    game.querySelector(
      ".sasoi-score-number-animation"
    );


  if(
    oldNumber
  ){

    oldNumber.remove();

  }


  const oldTitle =
    game.querySelector(
      ".sasoi-score-title-animation"
    );


  if(
    oldTitle
  ){

    oldTitle.remove();

  }


  // =================================
  // ◎ 右上表示を一旦非表示にする
  // =================================

  const cornerName =
    document.querySelector(
      ".sasoi-score-name"
    );


  if(
    cornerName
  ){

    cornerName.classList.remove(
      "is-visible"
    );

  }


  // =================================
  // ◎ 中央 譜面番号
  // =================================

  if(
    number
  ){

    const centerNumber =
      document.createElement(
        "div"
      );


    centerNumber.className =
      "sasoi-score-number-animation";


    centerNumber.textContent =
      number;


    // ---------------------------------
    // ゲーム画面へ追加
    // ---------------------------------

    game.appendChild(
      centerNumber
    );


    console.log(
      "🎣 譜面番号：中央表示開始"
    );


    // =================================
    // 譜面番号アニメーション終了
    // =================================

    centerNumber.addEventListener(
      "animationend",
      function(event){

        if(
          event.animationName !==
          "sasoiScoreNumberCenterShow"
        ){

          return;

        }


        console.log(
          "🎣 譜面番号：中央表示終了"
        );


        if(
          centerNumber &&
          centerNumber.isConnected
        ){

          centerNumber.remove();

        }


        showSasoiCenterTitle();

      },
      {
        once:true
      }
    );

  }

  else{

    console.log(
      "🎣 譜面番号なし：タイトル中央表示へ"
    );


    showSasoiCenterTitle();

  }


  // =================================
  // ◎ 中央 譜面タイトル表示
  // =================================

  function showSasoiCenterTitle(){

    const oldTitle =
      game.querySelector(
        ".sasoi-score-title-animation"
      );


    if(
      oldTitle
    ){

      oldTitle.remove();

    }


    const centerTitle =
      document.createElement(
        "div"
      );


    centerTitle.className =
      "sasoi-score-title-animation";


    centerTitle.textContent =
      title;


    game.appendChild(
      centerTitle
    );


    console.log(
      "================================="
    );


    console.log(
      "🎣 譜面タイトル中央表示開始"
    );


    console.log(
      "タイトル:",
      title
    );


    console.log(
      "================================="
    );


    // =================================
    // ◎ 中央タイトル
    //    アニメーション終了監視
    // =================================

    centerTitle.addEventListener(
      "animationend",
      function(event){

        if(
          event.animationName !==
          "sasoiScoreTitleCenterShow"
        ){

          return;

        }


        console.log(
          "🎣 譜面タイトル：中央アニメーション終了"
        );


        if(
          centerTitle &&
          centerTitle.isConnected
        ){

          centerTitle.remove();

        }


        if(
          typeof callback ===
          "function"
        ){

          callback();

        }

      },
      {
        once:true
      }
    );

  }

}



// ==========================================
// ◎ 譜面選択時の初期画面背景変更
// ==========================================
//
// 選択された譜面情報に登録されている
// background を使用して、
// .sasoi-panel の背景画像を変更する。
//
// 譜面データ本体には背景情報を持たせず、
// sasoiScoreManager.js 側で管理する。
// ==========================================

function applySasoiScoreBackground(scoreData){

// ----------------------------------------
// 譜面情報が存在しない場合
// ----------------------------------------

if(
!scoreData
){


console.log(
  "🎣 背景変更失敗：譜面情報がありません"
);

return;


}

// ----------------------------------------
// 初期画面パネルを取得
// ----------------------------------------

const panel =
document.querySelector(
".sasoi-panel"
);

if(
!panel
){


console.log(
  "🎣 背景変更失敗：.sasoi-panel が見つかりません"
);

return;


}

// ----------------------------------------
// 背景画像が登録されていない場合
// ----------------------------------------

if(
!scoreData.background
){


console.log(
  "🎣 背景画像未設定：",
  scoreData.id
);

return;


}

// ----------------------------------------
// 背景画像を変更
// ----------------------------------------

panel.style.backgroundImage =
`url("${scoreData.background}")`;

console.log(
"🎨 譜面背景変更：",
scoreData.id,
scoreData.background
);

}
