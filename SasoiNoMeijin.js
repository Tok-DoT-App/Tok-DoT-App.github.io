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


/* 穂先 */

.sasoi-rod{

  position:absolute;

  left:39px;

  top:42px;

  display:flex;

  flex-direction:column;

  align-items:center;

  z-index:2;

}


.sasoi-tip{

  width:26px;

  height:26px;

  border-radius:50%;

  border:1px solid white;

  display:flex;

  justify-content:center;

  align-items:center;

  box-sizing:border-box;

}


/* 縦線 */

.sasoi-line{

  width:3px;

  height:30px;

  background:white;

}


/* 電動リール */

.sasoi-weight{

  width:16px;

  height:40px;

  background:#e53935;

  border-radius:4px;

  margin-top:0px;

  box-shadow:
    inset 0 0 4px rgba(255,255,255,0.4),
    0 2px 4px rgba(0,0,0,0.3);

}

/* たたき台 */
.sasoi-black{

  position:absolute;

  left:32px;

  top:95px;

  width:40px;

  height:70px;

  background:#111;

  border-radius:4px;

  z-index:0;

}


/* 流れてくる表示（まだ固定） */

.sasoi-flow{

  position:absolute;

  left:310px;

  top:40px;

  font-size:18px;

  letter-spacing:5px;

  color:white;

  white-space:nowrap;

  z-index:3;

  pointer-events:none;

  will-change:transform,left;

}

.sasoi-flow span{

  position:absolute;

  opacity:0;

  transform:translateX(0);

}

.sasoi-flow span:nth-child(1){
  left:0;
}


.sasoi-flow span:nth-child(2){
  left:18px;
}


.sasoi-flow span:nth-child(3){
  left:36px;
}


.sasoi-flow span:nth-child(4){
  left:54px;
}


.sasoi-flow span:nth-child(5){
  left:72px;
}

.sasoi-flow.show span{

  animation:sasoiPop 0.4s forwards;

}


.sasoi-flow.show span:nth-child(1){

  animation-delay:0s;

}


.sasoi-flow.show span:nth-child(2){

  animation-delay:0.15s;

}


.sasoi-flow.show span:nth-child(3){

  animation-delay:0.3s;

}


.sasoi-flow.show span:nth-child(4){

  animation-delay:0.45s;

}


.sasoi-flow.show span:nth-child(5){

  animation-delay:0.6s;

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

.sasoi-flow.move{

  animation:sasoiSlide 2.5s linear forwards;

}


@keyframes sasoiSlide{

  from{

    left:310px;

  }


  to{

    left:-120px;

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

const area =
document.getElementById(
"sasoiNoMeijinArea"
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

  <div class="sasoi-weight"></div>

</div>

<div class="sasoi-horizontal top"></div>

<div class="sasoi-horizontal bottom"></div>

<div 
class="sasoi-flow"
id="sasoiFlow">

<span>◎</span>
<span>●</span>
<span>●</span>
<span>●</span>
<span>○</span>

</div>

<div class="sasoi-touch">

  ○

</div>


</div>

`;

function checkSasoiHit(){


const flow =
document.getElementById("sasoiFlow");


const tip =
document.querySelector(".sasoi-tip");


if(!flow || !tip) return;



const flowRect =
flow.getBoundingClientRect();


const tipRect =
tip.getBoundingClientRect();



const distance =
Math.abs(
(flowRect.left + 10)
-
tipRect.left
);



console.log(
"誘い距離:",
distance
);



// 判定範囲

if(distance < 20){


  tip.classList.add("hit");


  setTimeout(()=>{

    tip.classList.remove("hit");

  },1000);


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


const flow =
document.getElementById("sasoiFlow");


flow.classList.remove("show");
flow.classList.remove("move");


// ポンポン表示＋同時移動

setTimeout(()=>{

  flow.classList.add("show");
  flow.classList.add("move");

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


    // 誘いの名人 ON/OFF

    const btn =
    document.getElementById(
      "sasoiToggleBtn"
    );


    const area =
    document.getElementById(
      "sasoiNoMeijinArea"
    );


    if(btn && area){


      // 保存状態読み込み

      const saved =
      localStorage.getItem(
        "sasoiNoMeijinEnabled"
      );


      // 初回はON

      if(saved === "false"){

        btn.checked = false;

        area.style.display="none";


      }else{

        btn.checked = true;

        area.style.display="flex";

      }



      // スイッチ変更

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