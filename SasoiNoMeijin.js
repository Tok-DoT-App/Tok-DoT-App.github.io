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

/* =================================
   初期画面
   「誘いの名人」
   和紙 × 深い水面 × 釣り糸 × 波紋
================================= */

.sasoi-panel{

  width:370.5px;
  height:190px;

  border-radius:12px;

  /* =================================
     ベース
  ================================= */

  background:

    /* ---------------------------------
       和紙の細かな繊維
    --------------------------------- */

    repeating-linear-gradient(
      93deg,
      rgba(255,255,255,0.10) 0px,
      rgba(255,255,255,0.10) 1px,
      transparent 1px,
      transparent 4px
    ),

    repeating-linear-gradient(
      176deg,
      rgba(80,72,55,0.045) 0px,
      rgba(80,72,55,0.045) 1px,
      transparent 1px,
      transparent 5px
    ),

    /* ---------------------------------
       和紙の大きな柔らかいシワ
    --------------------------------- */

    linear-gradient(
      122deg,
      transparent 0%,
      rgba(255,255,255,0.22) 12%,
      rgba(90,80,60,0.08) 17%,
      transparent 24%,
      transparent 100%
    ),

    linear-gradient(
      62deg,
      transparent 0%,
      rgba(90,80,60,0.07) 28%,
      rgba(255,255,255,0.20) 34%,
      transparent 41%,
      transparent 100%
    ),

    linear-gradient(
      148deg,
      transparent 0%,
      rgba(255,255,255,0.18) 55%,
      rgba(90,80,60,0.07) 61%,
      transparent 68%,
      transparent 100%
    ),

    /* ---------------------------------
       和紙の柔らかな濃淡
    --------------------------------- */

    radial-gradient(
      ellipse at 18% 18%,
      rgba(255,255,255,0.34) 0%,
      rgba(255,255,255,0.08) 18%,
      transparent 38%
    ),

    radial-gradient(
      ellipse at 82% 28%,
      rgba(90,80,60,0.10) 0%,
      rgba(90,80,60,0.03) 20%,
      transparent 40%
    ),

    radial-gradient(
      ellipse at 28% 78%,
      rgba(255,255,255,0.25) 0%,
      rgba(255,255,255,0.05) 18%,
      transparent 38%
    ),

    /* ---------------------------------
       和紙ベース
    --------------------------------- */

    linear-gradient(
      to bottom,
      #F4F0E1 0%,
      #EAE4D1 52%,
      #D8D1BA 100%
    );


  /* =================================
     紙の立体感
  ================================= */

  box-shadow:

    0 4px 9px
    rgba(35,40,35,0.22),

    inset
    0 2px 0
    rgba(255,255,255,0.55),

    inset
    0 -4px 8px
    rgba(65,70,60,0.14);


  color:#263A38;

  display:flex;

  flex-direction:column;

  justify-content:center;

  align-items:center;

  box-sizing:border-box;

  font-family:sans-serif;

  position:relative;

  overflow:hidden;

  z-index:1;

  margin-top:30px;

  margin-bottom:-30px;

}


/* =================================
   水面
   下側に深い青緑を薄く入れる
================================= */

.sasoi-panel::before{

  content:"";

  position:absolute;

  left:0;

  bottom:0;

  width:100%;

  height:72px;

  pointer-events:none;

  background:

    /* ---------------------------------
       水面の薄い光
    --------------------------------- */

    radial-gradient(
      ellipse at 50% 0%,
      rgba(108,190,174,0.25) 0%,
      rgba(108,190,174,0.08) 28%,
      transparent 62%
    ),

    /* ---------------------------------
       深い水の色
    --------------------------------- */

    linear-gradient(
      to bottom,
      rgba(38,115,105,0.05) 0%,
      rgba(27,91,84,0.14) 45%,
      rgba(17,67,64,0.28) 100%
    );

  opacity:0.95;

  z-index:0;

}


/* =================================
   水面の細かな波
================================= */

.sasoi-panel::after{

  content:"";

  position:absolute;

  left:0;

  bottom:22px;

  width:100%;

  height:46px;

  pointer-events:none;

  background:

    /* ---------------------------------
       奥の波
    --------------------------------- */

    radial-gradient(
      ellipse 90px 10px at 50% 70%,
      transparent 54%,
      rgba(76,155,145,0.16) 55%,
      rgba(76,155,145,0.16) 57%,
      transparent 59%
    ),

    /* ---------------------------------
       中央の波
    --------------------------------- */

    radial-gradient(
      ellipse 62px 7px at 50% 70%,
      transparent 54%,
      rgba(105,185,169,0.22) 55%,
      rgba(105,185,169,0.22) 58%,
      transparent 60%
    ),

    /* ---------------------------------
       手前の小さな波
    --------------------------------- */

    radial-gradient(
      ellipse 35px 5px at 50% 70%,
      transparent 54%,
      rgba(135,205,187,0.28) 55%,
      rgba(135,205,187,0.28) 58%,
      transparent 60%
    );

  opacity:0.8;

  z-index:1;

}


/* =================================
   初期画面の中身を前面へ
================================= */

.sasoi-panel > *{

  position:relative;

  z-index:5;

}


.sasoi-title {

  font-size:40px;
  font-weight:400;

  font-family:"Yuji Boku",serif;

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

  font-family:"Yuji Boku",serif;


}


.sasoi-level {

  margin-top:0px;

  font-size:13px;

  font-family:"Yuji Boku",serif;
}


/* =================================
   ゲーム画面
   金箔・金屏風風
================================= */

.sasoi-game {

  display:none;

  position:relative;

  width:370.5px;
  height:190px;

  border-radius:12px;

  /* =================================
     金箔のような深い金色
  ================================= */

  background:

    /* ---------------------------------
       金箔の細かな光
    --------------------------------- */

    repeating-linear-gradient(
      92deg,
      rgba(255,245,180,0.10) 0px,
      rgba(255,245,180,0.10) 1px,
      transparent 1px,
      transparent 4px
    ),

    /* ---------------------------------
       金の濃淡
    --------------------------------- */

    linear-gradient(
      to bottom,
      #E7C65A 0%,
      #C99A2E 38%,
      #A87518 70%,
      #80500B 100%
    ),

    /* ---------------------------------
       ベース
    --------------------------------- */

    #C99A2E;


  /* =================================
     金属・金箔の立体感
  ================================= */

  box-shadow:

    0 4px 10px
    rgba(45,30,5,0.32),

    inset
    0 2px 0
    rgba(255,245,190,0.55),

    inset
    0 -4px 8px
    rgba(70,40,0,0.28);


  overflow:hidden;

  box-sizing:border-box;


  /* =================================
     現在の下端位置を基準に
     上方向へ30px拡張
  ================================= */

  margin-top:30px;

  margin-bottom:-30px;

}

/* リスタートボタン */
#sasoiRestartBtn{

  position:absolute;

  left:55%;
  bottom:2px;

  transform:translateX(-50%);

  width:90px;
  height:20px;

  font-size:14px;

  border:none;

  border-radius:12px;

  background:
    linear-gradient(
      180deg,
      #4fa3e3,
      #2675b5
    );

  color:#ffffff;

  display:flex;
  justify-content:center;
  align-items:center;

  box-shadow:
    0 1px 3px
    rgba(0,0,0,0.35);

  font-family:"Yuji Boku",serif;

}


/* リスタート：押した瞬間 */
#sasoiRestartBtn:active{

  background:
    linear-gradient(
      180deg,
      #2675b5,
      #1d5d92
    );

}


/* =================================
   戻るボタン
================================= */

.sasoi-back-btn{

  position:absolute;

  left:32%;
  bottom:2px;

  transform:translateX(-50%);

  width:60px;
  height:20px;

  font-size:14px;

  border:none;

  border-radius:12px;

  background:
    linear-gradient(
      180deg,
      #697681,
      #4b5660
    );

  color:#ffffff;

  display:flex;
  justify-content:center;
  align-items:center;

  box-shadow:
    0 1px 3px
    rgba(0,0,0,0.35);

  font-family:"Yuji Boku",serif;

}


/* 戻る：押した瞬間 */
.sasoi-back-btn:active{

  background:
    linear-gradient(
      180deg,
      #4b5660,
      #39434b
    );

}


/* 電動リール全般 */

.sasoi-rod{

  position:absolute;

  left:39px;

  top:72px;

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

  background:
    rgba(255,255,255,0.15);

  box-shadow:
    0 0 0 1px rgba(255,255,255,0.45);

  display:flex;

  justify-content:center;

  align-items:center;

  box-sizing:border-box;


  /* ★ 波紋の基準位置 */
  position:relative;

}

/* =================================
   PERFECT専用・穂先○から広がる波紋
================================= */

.sasoi-perfect-ripple{

  position:absolute;

  /* ★ 穂先○の中心 */
  left:50%;
  top:50%;

  /* ★ 穂先○そのものと同じ大きさから開始 */
  width:26px;
  height:26px;

  border:
    2px solid
    rgba(255,255,255,0.95);

  border-radius:50%;

  box-sizing:border-box;

  pointer-events:none;

  /* ★ 必ず穂先○の中心を基準にする */
  transform:
    translate(-50%,-50%)
    scale(0.35);

  opacity:1;

  z-index:20;

  box-shadow:

    0 0 4px
    rgba(255,255,255,0.95),

    0 0 10px
    rgba(255,255,255,0.70),

    0 0 18px
    rgba(255,255,255,0.35);

  animation:
    sasoiPerfectRipple
    0.3s
    ease-out
    forwards;

}


/* =================================
   外側へパーッと広がる
================================= */

@keyframes sasoiPerfectRipple{

  /* -----------------------------
     発生
  ----------------------------- */

  0%{

    transform:
      translate(-50%,-50%)
      scale(0.35);

    opacity:1;

  }


  /* -----------------------------
     穂先○を一度包む
  ----------------------------- */

  25%{

    transform:
      translate(-50%,-50%)
      scale(0.8);

    opacity:0.95;

  }


  /* -----------------------------
     外側へ広がる
  ----------------------------- */

  55%{

    transform:
      translate(-50%,-50%)
      scale(1.6);

    opacity:0.70;

  }


  /* -----------------------------
     花火のように大きく広がる
  ----------------------------- */

  80%{

    transform:
      translate(-50%,-50%)
      scale(2.3);

    opacity:0.35;

  }


  /* -----------------------------
     消える
  ----------------------------- */

  100%{

    transform:
      translate(-50%,-50%)
      scale(3.0);

    opacity:0;

  }

}


/* =================================
   縦線
   ================================= */

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

  /* ---------------------------------
     穂先取り付け部の基準
  --------------------------------- */

  position:relative;

}


/* =================================
   穂先取り付け部
   赤い長方形
   ================================= */

.sasoi-line::after{

  content:"";

  position:absolute;

  /* 縦線の下端から少しだけ出す */
  bottom:-4px;

  /* 縦線の中央に配置 */
  left:50%;

  transform:
    translateX(-50%);

  /* 縦線より幅広く */
  width:6px;

  height:10px;

  /* 電動リール本体に合わせた赤 */
  background:
    linear-gradient(
      to right,
      #9f1d1d 0%,
      #d92f2f 45%,
      #f05252 100%
    );

  /* 少しだけ角を丸める */
  border-radius:2px;

  /* 立体感 */
  box-shadow:
    inset 0 1px 1px
    rgba(255,255,255,0.35),

    inset 0 -1px 2px
    rgba(0,0,0,0.30),

    0 1px 2px
    rgba(0,0,0,0.35);

}


/* =================================
   電動リール本体（くびれ形状）
   底面ポッコリ・半円強調版
================================= */

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


  /* =================================
     電動リール 横から見た流線型
     底面を丸く膨らませる
  ================================= */

  clip-path:polygon(

    /* ---------------------------------
       1. 穂先挿入口（上部先端）
    --------------------------------- */

    35% 0%,
    65% 0%,


    /* ---------------------------------
       2. スプール周り（肩の最大幅）
    --------------------------------- */

    84% 5%,
    95% 15%,
    98% 28%,
    98% 36%,


    /* ---------------------------------
       3. 中央のライン
    --------------------------------- */

    93% 48%,
    88% 60%,
    86% 68%,


    /* ---------------------------------
       4. 下部ボディ
       丸い底面へゆっくり接続
    --------------------------------- */

    88% 77%,

    92% 84%,

    94% 89%,

    93% 93%,

    89% 96%,

    83% 98%,

    75% 99.3%,


    /* ---------------------------------
       5. 底面の半円
       中央に向かって丸く膨らませる
    --------------------------------- */

    66% 99.8%,

    58% 100%,

    50% 100%,

    42% 100%,

    34% 99.8%,

    25% 99.3%,


    /* ---------------------------------
       6. 左側の半円
    --------------------------------- */

    17% 98%,

    11% 96%,

    7% 93%,

    6% 89%,

    8% 84%,

    12% 77%,


    /* ---------------------------------
       7. 左側ライン〜上部
    --------------------------------- */

    14% 68%,

    12% 60%,

    7% 48%,


    /* ---------------------------------
       左肩
    --------------------------------- */

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


  /* =================================
     立体感
  ================================= */

  box-shadow:

    inset
    0 -2px 4px
    rgba(0,0,0,.25),

    inset
    0 0 6px
    rgba(255,255,255,.35),

    0 2px 4px
    rgba(0,0,0,.35);

}


/* =================================
   電動リールのスプール
================================= */

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


  /* 糸留めの基準 */
  position:relative;

}


/* =================================
   糸留め金
   12時・4時・8時方向
================================= */

.sasoi-line-stop{

  position:absolute;

  width:2px;
  height:1px;

  background:#d8d8d8;

  border-radius:1px;

  z-index:5;

  box-shadow:
    0 0 0.5px rgba(255,255,255,.9),
    0 0.5px 1px rgba(0,0,0,.8);

}


/* =================================
   12時方向
================================= */

.sasoi-line-stop.stop-12{

  top:1px;

  left:50%;

  transform:
    translateX(-50%);

}


/* =================================
   4時方向
================================= */

.sasoi-line-stop.stop-4{

  right:1px;

  bottom:3px;

  transform:
    rotate(60deg);

}


/* =================================
   8時方向
================================= */

.sasoi-line-stop.stop-8{

  left:1px;

  bottom:3px;

  transform:
    rotate(-60deg);

}


/* =================================
   ロックフリーレバー
================================= */

.sasoi-spool::after{

  content:"";

  position:absolute;

  bottom:-3px;

  left:50%;

  transform:
    translateX(-50%);


  width:9px;

  height:1px;


  background:#1a1a1a;

  border-radius:1px;


  box-shadow:
    0 0.5px 1px
    rgba(0,0,0,0.5);

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

  left:26px;

  top:125px;

  width:48px;

  height:70px;

  /* ★ ベースの黒 */
  background-color:#111;

  /* ★ 細かい斜めクロス模様 */
  background-image:
    linear-gradient(
      45deg,
      transparent 43%,
      rgba(255,255,255,0.16) 44%,
      rgba(255,255,255,0.16) 56%,
      transparent 57%
    ),
    linear-gradient(
      -45deg,
      transparent 43%,
      rgba(255,255,255,0.16) 44%,
      rgba(255,255,255,0.16) 56%,
      transparent 57%
    );

  /* ★ 細かいクロス */
  background-size:6px 6px;

  /* ★ 外周を黒く */
  border:2px solid #000;

  border-radius:4px;

  /* ★ 黒縁をほんの少しだけ立体的に */
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.12),
    inset 0 -1px 0 rgba(0,0,0,0.65),
    0 1px 2px rgba(0,0,0,0.55);

  z-index:0;

}


/* 流れてくる表示 */

.sasoi-flow{

  position:absolute;

  left:0px;

  top:70px;

  font-size:20px;

  letter-spacing:5px;

  /* ★ ワカサギの銀色のテカリをイメージした色 */
  color:#EAF3C2;

  text-shadow:
  0 0 3px rgba(255,255,220,0.9),
  0 0 8px rgba(220,235,130,0.45);

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

  top:102px;

  width:78px;

  height:78px;

  border-radius:50%;

  border:3px solid white;

  color:white;

  /* 通常時：侍ブルー */
  background:#1E5AA8;

  display:flex;

  justify-content:center;

  align-items:center;

  font-size:26px;

  z-index:4;

  user-select:none;
  -webkit-user-select:none;

  touch-action:none;

  -webkit-touch-callout:none;

  -webkit-user-drag:none;
  user-drag:none;

  /* 色をなめらかに変化させる */
  transition:
    background-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.15s ease;

}


/* =================================
   指を置いている間
   ================================= */

.sasoi-touch.active{

  /* 押している間：明るいオレンジ系 */
  background:#F4B942;

  /* 少し光らせる */
  box-shadow:
    0 0 10px rgba(255,213,79,0.75),
    0 0 20px rgba(255,213,79,0.45);

  /* 少しだけ沈む */
  transform:scale(0.96);

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

/* =================================
   中央の釣り穴ライン
   深めのエメラルドグリーン
================================= */

.sasoi-center-line{

  position:absolute;

  left:0;

  top:60px;

  width:100%;

  height:60px;

  /* ★ 深めのエメラルドグリーングラデーション */

  background:
    linear-gradient(
      to bottom,
      rgba(34,112,101,0.96),
      rgba(28,96,87,0.94) 35%,
      rgba(20,79,72,0.93) 60%,
      rgba(10,55,52,0.97)
    );

  /* ★ 水中の柔らかい光 */

  box-shadow:
    inset 0 6px 12px
    rgba(150,235,220,0.13),

    inset 0 -7px 12px
    rgba(0,30,28,0.25);

  z-index:1;

}


/* =================================
   中央ライン上下のステンレス縁
   ================================= */

.sasoi-edge{

  position:absolute;

  left:0;

  width:100%;

  height:4px;

  /* ★ ステンレス風の金属グラデーション */
  background:
    linear-gradient(
      to bottom,
      #F2F4F5 0%,
      #BFC5C8 25%,
      #8E969B 50%,
      #D9DDDF 75%,
      #F5F6F7 100%
    );

  /* ★ 金属の反射感 */
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.85),
    inset 0 -1px 0 rgba(40,50,55,0.45),
    0 0 2px rgba(220,230,235,0.45);

  z-index:2;

}


.sasoi-edge.top{

  top:56px;

}


.sasoi-edge.bottom{

  top:118px;

}


/* ゲーム表示全体位置調整 */

.sasoi-rod,
.sasoi-flow {

  transform:translateY(5px);

}

/* 穂先ヒット演出 */

.sasoi-tip.hit{

  animation:sasoiTipShake 0.05s infinite;

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

/* =================================
   ◎ 魚が掛かった時の控えめなブルブル
   ================================= */

.sasoi-tip.fish-on{

  animation:
    sasoiFishOnShake
    0.35s
    ease-in-out
    infinite;

}


/* =================================
   魚が掛かった時のブルブル
   ================================= */

@keyframes sasoiFishOnShake{

  0%{

    transform:
      translateX(0)
      translateY(0)
      rotate(0deg)
      scale(1);

  }

  10%{

    transform:
      translateX(-1.5px)
      translateY(-1px)
      rotate(-0.7deg)
      scale(1.01);

  }

  20%{

    transform:
      translateX(2px)
      translateY(1px)
      rotate(0.9deg)
      scale(1.02);

  }

  30%{

    transform:
      translateX(-2px)
      translateY(-1.5px)
      rotate(-1deg)
      scale(1.02);

  }

  40%{

    transform:
      translateX(2px)
      translateY(1.5px)
      rotate(0.9deg)
      scale(1.02);

  }

  50%{

    transform:
      translateX(-1.5px)
      translateY(-1px)
      rotate(-0.7deg)
      scale(1.01);

  }

  60%{

    transform:
      translateX(1.5px)
      translateY(1px)
      rotate(0.6deg)
      scale(1.01);

  }

  70%{

    transform:
      translateX(-1px)
      translateY(-1px)
      rotate(-0.5deg)
      scale(1.01);

  }

  80%{

    transform:
      translateX(1px)
      translateY(0.5px)
      rotate(0.4deg)
      scale(1.01);

  }

  90%{

    transform:
      translateX(-0.5px)
      translateY(-0.5px)
      rotate(0deg)
      scale(1);

  }

  100%{

    transform:
      translateX(0)
      translateY(0)
      rotate(0deg)
      scale(1);

  }

}

/* ==========================================
   誘いの名人 デバッグ表示
========================================== */

.sasoi-debug{

  position:absolute;

  top:35px;
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
    29px;

  transform:
    translateX(-50%);

  z-index:
    100;

  /* ---------------------------------
     判定プレート
  --------------------------------- */

  min-width:
    52px;

  height:
    20px;

  padding:
    0 8px;

  box-sizing:
    border-box;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  /* ---------------------------------
     通常時は背景なし
  --------------------------------- */

  background:
    transparent;

  border:
    1px solid
    transparent;

  border-radius:
    6px;

  /* ---------------------------------
     通常時は影なし
  --------------------------------- */

  box-shadow:
    none;

  /* ---------------------------------
     文字
  --------------------------------- */

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
    rgba(0,0,0,0.7);

}


/* ==========================================
   判定が出たときだけプレートを表示
========================================== */

.sasoi-judgement-display.perfect,
.sasoi-judgement-display.good,
.sasoi-judgement-display.bad,
.sasoi-judgement-display.miss,
.sasoi-judgement-display.hit,
.sasoi-judgement-display.lost{

  background:
    linear-gradient(
      180deg,
      rgba(35, 45, 55, 0.96),
      rgba(10, 15, 20, 0.96)
    );

  border:
    1px solid
    rgba(255,255,255,0.35);

  box-shadow:
    0 2px 5px
    rgba(0,0,0,0.45),

    inset 0 1px 0
    rgba(255,255,255,0.18);

}

/* ==========================================
   PERFECT
========================================== */

.sasoi-judgement-display.perfect{

  font-size:
    13px;

  background:
    linear-gradient(
      180deg,
      rgba(40, 150, 220, 0.98),
      rgba(20, 75, 150, 0.98)
    );

}


/* ==========================================
   GOOD
========================================== */

.sasoi-judgement-display.good{

  font-size:
    13px;

  background:
    linear-gradient(
      180deg,
      rgba(50, 170, 90, 0.98),
      rgba(20, 95, 50, 0.98)
    );

}


/* ==========================================
   BAD
========================================== */

.sasoi-judgement-display.bad{

  font-size:
    12px;

  background:
    linear-gradient(
      180deg,
      rgba(230, 160, 40, 0.98),
      rgba(150, 80, 15, 0.98)
    );

}


/* ==========================================
   MISS
========================================== */

.sasoi-judgement-display.miss{

  font-size:
    12px;

  background:
    linear-gradient(
      180deg,
      rgba(200, 55, 55, 0.98),
      rgba(105, 20, 20, 0.98)
    );

}


 /* ==========================================
    HIT
 ========================================== */

.sasoi-judgement-display.hit{

  /* ★ ヒットした瞬間の金色～オレンジ */
  background:
    linear-gradient(
      180deg,
      rgba(255, 215, 85, 0.99),
      rgba(235, 155, 25, 0.99) 55%,
      rgba(170, 90, 10, 0.99)
    );

  /* ★ 金色の縁 */
  border-color:
    rgba(255, 245, 180, 0.95);

  /* ★ ヒット時の光 */
  box-shadow:
    0 2px 7px
    rgba(0,0,0,0.5),

    0 0 8px
    rgba(255,190,45,0.55),

    0 0 16px
    rgba(255,170,20,0.30),

    inset 0 1px 0
    rgba(255,255,255,0.55);

  /* ★ 文字をよりヒットらしく */
  color:
    #FFFBE8;

  text-shadow:
    0 1px 2px
    rgba(90,45,0,0.75),

    0 0 5px
    rgba(255,245,180,0.55);

}

/* ==========================================
   HIT!! 文字ブルブル
========================================== */

.sasoi-judgement-display.hit.shake{

  animation:
    sasoiHitTextShake 0.3s ease-out;

}


@keyframes sasoiHitTextShake{

  0%{

    transform:
      translateX(-50%)
      translate(0,0);

  }

  15%{

    transform:
      translateX(-50%)
      translate(-2px,1px);

  }

  30%{

    transform:
      translateX(-50%)
      translate(2px,-1px);

  }

  45%{

    transform:
      translateX(-50%)
      translate(-2px,-1px);

  }

  60%{

    transform:
      translateX(-50%)
      translate(2px,1px);

  }

  75%{

    transform:
      translateX(-50%)
      translate(-1px,0);

  }

  90%{

    transform:
      translateX(-50%)
      translate(1px,0);

  }

  100%{

    transform:
      translateX(-50%)
      translate(0,0);

  }

}

/* ==========================================
   LOST
========================================== */

.sasoi-judgement-display.lost{

  background:
    linear-gradient(
      180deg,
      rgba(130, 45, 45, 0.98),
      rgba(65, 15, 15, 0.98)
    );

}


/* =================================
   譜面名
   ゲージ右上
================================= */

.sasoi-score-name{

  position:absolute;

  right:2px;

  bottom:16px;

  text-align:left;

  pointer-events:none;

  z-index:20;

  line-height:1.1;

}


/* =================================
   譜面番号
================================= */

.sasoi-score-number{

  text-align:left;

  font-size:10px;

  font-family:"Yuji Boku",serif;

  font-weight:bold;

  color:#17252B;

}


/* =================================
   譜面タイトル
================================= */

.sasoi-score-title{

  font-size:14px;

  font-family:"Yuji Boku",serif;

  font-weight:bold;

  color:#17252B;

  white-space:nowrap;

}


/* =================================
   興味ゲージ
   新規作成用ベース
================================= */

.sasoi-interest-gauge{

  position:absolute;

  top:26px;

  left:180px;

  width:180px;

  height:24px;

  overflow:visible;

  box-sizing:border-box;

  background:transparent;

  z-index:10;

}

/* =================================
   興味ゲージ数値表示
   ゲージの左側
================================= */

.sasoi-gauge-values{

  position:absolute;

  right:204px;

  top:6px;

  width:82px;

  height:14px;

  display:flex;

  align-items:center;

  justify-content:flex-end;

  gap:6px;

  pointer-events:none;

  white-space:nowrap;

  z-index:30;

}


/* =================================
   今回の加算値
   例：+10 / +7 / +6
================================= */

.sasoi-gauge-add{

  display:inline-block;

  font-size:11px;

  font-family:"Yuji Boku",serif;

  font-weight:bold;

  opacity:0;

  transform:translateX(0);

}


/* =================================
   加算値表示中
================================= */

.sasoi-gauge-add.show{

  animation:
    sasoiGaugeAddFade 0.75s ease-out
    forwards;

}


/* =================================
   加算値
   右へ少し大きく移動しながら消える
================================= */

@keyframes sasoiGaugeAddFade{

  0%{

    opacity:1;

    transform:
      translateX(0);

  }

  35%{

    opacity:1;

    transform:
      translateX(5px);

  }

  100%{

    opacity:0;

    transform:
      translateX(16px);

  }

}


/* =================================
   現在の合計値
   半透明背景・影付き・少し左寄せ
================================= */

.sasoi-gauge-total{

  display:flex;

  width:38px;

  height:22px;

  box-sizing:border-box;

  align-items:center;

  justify-content:flex-end;

  text-align:right;

  padding-right:4px;

  font-size:12px;

  font-family:"Yuji Boku",serif;

  font-weight:bold;

  color:#17252B;

  /* ---------------------------------
     半透明背景
  --------------------------------- */

  background:
    rgba(
      255,
      255,
      255,
      0.55
    );

  /* ---------------------------------
     枠線なし
  --------------------------------- */

  border:none;

  /* ---------------------------------
     角丸
  --------------------------------- */

  border-radius:5px;

  /* ---------------------------------
     文字位置
  --------------------------------- */

  line-height:22px;

  /* ---------------------------------
     ほんのり影
  --------------------------------- */

  box-shadow:
    0 1px 3px
    rgba(
      0,
      0,
      0,
      0.22
    );

  position:relative;

  top:0px;

}


/* =================================
   通常メモリ
   8px × 12px
   12個
   右端から左へ並べる
================================= */

.sasoi-gauge-normal{

  position:absolute;

  right:0;

  bottom:1px;

  display:flex;

  flex-direction:row-reverse;

  gap:2px;

  align-items:flex-end;

}


/* =================================
   通常メモリ本体
================================= */

.sasoi-gauge-normal span{

  width:8px;

  height:12px;

  flex:none;

  box-sizing:border-box;

  background:#000000;

  border-radius:1px;

  clip-path:polygon(
    0 0,
    88% 0,
    100% 100%,
    12% 100%
  );

  transition:
    background 0.15s ease;

}



/* =================================
   高さ16pxメモリ
   8px × 16px
   8個
   通常メモリの左側
================================= */

.sasoi-gauge-high{

  position:absolute;

  right:120px;

  bottom:1px;

  display:flex;

  flex-direction:row-reverse;

  gap:2px;

  align-items:flex-end;

}


/* =================================
   高さ16pxメモリ本体
================================= */

.sasoi-gauge-high span{

  width:8px;

  height:16px;

  flex:none;

  box-sizing:border-box;

  background:#000000;

  border-radius:1px;

  clip-path:polygon(
    0 0,
    88% 0,
    100% 100%,
    12% 100%
  );

  transition:
    background 0.15s ease;

}

/* =================================
   赤ゲージ用
   最後の4メモリだけ高さをアップ
================================= */

.sasoi-gauge-high span:nth-child(n+5){

  height:20px;

}


/* =================================
   メモリON色
   右 → 左
================================= */


/* 青 */

.sasoi-gauge-normal span.gauge-on-blue{

  background:#3B82F6;

}


/* 緑 */

.sasoi-gauge-normal span.gauge-on-green{

  background:#4CAF50;

}


/* 黄色 */

.sasoi-gauge-normal span.gauge-on-yellow{

  background:#FFD54A;

}


/* オレンジ */

.sasoi-gauge-high span.gauge-on-orange{

  background:#FF9800;

}


/* 赤 */

.sasoi-gauge-high span.gauge-on-red{

  background:#F44336;

}


/* =================================
   メモリ ON
================================= */

.sasoi-memory.active .sasoi-memory-fill{

  opacity:1;

}

/* =================================
   ゲージ ON メモリ
   LED発光＋内部ハイライト
================================= */

.sasoi-gauge-normal span.gauge-on-blue{

  background:
    linear-gradient(
      to bottom,
      rgba(255,255,255,0.32) 0%,
      rgba(255,255,255,0.08) 25%,
      transparent 45%
    ),
    #4DA6FF;

  filter:
    drop-shadow(
      0 0 2px
      rgba(77,166,255,0.65)
    );

}


.sasoi-gauge-normal span.gauge-on-green{

  background:
    linear-gradient(
      to bottom,
      rgba(255,255,255,0.32) 0%,
      rgba(255,255,255,0.08) 25%,
      transparent 45%
    ),
    #63D66B;

  filter:
    drop-shadow(
      0 0 2px
      rgba(99,214,107,0.65)
    );

}


.sasoi-gauge-normal span.gauge-on-yellow{

  background:
    linear-gradient(
      to bottom,
      rgba(255,255,255,0.34) 0%,
      rgba(255,255,255,0.08) 25%,
      transparent 45%
    ),
    #FFE45C;

  filter:
    drop-shadow(
      0 0 2px
      rgba(255,228,92,0.7)
    );

}


.sasoi-gauge-high span.gauge-on-orange{

  background:
    linear-gradient(
      to bottom,
      rgba(255,255,255,0.34) 0%,
      rgba(255,255,255,0.08) 25%,
      transparent 45%
    ),
    #FF9D3D;

  filter:
    drop-shadow(
      0 0 2px
      rgba(255,157,61,0.75)
    );

}


.sasoi-gauge-high span.gauge-on-red{

  background:
    linear-gradient(
      to bottom,
      rgba(255,255,255,0.36) 0%,
      rgba(255,255,255,0.08) 25%,
      transparent 45%
    ),
    #FF4D4D;

  filter:
    drop-shadow(
      0 0 2px
      rgba(255,77,77,0.8)
    );

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

let sasoiAnimationFrame =
  null;

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
// 新しいpress操作が発生した変数
// -------------------------------

let sasoiPressPending = false;

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
const SASOI_BITE_WINDOW = 500;

// =================================
// ◎ アワセタイミング判定
// =================================

// 0～39ms
// → 早すぎて魚がまだ掛からない
const SASOI_BITE_TOO_EARLY = 40;


// 40～99ms
// → 超早合わせでもHIT
const SASOI_BITE_EARLY_START = 40;
const SASOI_BITE_EARLY_END = 100;


// 100～219ms
// → 通常のHITゾーン
const SASOI_BITE_BEST_START = 100;
const SASOI_BITE_BEST_END = 220;


// 220～299ms
// → 遅めでもHIT
const SASOI_BITE_LATE_START = 220;
const SASOI_BITE_LATE_END = 300;


// 300ms以上
// → 遅すぎてLOST
const SASOI_BITE_TOO_LATE = 300;



// 釣果結果
let sasoiResult = null;


// -------------------------------
// 魚の興味ゲージ
// -------------------------------

// 誘いが成功するほど上昇
let sasoiInterestGauge = 0;

// ゲージ最大値
const SASOI_INTEREST_MAX = 200;

// ◎が発生できる最低ゲージ
const SASOI_INTEREST_REQUIRED = 160;


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
// ○●○●○●ー
//
// ◎
//
// ※ 基本パターンは変更せず、
//    音符間隔を400msで統一。
//    ●の直後に「― ―」が続く場合は、
//    最初の「―」を譜面から省略して、
//    判定表示が重ならないようにする。
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

  // ●の直後の最初の―を省略
  {
    id:10,
    time:5800,
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

  // ●の直後の最初の―を省略
  {
    id:17,
    time:9000,
    type:"hold"
  },


  // =====================
  // 3セット目
  // ○●○●○●ー
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

  // ●の直後の最初の―を省略
  {
    id:24,
    time:12200,
    type:"hold"
  },


  // =====================
  // 最後の ◎
  // =====================

  {
    id:25,
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
    レベル ★★★★☆
  </div>


</div>


<div class="sasoi-game" id="sasoiGame">


<!--
<div 
  class="sasoi-debug"
  id="sasoiDebug">

  DEBUG

</div>
-->

<!-- =================================
     興味ゲージ
================================= -->

<div class="sasoi-interest-gauge">

  <!-- =================================
       興味ゲージ数値表示
  ================================= -->

  <div class="sasoi-gauge-values">

    <!-- 今回の加算値 -->
    <span
      id="sasoiGaugeAdd"
      class="sasoi-gauge-add"
    ></span>

    <!-- 現在の合計値 -->
    <span
      id="sasoiGaugeTotal"
      class="sasoi-gauge-total"
    >0</span>

  </div>

  <!-- 譜面名 -->

  <div class="sasoi-score-name">

    <div class="sasoi-score-number">
      第壱譜
    </div>

    <div class="sasoi-score-title">
      三誘一間・三段重
    </div>

  </div>


  <!-- =================================
       通常メモリ
       8px × 12px
       12個

       右 → 左
       青4 → 緑4 → 黄4
  ================================= -->

<!-- =================================
     通常メモリ
     8px × 12px
     12個
================================= -->

<div class="sasoi-gauge-normal">

  <span data-gauge-index="0"></span>
  <span data-gauge-index="1"></span>
  <span data-gauge-index="2"></span>
  <span data-gauge-index="3"></span>

  <span data-gauge-index="4"></span>
  <span data-gauge-index="5"></span>
  <span data-gauge-index="6"></span>
  <span data-gauge-index="7"></span>

  <span data-gauge-index="8"></span>
  <span data-gauge-index="9"></span>
  <span data-gauge-index="10"></span>
  <span data-gauge-index="11"></span>

</div>


<!-- =================================
     高さ16pxメモリ
     8px × 16px
     8個
================================= -->

<div class="sasoi-gauge-high">

  <span data-gauge-index="12"></span>
  <span data-gauge-index="13"></span>
  <span data-gauge-index="14"></span>
  <span data-gauge-index="15"></span>

  <span data-gauge-index="16"></span>
  <span data-gauge-index="17"></span>
  <span data-gauge-index="18"></span>
  <span data-gauge-index="19"></span>

</div>

</div>

<div
  id="sasoiJudgementDisplay"
  class="sasoi-judgement-display"
>
</div>

<button
  id="sasoiRestartBtn"
  type="button"
>
  リスタート
</button>

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
    <div class="sasoi-spool">
  <span class="sasoi-line-stop stop-12"></span>
  <span class="sasoi-line-stop stop-4"></span>
  <span class="sasoi-line-stop stop-8"></span>
</div>

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

span.dataset.time =
note.time;


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
// PERFECT / GOOD / BAD によって
// 加算量を変える。
// =================================

function addSasoiInterest(judgement){

  // ---------------------------------
  // 判定ごとの加算量
  // ---------------------------------

  let addValue =
    0;

  if(
    judgement === "PERFECT"
  ){

    addValue =
      12;

  }else if(
    judgement === "GOOD"
  ){

    addValue =
      9;

  }else if(
    judgement === "BAD"
  ){

    addValue =
      6;

  }else{

    addValue =
      0;

  }


  // ---------------------------------
  // MISSなどは加算しない
  // ---------------------------------

  if(
    addValue <= 0
  ){

    console.log(
      "興味ゲージ加算なし",
      judgement
    );

    return;

  }


  // ---------------------------------
  // 興味ゲージ加算
  // ---------------------------------

  sasoiInterestGauge +=
    addValue;


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
  // 20メモリへ反映
  // ---------------------------------
  //
  // 1メモリ = 10ポイント
  //
  // 例：
  // 0～9      → 1個
  // 10～19    → 2個
  // 20～29    → 3個
  // ・・・
  // 190～199  → 20個
  // 200       → 20個
  // ---------------------------------

  const gaugeLevel =
    Math.ceil(
      sasoiInterestGauge / 10
    );


  // ---------------------------------
  // 加算値・合計値の表示
  // ---------------------------------

  const addDisplay =
    document.getElementById(
      "sasoiGaugeAdd"
    );

  const totalDisplay =
    document.getElementById(
      "sasoiGaugeTotal"
    );


  // ---------------------------------
  // 合計値は常時表示
  // ---------------------------------

  if(
    totalDisplay
  ){

    totalDisplay.textContent =
      sasoiInterestGauge;

  }


  // ---------------------------------
  // 今回の加算値を表示
  // ---------------------------------

  if(
    addDisplay
  ){

    addDisplay.textContent =
      "+" + addValue;


    // 前回のアニメーションを解除
    addDisplay.classList.remove(
      "show"
    );


    // アニメーションを再スタート
    void addDisplay.offsetWidth;


    addDisplay.classList.add(
      "show"
    );

  }


  // ---------------------------------
  // メモリ表示更新
  // ---------------------------------

  setSasoiGaugeLevel(
    gaugeLevel
  );


  // ---------------------------------
  // デバッグログ
  // ---------------------------------

  console.log(
    "興味ゲージ上昇",
    "+" + addValue,
    judgement,
    "→",
    sasoiInterestGauge,
    "/",
    SASOI_INTEREST_MAX,
    "メモリ",
    gaugeLevel,
    "/ 20"
  );

}



// =================================
// 興味ゲージ
// メモリON/OFF制御
// =================================

function setSasoiGaugeLevel(level){

  /* ---------------------------------
     値を0～20に制限
  --------------------------------- */

  level =
    Math.max(
      0,
      Math.min(
        20,
        Math.floor(level)
      )
    );


  /* ---------------------------------
     通常12個を取得
  --------------------------------- */

  const normalTicks =
    Array.from(
      document.querySelectorAll(
        ".sasoi-gauge-normal span"
      )
    );


  /* ---------------------------------
     高さ16pxメモリ8個を取得
  --------------------------------- */

  const highTicks =
    Array.from(
      document.querySelectorAll(
        ".sasoi-gauge-high span"
      )
    );


  /* ---------------------------------
     20個を1つの配列にまとめる
  --------------------------------- */

  const allTicks =
    [
      ...normalTicks,
      ...highTicks
    ];


  /* ---------------------------------
     全メモリをOFF
  --------------------------------- */

  allTicks.forEach(
    tick => {

      tick.classList.remove(
        "gauge-on-blue",
        "gauge-on-green",
        "gauge-on-yellow",
        "gauge-on-orange",
        "gauge-on-red"
      );

    }
  );


  /* ---------------------------------
     右 → 左へON
  --------------------------------- */

  for(
    let i = 0;
    i < level;
    i++
  ){

    const tick =
      allTicks[i];


    if(!tick){
      continue;
    }


    /* -------------------------------
       1～4
       青
    ------------------------------- */

    if(i < 4){

      tick.classList.add(
        "gauge-on-blue"
      );

    }


    /* -------------------------------
       5～8
       緑
    ------------------------------- */

    else if(i < 8){

      tick.classList.add(
        "gauge-on-green"
      );

    }


    /* -------------------------------
       9～12
       黄色
    ------------------------------- */

    else if(i < 12){

      tick.classList.add(
        "gauge-on-yellow"
      );

    }


    /* -------------------------------
       13～16
       オレンジ
    ------------------------------- */

    else if(i < 16){

      tick.classList.add(
        "gauge-on-orange"
      );

    }


    /* -------------------------------
       17～20
       赤
    ------------------------------- */

    else{

      tick.classList.add(
        "gauge-on-red"
      );

    }

  }

}


// =================================
// 興味ゲージ リセット
// =================================

function resetSasoiInterestGauge(){

  sasoiInterestGauge =
    0;


  setSasoiGaugeLevel(
    0
  );


  // ---------------------------------
  // 合計値表示をリセット
  // ---------------------------------

  const totalDisplay =
    document.getElementById(
      "sasoiGaugeTotal"
    );


  if(
    totalDisplay
  ){

    totalDisplay.textContent =
      "0";

  }


  // ---------------------------------
  // 前回の加算値表示をリセット
  // ---------------------------------

  const addDisplay =
    document.getElementById(
      "sasoiGaugeAdd"
    );


  if(
    addDisplay
  ){

    // 前回のアニメーションを停止
    addDisplay.classList.remove(
      "show"
    );


    // 表示文字そのものを消す
    addDisplay.textContent =
      "";


    // 初期位置・透明状態へ戻す
    addDisplay.style.opacity =
      "0";

    addDisplay.style.transform =
      "translateX(0)";

  }


  console.log(
    "興味ゲージリセット",
    sasoiInterestGauge
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
  // PERFECT演出
  // =================================

  if(
    result.judgement === "PERFECT"
  ){

    showSasoiPerfectRipple();

  }


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
  // ●判定は自動消去
  // =================================
  //
  // PERFECT / GOOD / BAD / MISS
  // は一定時間表示した後、
  // 自然に消す。
  //
  // HIT!! / LOST は
  // この関数では扱わない。
  //
  // =================================

  showSasoiXJudgement.timer =
    setTimeout(()=>{

      // ---------------------------------
      // 現在表示されているものが
      // ●判定だった場合だけ消す
      // ---------------------------------

      if(
        display.classList.contains("perfect") ||
        display.classList.contains("good") ||
        display.classList.contains("bad") ||
        display.classList.contains("miss")
      ){

        display.textContent =
          "";

        display.className =
          "sasoi-judgement-display";

      }

    }, 200);

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
  // 判定結果表示
  // =================================

  display.textContent =
    result;


  // =================================
  // 表示クラスをリセット
  // =================================

  display.className =
    "sasoi-judgement-display";


  // =================================
  // 判定結果用クラス
  // =================================
  //
  // GOOD
  // BAD
  // PERFECT
  // HIT
  // LOST
  //
  // それぞれ
  //
  // good
  // bad
  // perfect
  // hit
  // lost
  //
  // のCSSクラスになる。
  //
  // =================================

  display.classList.add(
    result.toLowerCase().replace(
      "!!",
      ""
    )
  );


  // =================================
  // HIT!! のときだけブルブル
  // =================================

  if(
    result === "HIT!!"
  ){

    // 前回のshakeを一度削除
    display.classList.remove(
      "shake"
    );

    // 再度アニメーションを発生させる
    void display.offsetWidth;

    display.classList.add(
      "shake"
    );

  }


  // =================================
  // デバッグログ
  // =================================

  console.log(
    "判定表示:",
    result
  );


  // =================================
  // 前回の消去タイマーを解除
  // =================================

  clearTimeout(
    showSasoiActionJudgement.timer
  );


  // =================================
  // HIT!! / LOST は残す
  // =================================

  if(
    result === "HIT!!" ||
    result === "LOST"
  ){

    return;

  }


  // =================================
  // GOOD / BAD / PERFECT は自動消去
  // =================================

  showSasoiActionJudgement.timer =
    setTimeout(()=>{

      // ---------------------------------
      // 現在表示されているものが
      // アクション判定だった場合だけ消す
      // ---------------------------------

      if(
        display.classList.contains("perfect") ||
        display.classList.contains("good") ||
        display.classList.contains("bad")
      ){

        display.textContent =
          "";

        display.className =
          "sasoi-judgement-display";

      }

    }, 200);

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

// =================================
// ★ 通過済み音符のMISS処理
// =================================
//
// 一番近い音符だけを見ていると、
// 音符が速く流れた場合に
// 「判定範囲を通過した音符」が
// MISSにならないことがある。
//
// そのため、現在画面上にある
// 未処理音符を確認し、
// 穂先中心を十分左へ通過した
// 音符をMISSとして処理する。
//
// ※ count / bite はここでは対象外
// ※ 成功判定そのものは変更しない
// =================================

const tipCenterForMiss =
  tipRect.left +
  tipRect.width / 2;

const missLimit =
  tipRect.width * 0;


notes.forEach((note)=>{

  // ---------------------------------
  // すでに処理済みなら無視
  // ---------------------------------

  if(
    note.dataset.done === "1" ||
    note.dataset.hit === "true"
  ){

    return;

  }

  // ---------------------------------
  // 対象となる音符種類
  // ---------------------------------

  const type =
    note.dataset.type;

  if(
    type !== "press" &&
    type !== "hold" &&
    type !== "release"
  ){

    return;

  }

  // ---------------------------------
  // 音符位置
  // ---------------------------------

  const rect =
    note.getBoundingClientRect();

  const noteCenter =
    rect.left +
    rect.width / 2;

  // ---------------------------------
  // 穂先中心より十分左へ
  // 通過したか確認
  // ---------------------------------

  if(
    noteCenter <
    missLimit
  ){

    console.log(
      "★ 通過MISS",
      "ID:",
      note.dataset.id,
      "type:",
      type,
      "noteCenter:",
      noteCenter.toFixed(1)
    );

    // ---------------------------------
    // MISS表示
    // ---------------------------------

    if(
      typeof showSasoiXJudgement ===
      "function"
    ){

      showSasoiXJudgement({

        judgement:
          "MISS",

        timing:
          "",

        differenceX:
          noteCenter -
          tipCenterForMiss,

        distanceX:
          Math.abs(
            noteCenter -
            tipCenterForMiss
          ),

        display:
          "MISS"

      });

    }

    // ---------------------------------
    // 音符を処理済みにする
    // ---------------------------------

    note.dataset.done =
      "1";

    note.dataset.hit =
      "true";

  }

});

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
  // PRESS音符の通過MISS判定
  // =================================
  //
  // PRESSが成功しないまま
  // 穂先中心を通過した場合、
  // そのPRESSをMISSとして処理する。
  //
  // 重要：
  //
  // 13px以内
  // → PRESS受付範囲
  //
  // 13pxを超えて右側
  // → まだMISSにしない
  //
  // 穂先中心を通過して
  // さらに左側へ13px以上進んだ
  // → MISS
  //
  // この処理はPRESSだけ。
  //
  // HOLD / RELEASE / BITEには
  // 影響させない。
  // =================================

  if(
    noteType === "press"
  ){

    // ---------------------------------
    // まだ処理されていないPRESSだけ対象
    // ---------------------------------

    if(
      nearestNote.dataset.hit !== "true"
    ){

      // ---------------------------------
      // 音符が穂先中心より左側へ
      // 13px以上通過したか確認
      // ---------------------------------

      if(
        nearestDifferenceX <
        -13
      ){

        console.log(
          "PRESS MISS",
          "譜面ID:",
          nearestNote.dataset.id,
          "X差:",
          nearestDifferenceX.toFixed(1),
          "px"
        );


        // ---------------------------------
        // MISS表示
        // ---------------------------------

        if(
          typeof showSasoiXJudgement ===
          "function"
        ){

          showSasoiXJudgement({

            judgement:
              "MISS",

            timing:
              "LATE",

            differenceX:
              nearestDifferenceX,

            distanceX:
              nearestDistance,

            display:
              "MISS LATE"

          });

        }


        // ---------------------------------
        // 音符を処理済みにする
        // ---------------------------------

        nearestNote.dataset.done =
          "1";

        nearestNote.dataset.hit =
          "true";


        // ---------------------------------
        // MISS処理終了
        // ---------------------------------

        return;

      }

    }

  }

  // =================================
  // ● press / ◎ bite
  // のみ距離判定を使用
  // =================================

  const useDistanceJudgement =
    noteType === "press";

  // =================================
  // X軸判定
  // =================================
  //
  // 重要：
  //
  // ここでは「まだ判定範囲に
  // 入っていない音符」をMISS表示しない。
  //
  // PRESS
  // → 13px以内から判定表示
  //
  // BITE
  // → 10px以内から判定表示
  //
  // つまり、
  //
  // まだ遠い
  // → 何も表示しない
  //
  // 判定範囲に入った
  // → PERFECT / GOOD / BAD
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

    // =================================
    // 音符種類ごとの
    // X軸判定開始距離
    // =================================
    //
    // PRESS
    // → 13px以内
    //
    // BITE
    // → 10px以内
    //
    // =================================

    const judgementStartDistance =
      noteType === "press"
        ? 13
        : 10;

    // =================================
    // まだ判定範囲外
    // =================================
    //
    // ここではMISSを表示しない。
    //
    // 実際のPRESS/BITE判定も
    // まだ行われない。
    //
    // =================================

    if(
      nearestDistance >
      judgementStartDistance
    ){

      return;

    }

    // =================================
    // X軸4段階判定
    // =================================
    //
    // 0～9px
    // PERFECT
    //
    // 9～11px
    // GOOD
    //
    // 11～13px
    // BAD
    //
    // =================================

    if(
      nearestDistance <= 9
    ){

      xJudgement =
        "PERFECT";

    }else if(
      nearestDistance <= 11
    ){

      xJudgement =
        "GOOD";

    }else{

      xJudgement =
        "BAD";

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
    // すでに処理済みなら終了
    // ---------------------------------

    if(
      nearestNote.dataset.hit === "true"
    ){

      return;

    }

    // ---------------------------------
    // PRESS受付範囲外
    // ---------------------------------
    //
    // ● PRESSは
    // 穂先中心から13px以内に入ったら
    // 操作受付状態になる。
    //
    // 13pxを超えている間は
    // まだPRESS待機には入らない。
    //
    // ---------------------------------

    if(
      nearestDistance > 13
    ){

      return;

    }

// ---------------------------------
// PRESS受付範囲内
// ---------------------------------
//
// ここまで来たら
// ●はPRESS受付範囲に入っている。
//
// 重要：
//
// sasoiAction === "press"
// だけでは成功させない。
//
// sasoiAction は
// 「現在指が押されている状態」なので、
//
// 指を押しっぱなしにしていると
// 次の●でも press のままになる。
//
// そこで、
//
// sasoiPressPending === true
//
// のときだけ
// 「新しいPRESS操作が発生した」
// と判断する。
//
// ---------------------------------

if(
  !sasoiPressPending
){

  console.log(
    "PRESS待機（新しいPRESS操作なし）",
    "距離:",
    nearestDistance.toFixed(1),
    "px"
  );

  return;

}


// ---------------------------------
// PRESS成功
// ---------------------------------

console.log(
  "成功 press"
);


// =================================
// ★ 3回目PRESS詳細デバッグ
// =================================
//
// 3セット目のPRESSだけ、
// 実際の判定位置・距離・時刻を記録する。
// 判定ロジック自体は変更しない。
// =================================

if(
  nearestNote.dataset.id === "21" ||
  nearestNote.dataset.id === "23" ||
  nearestNote.dataset.id === "25"
){

  const now =
    Date.now();


  console.log(
    "================================="
  );

  console.log(
    "★ 3回目PRESS詳細"
  );

  console.log(
    "譜面ID:",
    nearestNote.dataset.id
  );

  console.log(
    "譜面予定時刻:",
    nearestNote.dataset.time ||
    "time情報なし"
  );

  console.log(
    "現在時刻:",
    now
  );

  console.log(
    "最近音符距離:",
    nearestDistance.toFixed(2),
    "px"
  );

  console.log(
    "X差:",
    nearestDifferenceX.toFixed(2),
    "px"
  );

  console.log(
    "判定:",
    xJudgement
  );

  console.log(
    "タイミング:",
    xTiming
  );

  console.log(
    "判定表示:",
    xJudgementText
  );

  console.log(
    "sasoiAction:",
    sasoiAction
  );

  console.log(
    "sasoiPressPending:",
    sasoiPressPending
  );

  console.log(
    "================================="
  );

}


// ---------------------------------
// 実際にPRESSした瞬間の判定表示
// ---------------------------------
//
// ここで初めて
// PERFECT / GOOD / BAD
// を画面に表示する。
//
// ---------------------------------

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


// ---------------------------------
// 新しいPRESS操作を消費
// ---------------------------------

sasoiPressPending =
  false;


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

addSasoiInterest(
  xJudgement
);


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
        "hold待機中（まだ押していない）"
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
      "GOOD"
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

    addSasoiInterest(
      "GOOD"
    );

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
// ○ release
//
// 「sasoiAction === "release"」だけでは
// 成功にしない。
//
// ゲーム開始直後も
//
// sasoiAction === "release"
//
// になっているため、
// 何も操作していないのにrelease成功してしまう。
//
// そこで、実際にPRESS成功後に
// 押し開始時間が記録されているかを確認する。
//
// 実際の流れ:
//
// PRESS成功
// ↓
// sasoiPressStartTime が記録される
// ↓
// 指を離す
// ↓
// sasoiAction === "release"
// ↓
// RELEASE成功
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
  // 実際に押していたか確認
  // ---------------------------------
  //
  // 何も操作していない場合:
  //
  // sasoiPressStartTime === null
  //
  // なので成功させない。
  //
  // PRESS成功後なら:
  //
  // sasoiPressStartTime !== null
  //
  // なのでrelease成功候補になる。
  //
  // ---------------------------------

  if(
    sasoiPressStartTime === null ||
    sasoiAction !== "release"
  ){

    console.log(
      "release待機中（実際のrelease操作なし）"
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
    "GOOD"
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

  addSasoiInterest(
    "GOOD"
  );


  // ---------------------------------
  // 押していた時間を計測
  // ---------------------------------

  sasoiHoldTime =
    Date.now()
    -
    sasoiPressStartTime;


  console.log(
    "止め時間:",
    sasoiHoldTime,
    "ms"
  );


  // ---------------------------------
  // 押し開始時間をリセット
  // ---------------------------------

  sasoiPressStartTime =
    null;


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
      nearestDistance >= 13 ||
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

      },250);

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
// ◎ 魚が掛かった瞬間の大ブルブル演出
// =================================

function playSasoiFishOnShake(){

  const tip =
    document.querySelector(
      ".sasoi-tip"
    );


  if(
    !tip
  ){

    return;

  }


  console.log(
    "🎣 魚が掛かった！大ブルブル演出開始"
  );


  // =================================
  // 既存の魚掛かり演出をリセット
  // =================================

  tip.classList.remove(
    "fish-on"
  );


  // 再トリガー用
  void tip.offsetWidth;


  // =================================
  // 魚掛かり大ブルブル開始
  // =================================

  tip.classList.add(
    "fish-on"
  );


  // =================================
  // 約5秒後に演出終了
  // =================================

  setTimeout(
    () => {

      tip.classList.remove(
        "fish-on"
      );


      console.log(
        "🎣 魚掛かり大ブルブル演出終了"
      );

    },
    5000
  );

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
  // ◎発生後のrelease操作がない
  // =================================

  if(
    !sasoiBiteReleasePending
  ){

    // 受付時間を超えた場合
    // releaseされないまま魚が逃げる

    if(
      elapsed >=
      SASOI_BITE_TOO_LATE
    ){

      console.log(
        "◎アワセ失敗：遅すぎ",
        elapsed,
        "ms"
      );


      console.log(
        "LOST"
      );


      console.log(
        "魚が逃げた..."
      );


      showSasoiActionJudgement(
        "LOST"
      );


      // =================================
      // 魚は掛からない
      // =================================

      sasoiFishOn =
        false;

      sasoiFishTime =
        null;


      // =================================
      // ◎アワセ待ち終了
      // =================================

      sasoiBiteWaiting =
        false;

      sasoiBiteStartTime =
        null;

      sasoiBiteActionAtStart =
        null;

      sasoiBiteReleasePending =
        false;


      // =================================
      // デバッグ表示
      // =================================

      sasoiDebugText.fish =
        "LOST";

      updateSasoiDebug();


      // =================================
      // 穂先ブルブル停止
      // =================================

      const tip =
        document.querySelector(
          ".sasoi-tip"
        );


      if(
        tip
      ){

        tip.classList.remove(
          "hit"
        );

      }


      sasoiHitAnimating =
        false;


      // =================================
      // メッセージ
      // =================================

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


    return;

  }


  // =================================
  // ◎発生後のrelease
  // =================================
  //
  // release操作が実際に行われた
  // =================================


  // =================================
  // ◎発生時にpress状態ではなかった
  // =================================
  //
  // アワセ準備ができていなかった
  //
  // → LOST
  // =================================

  if(
    sasoiBiteActionAtStart !==
    "press"
  ){

    console.log(
      "◎アワセ失敗：◎発生時に指が置かれていませんでした",
      elapsed,
      "ms"
    );


    console.log(
      "LOST"
    );


    showSasoiActionJudgement(
      "LOST"
    );


    console.log(
      "アワセ準備ができていなかったため魚を掛けられませんでした"
    );


    // =================================
    // 魚は掛からない
    // =================================

    sasoiFishOn =
      false;

    sasoiFishTime =
      null;


    // =================================
    // ◎アワセ待ち終了
    // =================================

    sasoiBiteWaiting =
      false;

    sasoiBiteStartTime =
      null;

    sasoiBiteActionAtStart =
      null;

    sasoiBiteReleasePending =
      false;


    // =================================
    // デバッグ表示
    // =================================

    sasoiDebugText.fish =
      "LOST";

    updateSasoiDebug();


    // =================================
    // 穂先ブルブル停止
    // =================================

    const tip =
      document.querySelector(
        ".sasoi-tip"
      );


    if(
      tip
    ){

      tip.classList.remove(
        "hit"
      );

    }


    sasoiHitAnimating =
      false;


    // =================================
    // メッセージ
    // =================================

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
  // ◎アワセタイミング判定
  // =================================


  // =================================
  // 早すぎ
  // =================================

  if(
    elapsed <
    SASOI_BITE_TOO_EARLY
  ){

    console.log(
      "◎アワセ失敗：早すぎ",
      elapsed,
      "ms"
    );


    console.log(
      "LOST"
    );


    showSasoiActionJudgement(
      "LOST"
    );


    console.log(
      "魚がまだ仕掛けを食い込んでいません"
    );


    // =================================
    // 魚は掛からない
    // =================================

    sasoiFishOn =
      false;

    sasoiFishTime =
      null;


    // =================================
    // ◎アワセ待ち終了
    // =================================

    sasoiBiteWaiting =
      false;

    sasoiBiteStartTime =
      null;

    sasoiBiteActionAtStart =
      null;

    sasoiBiteReleasePending =
      false;


    // =================================
    // デバッグ表示
    // =================================

    sasoiDebugText.fish =
      "LOST";

    updateSasoiDebug();


    // =================================
    // 穂先ブルブル停止
    // =================================

    const tip =
      document.querySelector(
        ".sasoi-tip"
      );


    if(
      tip
    ){

      tip.classList.remove(
        "hit"
      );

    }


    sasoiHitAnimating =
      false;


    // =================================
    // メッセージ
    // =================================

    if(
      typeof showSasoiMessage ===
      "function"
    ){

      showSasoiMessage(
        "早すぎました"
      );

    }


    return;

  }


  // =================================
  // SUPER EARLY
  // =================================

  if(
    elapsed >=
    SASOI_BITE_EARLY_START &&
    elapsed <
    SASOI_BITE_EARLY_END
  ){

    console.log(
      "◎アワセ成功：SUPER EARLY",
      elapsed,
      "ms"
    );


    console.log(
      "HIT"
    );


    showSasoiActionJudgement(
      "HIT!!"
    );

playSasoiFishOnShake();

    console.log(
      "超早合わせで魚が掛かった！"
    );


    sasoiFishOn =
      true;

    sasoiFishTime =
      Date.now();


    sasoiBiteWaiting =
      false;

    sasoiBiteStartTime =
      null;

    sasoiBiteActionAtStart =
      null;

    sasoiBiteReleasePending =
      false;


    sasoiDebugText.fish =
      "HIT";

    updateSasoiDebug();


    // =================================
    // 穂先ブルブル停止
    // =================================

    const tip =
      document.querySelector(
        ".sasoi-tip"
      );


    if(
      tip
    ){

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

      showSasoiMessage(
        "早合わせで魚が掛かりました！"
      );

    }


    return;

  }


  // =================================
  // BESTゾーン
  // =================================

  if(
    elapsed >=
    SASOI_BITE_BEST_START &&
    elapsed <
    SASOI_BITE_BEST_END
  ){

    console.log(
      "◎アワセ成功：BEST",
      elapsed,
      "ms"
    );


    console.log(
      "HIT"
    );


    showSasoiActionJudgement(
      "HIT!!"
    );

playSasoiFishOnShake();

    console.log(
      "魚がしっかり掛かった！"
    );


    sasoiFishOn =
      true;

    sasoiFishTime =
      Date.now();


    sasoiBiteWaiting =
      false;

    sasoiBiteStartTime =
      null;

    sasoiBiteActionAtStart =
      null;

    sasoiBiteReleasePending =
      false;


    sasoiDebugText.fish =
      "HIT";

    updateSasoiDebug();


    // =================================
    // 穂先ブルブル停止
    // =================================

    const tip =
      document.querySelector(
        ".sasoi-tip"
      );


    if(
      tip
    ){

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

      showSasoiMessage(
        "魚がしっかり掛かりました！"
      );

    }


    return;

  }


  // =================================
  // LATEゾーン
  // =================================

  if(
    elapsed >=
    SASOI_BITE_LATE_START &&
    elapsed <
    SASOI_BITE_LATE_END
  ){

    console.log(
      "◎アワセ成功：LATE",
      elapsed,
      "ms"
    );


    console.log(
      "HIT"
    );


    showSasoiActionJudgement(
      "HIT!!"
    );

playSasoiFishOnShake();

    console.log(
      "遅めのアワセでも魚が掛かった！"
    );


    sasoiFishOn =
      true;

    sasoiFishTime =
      Date.now();


    sasoiBiteWaiting =
      false;

    sasoiBiteStartTime =
      null;

    sasoiBiteActionAtStart =
      null;

    sasoiBiteReleasePending =
      false;


    sasoiDebugText.fish =
      "HIT";

    updateSasoiDebug();


    // =================================
    // 穂先ブルブル停止
    // =================================

    const tip =
      document.querySelector(
        ".sasoi-tip"
      );


    if(
      tip
    ){

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

      showSasoiMessage(
        "遅めのアワセでも掛かりました！"
      );

    }


    return;

  }


  // =================================
  // 遅すぎ
  // =================================

  if(
    elapsed >=
    SASOI_BITE_TOO_LATE
  ){

    console.log(
      "◎アワセ失敗：遅すぎ",
      elapsed,
      "ms"
    );


    console.log(
      "LOST"
    );


    showSasoiActionJudgement(
      "LOST"
    );


    console.log(
      "魚が逃げた..."
    );


    sasoiFishOn =
      false;

    sasoiFishTime =
      null;


    sasoiBiteWaiting =
      false;

    sasoiBiteStartTime =
      null;

    sasoiBiteActionAtStart =
      null;

    sasoiBiteReleasePending =
      false;


    sasoiDebugText.fish =
      "LOST";

    updateSasoiDebug();


    // =================================
    // 穂先ブルブル停止
    // =================================

    const tip =
      document.querySelector(
        ".sasoi-tip"
      );


    if(
      tip
    ){

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

      showSasoiMessage(
        "あっ…魚が逃げてしまいました"
      );

    }


    return;

  }

}

function stopSasoiCheck(){


  // =================================
  // プレイ状態終了
  // =================================

  sasoiPlaying =
    false;


  // =================================
  // 旧 setInterval 停止
  // =================================
  //
  // 念のため残しておく。
  // 現在はrequestAnimationFrame()が
  // メイン判定ループ。
  //
  // =================================

  if(
    sasoiTimer
  ){

    clearInterval(
      sasoiTimer
    );


    sasoiTimer =
      null;

  }


  // =================================
  // requestAnimationFrame 停止
  // =================================
  //
  // ③で判定ループを
  // requestAnimationFrame()に変更したため、
  // stop時はこちらも必ず停止する。
  //
  // =================================

  if(
    sasoiAnimationFrame !== null
  ){

    cancelAnimationFrame(
      sasoiAnimationFrame
    );


    sasoiAnimationFrame =
      null;

  }


  // =================================
  // デバッグ
  // =================================

  console.log(
    "誘い判定終了"
  );

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
    // ボタン色変更
    // =================================

    sasoiTouch.classList.add(
      "active"
    );

    // =================================
    // 通常の誘い
    // =================================
    //
    // pointerdownでは
    // 「指が押された」という状態を更新する。
    //
    // さらに、
    // 「新しいPRESS操作が発生した」
    // ことを記録する。
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


    // =================================
    // 新しいPRESS操作を記録
    // =================================
    //
    // pointerdownが発生した瞬間だけ
    // trueにする。
    //
    // これにより、
    //
    // 1回目の●を押したあと
    // 指を押しっぱなしにして
    // 2回目の●が来ても、
    // 2回目を新しく押したことにはしない。
    //
    // =================================

    sasoiPressPending =
      true;


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
  // ボタン色を通常状態へ戻す
  // =================================
  //
  // CSSのtransitionによって、
  // 黄色 → 青へフェードして戻る。
  //
  // =================================

  sasoiTouch.classList.remove(
    "active"
  );


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


    // =================================
    // ◎アワセrelease操作の時間確認
    // =================================

    console.log(
      "◎アワセrelease操作",
      "経過時間:",
      Date.now() - sasoiBiteStartTime,
      "ms",
      "開始時刻:",
      sasoiBiteStartTime,
      "現在時刻:",
      Date.now()
    );


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

// ---------------------------------
// 前回の判定表示タイマーを停止
// ---------------------------------

clearTimeout(
  showSasoiXJudgement.timer
);

clearTimeout(
  showSasoiActionJudgement.timer
);

showSasoiXJudgement.timer =
  null;

showSasoiActionJudgement.timer =
  null;

// ---------------------------------
// 判定表示を初期化
// ---------------------------------

const sasoiJudgementDisplay =
  document.getElementById(
    "sasoiJudgementDisplay"
  );


if(
  sasoiJudgementDisplay
){

  sasoiJudgementDisplay.textContent =
    "";

  sasoiJudgementDisplay.className =
    "sasoi-judgement-display";

}


// ---------------------------------
// 譜面・プレイ状態
// ---------------------------------

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
// 興味ゲージ
// ---------------------------------
//
// 新しいプレイは必ず0から開始。
// 前回プレイのゲージを持ち越さない。
// ---------------------------------

resetSasoiInterestGauge();

console.log(
  "興味ゲージリセット：新しいプレイ開始"
);

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
//
// JavaScript側の状態をリセットし、
// 前回プレイで残っている
// 「hit」「fish-on」クラスも解除する。
// ---------------------------------

sasoiHitAnimating =
  false;


const sasoiTip =
  document.querySelector(
    ".sasoi-tip"
  );


if(
  sasoiTip
){

  // ◎発生時のブルブル
  sasoiTip.classList.remove(
    "hit"
  );


  // 魚が掛かったときの大ブルブル
  sasoiTip.classList.remove(
    "fish-on"
  );

}


// ---------------------------------
// 指の操作状態
// ---------------------------------
//
// 新しいプレイは指が離れている状態から開始。

sasoiAction =
  "release";

// ---------------------------------
// 新しいPRESS操作フラグ
// ---------------------------------
//
// 新しいプレイ開始時には
// まだ新しいPRESS操作は発生していない。

sasoiPressPending =
  false;

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

},200);


// =================================
// 高頻度判定ループ開始
// =================================
//
// setInterval(100ms) は使用しない。
//
// 音符の移動はCSSアニメーションなので、
// 約16msごとに位置を確認する。
// =================================

if(
  sasoiAnimationFrame !== null
){

  cancelAnimationFrame(
    sasoiAnimationFrame
  );

  sasoiAnimationFrame =
    null;

}


function sasoiJudgementLoop(){

  // ---------------------------------
  // プレイ中でなければ終了
  // ---------------------------------

  if(
    !sasoiPlaying
  ){

    sasoiAnimationFrame =
      null;

    return;

  }


  // ---------------------------------
  // 誘い判定
  // ---------------------------------

  checkSasoiHit();


  // ---------------------------------
  // ◎アワセ判定
  // ---------------------------------

  checkSasoiBiteAction();


  // ---------------------------------
  // 次フレーム
  // ---------------------------------

  sasoiAnimationFrame =
    requestAnimationFrame(
      sasoiJudgementLoop
    );

}


// ---------------------------------
// 判定ループ開始
// ---------------------------------

sasoiAnimationFrame =
  requestAnimationFrame(
    sasoiJudgementLoop
  );

};

// =================================
// リスタート
// =================================

document
.getElementById("sasoiRestartBtn")
.onclick=function(){

  console.log(
    "誘いの名人：リスタート"
  );


  // =================================
  // 現在のプレイを停止
  // =================================

  stopSasoiCheck();


  // =================================
  // 現在のプレイタイマーを停止
  // =================================

  if(
    sasoiPlayTimer
  ){

    clearTimeout(
      sasoiPlayTimer
    );

    sasoiPlayTimer =
      null;

  }


  // =================================
  // スタート処理を再利用
  // =================================
  //
  // 現在の sasoiStartBtn.onclick には
  //
  // ・譜面リセット
  // ・ゲージリセット
  // ・PRESS状態リセット
  // ・◎状態リセット
  // ・魚状態リセット
  // ・判定表示リセット
  // ・譜面再生
  // ・判定ループ再開
  //
  // がすべて入っている。
  //
  // そのため、ここでは同じ処理を
  // 二重に書かない。
  // =================================

  const startBtn =
    document.getElementById(
      "sasoiStartBtn"
    );


  if(
    startBtn
  ){

    startBtn.click();

  }

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

// =================================
// PERFECT専用・穂先波紋演出
// =================================

function showSasoiPerfectRipple(){

  const tip =
    document.querySelector(
      ".sasoi-tip"
    );


  if(
    !tip
  ){

    return;

  }


  // ---------------------------------
  // 前回の波紋を削除
  // ---------------------------------

  const oldRipple =
    tip.querySelector(
      ".sasoi-perfect-ripple"
    );


  if(
    oldRipple
  ){

    oldRipple.remove();

  }


  // ---------------------------------
  // 新しい波紋を生成
  // ---------------------------------

  const ripple =
    document.createElement(
      "div"
    );


  ripple.className =
    "sasoi-perfect-ripple";


  // ---------------------------------
  // 穂先○の中を基準に配置
  // ---------------------------------

  tip.appendChild(
    ripple
  );


  // ---------------------------------
  // アニメーション終了後に削除
  // ---------------------------------

  ripple.addEventListener(
    "animationend",
    () => {

      ripple.remove();

    }
  );

}

// ---------------------------------　JS終了地点　---------------------------------

})();