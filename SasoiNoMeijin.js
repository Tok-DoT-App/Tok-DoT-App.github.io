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

#sasoiNoMeijinArea {

  width:100%;
  margin-top:8px;

  display:flex;
  justify-content:center;
}


.sasoi-panel {

  width:95%;
  height:110px;

  border-radius:12px;

  box-shadow:
    0 2px 6px rgba(0,0,0,0.15);

  background:#ffffff;

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
  height:110px;

  border-radius:12px;

  background:#163a63;

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

  font-size:10px;

  border:none;

  border-radius:12px;

  background:#ffffff;

  color:#333;

}


/* 穂先 */

.sasoi-rod{

  position:absolute;

  left:18px;

  top:30px;

  display:flex;

  flex-direction:column;

  align-items:center;

  z-index:2;

}


.sasoi-reel{

  font-size:28px;

  color:white;

}


/* 縦線 */

.sasoi-line{

  font-size:24px;

  line-height:18px;

  color:white;

}


/* 電動リール */

.sasoi-weight{

  font-size:24px;

  color:red;

}


/* 流れてくる表示（まだ固定） */

.sasoi-flow{

  position:absolute;

  left:220px;

  top:28px;

  font-size:18px;

  letter-spacing:5px;

  color:white;

  white-space:nowrap;

  z-index:3;

  pointer-events:none;

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

/* 長押し位置 */

.sasoi-touch{

  position:absolute;

  right:18px;

  top:28px;

  width:40px;

  height:40px;

  border-radius:50%;

  border:3px solid white;

  color:white;

  display:flex;

  justify-content:center;

  align-items:center;

  font-size:22px;

  z-index:4;

}

.sasoi-weight{

  font-size:16px;

  color:#e53935;

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


.sasoi-horizontal.top{

  top:10px;

}


.sasoi-horizontal.bottom{

  top:72px;

}

/* ゲーム表示全体位置調整 */

.sasoi-rod,
.sasoi-flow,
.sasoi-touch {

  transform:translateY(-10px);

}


.sasoi-flow.move{

  animation:sasoiSlide 2.5s linear forwards;

}


@keyframes sasoiSlide{

  from{

    left:220px;

  }


  to{

    left:80px;

  }

}


`;

document.head.appendChild(style);



// -------------------------------
// 初期表示生成
// -------------------------------
// -------------------------------
// 初期表示生成
// -------------------------------
function initSasoiNoMeijin(){


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


<div class="sasoi-rod">

  <div class="sasoi-reel">○</div>

  <div class="sasoi-line">│</div>

  <div class="sasoi-weight">■</div>

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

const flow =
document.getElementById("sasoiFlow");


flow.classList.remove("show");
flow.classList.remove("move");


// ポンポン表示＋同時移動

setTimeout(()=>{

  flow.classList.add("show");
  flow.classList.add("move");

},300);

};



// 戻る

document
.getElementById("sasoiBackBtn")
.onclick=function(){


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

  }
);

})();