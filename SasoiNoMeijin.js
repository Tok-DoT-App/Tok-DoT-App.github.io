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


/* 電動リール */

.sasoi-weight{

  width:24px;

  height:52px;

  background:
linear-gradient(
    to right,
    #b32020,
    #e53935 40%,
    #ff6a6a
);

  border-radius:8px 8px 4px 4px;

  margin-top:0;

  display:flex;

  flex-direction:column;

  align-items:center;

  box-sizing:border-box;

  padding-top:2px;

  box-shadow:
    inset 0 0 5px rgba(255,255,255,.35),
    0 2px 4px rgba(0,0,0,.35);

}


/* 電動リールのスプール */

.sasoi-spool{

  width:12px;
  height:12px;

  border-radius:50%;

  background:#222;

  border:2px solid #777;

  margin-bottom:2px;

}


/* 電動リールの表示盤 */

.sasoi-display{

  margin-top:1px;

  width:16px;
  height:14px;

  background:#b9ff95;

  border:1px solid #5d8f54;

  border-radius:2px;

  color:#1d2b16;

  font-size:6px;

  font-family:"DSEG7";

  display:flex;

  justify-content:center;

  align-items:center;

  box-shadow:
      inset 0 0 2px rgba(0,0,0,.25);

}


/* Tok.DoT ロゴ（リール用） */

.sasoi-label .tokdot-name{

  font-family:'BBH Hegarty',sans-serif;

  font-size:12px;

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

/* --------------------------------------------　CSS最後　-------------------------------------------- */

`;

document.head.appendChild(style);


// -------------------------------
// 初期表示生成
// -------------------------------
function initSasoiNoMeijin(){

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
// ホールド時間管理
// -------------------------------

let sasoiPressStartTime = null;

let sasoiHoldTime = 0;

// -------------------------------
// 魚状態管理
// -------------------------------

let sasoiFishOn = false;

// 魚が乗った時間

let sasoiFishTime = null;


// 釣果結果

let sasoiResult = null;

// -------------------------------
// 譜面データ
// -------------------------------

const sasoiScore = [

  // カウントダウン
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
  // 誘い開始
  // =====================


  // 最初の誘い
  {
    id:4,
    time:3000,
    type:"press"
  },


  // 止め
  {
    id:5,
    time:3400,
    type:"hold"
  },


  {
    id:6,
    time:3800,
    type:"hold"
  },


  // 食わせ間
  {
    id:7,
    time:4500,
    type:"bite"
  },


  // 合わせ
  {
    id:8,
    time:5000,
    type:"release"
  },


  // =====================
  // 2回目誘い
  // =====================


  {
    id:9,
    time:6500,
    type:"press"
  },


  {
    id:10,
    time:7000,
    type:"hold"
  },


  {
    id:11,
    time:7600,
    type:"bite"
  },


  {
    id:12,
    time:8200,
    type:"release"
  },


  // =====================
  // 3回目（少し難しい）
  // =====================


  {
    id:13,
    time:10000,
    type:"press"
  },


  {
    id:14,
    time:10500,
    type:"hold"
  },


  {
    id:15,
    time:11000,
    type:"hold"
  },


  {
    id:16,
    time:12000,
    type:"bite"
  },


  {
    id:17,
    time:12500,
    type:"release"
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


<div class="sasoi-black"></div>


<div class="sasoi-rod">

  <div class="sasoi-tip"></div>

  <div class="sasoi-line"></div>

<!-- 電動リール本体 -->

<div class="sasoi-weight">

  <div class="sasoi-spool"></div>

  <div class="sasoi-display">
    P01
  </div>

<div class="sasoi-label">

  <span class="tokdot-name">
    <span class="tokdot-dot">.</span>D
  </span>

</div>

</div>

<!-- 電動リール本体 -->

</div>

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
"全音符生成完了"
);


// すぐ終了しない
// 最後の音符判定時間を待つ

setTimeout(()=>{


console.log(
"譜面終了"
);


// 魚が乗ったままなら逃げる

if(sasoiFishOn){


console.log(
"魚が逃げた..."
);


sasoiFishOn = false;

sasoiFishTime = null;


if(typeof showSasoiMessage === "function"){

showSasoiMessage(
"あっ…魚が逃げてしまいました"
);

}


}


},2000);



return;

}


const note =
sasoiScore[sasoiIndex];


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


sasoiPlayTimer =
setTimeout(
playNextSasoiNote,
nextDelay
);


}


// -------------------------------
// 音符生成
// -------------------------------

function createSasoiNote(note){


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


function checkSasoiHit(){


const tip =
document.querySelector(".sasoi-tip");


const flow =
document.getElementById("sasoiFlow");


if(!tip || !flow) return;



const tipRect =
tip.getBoundingClientRect();


// 流れている音符を取得

const notes =
flow.querySelectorAll("span");


let nearestNote = null;

let nearestDistance = Infinity;



notes.forEach((note)=>{


  const rect =
  note.getBoundingClientRect();


  const distance =
  Math.abs(
    rect.left - tipRect.left
  );


  if(distance < nearestDistance){

    nearestDistance = distance;

    nearestNote = note;

  }


});



// 音符が無い場合

if(!nearestNote){

  return;

}

if(nearestNote.dataset.type==="count"){
    return;
}


console.log(
"最近音符",
nearestNote.dataset.id,
nearestNote.dataset.type,
"距離",
nearestDistance
);



if(
  nearestDistance < 20 &&
  nearestNote.dataset.hit !== "true"
){

  // press譜面なのに押していない
  if(
    nearestNote.dataset.type==="press" &&
    sasoiAction!=="press"
  ){
    return;
  }

  // release譜面なのに離していない
  if(
    nearestNote.dataset.type==="release" &&
    sasoiAction!=="release"
  ){
    return;
  }

// biteは魚が乗る判定なので入力不要
if(
  nearestNote.dataset.type==="bite"
){

  console.log(
    "BITE判定"
  );

}

  nearestNote.dataset.hit="true";

  console.log(
    "成功",
    nearestNote.dataset.type
  );

if(nearestNote.dataset.type==="press"){

  sasoiPressStartTime = Date.now();

  console.log(
    "押し開始時間記録"
  );

}

if(nearestNote.dataset.type==="release"){


  if(sasoiPressStartTime){


    sasoiHoldTime =
    Date.now()
    -
    sasoiPressStartTime;


    console.log(
      "止め時間:",
      sasoiHoldTime,
      "ms"
    );


    sasoiPressStartTime = null;


  }



// 魚判定

if(sasoiFishOn && sasoiFishTime){


  const fishDelay =
  Date.now()
  -
  sasoiFishTime;


  console.log(
    "魚が乗ってから",
    fishDelay,
    "ms"
  );


  if(fishDelay <= 1500){


    console.log(
      "大成功！"
    );


  }
  else if(fishDelay <= 3000){


    console.log(
      "釣れた！"
    );


  }
else if(fishDelay <= 5000){


  console.log(
    "バラシ...魚を逃しました"
  );


}
else{


  console.log(
    "魚が逃げた..."
  );


}


// 魚状態解除

sasoiFishOn = false;
sasoiFishTime = null;


}else{


  console.log(
    "魚なし"
  );


}



}


// ◎ 魚が乗る

if(nearestNote.dataset.type==="bite"){


  sasoiFishOn = true;


  sasoiFishTime = Date.now();


  console.log(
    "魚が乗った状態になりました"
  );


  tip.classList.add("hit");


  setTimeout(()=>{

    tip.classList.remove("hit");

  },300);


}


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

    sasoiTouch.setPointerCapture(e.pointerId);

    sasoiAction="press";

    console.log("PRESS");

  }
);



  function releaseAction(e){

    if(e){

      e.preventDefault();

    }


    sasoiAction="release";

    console.log("RELEASE");

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