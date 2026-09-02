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

difficulty:"★☆☆☆☆",

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

difficulty:"★☆☆☆☆",

score:sasoiScore03,

background:"images/sasoi-score03-bg.png"

},

// ==========================================
// 第肆譜
// ==========================================

{
id:"score04",

number:"第肆譜",

numberKana:"だいよんぷ",

title:"一誘一間・二誘挟",

titleKana:"いちゆういっかん・にゆうばさみ",

difficulty:"★★☆☆☆",

score:sasoiScore04,

background:"images/sasoi-score04-bg.png"

},

// ==========================================
// 第伍譜
// ==========================================

{
id:"score05",

number:"第伍譜",

numberKana:"だいごふ",

title:"一誘一間・三誘挟",

titleKana:"いちゆういっかん・さんゆうばさみ",

difficulty:"★★☆☆☆",

score:sasoiScore05,

background:"images/sasoi-score05-bg.png"

},

// ==========================================
// 第陸譜
// ==========================================

{
id:"score06",

number:"第陸譜",

numberKana:"だいろっぷ",

title:"二誘一間・一誘挟",

titleKana:"にゆういっかん・いちゆうばさみ",

difficulty:"★★☆☆☆",

score:sasoiScore06,

background:"images/sasoi-score06-bg.png"

},

// ==========================================
// 第漆譜
// ==========================================

{
id:"score07",

number:"第漆譜",

numberKana:"だいななふ",

title:"二誘一間・三誘挟",

titleKana:"にゆういっかん・さんゆうばさみ",

difficulty:"★★☆☆☆",

score:sasoiScore07,

background:"images/sasoi-score07-bg.png"

},

// ==========================================
// 第捌譜
// ==========================================

{
id:"score08",

number:"第捌譜",

numberKana:"だいはちふ",

title:"三誘一間・一誘挟",

titleKana:"さんゆういっかん・いちゆうばさみ",

difficulty:"★★☆☆☆",

score:sasoiScore08,

background:"images/sasoi-score08-bg.png"

},

// ==========================================
// 第玖譜
// ==========================================

{
id:"score09",

number:"第玖譜",

numberKana:"だいきゅうふ",

title:"三誘一間・二誘挟",

titleKana:"さんゆういっかん・にゆうばさみ",

difficulty:"★★☆☆☆",

score:sasoiScore09,

background:"images/sasoi-score09-bg.png"

},

// ==========================================
// 第拾譜
// ==========================================

{
id:"score10",

number:"第拾譜",

numberKana:"だいじっぷ",

title:"一誘一間・二誘連",

titleKana:"いちゆういっかん・にゆうれん",

difficulty:"★★★☆☆",

score:sasoiScore10,

background:"images/sasoi-score10-bg.png"

},

// ==========================================
// 第拾壱譜
// ==========================================

{
id:"score11",

number:"第拾壱譜",

numberKana:"だいじゅういっぷ",

title:"一誘一間・三誘連",

titleKana:"いちゆういっかん・さんゆうれん",

difficulty:"★★★☆☆",

score:sasoiScore11,

background:"images/sasoi-score11-bg.png"

},

// ==========================================
// 第拾弐譜
// ==========================================

{
id:"score12",

number:"第拾弐譜",

numberKana:"だいじゅうにふ",

title:"二誘一間・一誘連",

titleKana:"にゆういっかん・いちゆうれん",

difficulty:"★★★☆☆",

score:sasoiScore12,

background:"images/sasoi-score12-bg.png"

},

// ==========================================
// 第拾参譜
// ==========================================

{
id:"score13",

number:"第拾参譜",

numberKana:"だいじゅうさんぷ",

title:"二誘一間・三誘連",

titleKana:"にゆういっかん・さんゆうれん",

difficulty:"★★★☆☆",

score:sasoiScore13,

background:"images/sasoi-score13-bg.png"

},

// ==========================================
// 第拾肆譜
// ==========================================

{
id:"score14",

number:"第拾肆譜",

numberKana:"だいじゅうよんぷ",

title:"三誘一間・一誘連",

titleKana:"さんゆういっかん・いちゆうれん",

difficulty:"★★★☆☆",

score:sasoiScore14,

background:"images/sasoi-score14-bg.png"

},

// ==========================================
// 第拾伍譜
// ==========================================

{
id:"score15",

number:"第拾伍譜",

numberKana:"だいじゅうごふ",

title:"三誘一間・二誘連",

titleKana:"さんゆういっかん・にゆうれん",

difficulty:"★★★☆☆",

score:sasoiScore15,

background:"images/sasoi-score15-bg.png"

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
