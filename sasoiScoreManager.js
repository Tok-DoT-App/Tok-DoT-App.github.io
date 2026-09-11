const sasoiScoreList = [

// ==========================================
// 壱誘技
// ==========================================

{
id:"score01",

number:"壱誘技",

numberKana:"いちゆうぎ",

title:"一誘一間・四段重",

titleKana:"いちゆういっかん・よんだんがさね",

difficulty:"★☆☆☆☆",

score:sasoiScore01,

background:"images/sasoi-score01-bg.png"

},

// ==========================================
// 弐誘技
// ==========================================

{
id:"score02",

number:"弐誘技",

numberKana:"にゆうぎ",

title:"二誘一間・三段重",

titleKana:"にゆういっかん・さんだんがさね",

difficulty:"★☆☆☆☆",

score:sasoiScore02,

background:"images/sasoi-score02-bg.png"

},

// ==========================================
// 参誘技
// ==========================================

{
id:"score03",

number:"参誘技",

numberKana:"さんゆうぎ",

title:"三誘一間・三段重",

titleKana:"さんゆういっかん・さんだんがさね",

difficulty:"★☆☆☆☆",

score:sasoiScore03,

background:"images/sasoi-score03-bg.png"

},

// ==========================================
// 肆誘技
// ==========================================

{
id:"score04",

number:"肆誘技",

numberKana:"しゆうぎ",

title:"一誘一間・二誘挟",

titleKana:"いちゆういっかん・にゆうばさみ",

difficulty:"★★☆☆☆",

score:sasoiScore04,

background:"images/sasoi-score04-bg.png"

},

// ==========================================
// 伍誘技
// ==========================================

{
id:"score05",

number:"伍誘技",

numberKana:"ごゆうぎ",

title:"一誘一間・三誘挟",

titleKana:"いちゆういっかん・さんゆうばさみ",

difficulty:"★★☆☆☆",

score:sasoiScore05,

background:"images/sasoi-score05-bg.png"

},

// ==========================================
// 陸誘技
// ==========================================

{
id:"score06",

number:"陸誘技",

numberKana:"ろくゆうぎ",

title:"二誘一間・一誘挟",

titleKana:"にゆういっかん・いちゆうばさみ",

difficulty:"★★☆☆☆",

score:sasoiScore06,

background:"images/sasoi-score06-bg.png"

},

// ==========================================
// 漆誘技
// ==========================================

{
id:"score07",

number:"漆誘技",

numberKana:"しちゆうぎ",

title:"二誘一間・三誘挟",

titleKana:"にゆういっかん・さんゆうばさみ",

difficulty:"★★☆☆☆",

score:sasoiScore07,

background:"images/sasoi-score07-bg.png"

},

// ==========================================
// 捌誘技
// ==========================================

{
id:"score08",

number:"捌誘技",

numberKana:"はちゆうぎ",

title:"三誘一間・一誘挟",

titleKana:"さんゆういっかん・いちゆうばさみ",

difficulty:"★★☆☆☆",

score:sasoiScore08,

background:"images/sasoi-score08-bg.png"

},

// ==========================================
// 玖誘技
// ==========================================

{
id:"score09",

number:"玖誘技",

numberKana:"きゅうゆうぎ",

title:"三誘一間・二誘挟",

titleKana:"さんゆういっかん・にゆうばさみ",

difficulty:"★★☆☆☆",

score:sasoiScore09,

background:"images/sasoi-score09-bg.png"

},

// ==========================================
// 拾誘技
// ==========================================

{
id:"score10",

number:"拾誘技",

numberKana:"じゅうゆうぎ",

title:"一誘一間・二誘連",

titleKana:"いちゆういっかん・にゆうれん",

difficulty:"★★☆☆☆",

score:sasoiScore10,

background:"images/sasoi-score10-bg.png"

},

// ==========================================
// 拾壱誘技
// ==========================================

{
id:"score11",

number:"拾壱誘技",

numberKana:"じゅういちゆうぎ",

title:"一誘一間・三誘連",

titleKana:"いちゆういっかん・さんゆうれん",

difficulty:"★★☆☆☆",

score:sasoiScore11,

background:"images/sasoi-score11-bg.png"

},

// ==========================================
// 拾弐誘技
// ==========================================

{
id:"score12",

number:"拾弐誘技",

numberKana:"じゅうにゆうぎ",

title:"二誘一間・一誘連",

titleKana:"にゆういっかん・いちゆうれん",

difficulty:"★★☆☆☆",

score:sasoiScore12,

background:"images/sasoi-score12-bg.png"

},

// ==========================================
// 拾参誘技
// ==========================================

{
id:"score13",

number:"拾参誘技",

numberKana:"じゅうさんゆうぎ",

title:"二誘一間・三誘連",

titleKana:"にゆういっかん・さんゆうれん",

difficulty:"★★☆☆☆",

score:sasoiScore13,

background:"images/sasoi-score13-bg.png"

},

// ==========================================
// 拾肆誘技
// ==========================================

{
id:"score14",

number:"拾肆誘技",

numberKana:"じゅうしゆうぎ",

title:"三誘一間・一誘連",

titleKana:"さんゆういっかん・いちゆうれん",

difficulty:"★★☆☆☆",

score:sasoiScore14,

background:"images/sasoi-score14-bg.png"

},

// ==========================================
// 拾伍誘技
// ==========================================

{
id:"score15",

number:"拾伍誘技",

numberKana:"じゅうごゆうぎ",

title:"三誘一間・二誘連",

titleKana:"さんゆういっかん・にゆうれん",

difficulty:"★★☆☆☆",

score:sasoiScore15,

background:"images/sasoi-score15-bg.png"

}

];



const sasoiCombinedScoreList = [


// ==========================================
// 連誘技 01
// ==========================================
{
id:"combined01",
number:"連誘技",
numberKana:"れんゆうぎ",
title:"秘伝・一・二・三",
titleKana:"ひでん・ひ・ふ・みん",
difficulty:"★★★☆☆",
charts:[
"score01",
"score02",
"score03"
],
background:"images/sasoi-score16-bg.png"
},

// ==========================================
// 連誘技 02
// ==========================================
{
id:"combined02",
number:"連誘技",
numberKana:"れんゆうぎ",
title:"秘伝・一・六・八",
titleKana:"ひでん・い・ろ・は",
difficulty:"★★★☆☆",
charts:[
"score01",
"score06",
"score08"
],
background:"images/sasoi-score17-bg.png"
},

// ==========================================
// 連誘技 03
// ==========================================
{
id:"combined03",
number:"連誘技",
numberKana:"れんゆうぎ",
title:"秘伝・三・四・六",
titleKana:"ひでん・さん・し・ろう",
difficulty:"★★★☆☆",
charts:[
"score03",
"score04",
"score06"
],
background:"images/sasoi-score18-bg.png"
},

// ==========================================
// 連誘技 04
// ==========================================
{
id:"combined04",
number:"連誘技",
numberKana:"れんゆうぎ",
title:"秘伝・八・七・五",
titleKana:"ひでん・は・な・こ",
difficulty:"★★★☆☆",
charts:[
"score08",
"score07",
"score05"
],
background:"images/sasoi-score19-bg.png"
},

// ==========================================
// 連誘技 05
// ==========================================
{
id:"combined05",
number:"連誘技",
numberKana:"れんゆうぎ",
title:"秘伝・四・一・五",
titleKana:"ひでん・よ・い・こ",
difficulty:"★★★☆☆",
charts:[
"score04",
"score01",
"score05"
],
background:"images/sasoi-score20-bg.png"
},

// ==========================================
// 連誘技 06
// ==========================================
{
id:"combined06",
number:"連誘技",
numberKana:"れんゆうぎ",
title:"秘伝・三・二・八",
titleKana:"ひでん・み・つ・ば",
difficulty:"★★★☆☆",
charts:[
"score03",
"score02",
"score08"
],
background:"images/sasoi-score21-bg.png"
},

// ==========================================
// 連誘技 07
// ==========================================
{
id:"combined07",
number:"連誘技",
numberKana:"れんゆうぎ",
title:"秘伝・三・五・八",
titleKana:"ひでん・さ・ご・はち",
difficulty:"★★★☆☆",
charts:[
"score03",
"score05",
"score08"
],
background:"images/sasoi-score22-bg.png"
},

// ==========================================
// 連誘技 08
// ==========================================
{
id:"combined08",
number:"連誘技",
numberKana:"れんゆうぎ",
title:"秘伝・七・五・三",
titleKana:"ひでん・しち・ご・さん",
difficulty:"★★★☆☆",
charts:[
"score07",
"score05",
"score03"
],
background:"images/sasoi-score23-bg.png"
},

// ==========================================
// 連誘技 09
// ==========================================
{
id:"combined09",
number:"連誘技",
numberKana:"れんゆうぎ",
title:"秘伝・八・七・三",
titleKana:"ひでん・は・な・み",
difficulty:"★★★☆☆",
charts:[
"score08",
"score07",
"score03"
],
background:"images/sasoi-score24-bg.png"
},

// ==========================================
// 連誘技 10
// ==========================================
{
id:"combined10",
number:"連誘技",
numberKana:"れんゆうぎ",
title:"秘伝・七・一・六",
titleKana:"ひでん・なな・い・ろ",
difficulty:"★★★☆☆",
charts:[
"score07",
"score01",
"score06"
],
background:"images/sasoi-score25-bg.png"
},

// ==========================================
// 連誘技 11
// ==========================================
{
id:"combined11",
number:"連誘技",
numberKana:"れんゆうぎ",
title:"秘伝・八・三・二",
titleKana:"ひでん・はち・み・つ",
difficulty:"★★★☆☆",
charts:[
"score08",
"score03",
"score02"
],
background:"images/sasoi-score26-bg.png"
},

// ==========================================
// 連誘技 12
// ==========================================
{
id:"combined12",
number:"連誘技",
numberKana:"れんゆうぎ",
title:"秘伝・三・一・五",
titleKana:"ひでん・さ・い・こう",
difficulty:"★★★☆☆",
charts:[
"score03",
"score01",
"score05"
],
background:"images/sasoi-score27-bg.png"
},

// ==========================================
// 熟誘技 01
// ==========================================
{
id:"combined13",
number:"熟誘技",
numberKana:"じゅくゆうぎ",
title:"初釣戦・伍拾獲超",
titleKana:"ちょうせん・ごじゅうかくちょう",
difficulty:"★★★★☆",
charts:[
"score01",
"score02",
"score03",
"score04",
"score05",
"score06",
"score07",
"score08",
"score09",
"score10",
"score11",
"score12",
"score13",
"score14",
"score15",
"score01",
"score02",
"score03",
"score04",
"score05",
"score06",
"score07",
"score08",
"score09",
"score10"
],
background:"images/sasoi-score28-bg.png"
},

// ==========================================
// 熟誘技 02
// ==========================================
{
id:"combined14",
number:"熟誘技",
numberKana:"じゅくゆうぎ",
title:"大釣戦・壱百獲超",
titleKana:"だいちょうせん・いっぴゃくかくちょう",
difficulty:"★★★★☆",
charts:[
"score01",
"score02",
"score03",
"score04",
"score05",
"score06",
"score07",
"score08",
"score09",
"score10",
"score11",
"score12",
"score13",
"score14",
"score15",
"score01",
"score02",
"score03",
"score04",
"score05",
"score06",
"score07",
"score08",
"score09",
"score10",
"score11",
"score12",
"score13",
"score14",
"score15",
"score01",
"score02",
"score03",
"score04",
"score05",
"score06",
"score07",
"score08",
"score09",
"score10",
"score11",
"score12",
"score13",
"score14",
"score15",
"score01",
"score02",
"score03",
"score04",
"score05"
],
background:"images/sasoi-score29-bg.png"
},

// ==========================================
// 熟誘技 03
// ==========================================
{
id:"combined15",
number:"熟誘技",
numberKana:"じゅくゆうぎ",
title:"大獲戦・弐百獲超",
titleKana:"だいかくせん・にひゃくかくちょう",
difficulty:"★★★★☆",
charts:[
"score01",
"score02",
"score03",
"score04",
"score05",
"score06",
"score07",
"score08",
"score09",
"score10",
"score11",
"score12",
"score13",
"score14",
"score15",
"score01",
"score02",
"score03",
"score04",
"score05",
"score06",
"score07",
"score08",
"score09",
"score10",
"score11",
"score12",
"score13",
"score14",
"score15",
"score01",
"score02",
"score03",
"score04",
"score05",
"score06",
"score07",
"score08",
"score09",
"score10",
"score11",
"score12",
"score13",
"score14",
"score15",
"score01",
"score02",
"score03",
"score04",
"score05",
"score06",
"score07",
"score08",
"score09",
"score10",
"score11",
"score12",
"score13",
"score14",
"score15",
"score01",
"score02",
"score03",
"score04",
"score05",
"score06",
"score07",
"score08",
"score09",
"score10",
"score11",
"score12",
"score13",
"score14",
"score15"
],
background:"images/sasoi-score30-bg.png"
},

// ==========================================
// 熟誘技 04
// ==========================================
{
id:"combined16",
number:"熟誘技",
numberKana:"じゅくゆうぎ",
title:"大漁戦・参百獲超",
titleKana:"たいりょうせん・さんびゃくかくちょう",
difficulty:"★★★★☆",
charts:[
"score01",
"score02",
"score03",
"score04",
"score05",
"score06",
"score07",
"score08",
"score09",
"score10",
"score11",
"score12",
"score13",
"score14",
"score15",
"score01",
"score02",
"score03",
"score04",
"score05",
"score06",
"score07",
"score08",
"score09",
"score10",
"score11",
"score12",
"score13",
"score14",
"score15",
"score01",
"score02",
"score03",
"score04",
"score05",
"score06",
"score07",
"score08",
"score09",
"score10",
"score11",
"score12",
"score13",
"score14",
"score15",
"score01",
"score02",
"score03",
"score04",
"score05",
"score06",
"score07",
"score08",
"score09",
"score10",
"score11",
"score12",
"score13",
"score14",
"score15",
"score01",
"score02",
"score03",
"score04",
"score05",
"score06",
"score07",
"score08",
"score09",
"score10",
"score11",
"score12",
"score13",
"score14",
"score15",
"score01",
"score02",
"score03",
"score04",
"score05",
"score06",
"score07",
"score08",
"score09",
"score10",
"score11",
"score12",
"score13",
"score14",
"score15",
"score01",
"score02",
"score03",
"score04",
"score05",
"score06",
"score07",
"score08",
"score09",
"score10",
"score11",
"score12",
"score13",
"score14",
"score15",
"score01",
"score02",
"score03",
"score04",
"score05",
"score06",
"score07",
"score08",
"score09",
"score10",
"score11",
"score12",
"score13",
"score14",
"score15"
],
background:"images/sasoi-score31-bg.png"
}


];

sasoiCombinedScoreList.push(
{
id: "combined17",
number: "誘名人",
numberKana: "ゆうめいじん",
title: "初釣戦・五十獲超",
titleKana: "はつちょうせん・ごじゅうかくちょう",
difficulty: "★★★★★",
charts: sasoiCombinedScoreList.find(function(scoreData) {
return scoreData.id === "combined13";
}).charts,
background: "images/sasoi-score32-bg.png"
},
{
id: "combined18",
number: "誘名人",
numberKana: "ゆうめいじん",
title: "大釣戦・壱百獲超",
titleKana: "だいちょうせん・いっぴゃくかくちょう",
difficulty: "★★★★★",
charts: sasoiCombinedScoreList.find(function(scoreData) {
return scoreData.id === "combined14";
}).charts,
background: "images/sasoi-score33-bg.png"
},
{
id: "combined19",
number: "誘名人",
numberKana: "ゆうめいじん",
title: "大獲戦・弐百獲超",
titleKana: "だいかくせん・にひゃくかくちょう",
difficulty: "★★★★★",
charts: sasoiCombinedScoreList.find(function(scoreData) {
return scoreData.id === "combined15";
}).charts,
background: "images/sasoi-score34-bg.png"
},
{
id: "combined20",
number: "誘名人",
numberKana: "ゆうめいじん",
title: "大漁戦・参百獲超",
titleKana: "たいりょうせん・さんびゃくかくちょう",
difficulty: "★★★★★",
charts: sasoiCombinedScoreList.find(function(scoreData) {
return scoreData.id === "combined16";
}).charts,
background: "images/sasoi-score35-bg.png"
}
);


const sasoiCombinedScoreListForSelect =
sasoiCombinedScoreList.map(
function(combinedScore){

  return {

    id:
      combinedScore.id,

    number:
      combinedScore.number,

    numberKana:
      combinedScore.numberKana,

    title:
      combinedScore.title,

    titleKana:
      combinedScore.titleKana,

    difficulty:
      combinedScore.difficulty,

    score:
      null,

    charts:
      combinedScore.charts,

    background:
      combinedScore.background,

    isCombined:
      true

  };

}

);

sasoiScoreList.push(
...sasoiCombinedScoreListForSelect
);

function getSasoiCombinedScoreById(
id
){

if(
!id
){

return null;

}

return sasoiCombinedScoreList.find(
function(combinedScore){

  return combinedScore.id === id;

}

) || null;

}

function getSasoiScoreById(
id
){

if(
!id
){

return null;

}

return sasoiScoreList.find(
function(scoreData){

  return scoreData.id === id;

}

) || null;

}

// =================================
// ◎ 譜面番号・譜面名中央表示
//    一時停止制御
// =================================

function pauseSasoiScoreTitleAnimation(){

  const game =
    document.getElementById(
      "sasoiGame"
    );

  if(
    !game
  ){

    return;

  }


  const numberAnimation =
    game.querySelector(
      ".sasoi-score-number-animation"
    );


  const titleAnimation =
    game.querySelector(
      ".sasoi-score-title-animation"
    );


  if(
    numberAnimation
  ){

    numberAnimation.style.animationPlayState =
      "paused";

  }


  if(
    titleAnimation
  ){

    titleAnimation.style.animationPlayState =
      "paused";

  }


  console.log(
    "⏸️ 譜面番号・譜面名中央アニメーション停止"
  );

}


// =================================
// ◎ 譜面番号・譜面名中央表示
//    再開
// =================================

function resumeSasoiScoreTitleAnimation(){

  const game =
    document.getElementById(
      "sasoiGame"
    );

  if(
    !game
  ){

    return;

  }


  const numberAnimation =
    game.querySelector(
      ".sasoi-score-number-animation"
    );


  const titleAnimation =
    game.querySelector(
      ".sasoi-score-title-animation"
    );


  if(
    numberAnimation
  ){

    numberAnimation.style.animationPlayState =
      "running";

  }


  if(
    titleAnimation
  ){

    titleAnimation.style.animationPlayState =
      "running";

  }


  console.log(
    "▶️ 譜面番号・譜面名中央アニメーション再開"
  );

}

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
callback,
scoreData
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

// =================================
// ◎ 表示する譜面情報を決定
// =================================

let title = "";
let number = "";

// ---------------------------------
// 組み合わせ譜面などから
// 譜面情報が渡された場合
// ---------------------------------

if(
scoreData &&
typeof scoreData === "object"
){

number =
typeof scoreData.number === "string"
? scoreData.number.trim()
: "";

title =
typeof scoreData.title === "string"
? scoreData.title.trim()
: "";

}

// ---------------------------------
// 譜面情報が渡されていない場合
// 今まで通り現在の画面情報を使用
// ---------------------------------

else{

title =
titleElement.textContent.trim();

const numberElement =
document.querySelector(
".sasoi-score-number"
);

number =
numberElement
? numberElement.textContent.trim()
: "";

}

// ---------------------------------
// タイトルが空なら終了
// ---------------------------------

if(
!title
){

console.log(
"🎣 中央表示失敗：譜面タイトルが空です"
);

return;

}

console.log(
"🎣 中央表示用 譜面番号:",
number
);

console.log(
"🎣 中央表示用 譜面タイトル:",
title
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
// ◎ 右上表示を一旦非表示
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


// --------------------------------------------------------------------------------
// 誘技解放コード関連はじめ
// --------------------------------------------------------------------------------

const SASOI_CLEAR_HISTORY_KEY =
"sasoiClearHistory_v1";

// ==========================================
// ◎ 誘技クリア条件
// ==========================================
//
// 各譜面を「条件以上の釣果」で
// クリアしたかどうかを記録する。
//
// ハイスコアとは完全に別管理する。
//
// ==========================================

const sasoiUnlockGroups = [

// ----------------------------------------
// 重誘技
// 壱・弐・参
// ----------------------------------------

{
id: "heavy",

clearMessage:
  "重誘技クリア",

releaseMessage:
  "誘技解放!",

requiredCatch:
  2,

scoreIds: [
  "score01",
  "score02",
  "score03"
]

},

// ----------------------------------------
// 肆誘技～玖誘技
// ----------------------------------------

{
id: "squeeze",

clearMessage:
  "肆誘技～玖誘技クリア",

releaseMessage:
  "誘技解放!",

requiredCatch:
  2,

scoreIds: [
  "score04",
  "score05",
  "score06",
  "score07",
  "score08",
  "score09"
]

},

// ----------------------------------------
// 拾誘技～拾伍誘技
// ----------------------------------------

{
id: "chain",

clearMessage:
  "拾誘技～拾伍誘技クリア",

releaseMessage:
  "誘技解放!",

requiredCatch:
  2,

scoreIds: [
  "score10",
  "score11",
  "score12",
  "score13",
  "score14",
  "score15"
]

},

// ----------------------------------------
// 連誘技 秘伝
// ----------------------------------------

{
id: "secret",

clearMessage:
  "連誘技秘伝クリア",

releaseMessage:
  "誘技解放!",

requiredCatch:
  6,

scoreIds: [
  "combined01",
  "combined02",
  "combined03",
  "combined04",
  "combined05",
  "combined06",
  "combined07",
  "combined08",
  "combined09",
  "combined10",
  "combined11",
  "combined12"
]

},

// ----------------------------------------
// 熟誘技
// ----------------------------------------

{
id: "master",

clearMessage:
  "熟誘技クリア",

releaseMessage:
  "",

requiredCatchByScore: {

  combined13:
    50,

  combined14:
    100,

  combined15:
    200,

  combined16:
    300

},

scoreIds: [
  "combined13",
  "combined14",
  "combined15",
  "combined16"
]

},

// ----------------------------------------
// 誘名人
// ----------------------------------------

{
id: "yuumeijin",

clearMessage:
  "誘名人クリア",

releaseMessage:
  "",

requiredCatchByScore: {

  combined17:
    50,

  combined18:
    100,

  combined19:
    200,

  combined20:
    300

},

scoreIds: [
  "combined17",
  "combined18",
  "combined19",
  "combined20"
]

}

];

// ==========================================
// ◎ クリア履歴を読み込む
// ==========================================

function loadSasoiClearHistory(){

try{

const saved =
  localStorage.getItem(
    SASOI_CLEAR_HISTORY_KEY
  );


if(
  !saved
){

  return {};

}


const parsed =
  JSON.parse(
    saved
  );


if(
  !parsed ||
  typeof parsed !== "object" ||
  Array.isArray(parsed)
){

  return {};

}


return parsed;

}
catch(error){

console.error(
  "[Sasoi] クリア履歴読み込み失敗:",
  error
);


return {};

}

}

// ==========================================
// ◎ クリア履歴を保存する
// ==========================================

function saveSasoiClearHistory(
history
){

try{

localStorage.setItem(
  SASOI_CLEAR_HISTORY_KEY,
  JSON.stringify(
    history
  )
);


console.log(
  "[Sasoi] クリア履歴保存:",
  history
);

}
catch(error){

console.error(
  "[Sasoi] クリア履歴保存失敗:",
  error
);

}

}

// ==========================================
// ◎ 個別譜面のクリア履歴を確認
// ==========================================

function isSasoiScoreCleared(
scoreId
){

if(
!scoreId
){

return false;

}

const history =
loadSasoiClearHistory();

return history[scoreId] === true;

}

// ==========================================
// ◎ 個別譜面をクリア済みにする
// ==========================================
//
// 一度クリアした譜面は、
// ハイスコアを0にしても
// クリア状態を解除しない。
// ==========================================

function markSasoiScoreCleared(
scoreId
){

if(
!scoreId
){

return false;

}

const history =
loadSasoiClearHistory();

// ----------------------------------------
// すでにクリア済みなら何もしない
// ----------------------------------------

if(
history[scoreId] === true
){

return false;

}

history[scoreId] =
true;

saveSasoiClearHistory(
history
);

console.log(
"[Sasoi] 譜面クリア記録:",
scoreId
);

return true;

}

// ==========================================
// ◎ 解放グループがクリア済みか確認
// ==========================================

function isSasoiUnlockGroupCleared(
group
){

if(
!group ||
!Array.isArray(
group.scoreIds
)
){

return false;

}

return group.scoreIds.every(
function(scoreId){

  return isSasoiScoreCleared(
    scoreId
  );

}

);

}

// ==========================================
// ◎ 今回のプレイ結果を
// 個別譜面クリアとして記録
// ==========================================
//
// scoreId:
// 今回プレイした譜面ID
//
// catchCount:
// 今回のプレイで確定した釣果
//
// ==========================================

function recordSasoiClearResult(
scoreId,
catchCount
){

if(
!scoreId
){

console.log(
  "[Sasoi] クリア判定失敗：scoreIdなし"
);

return null;

}

const scoreData =
getSasoiCombinedScoreById(
scoreId
) ||
getSasoiScoreById(
scoreId
);

if(
!scoreData
){

console.log(
  "[Sasoi] クリア判定失敗：譜面データなし",
  scoreId
);

return null;

}

const catchValue =
Number(
catchCount
) || 0;

// ========================================
// ◎ すでにクリア済み
// ========================================

if(
isSasoiScoreCleared(
scoreId
)
){

console.log(
  "[Sasoi] すでにクリア済み:",
  scoreId
);


return {
  scoreId:
    scoreId,

  newlyCleared:
    false,

  catchCount:
    catchValue
};

}

// ========================================
// ◎ 必要釣果を決定
// ========================================

let requiredCatch =
0;

// ----------------------------------------
// 個別条件
// ----------------------------------------

for(
let i = 0;
i < sasoiUnlockGroups.length;
i++
){

const group =
  sasoiUnlockGroups[i];


if(
  !Array.isArray(
    group.scoreIds
  )
){

  continue;

}


if(
  group.scoreIds.includes(
    scoreId
  )
){

  if(
    group.requiredCatchByScore &&
    typeof group.requiredCatchByScore[scoreId] ===
      "number"
  ){

    requiredCatch =
      group.requiredCatchByScore[scoreId];

  }
  else{

    requiredCatch =
      Number(
        group.requiredCatch
      ) || 0;

  }


  break;

}

}

// ========================================
// ◎ 条件未達成
// ========================================

if(
catchValue <
requiredCatch
){

console.log(
  "[Sasoi] クリア条件未達成:",
  scoreId,
  "釣果:",
  catchValue,
  "必要:",
  requiredCatch
);


return {
  scoreId:
    scoreId,

  newlyCleared:
    false,

  catchCount:
    catchValue,

  requiredCatch:
    requiredCatch
};

}

// ========================================
// ◎ クリア記録
// ========================================

const newlyCleared =
markSasoiScoreCleared(
scoreId
);

if(
!newlyCleared
){

return {
  scoreId:
    scoreId,

  newlyCleared:
    false,

  catchCount:
    catchValue,

  requiredCatch:
    requiredCatch
};

}

console.log(
"[Sasoi] 譜面クリア:",
scoreId,
"釣果:",
catchValue,
"必要:",
requiredCatch
);

return {
scoreId:
scoreId,

newlyCleared:
  true,

catchCount:
  catchValue,

requiredCatch:
  requiredCatch

};

}

// ==========================================
// ◎ 解放グループの完成判定
// ==========================================
//
// 今回の譜面クリアによって、
// グループ全体が初めて揃った場合だけ
// 「クリア」＋「誘技解放」を返す。
//
// ==========================================

function checkSasoiUnlockAfterClear(
scoreId
){

if(
!scoreId
){

return null;

}

for(
let i = 0;
i < sasoiUnlockGroups.length;
i++
){

const group =
  sasoiUnlockGroups[i];


if(
  !Array.isArray(
    group.scoreIds
  )
){

  continue;

}


if(
  !group.scoreIds.includes(
    scoreId
  )
){

  continue;

}


// ======================================
// ◎ グループ全体が揃ったか
// ======================================

const groupCleared =
  isSasoiUnlockGroupCleared(
    group
  );


if(
  !groupCleared
){

  console.log(
    "[Sasoi] グループ未完成:",
    group.id
  );


  return null;

}


const history =
  loadSasoiClearHistory();


const unlockKey =
  "group_" +
  group.id;


// ======================================
// ◎ すでにグループ解放済み
// ======================================

if(
  history[unlockKey] === true
){

  console.log(
    "[Sasoi] グループ解放済み:",
    group.id
  );


  return null;

}


// ======================================
// ◎ グループ解放を記録
// ======================================

history[unlockKey] =
  true;


saveSasoiClearHistory(
  history
);


console.log(
  "================================="
);

console.log(
  "[Sasoi] ★ 誘技解放 ★"
);

console.log(
  "グループ:",
  group.id
);

console.log(
  "メッセージ:",
  group.clearMessage
);

if(
  group.releaseMessage
){

  console.log(
    "メッセージ:",
    group.releaseMessage
  );

}

console.log(
  "================================="
);


return {
  groupId:
    group.id,

  clearMessage:
    group.clearMessage,

  releaseMessage:
    group.releaseMessage,

  newlyReleased:
    true

};

}

return null;

}

// ==========================================
// ◎ クリア履歴確認用
// ==========================================

function getSasoiClearHistory(){

return loadSasoiClearHistory();

}

// ==========================================
// ◎ 誘技解放履歴をすべてリセット
// ==========================================
//
// 通常のハイスコアリセットとは完全に別。
// 現時点では通常操作から呼び出さない。
//
// ==========================================

function resetSasoiUnlockHistory(){

try{

localStorage.removeItem(
  SASOI_CLEAR_HISTORY_KEY
);


console.log(
  "[Sasoi] 誘技クリア・解放履歴をリセットしました"
);


return true;

}
catch(error){

console.error(
  "[Sasoi] 誘技クリア・解放履歴リセット失敗:",
  error
);


return false;

}

}

// ==========================================
// ◎ グローバル公開
// ==========================================

window.getSasoiClearHistory =
getSasoiClearHistory;

window.resetSasoiUnlockHistory =
resetSasoiUnlockHistory;

window.recordSasoiClearResult =
recordSasoiClearResult;

window.checkSasoiUnlockAfterClear =
checkSasoiUnlockAfterClear;

// --------------------------------------------------------------------------------
// 誘技解放コード関連おわり
// --------------------------------------------------------------------------------

