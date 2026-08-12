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

  top:5px;
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


/* ==========================================
   誘いの名人 判定表示
========================================== */

.sasoi-judgement-display{

  position:
    absolute;

  left:
    calc(39px + 13px);

  top:
    8px;

  transform:
    translateX(-50%);

  z-index:
    100;

  font-size:
    13px;

  font-weight:
    900;

  letter-spacing:
    1px;

  line-height:
    1;

  text-align:
    center;

  white-space:
    nowrap;

  pointer-events:
    none;

  color:
    white;

  text-shadow:
    0 1px 2px
    rgba(0,0,0,0.5);

}


/* ==========================================
   PERFECT
========================================== */

.sasoi-judgement-display.perfect{

  font-size:
    13px;

}


/* ==========================================
   GOOD
========================================== */

.sasoi-judgement-display.good{

  font-size:
    13px;

}


/* ==========================================
   BAD
========================================== */

.sasoi-judgement-display.bad{

  font-size:
    12px;

}


/* ==========================================
   MISS
========================================== */

.sasoi-judgement-display.miss{

  font-size:
    12px;

}


/* ==========================================
   ○・ー 成功
========================================== */

.sasoi-judgement-display.ok{

  font-size:
    13px;

}


/* ==========================================
   ○・ー 失敗
========================================== */

.sasoi-judgement-display.ng{

  font-size:
    13px;

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

let sasoiBiteActionAtStart = null;

let sasoiBiteReleasePending = false;

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
// 譜面データ（シンプル・ピッチアップ版）
// -------------------------------
//
// 321
//
// ○●○●○●ー
// ○●○●○●ー
// ○●○●○●ーー
//
// ◎
//
// ※ 基本パターンは変更せず、
//    音符間隔を500ms → 400msにして
//    全体のピッチを上げている。
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
  // 1セット目
  // ○●○●○●ー
  // =====================

  {
    id:4,
    time:3000,
    type:"release"
  },

  {
    id:5,
    time:3400,
    type:"press"
  },

  {
    id:6,
    time:3800,
    type:"release"
  },

  {
    id:7,
    time:4200,
    type:"press"
  },

  {
    id:8,
    time:4600,
    type:"release"
  },

  {
    id:9,
    time:5000,
    type:"press"
  },

  {
    id:10,
    time:5400,
    type:"hold"
  },


  // =====================
  // 2セット目
  // ○●○●○●ー
  // =====================

  {
    id:11,
    time:6200,
    type:"release"
  },

  {
    id:12,
    time:6600,
    type:"press"
  },

  {
    id:13,
    time:7000,
    type:"release"
  },

  {
    id:14,
    time:7400,
    type:"press"
  },

  {
    id:15,
    time:7800,
    type:"release"
  },

  {
    id:16,
    time:8200,
    type:"press"
  },

  {
    id:17,
    time:8600,
    type:"hold"
  },


  // =====================
  // 3セット目
  // ○●○●○●ーー
  // =====================

  {
    id:18,
    time:9400,
    type:"release"
  },

  {
    id:19,
    time:9800,
    type:"press"
  },

  {
    id:20,
    time:10200,
    type:"release"
  },

  {
    id:21,
    time:10600,
    type:"press"
  },

  {
    id:22,
    time:11000,
    type:"release"
  },

  {
    id:23,
    time:11400,
    type:"press"
  },

  {
    id:24,
    time:11800,
    type:"hold"
  },

  {
    id:25,
    time:12200,
    type:"hold"
  },


  // =====================
  // 最後の ◎
  // =====================

  {
    id:26,
    time:13000,
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

<div
  id="sasoiJudgementDisplay"
  class="sasoi-judgement-display"
>
  --
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
// 現在の譜面を表示
// -------------------------------

createSasoiNote(note);

sasoiIndex++;


// -------------------------------
// 次の音符までの間隔計算
// -------------------------------
//
// 譜面の time を基準にする。
// 例：
// 3000 → 3500 = 500ms
// 3500 → 4000 = 500ms
// 4000 → 4500 = 500ms
//
// これにより、譜面データの time を
// そのまま音符のピッチ調整に使える。
//

let nextDelay = 500;


if(
  sasoiIndex < sasoiScore.length
){

  const nextNote =
    sasoiScore[sasoiIndex];

  nextDelay =
    nextNote.time -
    note.time;


  // 念のため0以下にはしない
  if(
    nextDelay < 1
  ){

    nextDelay = 1;

  }

}
else{

  // -------------------------------
  // 最後の音符
  // -------------------------------
  //
  // 最後の音符が画面を流れ切るまで待つ
  //

  nextDelay = 3000;

}


// -------------------------------
// 次の音符を生成
// -------------------------------

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
// 実際にユーザーが誘い操作を成功させた場合のみ
// 魚の興味ゲージを上げる。
//
// release / press / hold の成功から呼び出す。
// bite では呼び出さない。
// =================================

function addSasoiInterest(){

  // ---------------------------------
  // 1回の誘い成功で増える量
  // ---------------------------------

  const addValue = 3;

  // ---------------------------------
  // 興味ゲージ加算
  // ---------------------------------

  sasoiInterestGauge += addValue;

  // ---------------------------------
  // 最大値制限
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

function getSasoiXJudgement(note){

  if(!note){
    return null;
  }

  const tip =
    document.querySelector(
      ".sasoi-tip"
    );

  if(!tip){
    return null;
  }

  const noteRect =
    note.getBoundingClientRect();

  const tipRect =
    tip.getBoundingClientRect();


  // =================================
  // X軸中心
  // =================================

  const noteCenterX =
    noteRect.left +
    noteRect.width / 2;

  const tipCenterX =
    tipRect.left +
    tipRect.width / 2;


  // =================================
  // X方向の差
  // =================================

  const differenceX =
    noteCenterX -
    tipCenterX;


  const distanceX =
    Math.abs(
      differenceX
    );


  // =================================
  // 早い・遅い
  // =================================
  //
  // 音符が右側
  // → まだ穂先に到達していない
  // → EARLY
  //
  // 音符が左側
  // → 穂先を通り過ぎている
  // → LATE
  //
  // =================================

  let timing =
    "PERFECT";


  if(
    differenceX > 0
  ){

    timing =
      "EARLY";

  }else if(
    differenceX < 0
  ){

    timing =
      "LATE";

  }


  // =================================
  // 3段階判定
  // =================================

  let judgement =
    "MISS";


  if(
    distanceX <= 8
  ){

    judgement =
      "PERFECT";

  }else if(
    distanceX <= 18
  ){

    judgement =
      "GOOD";

  }else if(
    distanceX <= 30
  ){

    judgement =
      "BAD";

  }else{

    judgement =
      "MISS";

  }


  // =================================
  // PERFECTの場合
  // =================================

  if(
    judgement === "PERFECT"
  ){

    timing =
      "";

  }


  // =================================
  // 表示用文字列
  // =================================

  let display =
    judgement;


  if(
    timing
  ){

    display +=
      " " +
      timing;

  }


  // =================================
  // デバッグ
  // =================================

  console.log(
    "X軸判定",
    display,
    "X差:",
    differenceX,
    "距離:",
    distanceX
  );


  return {

    judgement:
      judgement,

    timing:
      timing,

    differenceX:
      differenceX,

    distanceX:
      distanceX,

    display:
      display

  };

}


function showSasoiXJudgement(result){

  const display =
    document.getElementById(
      "sasoiJudgementDisplay"
    );

  if(
    !display ||
    !result
  ){

    return;

  }


  // =================================
  // ●の判定結果だけ表示
  // =================================

  display.textContent =
    result.judgement;


  // =================================
  // 表示クラスをリセット
  // =================================

  display.className =
    "sasoi-judgement-display";


  // =================================
  // PERFECT / GOOD / BAD / MISS
  // =================================

  display.classList.add(
    result.judgement.toLowerCase()
  );


  // =================================
  // デバッグログ
  // =================================

  console.log(
    "画面判定表示:",
    result.judgement
  );


  // =================================
  // 前回の消去タイマーを解除
  // =================================

  clearTimeout(
    showSasoiXJudgement.timer
  );


  // =================================
  // 一定時間後に -- に戻す
  // =================================

  showSasoiXJudgement.timer =
    setTimeout(()=>{

      display.textContent =
        "--";

      display.className =
        "sasoi-judgement-display";

    },800);

}

function showSasoiActionJudgement(result){

  const display =
    document.getElementById(
      "sasoiJudgementDisplay"
    );

  if(
    !display ||
    !result
  ){

    return;

  }


  // =================================
  // ○・ー専用表示
  // =================================

  display.textContent =
    result;


  // =================================
  // 表示クラスをリセット
  // =================================

  display.className =
    "sasoi-judgement-display";


  // =================================
  // OK / NG
  // =================================

  display.classList.add(
    result.toLowerCase()
  );


  // =================================
  // デバッグログ
  // =================================

  console.log(
    "○・ー判定表示:",
    result
  );


  // =================================
  // 前回の消去タイマーを解除
  // =================================

  clearTimeout(
    showSasoiActionJudgement.timer
  );


  // =================================
  // 一定時間後に -- に戻す
  // =================================

  showSasoiActionJudgement.timer =
    setTimeout(()=>{

      display.textContent =
        "--";

      display.className =
        "sasoi-judgement-display";

    },800);

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
let nearestDifferenceX = 0;

notes.forEach((note)=>{

// 成功済みは無視
if(note.dataset.done === "1"){
return;
}

const rect =
note.getBoundingClientRect();

// =================================
// X軸中心だけで判定
// =================================

const noteCenter =
rect.left +
rect.width / 2;

const tipCenter =
tipRect.left +
tipRect.width / 2;

// =================================
// X方向の差
// =================================
//
// プラス
// → 音符が右側
// → EARLY
//
// マイナス
// → 音符が左側
// → LATE
//
// =================================

const differenceX =
noteCenter -
tipCenter;

const distance =
Math.abs(
differenceX
);

if(
distance <
nearestDistance
){

nearestDistance =
distance;

nearestNote =
note;

nearestDifferenceX =
differenceX;

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
// 音符種類
// =================================

const noteType =
nearestNote.dataset.type;

// =================================
// ● press / ◎ bite
// のみ距離判定を使用
// =================================

const useDistanceJudgement =
noteType === "press" ||
noteType === "bite";

// =================================
// X軸4段階判定
// =================================
//
// 距離判定を使用するのは
//
// ● press
// ◎ bite
//
// のみ。
//
// 穂先〇の直径 = 26px
// 穂先〇の半径 = 13px
//
// 0～4px
// PERFECT
//
// 4～8px
// GOOD
//
// 8～13px
// BAD
//
// 13px超
// MISS
//
// =================================

let xJudgement =
  "MISS";

let xTiming =
  "";

let xJudgementText =
  "";

// =================================
// 距離判定対象の場合
// =================================

if(
  useDistanceJudgement
){

if(
nearestDistance <= 4
){

  xJudgement =
    "PERFECT";

}else if(
nearestDistance <= 8
){

  xJudgement =
    "GOOD";

}else if(
nearestDistance <= 13
){

  xJudgement =
    "BAD";

}else{

  xJudgement =
    "MISS";

}

  // =================================
  // EARLY / LATE
  // =================================
  //
  // 中心より右側
  // → EARLY
  //
  // 中心より左側
  // → LATE
  //
  // PERFECTでも表示する。
  //
  // =================================

  if(
    nearestDifferenceX > 0
  ){

    xTiming =
      "EARLY";

  }else if(
    nearestDifferenceX < 0
  ){

    xTiming =
      "LATE";

  }

  // =================================
  // 表示文字
  // =================================

  xJudgementText =
    xJudgement;

  if(
    xTiming
  ){

    xJudgementText +=
      " " +
      xTiming;

  }

  // =================================
  // X軸判定ログ
  // =================================

  console.log(
    "X軸判定:",
    xJudgementText,
    "差:",
    nearestDifferenceX.toFixed(1),
    "px",
    "距離:",
    nearestDistance.toFixed(1),
    "px"
  );

  // =================================
  // 画面表示
  // =================================

  if(
    typeof showSasoiXJudgement ===
    "function"
  ){

    showSasoiXJudgement({

      judgement:
        xJudgement,

      timing:
        xTiming,

      differenceX:
        nearestDifferenceX,

      distanceX:
        nearestDistance,

      display:
        xJudgementText

    });

  }

}

// =================================
// 現在の実際の判定
// =================================
//
// ● press
// ◎ bite
//
// のみ距離を使う。
//
// ー hold
// ○ release
//
// は距離による成功判定をしない。
//
// =================================

// =================================
// PRESS
// =================================

if(
noteType === "press"
){

// ---------------------------------
// ● PRESSの実際の判定範囲
// ---------------------------------
//
// ●だけは中心からの距離を使用。
//
// 中心通過前
// → EARLY
//
// 中心通過後
// → LATE
//
// どちら側からでも
// 20px以内なら操作判定対象。
//
// ---------------------------------

if(
nearestDistance >= 13 ||
nearestNote.dataset.hit === "true"
){

return;

}

// ---------------------------------
// 押していない場合
// ---------------------------------

if(
sasoiAction !== "press"
){

// ノーツ中心付近まで来たら
// PRESS待機にする

if(
  nearestDistance < 13
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

// ---------------------------------
// PRESS成功
// ---------------------------------

console.log(
"成功 press"
);

// ---------------------------------
// 成功済みにする
// ---------------------------------

nearestNote.dataset.done =
"1";

nearestNote.dataset.hit =
"true";

// ---------------------------------
// 興味ゲージ加算
// ---------------------------------

addSasoiInterest();

// ---------------------------------
// 押し開始時間記録
// ---------------------------------

sasoiPressStartTime =
Date.now();

sasoiStopReady =
false;

console.log(
"押し開始時間記録"
);

return;

}

// =================================
// HOLD
// =================================
//
// ー hold は
// 「中心から何px離れているか」
// では判定しない。
//
// 押している状態だけを確認する。
//
// =================================

if(
noteType === "hold"
){

// ---------------------------------
// すでに処理済みなら終了
// ---------------------------------

if(
nearestNote.dataset.hit === "true"
){

return;

}

// ---------------------------------
// 押しっぱなし中だけ成功
// ---------------------------------

if(
  sasoiAction !== "press"
){

  console.log(
    "hold失敗（押していない）"
  );


  showSasoiActionJudgement(
    "NG"
  );


  return;

}

// ---------------------------------
// HOLD成功
// ---------------------------------

console.log(
"成功 hold"
);

showSasoiActionJudgement(
  "OK"
);

// ---------------------------------
// 成功済みにする
// ---------------------------------

nearestNote.dataset.done =
"1";

nearestNote.dataset.hit =
"true";

// ---------------------------------
// 興味ゲージ加算
// ---------------------------------

addSasoiInterest();

// ---------------------------------
// 止め成立
// ---------------------------------

sasoiStopReady =
true;

console.log(
"止め成立フラグON"
);

sasoiDebugText.stop =
"READY";

updateSasoiDebug();

return;

}

// =================================
// RELEASE
// =================================
//
// ○ release は
// 「中心から何px離れているか」
// では判定しない。
//
// 離している状態を確認する。
//
// =================================

if(
noteType === "release"
){

// ---------------------------------
// すでに処理済みなら終了
// ---------------------------------

if(
nearestNote.dataset.hit === "true"
){

return;

}

// ---------------------------------
// 魚が掛かった後のrelease失敗
// ---------------------------------

if(
sasoiFishOn &&
sasoiAction !== "release"
){

console.log(
  "魚が掛かった状態で離せませんでした"
);

sasoiFishOn =
  false;

sasoiFishTime =
  null;

sasoiStopReady =
  false;

if(
  typeof showSasoiMessage ===
  "function"
){

  showSasoiMessage(
    "あっ…魚が逃げてしまいました"
  );

}

return;

}

// ---------------------------------
// 通常のrelease入力確認
// ---------------------------------

if(
  sasoiAction !== "release"
){

  console.log(
    "release失敗（離していない）"
  );


  showSasoiActionJudgement(
    "NG"
  );


  return;

}

// ---------------------------------
// RELEASE成功
// ---------------------------------

console.log(
"成功 release"
);

showSasoiActionJudgement(
  "OK"
);

// ---------------------------------
// 成功済みにする
// ---------------------------------

nearestNote.dataset.done =
"1";

nearestNote.dataset.hit =
"true";

// ---------------------------------
// 興味ゲージ加算
// ---------------------------------

addSasoiInterest();

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

return;

}

// =================================
// BITE
// =================================
//
// ◎ bite は今回変更しない。
//
// 距離判定は現在どおり使用する。
// 興味ゲージ → ◎発生 → アワセ待機
// の流れも維持する。
//
// =================================

if(
noteType === "bite"
){

// ---------------------------------
// ◎の判定範囲
// ---------------------------------

if(
nearestDistance >= 10 ||
nearestNote.dataset.hit === "true"
){

return;

}

console.log(
"BITE判定"
);

// ---------------------------------
// 興味ゲージ不足
// ---------------------------------

if(
sasoiInterestGauge <
SASOI_INTEREST_REQUIRED
){

console.log(
  "BITE：興味ゲージ不足",
  sasoiInterestGauge,
  "/",
  SASOI_INTEREST_REQUIRED
);

nearestNote.dataset.done =
  "1";

nearestNote.dataset.hit =
  "true";

sasoiBiteWaiting =
  false;

sasoiBiteStartTime =
  null;

sasoiBiteActionAtStart =
  null;

sasoiBiteReleasePending =
  false;

return;

}

// ---------------------------------
// 興味ゲージ十分
// ---------------------------------

console.log(
"BITE：興味ゲージ十分"
);

// =================================
// ◎ つんつん発生
// =================================

console.log(
"◎ つんつん発生"
);

// ---------------------------------
// 魚はまだ掛かっていない
// ---------------------------------

sasoiFishOn =
false;

sasoiFishTime =
null;

// =================================
// ◎発生直前の指の状態を記録
// =================================

sasoiBiteActionAtStart =
sasoiAction;

console.log(
"◎発生時の操作状態:",
sasoiBiteActionAtStart
);

// ---------------------------------
// ◎アワセ受付開始
// ---------------------------------

sasoiBiteWaiting =
true;

sasoiBiteStartTime =
Date.now();

// ---------------------------------
// 新しいrelease待ち
// ---------------------------------

sasoiBiteReleasePending =
false;

console.log(
"◎アワセ待機開始"
);

// ---------------------------------
// デバッグ表示
// ---------------------------------

sasoiDebugText.fish =
"BITE";

updateSasoiDebug();

console.log(
"魚がつんつんしている状態になりました"
);

// =================================
// 穂先ブルブル
// =================================

if(
!sasoiHitAnimating
){

console.log(
  "◎ブルブル開始処理",
  "ゲージ:",
  sasoiInterestGauge,
  "hitAnimating:",
  sasoiHitAnimating
);

sasoiHitAnimating =
  true;

console.log(
  "◎hitクラス追加前",
  "tip:",
  tip,
  "class:",
  tip.className
);

tip.classList.add(
  "hit"
);

console.log(
  "◎hitクラス追加後",
  "class:",
  tip.className,
  "hasHit:",
  tip.classList.contains("hit")
);

setTimeout(()=>{

  console.log(
    "◎ブルブル終了",
    "class削除前:",
    tip.className
  );

  tip.classList.remove(
    "hit"
  );

  sasoiHitAnimating =
    false;

  console.log(
    "◎ブルブル終了後",
    "class:",
    tip.className,
    "hitAnimating:",
    sasoiHitAnimating
  );

},350);

}else{

console.log(
  "◎ブルブル処理スキップ",
  "理由: sasoiHitAnimating が true",
  "ゲージ:",
  sasoiInterestGauge
);

}

// ---------------------------------
// bite音符を消費
// ---------------------------------

nearestNote.dataset.done =
"1";

nearestNote.dataset.hit =
"true";

// ---------------------------------
// 興味ゲージリセット
// ---------------------------------

sasoiInterestGauge =
0;

console.log(
"興味ゲージリセット"
);

// ---------------------------------
// ★ここで終了
// ---------------------------------

return;

}

}

// =================================
// ◎ アワセ判定
// =================================

function checkSasoiBiteAction(){

  // =================================
  // ◎が発生していない
  // =================================

  if(
    !sasoiBiteWaiting
  ){

    return;

  }


  // =================================
  // ◎発生からの経過時間
  // =================================

  const elapsed =
    Date.now() -
    sasoiBiteStartTime;


  // =================================
  // ◎アワセ成功条件
  // =================================
  //
  // 成功条件は3つ。
  //
  // ① ◎が発生している
  // ② ◎発生後にrelease操作が行われた
  // ③ ◎発生時点で指がpress状態だった
  //
  // ※重要
  //
  // ◎発生時に指がreleaseだった場合でも
  // 穂先ブルブルは発生する。
  //
  // ただし、
  //
  // 「アワセ準備ができていなかった」
  //
  // としてアワセ成功にはしない。
  //
  // =================================

  if(
    sasoiBiteReleasePending &&
    sasoiBiteActionAtStart === "press" &&
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


    // ---------------------------------
    // 魚が掛かった
    // ---------------------------------

    sasoiFishOn =
      true;


    // ---------------------------------
    // ◎アワセ待ちは終了
    // ---------------------------------

    sasoiBiteWaiting =
      false;

    sasoiBiteStartTime =
      null;

    sasoiBiteActionAtStart =
      null;

    sasoiBiteReleasePending =
      false;


    // ---------------------------------
    // 魚が掛かった時間
    // ---------------------------------

    sasoiFishTime =
      Date.now();


    // ---------------------------------
    // デバッグ表示
    // ---------------------------------

    sasoiDebugText.fish =
      "ON";

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


    // ---------------------------------
    // メッセージ
    // ---------------------------------

    if(
      typeof showSasoiMessage ===
      "function"
    ){

      showSasoiMessage(
        "魚が掛かりました！"
      );

    }


    return;

  }


  // =================================
  // ◎発生後のrelease
  // =================================
  //
  // ◎発生時点で指がreleaseだった場合
  //
  // 「アワセ準備ができていなかった」
  //
  // として失敗。
  //
  // =================================

  if(
    sasoiBiteReleasePending &&
    sasoiBiteActionAtStart !== "press" &&
    elapsed <= SASOI_BITE_WINDOW
  ){

    console.log(
      "◎アワセ失敗：◎発生時に指が置かれていませんでした",
      elapsed,
      "ms"
    );


    console.log(
      "アワセ準備ができていなかったため魚を掛けられませんでした"
    );


    // ---------------------------------
    // 魚は掛からない
    // ---------------------------------

    sasoiFishOn =
      false;

    sasoiFishTime =
      null;


    // ---------------------------------
    // ◎アワセ待ち終了
    // ---------------------------------

    sasoiBiteWaiting =
      false;

    sasoiBiteStartTime =
      null;

    sasoiBiteActionAtStart =
      null;

    sasoiBiteReleasePending =
      false;


    // ---------------------------------
    // デバッグ表示
    // ---------------------------------

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


    // ---------------------------------
    // メッセージ
    // ---------------------------------

    if(
      typeof showSasoiMessage ===
      "function"
    ){

      showSasoiMessage(
        "アワセの準備ができていませんでした"
      );

    }


    return;

  }


  // =================================
  // ◎発生から受付時間を超えた
  // =================================

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


    // ---------------------------------
    // 魚は掛からない
    // ---------------------------------

    sasoiFishOn =
      false;

    sasoiFishTime =
      null;


    // ---------------------------------
    // ◎アワセ待ち終了
    // ---------------------------------

    sasoiBiteWaiting =
      false;

    sasoiBiteStartTime =
      null;

    sasoiBiteActionAtStart =
      null;

    sasoiBiteReleasePending =
      false;


    // ---------------------------------
    // デバッグ表示
    // ---------------------------------

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


    // ---------------------------------
    // メッセージ
    // ---------------------------------

    if(
      typeof showSasoiMessage ===
      "function"
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
  document.getElementById(
    "sasoiTouch"
  );

if(sasoiTouch){

  sasoiTouch.addEventListener(
    "pointerdown",
    (e)=>{

      e.preventDefault();

      sasoiTouch.setPointerCapture(
        e.pointerId
      );


      // =================================
      // 通常の誘い
      // =================================
      //
      // pointerdownでは
      // 「指が押された」という状態だけ
      // 更新する。
      //
      // ◎アワセ成功判定はここでは行わない。
      //
      // 実際のアワセは、
      // ◎発生後のpointerup/releaseで
      // checkSasoiBiteAction() が行う。
      //
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


    // =================================
    // RELEASE状態へ
    // =================================

    sasoiAction =
      "release";


    // =================================
    // ◎発生後の新しいrelease操作
    // =================================

    if(
      sasoiBiteWaiting
    ){

      sasoiBiteReleasePending =
        true;


      console.log(
        "◎発生後のrelease操作を検出"
      );


      // ---------------------------------
      // ◎アワセ判定
      // ---------------------------------
      //
      // アワセ判定はここだけで行う。
      //
      // ---------------------------------

      console.log(
        "◎ RELEASE → アワセ判定"
      );


      checkSasoiBiteAction();

    }


    sasoiDebugText.player =
      "RELEASE";

    updateSasoiDebug();


    console.log(
      "RELEASE"
    );

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


// ---------------------------------
// プレイ状態を完全リセット
// ---------------------------------

// 譜面・プレイ状態

sasoiPlaying = true;

sasoiIndex = 0;


// ---------------------------------
// 魚状態
// ---------------------------------

sasoiFishOn = false;

sasoiFishTime = null;


// ---------------------------------
// 誘い・止め状態
// ---------------------------------

sasoiStopReady = false;

sasoiPressStartTime = null;

sasoiHoldTime = null;


// ---------------------------------
// ◎ BITE状態
// ---------------------------------
//
// 前回プレイで◎が発生していた場合でも、
// 次のプレイには一切持ち越さない。

sasoiBiteWaiting = false;

sasoiBiteStartTime = null;

sasoiBiteActionAtStart = null;

sasoiBiteReleasePending = false;


// ---------------------------------
// 穂先ブルブル状態
// ---------------------------------

sasoiHitAnimating = false;


// ---------------------------------
// 指の操作状態
// ---------------------------------
//
// 新しいプレイは指が離れている状態から開始。

sasoiAction = "release";

console.log(
  "PRESS開始時間リセット"
);

// ---------------------------------
// デバッグ表示を初期化
// ---------------------------------

sasoiDebugText.player = "RELEASE";

sasoiDebugText.note = "NONE";

sasoiDebugText.stop = "OFF";

sasoiDebugText.fish = "OFF";

updateSasoiDebug();



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