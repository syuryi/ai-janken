let maxRounds = 5;
let currentRound = 0;

let wins = 0;
let losses = 0;

let difficulty = "normal";

const hands = ["グー", "チョキ", "パー"];

const history = {
    グー: 0,
    チョキ: 0,
    パー: 0
};

// 設定
function setMatch(num, btn) {
    maxRounds = num;

    clearSelection("#title-screen button");

    btn.classList.add("selected");

    document.getElementById("status").textContent =
        `勝負回数を ${num} 回に設定`;
}

function setDifficulty(level, btn) {
    difficulty = level;

    clearSelection("#title-screen button");

    btn.classList.add("selected");

    document.getElementById("status").textContent =
        `難易度を ${level} に設定`;
}

// ゲーム開始
function startGame() {
    document.getElementById("title-screen").classList.remove("active");
    document.getElementById("game-screen").classList.add("active");
    updateUI();
}

// AIロジック
function getAIHand() {

    const total = history.グー + history.チョキ + history.パー;

    let predicted = "グー";

    if (history.チョキ > history[predicted]) predicted = "チョキ";
    if (history.パー > history[predicted]) predicted = "パー";

    // 難易度
    if (difficulty === "easy") {
        return hands[Math.floor(Math.random() * 3)];
    }

    if (difficulty === "normal") {
        return Math.random() < 0.7 ? counter(predicted) : randomHand();
    }

    return counter(predicted); // hard
}

function counter(hand) {
    if (hand === "グー") return "パー";
    if (hand === "チョキ") return "グー";
    return "チョキ";
}

function randomHand() {
    return hands[Math.floor(Math.random() * 3)];
}

// プレイ
function play(player) {

    if (currentRound >= maxRounds) return;

    history[player]++;

    const ai = getAIHand();

    let result = "";

    if (player === ai) {
        result = "引き分け";
    } else if (
        (player === "グー" && ai === "チョキ") ||
        (player === "チョキ" && ai === "パー") ||
        (player === "パー" && ai === "グー")
    ) {
        result = "勝ち";
        wins++;
    } else {
        result = "負け";
        losses++;
    }

    currentRound++;

    updateUI();

    document.getElementById("result").textContent =
        `あなた:${player} / AI:${ai} → ${result}`;

    // ★ここがポイント（最後の1回もちゃんと反映）
    if (currentRound === maxRounds) {
        setTimeout(endGame, 300);
    }
}

// UI更新
function updateUI() {

    document.getElementById("round-text").textContent =
        `${currentRound} / ${maxRounds}`;

    document.getElementById("wins").textContent = wins;
    document.getElementById("losses").textContent = losses;

    const total = history.グー + history.チョキ + history.パー;

    const learning = Math.min(100, total * 10);
    document.getElementById("learning").textContent = learning;

    let predicted = "グー";
    if (history.チョキ > history[predicted]) predicted = "チョキ";
    if (history.パー > history[predicted]) predicted = "パー";

    document.getElementById("prediction").textContent = predicted;
}

// 終了
function endGame() {

    document.getElementById("game-screen").classList.remove("active");
    document.getElementById("end-screen").classList.add("active");

    let text = "";

    if (wins > losses) text = "あなたの勝ち！🎉";
    else if (wins < losses) text = "AIの勝ち！🤖";
    else text = "引き分け！";

    document.getElementById("final-result").textContent = text;

    document.getElementById("summary").textContent =
        `あなた:${wins}勝 / AI:${losses}勝`;
}

function clearSelection(className) {
    document.querySelectorAll(className).forEach(btn => {
        btn.classList.remove("selected");
    });
}