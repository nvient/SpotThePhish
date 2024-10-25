// script.js

const scenarios = [
    { text: "Security Alert: Urgent Action Required", isPhish: true },
    { text: "Company Newsletter - October Edition", isPhish: false },
    { text: "Password Expiring Soon", isPhish: true },
    { text: "Meeting Reminder from HR", isPhish: false },
    // Add more scenarios based on the SLAM examples
];

let currentScenarioIndex = 0;
let score = 0;

document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("phish-button").addEventListener("click", () => checkAnswer(true));
document.getElementById("safe-button").addEventListener("click", () => checkAnswer(false));

function startGame() {
    score = 0;
    currentScenarioIndex = 0;
    shuffleScenarios();
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("scenario-screen").style.display = "block";
    showScenario();
}

function shuffleScenarios() {
    scenarios.sort(() => Math.random() - 0.5);
}

function showScenario() {
    if (currentScenarioIndex < scenarios.length) {
        document.getElementById("scenario-text").textContent = scenarios[currentScenarioIndex].text;
    } else {
        endGame();
    }
}

function checkAnswer(isPhish) {
    if (scenarios[currentScenarioIndex].isPhish === isPhish) {
        score++;
    }
    currentScenarioIndex++;
    showScenario();
}

function endGame() {
    document.getElementById("scenario-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";
    let resultText = "";
    if (score >= 8) {
        resultText = "Great Job!";
    } else if (score >= 4) {
        resultText = "Nice Try!";
    } else {
        resultText = "Keep Training!";
    }
    document.getElementById("result-text").textContent = resultText;
    document.getElementById("score-text").textContent = `Score: ${score} / ${scenarios.length}`;
}
