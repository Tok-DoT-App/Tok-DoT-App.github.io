// =====================================================
// SasoiNoMeijin.js
// 誘いの名人 ミニゲーム
// Ver 1.0
// =====================================================

(function(){

"use strict";

// -------------------------------
// CSS追加
// -------------------------------
const style = document.createElement("style");

style.textContent = `

.sasoi-panel {

  width:95%;
  height:160px;

  border-radius:12px;

  box-shadow:
    0 2px 6px rgba(0,0,0,0.15);

  color:#333;

  display:flex;
  flex-direction:column;

  justify-content:center;
  align-items:center;

  box-sizing:border-box;

  font-family:sans-serif;

  position:relative;

  z-index:1;

}


.sasoi-title {

  font-size:18px;
  font-weight:bold;

  margin-bottom:2px;

}


.sasoi-start-btn {

  width:120px;
  height:34px;

  border-radius:18px;

  border:none;

  background:#333;
  color:white;

  font-size:15px;

}


.sasoi-level {

  margin-top:0px;

  font-size:13px;

}


.sasoi-game {

  display:none;

  position:relative;

  width:95%;
  height:160px;

  border-radius:12px;

  background:#D2B24C;

  overflow:hidden;

  box-sizing:border-box;

}


.sasoi-back-btn{

  position:absolute;

  left:50%;
  bottom:2px;

  transform:translateX(-50%);

  width:60px;
  height:18px;

  font-size:14px;

  border:none;

  border-radius:12px;

  background:#ffffff;

  color:#333;

}


/* 電動リール全般 */

.sasoi-rod{

  position:absolute;

  left:39px;

  top:42px;

  display:flex;

  flex-direction:column;

  align-items:center;

  z-index:2;

}

/* 穂先〇 */
.sasoi-tip{

  width:26px;

  height:26px;

  border-radius:50%;

  border:4px solid white;

  background:rgba(255,255,255,0.15);

  box-shadow:0 0 0 1px rgba(255,255,255,0.45);

  display:flex;

  justify-content:center;

  align-items:center;

  box-sizing:border-box;

}


/* 縦線 */

.sasoi-line{

  width:4px;
  height:30px;

  background:
  repeating-linear-gradient(
    to bottom,

    #ffffff 0px,
    #ffffff 5px,

    #ff4d4d 5px,
    #ff4d4d 6px,

    #ffffff 6px,
    #ffffff 11px,

    #222222 11px,
    #222222 12px
  );

}


/* 電動リール本体（くびれ形状） */

.sasoi-weight{

  width:18px;

  height:52px;

  background:
  linear-gradient(
    to right,
    #8f1818,
    #e53935 45%,
    #ff7777
  );

/* 電動リール 横から見た流線型（底面ポッコリ・強調アーチ版） */
clip-path: polygon(
  /* --- 1. 穂先挿入口（上部先端） --- */
  35% 0%,
  65% 0%,

  /* --- 2. スプール周り（肩の最大幅） --- */
  84% 5%,
  95% 15%,
  98% 28%,
  98% 36%,  /* 最幅部 */

  /* --- 3. 中央のライン（絞り込みを緩やかに調整） --- */
  93% 48%,  /* 90% → 93%（幅を保持） */
  88% 60%,  /* 82% → 88%（緩やかに） */
  86% 68%,  /* 80% → 86%（絞りを浅く） */

  /* --- 4. 下部ボディ〜底面（ふっくらしたアーチへスムーズに接続） --- */
  88% 78%,  /* 86% → 88% */
  92% 88%,  /* お尻側の張り出し */
  90% 94%,
  82% 98.5%,
  50% 100%, /* 底面中央の頂点 */
  18% 98.5%,
  10% 94%,
  8% 88%,   /* 左お尻の張り出し */
  12% 78%,  /* 14% → 12% */

  /* --- 5. 左側ライン〜上部（対比） --- */
  14% 68%,  /* 20% → 14%（絞りを浅く） */
  12% 60%,  /* 18% → 12%（緩やかに） */
  7% 48%,   /* 10% → 7%（幅を保持） */

  /* 左肩（スプール最大幅） */
  2% 36%,
  2% 28%,
  5% 15%,
  16% 5%
);

  margin-top:0;


  display:flex;

  flex-direction:column;

  align-items:center;


  box-sizing:border-box;

  padding-top:2px;


  box-shadow:
  inset 0 -2px 4px rgba(0,0,0,.25),
  inset 0 0 6px rgba(255,255,255,.35),
  0 2px 4px rgba(0,0,0,.35);

}


/* 電動リールのスプール */
.sasoi-spool{
  width:14px;
  height:14px;
  min-width:14px;
  min-height:14px;
  aspect-ratio:1 / 1;
  border-radius:50%;
  background:
  radial-gradient(
    circle,
    #d9a441 0%,
    #d9a441 22%,
    #222 25%,
    #222 65%,
    #777 70%,
    #333 100%
  );
  border:1px solid #999;
  box-sizing:border-box;
  flex-shrink:0;

  margin-top:2px;
  margin-bottom:1px;

  /* スイッチの基準点にするため設定 */
  position: relative;
}

/* ロックフリーレバー */
.sasoi-spool::after {
  content: "";
  position: absolute;
  bottom: -3px;        /* ★スプール下部からの距離（位置調整） */
  left: 50%;
  transform: translateX(-50%);

  width: 9px;          /* ★横線の幅 */
  height: 1px;       /* ★横線の太さ */
  background: #1a1a1a; /* スイッチの色（黒） */
  border-radius: 1px;  /* 角に少し丸みを持たせる */
  box-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.5); /* 立体感用の薄い影 */
}


/* 電動リールの表示盤 */
.sasoi-display{
  margin-top:6px;
  flex-shrink:0;

  width:6px;
  height:6px;

  background:#b9ff95;
  border:1px solid #5d8f54;
  border-radius:2px;

  color:#1d2b16;
  font-size:3px;
  font-family:"DSEG7";
  line-height:5px;

  display:flex;
  justify-content:center;
  align-items:center;
  text-align:center;

  box-shadow: inset 0 0 2px rgba(0,0,0,.25);

  /* 台形を正しく背後に配置するための相対設定 */
  position: relative;
  overflow: visible;
}

/* 電動リールの表示盤の「後ろ側」台形 */
.sasoi-display::before {
  content: "";
  position: absolute;

  top: -2px;
  bottom: -6px;
  left: -2px;
  right: -2px;

  background: #1a1a1a;
  z-index: -1;

  clip-path: polygon(
    0% 0%,     /* 左上 */
    100% 0%,   /* 右上 */
    85% 100%,  /* 右下 */
    15% 100%   /* 左下 */
  );
}

/* 電動リールの表示盤の「後ろ側」台形の「さらに後ろ」に敷く白縁用台形 */
.sasoi-display::after {
  content: "";
  position: absolute;

  /* 黒台形より全方向に「0.5px〜1px」大きく広げて白フチにする */
  top: -2.5px;
  bottom: -6.5px;
  left: -2.5px;
  right: -2.5px;

  background: #ffffff; /* 白縁の色 */
  z-index: -2; /* 黒台形のさらに後ろへ配置 */

  /* 白縁用の台形（ほぼ同じ比率） */
  clip-path: polygon(
    0% 0%,
    100% 0%,
    85% 100%,
    15% 100%
  );
}

/* 電動リールの操作ボタン */

.sasoi-button{

  width:2px;
  height:2px;

  border-radius:50%;

  margin-top:1px;
  margin-bottom:1px;

  background:
  radial-gradient(
    circle at 30% 30%,
    #d9ffff,
    #6fdcff 55%,
    #1c90d8 100%
  );

  box-shadow:
    inset 0 1px 1px rgba(255,255,255,.7),
    0 0 2px rgba(0,0,0,.45);

  flex-shrink:0;

}

/* Tok.DoT ロゴ（リール用） */
.sasoi-label {
  margin-top: -8px; /* ★負の値を大きくすると、さらに上に移動します */
  flex-shrink: 0;
}

.sasoi-label .tokdot-name{
  font-family:'BBH Hegarty',sans-serif;
  font-size:8px;
  font-weight:normal;
  letter-spacing:-0.01em;
  color:white;
  line-height:1;
}

.sasoi-label .tokdot-dot{
  color:#FF8C00;
}


/* たたき台 */
.sasoi-black{

  position:absolute;

  left:28px;

  top:95px;

  width:48px;

  height:70px;

  background:#111;

  border-radius:4px;

  z-index:0;

}


/* 流れてくる表示 */

.sasoi-flow{

  position:absolute;

  left:0px;

  top:40px;

  font-size:20px;

  letter-spacing:5px;

  color:white;

  white-space:nowrap;

  z-index:3;

  pointer-events:none;

  will-change:transform,left;

}

.sasoi-flow span{

  position:absolute;

  opacity:1;

  left:0;

}

.sasoi-note-move{

  animation:sasoiNoteMove 2.5s linear forwards;

}


@keyframes sasoiNoteMove{

  from{

    left:310px;

  }

  to{

    left:-40px;

  }

}

@keyframes sasoiPop{

  from{

    opacity:0;

    transform:scale(0.3);

  }


  to{

    opacity:1;

    transform:scale(1);

  }

}


/* 長押し位置 */

.sasoi-touch{

  position:absolute;

  right:22px;

  top:98px;

  width:50px;

  height:50px;

  border-radius:50%;

  border:3px solid white;

  color:white;

  background:#1D3E70;

  display:flex;

  justify-content:center;

  align-items:center;

  font-size:22px;

  z-index:4;

  user-select:none;
  -webkit-user-select:none;

  touch-action:none;

  -webkit-touch-callout:none;


  /* ★追加 */
  -webkit-user-drag:none;
  user-drag:none;

}


/* 穂先横ライン */

.sasoi-horizontal{

  position:absolute;

  left:0;

  width:100%;

  height:1px;

  background:white;

  opacity:0.7;

}

/* 中央の釣り穴ライン */

.sasoi-center-line{

  position:absolute;

  left:0;
  top:30px;

  width:100%;

  height:60px;

  background:#1D3E70;

  z-index:1;

}


/* 中央ライン上下の縁 */

.sasoi-edge{

  position:absolute;

  left:0;

  width:100%;

  height:4px;

  background:#9A9A9A;

  z-index:2;

}


.sasoi-edge.top{

  top:26px;

}


.sasoi-edge.bottom{

  top:88px;

}


/* ゲーム表示全体位置調整 */

.sasoi-rod,
.sasoi-flow {

  transform:translateY(5px);

}

/* 穂先ヒット演出 */

.sasoi-tip.hit{

  animation:sasoiTipShake 0.12s infinite;

}


@keyframes sasoiTipShake{

  0%{
    transform:translateX(0);
  }

  25%{
    transform:translateX(-3px);
  }

  50%{
    transform:translateX(3px);
  }

  75%{
    transform:translateX(-3px);
  }

  100%{
    transform:translateX(0);
  }

}

/* ==========================================
   誘いの名人 デバッグ表示
========================================== */

.sasoi-debug{

  position:absolute;

  top:3px;
  left:5px;

  width:calc(100% - 10px);

  height:18px;

  background:rgba(0,0,0,0.35);

  border-radius:6px;

  color:white;

  font-size:10px;

  font-family:monospace;

  display:flex;

  justify-content:center;

  align-items:center;

  white-space:nowrap;

  z-index:20;

}

/* --------------------------------------------　CSS最後　-------------------------------------------- */

`;

document.head.appendChild(style);


// -------------------------------
// 初期表示生成
// -------------------------------
function initSasoiNoMeijin(){

// =================================
// デバッグ表示 ON/OFF
// true  : 開発表示
// false : 非表示（完成版）
// =================================

const SASOI_DEBUG_MODE = true;





let sasoiTimer = null;

let sasoiPlaying = false;

// -------------------------------
// プレイヤー状態
// -------------------------------

let sasoiAction = "release";

// -------------------------------
// 譜面再生管理
// -------------------------------

let sasoiIndex = 0;

let sasoiPlayTimer = null;

let sasoiStartTime = null;

// -------------------------------
// 現在判定対象の音符
// -------------------------------

let currentSasoiNote = null;

// -------------------------------
// デバッグ表示
// -------------------------------

let sasoiDebugText = {

 player:"RELEASE",

 note:"NONE",

 stop:"NO",

 fish:"OFF"

};

// -------------------------------
// ホールド時間管理
// -------------------------------

let sasoiPressStartTime = null;

// PRESS入力待ち猶予時間
let sasoiPressWaiting = false;

let sasoiHoldTime = 0;

// -------------------------------
// 魚状態管理
// -------------------------------

// ◎が発生しているか
let sasoiFishOn = false;

// 止め成立状態
let sasoiStopReady = false;

// ◎が発生した時間
let sasoiFishTime = null;

// ◎アワセ受付中か
let sasoiBiteWaiting = false;

// ◎アワセ受付開始時間
let sasoiBiteStartTime = null;

// ◎アワセ受付時間
const SASOI_BITE_WINDOW = 700;

// 釣果結果
let sasoiResult = null;


// -------------------------------
// 魚の興味ゲージ
// -------------------------------

// 誘いが成功するほど上昇
let sasoiInterestGauge = 0;

// ゲージ最大値
const SASOI_INTEREST_MAX = 100;

// ◎が発生できる最低ゲージ
const SASOI_INTEREST_REQUIRED = 60;


// 演出中かどうかのフラグ

let sasoiHitAnimating = false;

// -------------------------------
// 譜面データ（基準サンプル）
// -------------------------------
//
// ● = たたき台をトンと叩く
// ○ = 電動リールを一瞬離す
// ― = その状態で静止
// ◎ = 魚のつんつん＋アワセ
//
// ※ ◎は「アタリ」ではなく、
//    ブルブルを感じた瞬間に
//    リールを持ち上げてアワセるイベント
//
// -------------------------------

const sasoiScore = [

  // =====================
  // カウントダウン
  // =====================

  {
    id:1,
    time:0,
    type:"count",
    value:3
  },

  {
    id:2,
    time:1000,
    type:"count",
    value:2
  },

  {
    id:3,
    time:2000,
    type:"count",
    value:1
  },


  // =====================
  // 1回目の誘い
  // ○ → ● → ○ → ● → ○ → ● → ― → ◎
  // =====================

  {
    id:4,
    time:3000,
    type:"release"
  },

  {
    id:5,
    time:3500,
    type:"press"
  },

  {
    id:6,
    time:4000,
    type:"release"
  },

  {
    id:7,
    time:4500,
    type:"press"
  },

  {
    id:8,
    time:5000,
    type:"release"
  },

  {
    id:9,
    time:5500,
    type:"press"
  },

  {
    id:10,
    time:6000,
    type:"hold"
  },

  // 魚のつんつん＋アワセ
  {
    id:11,
    time:7000,
    type:"bite"
  },


  // =====================
  // 2回目の誘い
  // ○ → ● → ○ → ● → ― → ◎
  // =====================

  {
    id:12,
    time:9000,
    type:"release"
  },

  {
    id:13,
    time:9500,
    type:"press"
  },

  {
    id:14,
    time:10000,
    type:"release"
  },

  {
    id:15,
    time:10500,
    type:"press"
  },

  {
    id:16,
    time:11000,
    type:"hold"
  },

  // 魚のつんつん＋アワセ
  {
    id:17,
    time:12000,
    type:"bite"
  },


  // =====================
  // 3回目の誘い
  // ○ → ● → ○ → ● → ○ → ● → ― → ◎
  // =====================

  {
    id:18,
    time:14000,
    type:"release"
  },

  {
    id:19,
    time:14500,
    type:"press"
  },

  {
    id:20,
    time:15000,
    type:"release"
  },

  {
    id:21,
    time:15500,
    type:"press"
  },

  {
    id:22,
    time:16000,
    type:"release"
  },

  {
    id:23,
    time:16500,
    type:"press"
  },

  {
    id:24,
    time:17000,
    type:"hold"
  },

  // 魚のつんつん＋アワセ
  {
    id:25,
    time:18000,
    type:"bite"
  }

];


const area =
document.getElementById(
"SasoiNoMeijinArea"
);


if(!area) return;


// メニュー

area.innerHTML = `

<div class="sasoi-panel" id="sasoiMenu">

  <div class="sasoi-title">
    誘いの名人
  </div>


  <button
  class="sasoi-start-btn"
  id="sasoiStartBtn">

  スタート

  </button>


  <div class="sasoi-level">
    レベル ★☆☆☆☆
  </div>


</div>


<div class="sasoi-game" id="sasoiGame">


<div 
class="sasoi-debug"
id="sasoiDebug">

DEBUG

</div>


  <button
  class="sasoi-back-btn"
  id="sasoiBackBtn">

  戻る

  </button>

<!-- ドーム船の縁 -->
<div class="sasoi-edge top"></div>

<!-- 中央ライン -->
<div class="sasoi-center-line"></div>

<!-- ドーム船の縁 -->
<div class="sasoi-edge bottom"></div>

<!-- 電動リール周り -->
<div class="sasoi-black"></div>

<div class="sasoi-rod">
  <div class="sasoi-tip"></div>
  <div class="sasoi-line"></div>

  
  <div class="sasoi-weight">
    <div class="sasoi-spool"></div>

    <div class="sasoi-display">
      …
    </div>

<div class="sasoi-button"></div>

    <div class="sasoi-label">
      <span class="tokdot-name">
        <span class="tokdot-dot">.</span>D
      </span>
    </div>
  </div>
</div>

<!-- 電動リール周り -->

<div class="sasoi-horizontal top"></div>

<div class="sasoi-horizontal bottom"></div>

<div 
class="sasoi-flow"
id="sasoiFlow">

</div>

<div
class="sasoi-touch"
id="sasoiTouch">

  ○

</div>


</div>

`;


// -------------------------------
// 次の譜面表示
// -------------------------------

function playNextSasoiNote(){


if(
sasoiIndex >= sasoiScore.length
){

console.log(
"譜面終了"
);


// ---------------------------------
// 最終判定
// ---------------------------------

if(sasoiFishOn){

console.log(
"魚が掛かった状態で譜面終了"
);

// ---------------------------------
// 釣れたことを確定
// ---------------------------------

console.log(
"釣れた！"
);

// 魚が掛かった状態を維持
sasoiFishOn = true;

sasoiDebugText.fish =
"ON";

updateSasoiDebug();

// 釣れたメッセージ
if(
typeof showSasoiMessage === "function"
){

showSasoiMessage(
"釣れました！"
);

}

}
else{

console.log(
"魚なしで終了"
);

}


console.log(
"誘い判定終了"
);


// 判定停止

stopSasoiCheck();


return;

}


const note =
sasoiScore[sasoiIndex];

// -------------------------------
// 魚の興味ゲージを増やす
// -------------------------------

function addSasoiInterest(amount){

  sasoiInterestGauge += amount;

  if(
    sasoiInterestGauge >
    SASOI_INTEREST_MAX
  ){

    sasoiInterestGauge =
      SASOI_INTEREST_MAX;

  }

  console.log(
    "魚の興味ゲージ:",
    sasoiInterestGauge
  );

}


// 現在の譜面を表示

createSasoiNote(note);


sasoiIndex++;


// 次の音符までの間隔計算

let nextDelay = 500;

if(
sasoiIndex < sasoiScore.length
){

nextDelay =
sasoiScore[sasoiIndex].time
-
note.time;

}
else{

// 最後の音符は画面を流れ切るまで待つ
nextDelay = 3000;

}

sasoiPlayTimer =
setTimeout(
playNextSasoiNote,
nextDelay
);


}


// -------------------------------
// デバッグ表示用
// -------------------------------



function updateSasoiDebug(){


if(!SASOI_DEBUG_MODE){

  return;

}


const debug =
document.getElementById(
"sasoiDebug"
);


if(!debug){

  return;

}


debug.innerText =

"P:"
+
sasoiDebugText.player

+
"   N:"
+
sasoiDebugText.note

+
"   S:"
+
sasoiDebugText.stop

+
"   F:"
+
sasoiDebugText.fish;


}


// -------------------------------
// 音符生成
// -------------------------------

function createSasoiNote(note){

if(SASOI_DEBUG_MODE){

  sasoiDebugText.note =
  note.type.toUpperCase();

  updateSasoiDebug();

}

const flow =
document.getElementById(
"sasoiFlow"
);


if(!flow) return;



const span =
document.createElement("span");


// 音符情報を保存

span.dataset.id =
note.id;

span.dataset.type =
note.type;


// 種類判定

if(note.type==="count"){


span.innerText =
note.value;


}


else if(note.type==="press"){

 span.innerText =
 "●";

}


else if(note.type==="hold"){

 span.innerText =
 "―";

}


else if(note.type==="release"){

 span.innerText =
 "○";

}

else if(note.type==="bite"){

 span.innerText =
 "◎";

}


// 初期位置

span.style.left =
"0px";


span.dataset.hit = "false";


// 移動開始

span.classList.add(
"sasoi-note-move"
);

flow.appendChild(span);


// 画面外へ出たら削除

setTimeout(()=>{

  span.remove();

},3000);


console.log(
 "生成音符",
 span.dataset.id,
 span.dataset.type
);

}


// =================================
// 誘い成功による興味ゲージ加算
// =================================
//
// 誘いの動作が成功するたびに
// 魚の興味ゲージを上げる。
//
// release / press / hold など、
// 成功した誘い動作から呼び出す。
//
// ゲージが一定値まで上がると
// ◎（つんつん）が発生可能になる。
// =================================

function addSasoiInterest(){

  // ---------------------------------
  // 1回の成功で増える興味ゲージ
  // ---------------------------------

  const addValue = 20;


  // ---------------------------------
  // 興味ゲージ加算
  // ---------------------------------

  sasoiInterestGauge += addValue;


  // ---------------------------------
  // 最大値を超えないようにする
  // ---------------------------------

  if(
    sasoiInterestGauge >
    SASOI_INTEREST_MAX
  ){

    sasoiInterestGauge =
      SASOI_INTEREST_MAX;

  }


  // ---------------------------------
  // デバッグログ
  // ---------------------------------

  console.log(
    "興味ゲージ上昇",
    sasoiInterestGauge,
    "/",
    SASOI_INTEREST_MAX
  );

}


function checkSasoiHit(){

  const tip =
    document.querySelector(".sasoi-tip");

  const flow =
    document.getElementById("sasoiFlow");

  if(!tip || !flow) return;


  const tipRect =
    tip.getBoundingClientRect();


  // =================================
  // 流れている音符を取得
  // =================================

  const notes =
    flow.querySelectorAll("span");

  let nearestNote = null;
  let nearestDistance = Infinity;


  notes.forEach((note)=>{

    // 成功済みは無視
    if(note.dataset.done === "1"){
      return;
    }

    const rect =
      note.getBoundingClientRect();

    // 見た目の中心同士で距離を測る
    const noteCenter =
      rect.left + rect.width / 2;

    const tipCenter =
      tipRect.left + tipRect.width / 2;

    const distance =
      Math.abs(
        noteCenter - tipCenter
      );

    if(distance < nearestDistance){

      nearestDistance = distance;
      nearestNote = note;

    }

  });


  // =================================
  // 音符が無い場合
  // =================================

  if(!nearestNote){
    return;
  }


  // =================================
  // count は判定対象外
  // =================================

  if(
    nearestNote.dataset.type === "count"
  ){
    return;
  }


  console.log(
    "最近音符",
    nearestNote.dataset.id,
    nearestNote.dataset.type,
    "距離",
    nearestDistance
  );


  // =================================
  // 判定範囲
  // =================================

  let hitRange = 20;


  // ● press / hold / release
  if(
    nearestNote.dataset.type === "press" ||
    nearestNote.dataset.type === "hold" ||
    nearestNote.dataset.type === "release"
  ){

    hitRange = 20;

  }


  // ◎ bite
  if(
    nearestNote.dataset.type === "bite"
  ){

    // ◎は中心精度を上げる
    hitRange = 10;

  }


  // =================================
  // 判定
  // =================================

  if(
    nearestDistance < hitRange &&
    nearestNote.dataset.hit !== "true"
  ){


    // =================================
    // PRESS
    // =================================

    if(
      nearestNote.dataset.type === "press" &&
      sasoiAction !== "press"
    ){

      // ノーツ中心付近まで来たら
      // PRESS待機にする
      if(
        nearestDistance < 18
      ){

        console.log(
          "PRESS待機"
        );

        return;

      }


      console.log(
        "press失敗（押していない）"
      );

      return;

    }


    // =================================
    // RELEASE
    // =================================

    if(
      nearestNote.dataset.type === "release" &&
      sasoiAction !== "release"
    ){

      // =================================
      // ルールA
      // 魚が乗った後、合わせ失敗
      // =================================

      if(false && sasoiFishOn){

        console.log(
          "魚が掛かったまま離せませんでした"
        );

        sasoiFishOn = false;

        sasoiFishTime = null;

        if(
          typeof showSasoiMessage === "function"
        ){

          showSasoiMessage(
            "あっ…魚が逃げてしまいました"
          );

        }

        stopSasoiCheck();

      }

      return;

    }


    // =================================
    // BITE
    // =================================

    // biteは魚が乗る判定なので
    // 入力不要

    if(
      nearestNote.dataset.type === "bite"
    ){

      console.log(
        "BITE判定"
      );

    }


    // =================================
    // 成功処理
    // =================================

    console.log(
      "成功",
      nearestNote.dataset.type
    );


    nearestNote.dataset.done = "1";
    nearestNote.dataset.hit = "true";


    // =================================
    // 誘い成功による興味ゲージ
    // =================================
    //
    // press / release / hold の成功で
    // それぞれ1回だけ加算する
    //
    // ◎ biteでは加算しない
    //
    // ★重要
    // hold専用処理ではゲージを加算しない
    // → 二重加算防止
    // =================================

    if(
      nearestNote.dataset.type === "press"
    ){

      addSasoiInterest(20);

    }


    if(
      nearestNote.dataset.type === "release"
    ){

      addSasoiInterest(10);

    }


    if(
      nearestNote.dataset.type === "hold"
    ){

      addSasoiInterest(15);

    }


    // =================================
    // HOLD
    // =================================

    if(
      nearestNote.dataset.type === "hold"
    ){

      // ---------------------------------
      // 押しっぱなし中だけ成功
      // ---------------------------------

      if(
        sasoiAction !== "press"
      ){

        console.log(
          "hold失敗（押していない）"
        );

        return;

      }


      console.log(
        "成功 hold"
      );


      // ---------------------------------
      // 止め成立
      // ---------------------------------

      sasoiStopReady = true;

      console.log(
        "止め成立フラグON"
      );


      sasoiDebugText.stop =
        "READY";

      updateSasoiDebug();

    }


    // =================================
    // PRESS開始時間
    // =================================

    if(
      nearestNote.dataset.type === "press"
    ){

      sasoiPressStartTime =
        Date.now();

      sasoiStopReady = false;

      console.log(
        "押し開始時間記録"
      );

    }


    // =================================
    // RELEASE
    // =================================

    if(
      nearestNote.dataset.type === "release"
    ){

      // ---------------------------------
      // 押していた時間を計測
      // ---------------------------------

      if(
        sasoiPressStartTime
      ){

        sasoiHoldTime =
          Date.now()
          -
          sasoiPressStartTime;


        console.log(
          "止め時間:",
          sasoiHoldTime,
          "ms"
        );


        sasoiPressStartTime =
          null;

      }


      // ---------------------------------
      // 魚が乗った後のrelease失敗
      // ---------------------------------

      if(
        sasoiFishOn &&
        sasoiAction !== "release"
      ){

        console.log(
          "魚が掛かった状態で離せませんでした"
        );

        sasoiFishOn = false;

        sasoiFishTime = null;

        sasoiStopReady = false;


        if(
          typeof showSasoiMessage === "function"
        ){

          showSasoiMessage(
            "あっ…魚が逃げてしまいました"
          );

        }

        return;

      }

    }


    // =================================
    // ◎ 魚のつんつん＋アワセ待ち
    // =================================
    //
    // ◎は「魚が掛かった」ではない。
    //
    // 魚がエサをつんつん
    // ↓
    // 穂先ブルブル
    // ↓
    // プレイヤーがアワセ
    // ↓
    // 魚が掛かったか判定
    //
    // =================================

    if(
      nearestNote.dataset.type === "bite"
    ){

      console.log(
        "◎ つんつん発生"
      );


      // ---------------------------------
      // 興味ゲージ不足
      // ---------------------------------

      if(
        sasoiInterestGauge <
        SASOI_INTEREST_REQUIRED
      ){

        console.log(
          "興味ゲージ不足",
          sasoiInterestGauge,
          "/",
          SASOI_INTEREST_REQUIRED
        );


        // ◎を消費
        nearestNote.dataset.done =
          "1";

        nearestNote.dataset.hit =
          "true";

        return;

      }


      // ---------------------------------
      // 興味ゲージ十分
      // ---------------------------------

      console.log(
        "興味ゲージ十分 → ◎発生"
      );


      // ---------------------------------
      // 魚のつんつん状態
      // ---------------------------------

      // ここではまだ
      // 「魚が掛かった」ではない

      sasoiFishOn = false;

      sasoiFishTime = null;


      // ---------------------------------
      // ◎アワセ受付開始
      // ---------------------------------

      sasoiBiteWaiting = true;

      sasoiBiteStartTime =
        Date.now();


      // ---------------------------------
      // デバッグ表示
      // ---------------------------------

      sasoiDebugText.fish =
        "BITE";

      updateSasoiDebug();


      console.log(
        "魚がつんつんしている状態になりました"
      );


      // ---------------------------------
      // 穂先ブルブル
      // ---------------------------------

      if(
        !sasoiHitAnimating
      ){

        sasoiHitAnimating =
          true;


        tip.classList.add(
          "hit"
        );


        setTimeout(()=>{

          tip.classList.remove(
            "hit"
          );

          sasoiHitAnimating =
            false;

        },350);

      }


      // ---------------------------------
      // ◎を消費
      // ---------------------------------

      nearestNote.dataset.done =
        "1";

      nearestNote.dataset.hit =
        "true";


      // ---------------------------------
      // 興味ゲージをリセット
      // ---------------------------------

      sasoiInterestGauge =
        0;

      console.log(
        "興味ゲージリセット"
      );

    }

  }

}


// =================================
// ◎ アワセ判定
// =================================

function checkSasoiBiteAction(){

// ◎が発生していない
if(!sasoiBiteWaiting){
    return;
}

// ◎発生からの経過時間
const elapsed =
    Date.now() -
    sasoiBiteStartTime;

// ---------------------------------
// アワセ成功
// ---------------------------------

if(
    sasoiAction === "release" &&
    elapsed <= SASOI_BITE_WINDOW
){

    console.log(
        "◎アワセ成功",
        elapsed,
        "ms"
    );

    console.log(
        "魚が掛かった！"
    );

    // 魚が掛かった
    sasoiFishOn = true;

    // ◎アワセ待ちは終了
    sasoiBiteWaiting = false;

    sasoiBiteStartTime = null;

    // 魚が掛かった時間
    sasoiFishTime = Date.now();

    // デバッグ表示
    sasoiDebugText.fish = "ON";

    updateSasoiDebug();

    if(
        typeof showSasoiMessage === "function"
    ){

        showSasoiMessage(
            "魚が掛かりました！"
        );

    }

    return;
}

// ---------------------------------
// ◎発生から受付時間を超えた
// ---------------------------------

if(
    elapsed >
    SASOI_BITE_WINDOW
){

    console.log(
        "◎アワセ失敗",
        elapsed,
        "ms"
    );

    console.log(
        "魚が逃げた..."
    );

    sasoiFishOn = false;

    sasoiBiteWaiting = false;

    sasoiBiteStartTime = null;

    sasoiFishTime = null;

    sasoiDebugText.fish = "OFF";

    updateSasoiDebug();

    if(
        typeof showSasoiMessage === "function"
    ){

        showSasoiMessage(
            "あっ…魚が逃げてしまいました"
        );

    }

    return;
}

}



function stopSasoiCheck(){


  sasoiPlaying = false;


  if(sasoiTimer){


    clearInterval(sasoiTimer);


    sasoiTimer = null;


    console.log("誘い判定終了");

  }


}


// -------------------------------
// 長押しボタン
// -------------------------------

const sasoiTouch =
document.getElementById("sasoiTouch");


if(sasoiTouch){


sasoiTouch.addEventListener(
"pointerdown",
(e)=>{

  e.preventDefault();

  sasoiTouch.setPointerCapture(
    e.pointerId
  );


  // =================================
  // ◎発生中
  // =================================

  if(
    sasoiBiteWaiting
  ){

    const elapsed =
      Date.now() -
      sasoiBiteStartTime;


    console.log(
      "◎アワセ入力",
      elapsed,
      "ms"
    );


    // ---------------------------------
    // アワセ成功
    // ---------------------------------

    if(
      elapsed <=
      SASOI_BITE_WINDOW
    ){

      console.log(
        "◎アワセ成功"
      );


      // 時間による評価
      if(elapsed <= 200){

        console.log(
          "大成功！"
        );

        sasoiResult =
          "PERFECT";

      }
      else if(elapsed <= 450){

        console.log(
          "釣れた！"
        );

        sasoiResult =
          "GOOD";

      }
      else{

        console.log(
          "ギリギリ成功！"
        );

        sasoiResult =
          "LATE";

      }


      // 魚状態解除

      sasoiFishOn = false;

      sasoiBiteWaiting = false;

      sasoiBiteStartTime = null;

      sasoiFishTime = null;

      sasoiStopReady = false;


      sasoiDebugText.fish =
        "OFF";

      updateSasoiDebug();


      // ---------------------------------
      // 穂先ブルブル停止
      // ---------------------------------

      const tip =
        document.querySelector(
          ".sasoi-tip"
        );

      if(tip){

        tip.classList.remove(
          "hit"
        );

      }

      sasoiHitAnimating =
        false;


      if(
        typeof showSasoiMessage ===
        "function"
      ){

        if(
          sasoiResult === "PERFECT"
        ){

          showSasoiMessage(
            "ナイスアワセ！"
          );

        }
        else{

          showSasoiMessage(
            "魚が掛かりました！"
          );

        }

      }


      return;

    }

  }


  // =================================
  // 通常の誘い
  // =================================

  sasoiAction =
    "press";

  sasoiDebugText.player =
    "PRESS";

  updateSasoiDebug();

  console.log(
    "PRESS"
  );

}
);



function releaseAction(e){

if(e){
    e.preventDefault();
}

sasoiAction = "release";

sasoiDebugText.player = "RELEASE";

updateSasoiDebug();

console.log(
    "RELEASE"
);

// ---------------------------------
// ◎アワセ判定
// ---------------------------------
//
// ◎が発生している場合、
// RELEASEした瞬間にアワセ判定を行う。
// ---------------------------------

if(sasoiBiteWaiting){

    console.log(
        "◎ RELEASE → アワセ判定"
    );

    checkSasoiBiteAction();

}

}




  sasoiTouch.addEventListener(
    "pointerup",
    releaseAction
  );


  sasoiTouch.addEventListener(
    "pointercancel",
    releaseAction
  );


  sasoiTouch.addEventListener(
    "pointerleave",
    releaseAction
  );


}

// スタート

document
.getElementById("sasoiStartBtn")
.onclick=function(){


document
.getElementById("sasoiMenu")
.style.display="none";


document
.getElementById("sasoiGame")
.style.display="block";

sasoiPlaying = true;


sasoiIndex = 0;


// 魚状態リセット

sasoiFishOn = false;

sasoiFishTime = null;


// ★追加
// 止め成立リセット

sasoiStopReady = false;


if(sasoiPlayTimer){

clearTimeout(
sasoiPlayTimer
);

sasoiPlayTimer=null;

}


const flow =
document.getElementById("sasoiFlow");


flow.innerHTML="";


flow.classList.remove("show");


// ポンポン表示＋同時移動
setTimeout(()=>{

  playNextSasoiNote();

},300);


sasoiTimer =
setInterval(()=>{

  checkSasoiHit();

  checkSasoiBiteAction();

},100);



};



// 戻る

document
.getElementById("sasoiBackBtn")
.onclick=function(){


stopSasoiCheck();

if(sasoiPlayTimer){

 clearTimeout(sasoiPlayTimer);

 sasoiPlayTimer=null;

}

document
.getElementById("sasoiGame")
.style.display="none";


document
.getElementById("sasoiMenu")
.style.display="flex";


};


}


// -------------------------------
// 起動
// -------------------------------

document.addEventListener(
  "DOMContentLoaded",
  function(){

    initSasoiNoMeijin();



    // -------------------------------
    // 誘いの名人 右クリック禁止
    // -------------------------------

    document.addEventListener(
      "contextmenu",
      function(e){

        if(
          e.target.closest(
            "#SasoiNoMeijinArea"
          )
        ){

          e.preventDefault();

        }

      }
    );



    // 誘いの名人 ON/OFF

    const btn =
    document.getElementById(
      "sasoiToggleBtn"
    );


    const area =
    document.getElementById(
      "SasoiNoMeijinArea"
    );


    if(btn && area){


      const saved =
      localStorage.getItem(
        "sasoiNoMeijinEnabled"
      );


      if(saved === "false"){

        btn.checked = false;

        area.style.display="none";


      }else{

        btn.checked = true;

        area.style.display="flex";

      }



      btn.onchange=function(){


        if(this.checked){


          area.style.display="flex";


          localStorage.setItem(
            "sasoiNoMeijinEnabled",
            "true"
          );


        }else{


          area.style.display="none";


          localStorage.setItem(
            "sasoiNoMeijinEnabled",
            "false"
          );


        }


      };


    }


  }
);


})();