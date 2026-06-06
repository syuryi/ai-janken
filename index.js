const hands = ["グー", "チョキ", "パー"];

let wins = 0;
let losses = 0;
let draws = 0;

// AI学習データ
const history = {
    グー: 0,
    チョキ: 0,
    パー: 0
};

function getAIHand() {

    const total =
        history["グー"] +
        history["チョキ"] +
        history["パー"];

    // 最初の数回はランダム
    if (total < 3) {
        return hands[Math.floor(Math.random() * 3)];
    }

    let predicted = "グー";

    if (history["チョキ"] > history[predicted]) {
        predicted = "チョキ";
    }

    if (history["パー"] > history[predicted]) {
        predicted = "パー";
    }

    // 予測した手に勝つ手を出す
    if (predicted === "グー") return "パー";
    if (predicted === "チョキ") return "グー";
    return "チョキ";
}

function play(playerHand) {

    history[playerHand]++;

    const aiHand = getAIHand();

    document.getElementById("player-hand").textContent = playerHand;
    document.getElementById("ai-hand").textContent = aiHand;

    let result = "";

    if (playerHand === aiHand) {
        result = "引き分け！";
        draws++;
    } else if (
        (playerHand === "グー" && aiHand === "チョキ") ||
        (playerHand === "チョキ" && aiHand === "パー") ||
        (playerHand === "パー" && aiHand === "グー")
    ) {
        result = "あなたの勝ち！";
        wins++;
    } else {
        result = "AIの勝ち！";
        losses++;
    }

    document.getElementById("result").textContent = result;

    document.getElementById("wins").textContent = wins;
    document.getElementById("losses").textContent = losses;
    document.getElementById("draws").textContent = draws;

    const comments = [
        "その手、読めてるぞ🤖",
        "学習データ更新完了。",
        "またその手？覚えたよ。",
        "ふむふむ、そのクセね。",
        "AIは進化している...",
        "次は勝たせてもらうよ。"
    ];

    document.getElementById("comment").textContent =
        comments[Math.floor(Math.random() * comments.length)];
}