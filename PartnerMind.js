/* ==================================================
   PartnerMind
================================================== */

class PartnerMind {

    constructor(initialCount = 0){

    console.log("PartnerMind 起動");


    // =========================
    // 観察データ
    // =========================

    this.totalCount = initialCount;

    this.lastCatchTime = Date.now();



    // =========================
    // 相棒の記憶
    // =========================

    this.memory = {

        catchHistory: [],

        startTime: Date.now()

    };

// 長時間待った後に釣れた
this.afterLongSilence = false;

// =========================
// 発言記憶
// =========================

this.speechMemory = {

    history: [],

    lastTime: 0

};

// =========================
// 最近話したテーマ
// =========================

this.topicMemory = [];

// =========================
// 会話経験記憶
// =========================

this.conversationMemory = {

    total:0,

    reasons:{},

    topics:{},

interest:{


    emotion:50,

    partner_emotion:50,

    streak:50,

    long_silence:50,

    past_compare:50,

    previous_trip:50,

    record_break:50,

    difference:50,


    fishing_style:50,

    style_active:50,

    style_patient:50,

    style_balanced:50,


    user_style:50,

    memory:50,

    today_good:50,

    today_slow:50,

    mixed:50,


    experience_recall:50,

    recall_memory:50,

    after_wait:50

}

};

// =========================
// 人格記憶
// =========================

this.personalityMemory = {

    favoriteTopic:null,

    bestMoment:null,

    totalTalk:0,

    experience:0,

    // =========================
    // 記録発言管理
    // =========================

    recordAnnounced:false,


    // =========================
    // 親密度
    // =========================

    closeness:50,


    // =========================
    // ユーザー理解
    // =========================

    fishingStyle:"unknown",

    fastCatchCount:0,

    patienceCount:0,

    recordCount:0,

// =========================
    // 人格レベル
    // =========================

    personalityLevel:1

};

// =========================
// 釣行思い出
// =========================

this.tripMemory = {

    startCount:0,

    endCount:0,

    maxCount:0,

    catchCount:0,

    mood:"normal",

    date:null,

    events:[],


    // =========================
    // 今日の釣果履歴
    // =========================

    history:[],


    // =========================
    // 記録更新発言済み
    // =========================

    recordAnnounced:false

};

// =========================
// 思い出発言記憶
// =========================

this.pastMessageHistory = [];


// =========================
// 過去釣行履歴
// =========================

this.pastTrips = [];

// 過去釣行読み込み

this.loadPastTrips();


// 今日の開始記録

this.tripMemory.startCount =
    this.totalCount;

this.tripMemory.date =
    new Date().toLocaleDateString();


// 新しい釣行開始時は記録発言状態をリセット

this.tripMemory.recordAnnounced = false;

this.personalityMemory.recordAnnounced = false;


// 保存データ読み込み

this.loadPersonalityMemory();

this.loadConversationMemory();

// =========================
// 相棒の内部状態
// =========================

this.state = {

    // 機嫌
    mood:50,


    // 盛り上がり
    excitement:0,


    // 暇状態
    boredom:0,


    // =========================
    // 相棒自身の感情
    // =========================

    happiness:50,

    concern:0,

    trust:0,


    // =========================
    // 話したい気持ち
    // =========================

    speakDesire:50,


    // =========================
    // 発言疲労
    // 話した直後ほど高い
    // =========================

    speakFatigue:0,

// =========================
    // 新しい話題へ移りたい気持ち
    // =========================

    topicCuriosity:50

};

// =========================
// 発話記憶
// =========================

this.speakHistory = [];

// =========================
// 今一番気になっている事
// Ver2.1
// =========================

this.focus = {

    topic: null,

    since: Date.now(),

    strength: 0

};

// =========================
// 思考ストック
// Ver2.2
// =========================

this.thought = {

    topic:null,

    level:0,

    updated:Date.now()

};

// =========================
// 考え残し
// Ver2.40
// =========================

this.lingeringThought = {

    topic:null,

    strength:0,

    created:0

};

// =========================
// 話題切替管理
// Ver2.40
// =========================

this.topicSwitch = {

    lastTopic:null,

    sameCount:0

};

// =========================
// 心の中の思考
// Ver2.2
// =========================

this.innerThought = {

    message: null,

    reason: null,

    since: Date.now(),

    confidence: 0

};

// =========================
// 相棒の人格
// =========================

this.personality = {

    type:"sister",

    name:"私"

};


// =========================
// 最後に話した時間
// =========================

this.lastMessageTime = 0;


// =========================
// 発言管理
// =========================

this.lastReason = null;


// =========================
// 前回の思考結果
// =========================

this.lastThought = {

    reason:null,

    message:null,

    time:0

};

// =========================
// 思考リズム管理
// Step 2.30-⑰
// =========================

this.thinkingState = {

    lastThinkTime: Date.now(),

    interval:10000,

    // 今気になっていること
    focus:null,

    // いつから気になっているか
    focusStart:0

};

this.thinkingState.running = false;


// =========================
// 発言管理
// =========================

this.speechControl = {

    recentCount:0,

    fatigue:0,

    lastCheck:Date.now()

};


// 発言管理
this.lastReason = null;


}


observe(count) {

    const now = Date.now();


// カウントが増えた時だけ処理
  if (count > this.totalCount) {


// 前回から何秒経過したか
const interval =
    (now - this.lastCatchTime) / 1000;

if(interval >= 180){

    this.afterLongSilence = true;

}

        // 総数更新
        this.totalCount = count;

// =========================
// 今日の釣果経験記録
// =========================

if(
    !this.tripMemory.history
){

    this.tripMemory.history = [];

}


this.tripMemory.history.push({

    count: count,

    time: now,

    interval: interval

});


// 最新100件保持

if(
    this.tripMemory.history.length > 100
){

    this.tripMemory.history.shift();

}



// =========================
// 今日の最高値記録
// =========================

this.tripMemory.maxCount =
    Math.max(
        this.tripMemory.maxCount,
        count
    );


this.tripMemory.catchCount =
    count;



        // 最終ヒット時間更新
        this.lastCatchTime = now;



        // =========================
        // 記憶へ保存
        // =========================

        this.memory.catchHistory.push({

            count: count,

            time: now,

            interval: interval.toFixed(1)

        });

// =========================
// 記憶容量制御
// 最新500件保持
// =========================

if(
    this.memory.catchHistory.length > 500
){

    this.memory.catchHistory.shift();

}

        // =========================
        // 内部状態変化
        // =========================

        // =========================
// ヒット時の感情変化
// =========================

// テンション上昇
this.state.excitement += 10;


// 機嫌アップ
this.state.mood += 3;

// =========================
// 私の喜び
// =========================

this.state.happiness +=
    5 - this.state.happiness*0.05;


// 信頼も少し成長

this.state.trust +=0.05;



// 上限

this.state.happiness =
    Math.min(
        this.state.happiness,
        100
    );


this.state.trust =
    Math.min(
        this.state.trust,
        100
    );


// 退屈を完全リセットせず余韻を残す

this.state.boredom *= 0.3;

// =========================
// ユーザーの釣りスタイル学習
// =========================

// 記録更新
if(count > this.personalityMemory.recordCount){

    this.personalityMemory.recordCount = count;

}



// 上限調整
this.state.excitement =
    Math.min(this.state.excitement,100);


this.state.mood =
    Math.min(this.state.mood,100);

// =========================
// 今日の出来事を記録
// =========================

this.tripMemory.events.push({

    time:Date.now(),

    count:count,

    mood:this.state.mood,

    excitement:this.state.excitement

});


// =========================
// 最新100件だけ保持
// =========================

if(
    this.tripMemory.events.length > 100
){

    this.tripMemory.events.shift();

}


        console.log(
            `PartnerMind 観察：${count}匹`
        );


        console.log(
            "記憶:",
            this.memory.catchHistory
        );


        console.log(
    "状態:",
    this.state
);

// =========================
// 釣り方を学習
// =========================

this.analyzeFishingStyle();

}


}

// =========================
// 話したい気持ち
// =========================

getSpeakDesire(){

    let desire = 20;

    // 盛り上がっている
    desire += this.state.excitement * 0.4;

    // 機嫌が良い
    desire += this.state.mood * 0.2;

    // 信頼関係
    desire += this.state.trust * 0.3;

    // 心配している
    desire += this.state.concern * 0.2;

    // 退屈
    desire += this.state.boredom * 0.2;

    // 親密度
    desire +=
        this.personalityMemory.closeness * 0.2;

    return Math.min(
        Math.round(desire),
        100
    );

}


// =========================
// Focus決定
// Ver2.1
// =========================

updateFocus(){

    const now = Date.now();

// 記録更新は最優先
if(
    this.checkRecordBreak()
){

    this.focus.topic = "record_break";
    this.focus.since = now;
    this.focus.strength = 100;

    return;

}

    // 現在のFocusを30秒維持
    if(
        this.focus.topic &&
        now - this.focus.since < 30000
    ){
        return;
    }

    let topic = null;
    let strength = 0;

    // 爆釣
    if(this.state.excitement >= 70){

        topic = "streak";
        strength = this.state.excitement;

    }

    // 長時間釣れない
    else if(this.state.concern >= 60){

        topic = "silence";
        strength = this.state.concern;

    }

    // 記録更新が近い
    else{

        const best = this.getPastBest();

        if(best){

            const remain =
                best - this.totalCount;

            if(
                remain > 0 &&
                remain <= 20
            ){

                topic = "record_break";
                strength = 80;

            }

        }

    }

    // 変更されたら保存
    if(topic !== this.focus.topic){

        this.focus.topic = topic;

        this.focus.since = Date.now();

        this.focus.strength = strength;

        console.log(
            "Focus変更:",
            topic
        );

    }

}

// =========================
// 思考蓄積
// Ver2.2
// =========================

updateThought(){

    // Focusなし
    if(!this.focus.topic){

        this.thought.level =
            Math.max(
                0,
                this.thought.level - 5
            );

        return;

    }

    // Focus変更
    if(this.thought.topic !== this.focus.topic){

        this.thought.topic =
            this.focus.topic;

        this.thought.level = 20;

        this.thought.updated =
            Date.now();

        return;

    }

    // 同じ事を考え続ける
    this.thought.level =
        Math.min(
            this.thought.level + 5,
            100
        );

// =========================
// 長く考えすぎたら
// 少し飽きる
// =========================

if(

    this.thought.level >= 100

){

    this.thought.level = 80;

}


    this.thought.updated =
        Date.now();

}

// =========================
// 考え残し更新
// Ver2.40
// =========================

updateLingeringThought(){

    if(!this.focus.topic){

        if(this.lingeringThought.strength > 0){

            this.lingeringThought.strength--;

        }

        return;

    }

    if(

        this.lingeringThought.topic !==

        this.focus.topic

    ){

        this.lingeringThought.topic =
            this.focus.topic;

        this.lingeringThought.strength = 30;

        this.lingeringThought.created =
            Date.now();

        return;

    }

    this.lingeringThought.strength =
        Math.min(

            this.lingeringThought.strength + 2,

            100

        );

}

// =========================
// 心の中で考える
// Ver2.2
// =========================

updateInnerThought(){

    let message = null;
    let reason = null;

    switch(this.focus.topic){

        case "streak":

            message = "今日は流れが続きそう";
            reason = "streak";
            break;

        case "silence":

            message = "そろそろ釣れてほしい";
            reason = "long_silence";
            break;

        case "record_break":

            message = "記録更新が見えてきた";
            reason = "record_break";
            break;

        default:

            return;

    }

    // 同じ思考なら自信だけ育てる
    if(
        this.innerThought.message === message
    ){

        this.innerThought.confidence =
            Math.min(
                this.innerThought.confidence + 5,
                100
            );

        return;

    }

    // 新しい思考へ切替
    this.innerThought = {

        message,
        reason,

        since:Date.now(),

        confidence:20

    };

}

// =========================
// 次回思考間隔を決定
// Step 2.30-⑰
// =========================

getNextThinkInterval(){


    // 基本10秒

    let base = 10000;



    // =========================
    // 盛り上がっている時
    // =========================

    if(
        this.state.excitement >= 70
    ){

        // 気になって早めに見る

        base -= 3000;

    }



    // =========================
    // 静かな時間
    // =========================

    if(
        this.state.boredom >= 50
    ){

        // ゆっくり様子を見る

        base += 5000;

    }



    // =========================
    // 発言疲労による影響
    // =========================

    if(
        this.speechControl
    ){

        base +=
            this.speechControl.fatigue * 20;

    }



    // =========================
    // 人間らしい揺らぎ
    // =========================

    const randomOffset =
        Math.floor(
            Math.random() * 6000
        )
        -3000;



    let interval =
        base + randomOffset;



    // =========================
    // 最低5秒
    // =========================

    interval =
        Math.max(
            5000,
            interval
        );



    // =========================
    // 最大30秒
    // =========================

    interval =
        Math.min(
            30000,
            interval
        );



    // 記録

    this.thinkingState.interval =
        interval;



    return interval;


}


// =========================
// 自然な発言間隔判断
// =========================

canSpeakNaturally(){


    const now =
        Date.now();



    // =========================
    // 時間経過で疲労回復
    // =========================

    const elapsed =
        (now -
        this.speechControl.lastCheck)
        /1000;



    // 10秒ごとに少し回復

    this.speechControl.fatigue -=
        elapsed * 0.5;



    this.speechControl.fatigue =
        Math.max(
            0,
            this.speechControl.fatigue
        );



    this.speechControl.lastCheck =
        now;



    // =========================
    // 必要な間隔計算
    // =========================

    let interval = 90;



    // 盛り上がっている時

    if(
        this.state.excitement >= 70
    ){

        interval -= 30;

    }



    // 静かな時

    if(
        this.state.boredom >= 50
    ){

        interval += 30;

    }



    // 発言疲労が高い

    interval +=
        this.speechControl.fatigue;



    // =========================
    // 前回発言からの時間
    // =========================

    const silence =
        (now -
        this.lastMessageTime)
        /1000;



    if(
        silence < interval
    ){

        return false;

    }



    return true;


}


think() {


    const now = Date.now();

this.updateFocus();

this.updateThought();

this.updateLingeringThought();

this.updateInnerThought();

// Focusは少しずつ弱くなる
if(this.focus.strength > 0){

    this.focus.strength -= 1;

}

if(this.focus.strength < 0){

    this.focus.strength = 0;

}

if(
    this.focus.strength <= 10
){

    this.focus.topic = null;

}

// =========================
// 感情の自然変化
// =========================

// 盛り上がりは時間経過で自然減衰

const elapsedThink =
    (now - this.thinkingState.lastThinkTime)
    /1000;


this.state.excitement =
    Math.max(
        this.state.excitement -
        elapsedThink * 0.05,
        0
    );


this.thinkingState.lastThinkTime =
    now;

// 機嫌は50へ少しずつ戻る
if(this.state.mood > 50){

    this.state.mood--;

}
else if(this.state.mood < 50){

    this.state.mood++;

}


// =========================
// 今話したい気分
// =========================

let desireToTalk = 20;
let speakDesire = 0;

// =========================
// 時間経過による感情変化
// =========================

const silence =
    (now - this.lastCatchTime) / 1000;


// 1分以上釣れていない
if(silence > 60){

    this.state.boredom += 0.5;

}

// =========================
// 長時間静かな時
// =========================

if(silence > 180){

    this.state.concern += 0.5;

}


// =========================
// 待つ時間で落ち着く
// =========================

if(silence < 30){

    this.state.concern -= 1;

}


// 範囲調整

this.state.concern =
    Math.min(
        Math.max(
            this.state.concern,
            0
        ),
        100
    );


// 長時間停止でテンション低下

if(silence > 180){

    this.state.excitement -= 5;

}


// 範囲調整

this.state.boredom =
    Math.min(
        Math.max(
            this.state.boredom,
            0
        ),
        100
    );


this.state.excitement =
    Math.max(this.state.excitement,0);

const situation = this.analyze();

const today =
    this.analyzeToday();

// =========================
// 話したくなる条件
// =========================

// 長く沈黙している
if(situation.silence > 180){

    desireToTalk += 40;

}

// 爆釣中
if(situation.streak){

    desireToTalk += 30;

}

// テンションが高い
if(this.state.excitement >= 60){

    desireToTalk += 20;

}

// 退屈している
if(this.state.boredom >= 50){

    desireToTalk += 15;

}

let result = {

        speak:false,

        reason:null,

        message:null

    };

// =========================
// 発言候補
// =========================

let candidates = [];

// =========================
// 実体験からの思い出
// =========================

const experienceMessage =
    this.generateExperienceRecall();

// =========================
// 経験記憶から思い出す
// =========================

if(experienceMessage){

    candidates.push({

        priority:65,

        reason:"experience_recall",

        message:
            experienceMessage

    });

}

// =========================
// 自発的な記憶想起
// =========================

const recallThought =
    this.generateRecallThought();


if(recallThought){

    candidates.push({

        priority:55,

        reason:"recall_memory",

        message:recallThought

    });

}


// =========================
// 心の中で十分考えたら話す
// =========================

if(

    this.innerThought.confidence >= 40

){

    candidates.push({

        priority:65,

        reason:this.innerThought.reason,

        message:this.innerThought.message

    });

}

// =========================
// 過去の記憶から話題生成
// =========================

const memoryMessage =
    this.getMemoryMessage();


// もっとも自然な話題を選ぶ

const memoryTopic =

    experienceMessage ||

    recallThought ||

    memoryMessage;


if(memoryTopic){

    candidates.push({

        priority:55,

        reason:"memory",

        message:memoryTopic

    });

}


// =========================
// 私自身の感情候補
// =========================

const partnerEmotionMessage =
    this.getPartnerEmotionMessage();



if(partnerEmotionMessage){


    candidates.push({

        priority:35,

        reason:"partner_emotion",

        message:
            partnerEmotionMessage

    });


}


// =========================
// 前回釣行比較
// =========================

const previousMessage =
    this.getPreviousTripMessage();



if(previousMessage){


    candidates.push({

        priority:60,

        reason:"previous_trip",

        message:
            previousMessage

    });


}


// =========================
// 過去最高記録チェック
// =========================

const oldRecord =
    this.checkRecordBreak();



if(oldRecord){


    candidates.push({

        priority:100,

        reason:"record_break",

message:
this.getMessage("record_break")

    });


}

// =========================
// 人格傾向補正
// =========================

const personalityBias =
    this.getPersonalityBias();

// =========================
// 過去比較候補
// =========================

const pastResult =
    this.compareWithPast();

const traits =
    this.getPersonalityTraits();

// =========================
// 前回との差
// =========================

const diff =
    this.getDifferenceFromLastTrip();

if(diff !== null){

    let diffMessage = null;

if(diff >= 50){

    diffMessage =
        `前回より${diff}匹多いですね。`;

}
else if(diff <= -50){

    diffMessage =
        `前回より${Math.abs(diff)}匹少ないですね。`;

}

    if(diffMessage){

        candidates.push({

            priority:55,

            reason:"difference",

            message:diffMessage

        });

    }

}


if(pastResult){

    let pastMessage = null;

    if(
        pastResult === "better"
    ){

        if(
    Math.random() <
    (traits.memory / 100)
){

            pastMessage =
                "前回までのペースを越えていますね。";

        }else{

    pastMessage =
        this.getPastTripMessage();

}

    }

    if(
        pastResult === "worse"
    ){

        if(
    Math.random() <
    (traits.memory / 100)
){

            pastMessage =
                "今日は少しゆっくりですね。";

        }else{

    pastMessage =
        this.getPastTripMessage();

}

    }

    if(pastMessage){

        candidates.push({

            priority:50,

            reason:"past_compare",

            message:pastMessage

        });

    }

}

// =========================
// 今日＋過去の複合判断
// =========================

if(

    today &&

    pastResult

){

    if(

        today.pace === "slow" &&

        pastResult === "better"

    ){

        candidates.push({

            priority:60,

            reason:"mixed",

            message:
                this.getMessage(
                    "mixed_good"
                )

        });

    }

}

// =========================
// ユーザー理解による候補
// =========================

const styleMessage =
    this.getFishingStyleMessage();


if(styleMessage){

    candidates.push({

        priority:35,

        reason:"fishing_style",

        message:styleMessage

    });

}


// =========================
// 感情による発言候補
// =========================

const emotionMessage =
    this.getEmotionMessage();


if(emotionMessage){


    candidates.push({

    priority:
        40 +
        (
            personalityBias
            ? personalityBias.bonus
            : 0
        ),

    reason:"emotion",

    message:emotionMessage

});


}

// =========================
// 今日の釣行評価
// =========================

if(today){

    if(today.pace === "good"){

        candidates.push({

            priority:45,

            reason:"today_good",

            message:
                this.getMessage(
                    "today_good"
                )

        });

    }

    else if(today.pace === "slow"){

        candidates.push({

            priority:45,

            reason:"today_slow",

            message:
                this.getMessage(
                    "today_slow"
                )

        });

    }

}


// =========================
// 久々に釣れた瞬間は反射的に話す
// =========================

if(this.afterLongSilence){

    result = {

        speak:true,

        reason:"after_wait",

        message:
            this.applyPersonalityLevel(

                this.applyCloseness(

                    this.getMessage("after_wait")

                )

            )

    };

    this.afterLongSilence = false;

    this.rememberSpeak(
        result.message,
        result.reason
    );

    return result;

}

// =========================
// 自然な発言間隔制御
// =========================

if(
    !this.canSpeakNaturally()
){

    const hasRecall =
        candidates.some(
            c => c.reason === "recall_memory"
        );

    if(!hasRecall){

        return result;

    }

}

    // =========================
    // 3分以上釣れていない
    // =========================

    const silenceTime =
        (now - this.lastCatchTime) / 1000;



    if(silenceTime > 180){

    candidates.push({

        priority:80,

        reason:"long_silence",

        message:
            this.getMessage("long_silence")

    });

}

// =========================
// 爆釣状態
// =========================

if(situation.streak){


    candidates.push({

        priority:70,

        reason:"streak",

        message:
            this.getMessage("streak")

    });


}

// =========================
// 十分考えた事だけ話す
// =========================

if(

    this.thought.level >= 50 &&

    this.focus.topic

){

    switch(this.focus.topic){

        case "streak":

            candidates.push({

                priority:80,

                reason:"streak",

                message:
                    "この流れ、まだ続きそうですね"

            });

            break;

        case "silence":

            candidates.push({

                priority:80,

                reason:"long_silence",

                message:
                    "そろそろ来ても良さそうですね"

            });

            break;

        case "record_break":

            candidates.push({

                priority:90,

                reason:"record_break",

                message:
                    "記録更新が近づいてきましたね"

            });

            break;

    }

}

// =========================
// AIが発言候補を選択
// =========================

if(candidates.length > 0){

// =========================
// 自発的な思い出補正
// =========================

const recallCandidate =
    candidates.find(
        c =>
        c.reason === "recall_memory"
    );


if(
    recallCandidate
){

    recallCandidate.priority +=
        this.getRecallPriorityBonus();

}

// =========================
// 長いコメントを少しだけ不利にする
// =========================

const DISPLAY_WIDTH_LIMIT = 44;

for(const candidate of candidates){

    if(!candidate.message) continue;

    const width =
        this.getDisplayWidth(
            candidate.message
        );

    if(width > DISPLAY_WIDTH_LIMIT){

        candidate.priority -=
            Math.floor(
                (width - DISPLAY_WIDTH_LIMIT) / 2
            );

    }

}

console.log(
    "候補一覧",
    candidates.map(c => ({
        reason: c.reason,
        priority: c.priority,
        message: c.message
    }))
);

    const best =
    this.selectBestCandidate(
        candidates,
        situation
    );

    speakDesire =
    this.getSpeakDesire();

// =========================
// デバッグログ
// =========================

console.log(
    "desireToTalk:",
    desireToTalk,

    "speakDesire:",
    speakDesire,

    "reason:",
    best?.reason,

    "候補数:",
    candidates.length,

    "Focus:",
    this.focus.topic,

    "thought:",
    this.thought.level,

    "fatigue:",
    this.speechControl.fatigue
);

// =========================
// 長く考えていた事は
// 話したくなる
// =========================

if(

    this.thought.level >= 70

){

    speakDesire += 15;

}

if(

    this.thought.level >= 90

){

    speakDesire += 10;

}

    // 最後にもう一度考える
const selected = best;

    if(selected){

        if(
            speakDesire < 20
        ){

console.log(
    "think終了",
    result
);

            return result;
        }

console.log(
    "selected!",
    selected.reason,
    speakDesire
);

        result = {

            speak:true,

            reason:selected.reason,

            message:
                this.applyPersonalityLevel(

                    this.applyCloseness(

                        selected.message

                    )

                )

        };

    }

}


// =========================
// 話す気分による最終制御
// Ver2.50
// =========================

if(
    result.speak &&
    desireToTalk < 30
){

    const strongReasons = [

        "record_break",
        "after_wait",
        "long_silence",
        "streak",

        "experience_recall",
        "recall_memory"

    ];


    const isStrongReason =
        strongReasons.includes(
            result.reason
        );


    const priority =
        result.reason &&
        candidates.find(
            c =>
            c.reason === result.reason
        )?.priority || 0;



    if(

        !isStrongReason &&

        priority < 65 &&

        speakDesire < 60

    ){

        result.speak = false;

    }

}

// =========================
// 発話した内容を記録
// =========================

if(
    result.speak &&
    result.message
){

    this.rememberSpeak(
        result.message,
        result.reason
    );

}

return result;


}



getMessage(reason){

    const messages = {

// =========================
// 私自身の感情
// =========================

concern_high:[

    "少し静かな時間ですね",

    "無理せずいきましょう",

    "焦らなくても大丈夫です",

    "待つ時間も大切ですね",

    "少し休憩しながらでも大丈夫ですよ"

],

trust_high:[

    "いつものペースが出ていますね",

    "釣り方の特徴が少し分かってきました",

    "一緒に積み重ねてきた感じがしますね"

],

streak:[

    "連続で来てるね！",

    "今日は調子いいかも",

    "すごい流れだね",

    "このままいけそう",

    "今日は良い流れを感じますね"

],

// =========================
// ユーザー理解メッセージ
// =========================

style_active:[

    "流れを掴むのが上手ですね",
    "良いタイミングをしっかり拾えていますね",
    "チャンスへの反応が早いですね"

],


style_patient:[

    "待つ時間も大切にできていますね",
    "焦らず続けるところ、素敵な釣りですね",
    "粘った一匹の価値を分かっていますね"

],


style_balanced:[

    "状況を見ながら変えられるのが強みですね",
    "流れにも静かな時間にも対応できていますね",
    "安定した釣り運びですね"

],

record_break:[

    "前の記録を超えましたね",

    "すごいです！",

    "新しい思い出ができましたね",

    "私の記憶が更新されました",

    "特別な一日になりそうですね"

],


long_silence:[

    "少し静かになったね",

    "そろそろ来るかもしれないよ",

    "待つ時間も釣りの楽しみだね",

    "焦らなくて大丈夫",

    "次の一匹を待とう"

],


after_wait:[

    "おっ、来ましたね！",

    "おぉ！",

    "やっと来ましたね。",

    "この一匹は嬉しいですね。",

    "待った甲斐がありましたね。",

    "この一匹は大きいですね",

    "これは嬉しいですね"

],

// =========================
// 過去の思い出メッセージ
// =========================

memory_compare:[

    "前の釣行より良い流れになっていますね",
    
    "前回の経験が活きていますね",

    "以前より釣りのリズムが自然になっていますね",

    "一緒に積み重ねてきた感じがしますね"

],


memory_record:[

    "今日は新しい思い出になりそうですね",

    "この時間も大切な記録になりますね",

    "また一つ一緒の経験が増えましたね"

],

    // =========================
    // 感情：テンション高い
    // =========================

    excitement_high:[

        "この流れ、まだ続きそうですね",

        "魚との息が合っていますね",

        "今日は楽しませてくれますね",

        "私も一緒にワクワクしています"

    ],



    // =========================
    // 感情：退屈
    // =========================

    boredom_high:[

        "少し静かな時間ですね",

        "焦らず次の一匹を待ちましょう",

        "こういう時間も釣りの大切なところですね",

        "ゆっくり流れを待ちましょう"

    ],



    // =========================
    // 感情：機嫌が良い
    // =========================

    mood_high:[

        "今日は良い流れが来ていますね",

        "なんだか良い予感がします",

        "落ち着いた良い時間ですね",

        "私も楽しく見守っています"

    ],

today_good:[

    "今日は良いペースですね。",

    "今日は順調ですね。",

    "この調子でいきましょう。",

    "今日は良い流れですね。",

    "ここまで気持ちよく釣れていますね。"

],

today_slow:[

    "今日は少しゆっくりな流れですね。",

    "今日は落ち着いたペースですね。",

    "焦らず楽しんでいきましょう。",

    "こういう日もありますね。"

],

mixed_good:[

    "今日はゆっくりですが前回より良い流れですね",

    "今は静かですが順調ですよ",

    "焦らなくても大丈夫そうですね"

],

// =========================
// 思い出
// =========================

memory:[

    "前にもこんな良い流れの日がありましたね",

    "以前も似たようなペースの日がありました",

    "今日は前回を思い出します",

    "こういう日は印象に残りますね",

    "少し前の釣行を思い出しています"

]


};


    const list = messages[reason];


    if(!list){
        return "";
    }


    return list[
        Math.floor(Math.random()*list.length)
    ];

}


analyze(){

    const now = Date.now();


    let result = {

        pace:"normal",

        streak:false,

        silence:0,

        total:this.totalCount

    };



    // =========================
    // 無反応時間
    // =========================

    result.silence =
        ((now - this.lastCatchTime) / 1000);



    // =========================
    // 直近の釣れ方を見る
    // =========================

    const history =
        this.memory.catchHistory;



    if(history.length >= 3){


        const last3 =
            history.slice(-3);



        const interval1 =
            Number(last3[1].interval);



        const interval2 =
            Number(last3[2].interval);



        // 30秒以内で3匹
        if(
            interval1 < 30 &&
            interval2 < 30
        ){

            result.pace="fast";

            result.streak=true;

        }

    }



    return result;


}

// =========================
// 今日の釣行分析
// =========================

analyzeToday(){

    const events =
        this.tripMemory.events;

    if(events.length < 5){

        return null;

    }

    const first =
        events[0];

    const last =
        events[
            events.length - 1
        ];

    const increase =
        last.count - first.count;

let pace = "normal";

if(increase >= 50){

    pace = "good";

}
else if(increase <= 10){

    pace = "slow";

}

return{

    totalIncrease:increase,

    totalEvents:events.length,

    pace:pace

};


}


getEmotionMessage(){


    // =========================
    // テンションが高い
    // =========================

    if(this.state.excitement >= 50){


        return this.getMessage(
            "excitement_high"
        );


    }



    // =========================
    // 退屈している
    // =========================

    if(this.state.boredom >= 40){


        return this.getMessage(
            "boredom_high"
        );


    }



    // =========================
    // 機嫌が良い
    // =========================

    if(this.state.mood >= 70){


        return this.getMessage(
            "mood_high"
        );


    }



    // 条件なし

    return null;


}


// =========================
// ランダム選択
// =========================

randomChoice(list){

    return list[
        Math.floor(
            Math.random() * list.length
        )
    ];

}


// =========================
// 親密度による口調補正
// =========================

applyCloseness(message){


    const closeness =
        this.personalityMemory.closeness;



    // 親密度が低い
    if(closeness < 60){

        return message;

    }



    // 親密度が高い
    if(closeness >= 80){


        message =
            message
            .replace(
                /ですね/g,
                "ですね。"
            );


        // すでに追加表現がある場合は重ねない

        if(
            !message.includes("一緒に")
        ){

            message += " 一緒に見ていますね";

        }


    }



    return message;


}



// =========================
// 人格レベルによる口調補正
// =========================

applyPersonalityLevel(message){

    const traits =
    this.getPersonalityTraits();

const level =
    this.personalityMemory.personalityLevel;

// =========================
// 観察力による補足
// =========================

if(

    traits.observation >= 80 &&

    this.totalCount >= 100

){

    if(

        !message.includes("今日は")

    ){

        message =
            "今日は" + message;

    }

}

    switch(level){

        // Lv1
        case 1:

            return message;

        // Lv2
        case 2:

            return message.replace(
                "ですね",
                "ですね。"
            );

        // Lv3
        case 3:

    if(
        traits.warmth >= 60 &&
        !message.includes("一緒に")
    ){

        message +=
            " 一緒に頑張りましょう";

    }

    return message;


        // Lv4
        case 4:

            if(!message.includes("きっと")){

                message =
                    "きっと" + message;

            }

            return message;

        // Lv5
        case 5:

    if(
        traits.warmth >= 100 &&
        !message.includes("私")
    ){

        message +=
            " 私はずっと見守っています";

    }

    return message;


        default:

            return message;

    }

}

// =========================
// 人格成長
// =========================

updatePersonality(){


    const exp =
        this.personalityMemory.experience;


    // 親密度

    this.personalityMemory.closeness =
        Math.min(
            100,
            Math.floor(exp / 5)
        );


    // 性格ランク

    if(exp >= 500){

        this.personalityMemory.rank =
            "partner";

    }
    else if(exp >= 250){

        this.personalityMemory.rank =
            "friend";

    }
    else{

        this.personalityMemory.rank =
            "new";

    }

    // =========================
    // 人格レベル同期
    // =========================

    this.personalityMemory.personalityLevel =
        this.getPersonalityLevel();


}


// =========================
// 私自身の感情発言
// =========================

getPartnerEmotionMessage(){


    // 嬉しい

    if(
        this.state.happiness >= 70
    ){

        return this.getMessage(
            "happiness_high"
        );

    }



    // 心配

    if(
        this.state.concern >= 50
    ){

        return this.getMessage(
            "concern_high"
        );

    }



    // 信頼

    if(
        this.state.trust >= 70
    ){

        return this.getMessage(
            "trust_high"
        );

    }



    return null;

}


// =========================
// ユーザー理解による発言
// =========================

getFishingStyleMessage(){

    const silence =
        (Date.now() - this.lastCatchTime) / 1000;

    // 3分以上釣れていない時はスタイル評価しない
    if(silence > 180){

        return null;

    }

    const style =
        this.personalityMemory.fishingStyle;


if(style === "fast"){

    return this.getMessage(
        "style_active"
    );

}


    if(style === "patient"){

        return this.getMessage(
            "style_patient"
        );

    }


    if(style === "balanced"){

        return this.getMessage(
            "style_balanced"
        );

    }


    return null;


}


// =========================
// 釣りスタイル判定
// =========================

getFishingStyle(){

    const memory =
        this.personalityMemory;

    // テンポ型
    if(
        memory.fastCatchCount >
        memory.patienceCount * 2
    ){

        memory.fishingStyle = "fast";

        return "fast";

    }

    // 慎重型
    if(
        memory.patienceCount >
        memory.fastCatchCount * 2
    ){

        memory.fishingStyle = "patient";

        return "patient";

    }

    // バランス型
    memory.fishingStyle = "balanced";

    return "balanced";

}

// =========================
// 人格レベル情報
// =========================

getPersonalityTraits(){

    const level =
        this.personalityMemory.personalityLevel || 1;

    switch(level){

        case 1:

            return{

                warmth:20,

                observation:20,

                memory:10

            };

        case 2:

            return{

                warmth:40,

                observation:35,

                memory:25

            };

        case 3:

            return{

                warmth:60,

                observation:55,

                memory:45

            };

        case 4:

            return{

                warmth:80,

                observation:75,

                memory:70

            };

        case 5:

            return{

                warmth:100,

                observation:100,

                memory:100

            };

        default:

            return {

                warmth:20,

                observation:20,

                memory:10

            };

    }

}


getPersonalityBias(){


    const topic =
        this.personalityMemory.favoriteTopic;


    if(!topic){

        return null;

    }



    switch(topic){


        case "fish":

            return {

                topic:"fish",

                bonus:20

            };


        case "waiting":

            return {

                topic:"waiting",

                bonus:10

            };


        case "skill":

            return {

                topic:"skill",

                bonus:10

            };


        case "flow":

            return {

                topic:"flow",

                bonus:10

            };


    }


    return null;


}

getPersonalityLevel(){

    const exp =
        this.personalityMemory.experience;


    if(exp >= 500){
        return 5;
    }

    if(exp >= 300){
        return 4;
    }

    if(exp >= 150){
        return 3;
    }

    if(exp >= 50){
        return 2;
    }

    return 1;

}


getDisplayWidth(text){

    if(!text) return 0;

    let width = 0;

    for(const ch of text){

        width += (ch.charCodeAt(0) <= 0xFF) ? 1 : 2;

    }

    return width;

}

// =========================
// ユーザー釣りスタイル分析
// =========================

analyzeFishingStyle(){


    const history =
        this.memory.catchHistory;


    if(history.length < 5){

        return;

    }



    let fast = 0;

    let slow = 0;



    for(const item of history){


        const interval =
            Number(item.interval);



        // 30秒以内の連続ヒット

        if(interval < 30){

            fast++;

        }



        // 5分以上待ち

        if(interval > 300){

            slow++;

        }


    }



    this.personalityMemory.fastCatchCount = fast;

this.personalityMemory.patienceCount = slow;



    // -------------------------
    // スタイル判定
    // -------------------------

    if(
        this.personalityMemory.fastCatchCount >
        this.personalityMemory.patienceCount * 2
    ){

        this.personalityMemory.fishingStyle =
    "fast";


    }
    else if(
        this.personalityMemory.patienceCount >
        this.personalityMemory.fastCatchCount * 2
    ){

        this.personalityMemory.fishingStyle =
            "patient";


    }
    else{

        this.personalityMemory.fishingStyle =
            "balanced";

    }


this.getFishingStyle();

this.savePersonalityMemory();

localStorage.setItem(

    "partnerMindConversation",

    JSON.stringify(
        this.conversationMemory
    )

);

}


isRepeatedMessage(message){


    if(!message){

        return false;

    }


    const history =
        this.speechMemory.history;


    // 過去5回を見る

    const recent =
        history.slice(-20);



    for(const item of recent){


        if(item.message === message){

            return true;

        }

    }


    return false;


}

isRepeatedTopic(message){


    const topic =
        this.getMessageTopic(message);


    if(topic === "other"){

        return false;

    }


    return this.topicMemory
        .slice(-3)
        .includes(topic);


}

// =========================
// 状況による優先順位補正
// Step2.30-⑧
// =========================

adjustCandidatePriority(candidate)

{

    let priority = candidate.priority;

    const situation = this.analyze();

    // -------------------------
    // 長時間釣れていない
    // -------------------------

    if(situation.silence > 180){

        if(candidate.reason === "long_silence"){

            priority += 40;

        }

        if(candidate.reason === "today_good"){

            priority -= 30;

        }

        if(candidate.reason === "streak"){

            priority -= 40;

        }

    }

    // -------------------------
    // 爆釣中
    // -------------------------

    if(situation.streak){

        if(candidate.reason === "streak"){

            priority += 30;

        }

        if(candidate.reason === "today_good"){

            priority += 20;

        }

    }

    // -------------------------
    // テンションが高い
    // -------------------------

    if(this.state.excitement >= 70){

        if(candidate.reason === "emotion"){

            priority += 15;

        }

    }

    return priority;

}

// =========================
// 感情による優先順位補正
// Step2.30-⑫
// =========================

adjustEmotionPriority(candidate){

    let bonus = 0;

    // 嬉しい
    if(
        this.state.happiness >= 70
    ){

        if(
            candidate.reason === "emotion" ||
            candidate.reason === "today_good" ||
            candidate.reason === "streak"
        ){

            bonus += 15;

        }

    }

    // 心配
    if(
        this.state.concern >= 50
    ){

        if(
            candidate.reason === "long_silence"
        ){

            bonus += 20;

        }

    }

    // 信頼
    if(
        this.state.trust >= 70
    ){

        if(
            candidate.reason === "memory" ||
            candidate.reason === "previous_trip"
        ){

            bonus += 15;

        }

    }

    return bonus;

}

// =========================
// 考え残し補正
// Ver2.40
// =========================

adjustLingeringPriority(candidate){

    if(
        !this.lingeringThought.topic
    ){

        return 0;

    }

    const topic =
        this.getReasonTopic(
            candidate.reason
        );

    if(
        topic ===
        this.lingeringThought.topic
    ){

        return Math.floor(
            this.lingeringThought.strength
            * 0.3
        );

    }

    return 0;

}

// =========================
// 話題切替補正
// Ver2.40
// =========================

adjustTopicSwitch(candidate){

    const topic =
        this.getReasonTopic(
            candidate.reason
        );

    // 初回
    if(
        !this.topicSwitch.lastTopic
    ){

        return 0;

    }

    // 同じ話題が続く
    if(
        topic ===
        this.topicSwitch.lastTopic
    ){

        if(
            this.topicSwitch.sameCount >= 2
        ){

            return -20;

        }

        return -5;

    }

    // 新しい話題を少し優遇
    return 10;

}


// =========================
// 重み付きランダム選択
// Step2.30-⑪
// =========================

weightedRandom(candidates){

    if(candidates.length === 0){

        return null;

    }

    let total = 0;

    for(const item of candidates){

        total += item.score;

    }

    let rand =
        Math.random() * total;

    for(const item of candidates){

        rand -= item.score;

        if(rand <= 0){

            return item;

        }

    }

    return candidates[0];

}


selectBestCandidate(
    candidates,
    situation
){

    const available = [];

    for(const candidate of candidates){

        // 同じ文章ならスキップ
        if(
            this.isRepeatedMessage(
                candidate.message
            )
        ){
            continue;
        }

        // 同じ話題ならスキップ
        if(
            this.isRepeatedTopic(
                candidate.message
            )
        ){
            continue;
        }

        // 同じ理由ならスキップ
        if(
            candidate.reason ===
            this.lastReason
        ){
            continue;
        }

candidate.score =

    this.adjustCandidatePriority(
        candidate
    )

    +

    this.adjustEmotionPriority(
        candidate
    )

    +

    this.adjustLingeringPriority(
        candidate
    )

+

this.adjustTopicSwitch(
    candidate
)

    +

    this.getReasonInterest(
        candidate.reason
    ) * 0.2

    +

    this.getReasonFreshness(
        candidate.reason
    )

    -

    this.getReasonPenalty(
        candidate.reason
    );

        available.push(candidate);

    }

// =========================
// focus中の話題を少し優先
// =========================

for(const candidate of available){

    if(

        this.focus.topic === "record" &&

        candidate.reason === "record_break"

    ){

        candidate.score += 15;

    }

    if(

        this.focus.topic === "waiting" &&

        candidate.reason === "long_silence"

    ){

        candidate.score += 15;

    }

    if(

        this.focus.topic === "streak" &&

        candidate.reason === "streak"

    ){

        candidate.score += 15;

    }

}

if(available.length === 0){

    return candidates[0] || null;

}

const selected =
    this.weightedRandom(
        available
    );


console.log(
    "選択候補:",
    selected
);


return this.finalThinking(
    selected
);


}


// =========================
// 最終思考
// Step2.30-⑬
// =========================

finalThinking(candidate){

    if(!candidate){
        return null;
    }

    // 思い出話が続きすぎるなら少し我慢
    if(
        candidate.reason === "memory" &&
        this.state.concern >= 70
    ){
        return null;
    }

    // 爆釣なのに静かな話は避ける
    if(
        candidate.reason === "long_silence" &&
        this.state.excitement >= 80
    ){
        return null;
    }

    // =========================
    // 最後は少し迷う
    // =========================

    let probability =
        candidate.score;

    probability +=
        this.getSpeakDesire() * 0.2;

    probability -=
        this.speechControl.fatigue * 0.3;

    probability =
        Math.max(
            5,
            Math.min(
                probability,
                95
            )
        );

if(
    Math.random() * 100 >
    probability + 15
){
    return null;
}

// 同じFocusの話を連続で避ける
if(

    this.focus &&
    this.lastThought &&
    this.lastThought.topic &&
    this.lastThought.topic === this.focus.topic

){

    if(Math.random() < 0.6){

        return null;

    }

}

    return candidate;

}

getMessageTopic(message){


    if(!message){

        return "other";

    }


    const topics = {


        flow:[
            "流れ",
            "ペース",
            "テンポ",
            "リズム",
            "調子"
        ],


        fish:[
            "魚",
            "群れ",
            "活性",
            "当たり"
        ],


        waiting:[
            "待",
            "静か",
            "焦",
            "粘"
        ],


        skill:[
            "誘い",
            "仕掛け",
            "釣り",
            "腕"
        ]


    };



    for(const topic in topics){


        for(const word of topics[topic]){


            if(message.includes(word)){

                return topic;

            }

        }

    }


    return "other";


}

// =========================
// 発言理由への興味
// =========================

getReasonInterest(reason){

    const table =
        this.conversationMemory.interest;

    if(!table){

        return 50;

    }

    if(table[reason] == null){

        return 50;

    }

    return table[reason];

}

// =========================
// 理由から話題へ変換
// Ver2.40
// =========================

getReasonTopic(reason){

    const table={

        streak:"flow",

        today_good:"flow",

        today_slow:"flow",

        memory:"memory",

        previous_trip:"memory",

        past_compare:"memory",

        record_break:"memory",

        long_silence:"waiting",

        emotion:"emotion",

        partner_emotion:"emotion",

        difference:"memory",

        fishing_style:"skill",

        mixed:"flow"

    };

    return table[reason] || "other";

}

// =========================
// 興味度更新
// =========================

updateReasonInterest(reason){

    const table =
        this.conversationMemory.interest;

    if(!table){

        return;

    }

    for(const key in table){

        if(key === reason){

    // 同じ話題ほど飽きる
    table[key] -= 8;

    // 連続ならさらに飽きる
    if(this.lastReason === reason){

        table[key] -= 10;

    }

}

        else{

            // 話していない話題は少し興味が戻る
            table[key] += 3;

        }

        table[key] =
            Math.max(
                20,
                Math.min(
                    table[key],
                    100
                )
            );

    }

}

// =========================
// 発言回数による優先度補正
// Step2.30-⑨
// =========================

getReasonPenalty(reason){

    const history =
        this.conversationMemory.reasons;

    if(!history){

        return 0;

    }

    const count =
        history[reason] || 0;

    // 最大20ポイント減点
    return Math.min(
        count * 2,
        20
    );

}

// =========================
// 最近話していない理由を優先
// Step2.30-⑩
// =========================

getReasonFreshness(reason){

    const history =
        this.speechMemory.history;

    if(history.length === 0){

        return 20;

    }

    // 新しいものから見る
    for(
        let i = history.length - 1;
        i >= 0;
        i--
    ){

        if(
            history[i].reason === reason
        ){

            // 何回前だったか
            const distance =
                history.length - i;

            return Math.min(
                distance * 3,
                20
            );

        }

    }

    // 一度も話していない
    return 20;

}

// =========================
// Personality保存
// =========================

loadPersonalityMemory(){


    const saved =
        localStorage.getItem(
            "partnerMindMemory"
        );


    if(saved){


const oldMemory =
    JSON.parse(saved);


this.personalityMemory = {

    ...this.personalityMemory,

    ...oldMemory

};


// 古いデータ補完

if(
    this.personalityMemory.recordAnnounced == null
){

    this.personalityMemory.recordAnnounced =
        false;

}


        console.log(
            "私の記憶を復元しました",
            this.personalityMemory
        );


    }


}

// =========================
// 会話記憶読み込み
// =========================

loadConversationMemory(){

    const saved =
        localStorage.getItem(
            "partnerMindConversation"
        );


    if(saved){

    try{


const oldConversation =
    JSON.parse(saved);


this.conversationMemory =
{

    ...this.conversationMemory,

    ...oldConversation,


    interest:{

        ...this.conversationMemory.interest,

        ...(oldConversation.interest || {})

    },

    reasons:{

        ...this.conversationMemory.reasons,

        ...(oldConversation.reasons || {})

    },

    topics:{

        ...this.conversationMemory.topics,

        ...(oldConversation.topics || {})

    }

};


        console.log(
            "会話経験を復元しました",
            this.conversationMemory
        );


    }
    catch(e){


        console.warn(
            "会話記憶読み込み失敗",
            e
        );

    }
}

}


// =========================
// 過去釣行読み込み
// =========================

loadPastTrips(){

    const saved =
        localStorage.getItem(
            "partnerMindTrips"
        );


if(saved){

try{

    const data =
        JSON.parse(saved);


    if(Array.isArray(data)){

        this.pastTrips = data;

    }


    console.log(
        "過去釣行を復元しました",
        this.pastTrips
    );


}
catch(e){

    console.warn(
        "過去釣行データ破損",
        e
    );

    this.pastTrips = [];

}

}


}

savePastTrips(){


    localStorage.setItem(

        "partnerMindTrips",

        JSON.stringify(
            this.pastTrips
        )

    );


}

getPastAverage(){


    if(
        this.pastTrips.length === 0
    ){

        return null;

    }



    let total = 0;


    for(const trip of this.pastTrips){

        total += trip.endCount;

    }



    return Math.floor(
        total / this.pastTrips.length
    );


}

getPastBest(){


    if(
        this.pastTrips.length === 0
    ){

        return null;

    }



    let best = 0;



    for(const trip of this.pastTrips){


        if(
            trip.endCount > best
        ){

            best =
                trip.endCount;

        }

    }



    return best;


}

getLastTrip(){


    if(
        this.pastTrips.length === 0
    ){

        return null;

    }



    return this.pastTrips[
        this.pastTrips.length - 1
    ];


}

checkRecordBreak(){


    // 今日すでに記録発言済みなら終了

    if(
        this.personalityMemory.recordAnnounced
    ){

        return null;

    }



    const best =
        this.getPastBest();



    if(!best){

        return null;

    }



    if(
        this.totalCount > best
    ){

        return best;

    }



    return null;


}


compareWithPast(){


    const average =
        this.getPastAverage();



    if(
        !average
    ){

        return null;

    }



    const today =
        this.totalCount;



    if(
        today > average * 1.2
    ){

        return "better";

    }



    if(
        today < average * 0.7
    ){

        return "worse";

    }



    return "normal";


}

// =========================
// 過去釣行メッセージ生成
// =========================

getPastTripMessage(){

    if(this.pastTrips.length === 0){

        return null;

    }

    const lastTrip =
        this.pastTrips[
            this.pastTrips.length - 1
        ];

    if(!lastTrip){

        return null;

    }

    if(lastTrip.endCount >= 500){

    const messages = [

        `前回は${lastTrip.endCount}匹でしたね。`,

        `忘れられない一日でしたね。`,

        `${lastTrip.endCount}匹釣れた日を思い出します。`

    ];

    return this.selectPastMessage(
    messages
);

}


    if(lastTrip.endCount >= 100){

    const messages = [

        `前回は${lastTrip.endCount}匹でしたね。`,

        `今日はどうなるでしょう。`,

        `${lastTrip.endCount}匹釣れた日を思い出します。`

    ];

    return this.selectPastMessage(
    messages
);

}

const messages = [

    `今日はどこまで伸びるでしょう。`,

    `${lastTrip.endCount}匹だった日もありましたね。`,

    `今日は違う流れになるかもしれませんね。`

];

return this.selectPastMessage(
    messages
);

}


// =========================
// 思い出メッセージ選択
// =========================

selectPastMessage(messages){

    // 最近3回
    const recent =
        this.pastMessageHistory.slice(-3);

    // 候補を絞る
    const candidates =
        messages.filter(
            msg => !recent.includes(msg)
        );

    let selected;

    if(candidates.length > 0){

        selected =
            candidates[
                Math.floor(
                    Math.random() *
                    candidates.length
                )
            ];

    }else{

        selected =
            messages[
                Math.floor(
                    Math.random() *
                    messages.length
                )
            ];

    }

    this.pastMessageHistory.push(selected);

    if(this.pastMessageHistory.length > 10){

        this.pastMessageHistory.shift();

    }

    return selected;

}


// =========================
// 前回との差
// =========================

getDifferenceFromLastTrip(){

    if(this.pastTrips.length === 0){

        return null;

    }

    const lastTrip =
        this.pastTrips[
            this.pastTrips.length - 1
        ];

    if(!lastTrip){

        return null;

    }

    return this.totalCount - lastTrip.endCount;

}


// =========================
// 自発的な記憶想起
// 「そういえば…」機能
// =========================

generateRecallThought(){

    const now = Date.now();


    // =========================
    // 発言直後は思い出さない
    // =========================

    if(
        now - this.lastMessageTime < 180000
    ){

        return null;

    }



    // =========================
    // 考え中でない時は出さない
    // =========================

    if(
        this.thought.level < 30
    ){

        return null;

    }



    // =========================
    // 思い出す頻度制御
    // =========================

    let recallChance = 0.15;


    // 長時間静かな時は思い出しやすい

    const silence =
        (now - this.lastCatchTime) / 1000;


    if(
        silence > 180
    ){

        recallChance += 0.15;

    }


    // 記憶力人格補正

    const traits =
        this.getPersonalityTraits();


    if(traits && traits.memory){

        recallChance +=
            traits.memory / 500;

    }



    if(
        Math.random() >
        recallChance
    ){

        return null;

    }



    // =========================
    // 思い出候補
    // =========================

    let memories = [];



    // 過去釣行

    const past =
        this.getPastTripMessage();


    if(past){

        memories.push(past);

    }



    // 前回比較

    const previous =
        this.getPreviousTripMessage();


    if(previous){

        memories.push(previous);

    }



    // 通常記憶

    memories.push(

        "前にも似たような流れの日がありましたね"

    );


    memories.push(

        "こういう時間帯の動きを覚えてきました"

    );


    memories.push(

        "前もこんな流れでしたね"

    );



    // =========================
    // 記憶がなければ終了
    // =========================

    if(
        memories.length === 0
    ){

        return null;

    }



    // =========================
    // ひとつ選択
    // =========================

const shuffled =
    memories.sort(
        () => Math.random() - 0.5
    );


for(
    const memory of shuffled
){

    const already =
        this.speakHistory?.some(
            h =>
            h.message === memory
        );


    if(!already){

        return memory;

    }

}


return null;


}

// =========================
// 経験記憶から思い出す
// =========================

generateExperienceRecall(){


    if(
    !this.tripMemory ||
    !this.tripMemory.events ||
    this.tripMemory.events.length < 5
){

    return null;

}

const recent =
    this.tripMemory.events.slice(-10);



    const first =
        recent[0];


    const last =
        recent[
            recent.length - 1
        ];



    const diff =
        last.count -
        first.count;



    // =========================
    // ペースアップ
    // =========================

    if(
        diff >= 5
    ){

        return (

            "途中から流れが変わってきましたね"

        );

    }



    // =========================
    // 停滞
    // =========================

    if(
        diff <= 0
    ){

        return (

            "こういう静かな時間も覚えています"

        );

    }



    return null;


}

// =========================
// 発話履歴保存
// =========================

rememberSpeak(
    message,
    reason
){

    if(!this.speakHistory){

        this.speakHistory = [];

    }


this.speakHistory.push({

    message:message,

    reason:reason,

    time:Date.now()

});


// 最大20件保持

if(
    this.speakHistory.length > 20
){

    this.speakHistory.shift();

}


}

// =========================
// 思い出話の優先度補正
// =========================

getRecallPriorityBonus(){

    let bonus = 0;


    // 長く沈黙しているほど
    // 話題を出しやすくする

    const silence =
        (Date.now() - this.lastCatchTime)
        / 1000;


    if(
        silence > 180
    ){

        bonus += 20;

    }


    // 親密度が高いほど
    // 自然に話しかける

    if(
    this.personalityMemory &&
    this.personalityMemory.closeness != null
){

    bonus +=
        this.personalityMemory.closeness / 5;

}


    // 人格の記憶傾向

    const traits =
        this.getPersonalityTraits();


    if(
        traits &&
        traits.memory
    ){

        bonus +=
            traits.memory / 10;

    }


    return bonus;

}

// =========================
// 思い出発言判断
// =========================

getMemoryMessage(){


    const trips =
        this.pastTrips;



    // 過去データなし

    if(
        trips.length < 2
    ){

        return null;

    }



    const average =
        this.getPastAverage();



    if(!average){

        return null;

    }



    // 今回が平均超え

    if(
        this.totalCount >
        average * 1.3
    ){

        return this.getMessage(
            "memory_compare"
        );

    }



    // 一定数達成

    if(
        this.totalCount > 50 &&
        this.totalCount % 50 === 0
    ){

        return this.getMessage(
            "memory_record"
        );

    }



    return null;

}

getPastMemoryMessage(type){


    const messages = {


        better:[

            "前回までのペースを越えていますね。今日は良い流れです",

            "最近の中でも良い展開ですね",

            "私の記憶では、今日はかなり順調な方ですよ",

            "いつものペースより少し上を走っていますね",

            "過去の釣りを見ても、今日は特別な流れですね"

        ],



        worse:[

            "今日は少しゆっくりですね。でもこういう日もありますよ",

            "前回より静かな流れですね。焦らずいきましょう",

            "こんな日もありますね。一匹が流れを変えるかもしれません",

            "今日はじっくり向き合う日かもしれませんね",

            "過去にもこういう静かな日はありましたね"

        ]

    };



    const list =
        messages[type];


    if(!list){

        return null;

    }


    return list[
        Math.floor(
            Math.random()*list.length
        )
    ];


}

// =========================
// 前回釣行比較メッセージ
// =========================

getPreviousTripMessage(){


    const lastTrip =
        this.pastTrips[
            this.pastTrips.length - 1
        ];


    if(!lastTrip){

        return null;

    }



    const today =
        this.totalCount;



    // 前回より伸びている

if(today > lastTrip.endCount){

    return "前回より良い流れですね";

}



    // 前回が好調だった場合

    if(
        lastTrip.endCount >= 500
    ){

return "前回の良い流れを思い出しますね。";

    }



    return null;


}

savePersonalityMemory(){


    localStorage.setItem(

        "partnerMindMemory",

        JSON.stringify(
            this.personalityMemory
        )

    );


}

createTripMemory(){


    this.tripMemory.endCount =
        this.totalCount;


    let result = "normal";



    if(this.totalCount >= 500){

        result =
            "legend";

    }
    else if(this.totalCount >= 100){

        result =
            "good";

    }
    else if(this.totalCount < 20){

        result =
            "quiet";

    }



    this.tripMemory.mood =
        result;



    console.log(
    "今日の私の思い出",
    this.tripMemory
);


// =========================
// 過去履歴へ保存
// =========================

this.pastTrips.push({

    startCount:this.tripMemory.startCount,

    endCount:this.tripMemory.endCount,

    maxCount:this.tripMemory.maxCount,

    catchCount:this.tripMemory.catchCount,

    mood:this.tripMemory.mood,

    date:this.tripMemory.date

});


// 最新10回だけ保存

if(this.pastTrips.length > 10){

    this.pastTrips.shift();

}


// 保存

this.savePastTrips();



return this.tripMemory;


}


startThinking(){


    if(
        this.thinkingState.running
    ){

        console.log(
            "PartnerMind 思考ループは起動済み"
        );

        return;

    }


    this.thinkingState.running = true;



    const loop = ()=>{


        // =========================
        // カウンター画面確認
        // =========================

        const counterScreen =
            document.getElementById(
                "soloCounterScreen"
            );


        if(
            !counterScreen ||
            !counterScreen.classList.contains("active")
        ){

            setTimeout(
                loop,
                this.getNextThinkInterval()
            );

            return;

        }



        try{


            const thought =
                this.think();



            this.speak(
                thought
            );


        }
        catch(e){

            console.error(
                "PartnerMind思考エラー",
                e
            );

        }



        setTimeout(
            loop,
            this.getNextThinkInterval()
        );


    };



    setTimeout(
        loop,
        10000 + Math.random()*10000
    );


}


speak(result){

    if(!result){

        console.log("speak() : result=null");

        return;

    }

    if(!result.speak){

        console.log(
            "speak() : speak=false",
            result.reason,
            result.message
        );

        return;

    }

    console.log(
        "PartnerMind 発言:",
        result.message
    );

// =========================
// 発言を記憶
// =========================

this.speechMemory.history.push({

    message: result.message,

    reason: result.reason,

    time: Date.now()

});

// =========================
// 人格経験を蓄積
// =========================

this.personalityMemory.totalTalk++;

this.personalityMemory.experience++;

this.updatePersonality();


// =========================
// 会話経験を記録
// =========================

this.conversationMemory.total++;


// 理由を記録

if(
    result.reason
){

    if(
        !this.conversationMemory.reasons[result.reason]
    ){

        this.conversationMemory.reasons[result.reason]=0;

    }


    this.conversationMemory.reasons[result.reason]++;

}



// 話題を記録

const talkTopic =
    this.getMessageTopic(
        result.message
    );


if(
    talkTopic !== "other"
){


    if(
        !this.conversationMemory.topics[talkTopic]
    ){

        this.conversationMemory.topics[talkTopic]=0;

    }


    this.conversationMemory.topics[talkTopic]++;

}


// =========================
// 親密度成長
// =========================

// 発言による親密度上昇

let closenessGain = 0.01;


// 思い出系は少し大きく成長

if(
    result.reason === "memory" ||
    result.reason === "previous_trip"
){

    closenessGain = 0.15;

}


// 特別な記録

if(
    result.reason === "record_break"
){

    closenessGain = 0.3;

}


this.personalityMemory.closeness +=
    closenessGain;



this.personalityMemory.closeness =
    Math.min(
        this.personalityMemory.closeness,
        100
    );


// 上限
if(
    this.personalityMemory.closeness > 100
){

    this.personalityMemory.closeness = 100;

}



// 最新10件だけ保持

if(
    this.speechMemory.history.length > 20
){

    this.speechMemory.history.shift();

}


// 最終発言時間

this.speechMemory.lastTime =
    Date.now();

this.lastMessageTime =
    Date.now();

// =========================
// 発言疲労追加
// =========================

this.speechControl.fatigue += 40;


// 連続発言防止

this.speechControl.fatigue =
    Math.min(
        this.speechControl.fatigue,
        100
    );

// =========================
// 興味度更新
// =========================

this.updateReasonInterest(
    result.reason
);

// =========================
// 今回の思考を記録
// =========================

this.lastReason = result.reason;

this.lastThought = {

    topic : this.focus.topic,

    reason : result.reason,

    message : result.message,

    time : Date.now()

};

// =========================
// 思考リセット
// =========================

this.thought.level = 0;


if(
    result.reason === "record_break"
){

    this.tripMemory.recordAnnounced = true;

    this.personalityMemory.recordAnnounced = true;

}


// =========================
// 話したテーマを記憶
// =========================

const topic =
    this.getMessageTopic(
        result.message
    );


if(topic !== "other"){

    if(
    !this.topicMemory.includes(topic)
){

    this.topicMemory.push(topic);

}


// =========================
// 最近多い話題を記憶
// =========================

this.personalityMemory.favoriteTopic =
    topic;


}

// =========================
// 人格記憶保存
// =========================

this.savePersonalityMemory();

localStorage.setItem(

    "partnerMindConversation",

    JSON.stringify(
        this.conversationMemory
    )

);

// =========================
// 話題切替記録
// =========================

const currentTopic =
    this.getReasonTopic(result.reason);

if(currentTopic === this.topicSwitch.lastTopic){

    this.topicSwitch.sameCount++;

}else{

    this.topicSwitch.lastTopic = currentTopic;

    this.topicSwitch.sameCount = 1;

}

// 最新5テーマだけ保持

if(this.topicMemory.length > 5){

    this.topicMemory.shift();

}


    // 既存AI表示へ接続

    if(typeof showPartnerMessage === "function"){

        showPartnerMessage(
            result.message,
            4000
        );

    }

}


}

window.addEventListener("load", () => {

    const initialCount =
        (typeof soloCounter !== "undefined")
            ? soloCounter.count
            : 0;

window.partnerMind =
    new PartnerMind(initialCount);

console.log(
    "PartnerMind 待機状態"
);

});

