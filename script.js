// script.js

const scenarios = [
    {
        sender: "alerts@yourcompany-secure.com",
        subject: "Urgent: Unusual Login Attempt Detected",
        body: "We detected an unusual login attempt on your account. Please verify your activity. Failure to respond may result in account suspension.",
        isPhish: true
    },
    {
        sender: "hr@[entered domain]",
        subject: "Important: Update to HR Policies",
        body: "Please review the latest HR policy updates here.",
        isPhish: false
    },
    {
        sender: "payroll@your-compay.com",
        subject: "Immediate Action: Payroll Information Needed",
        body: "Your recent payroll information needs verification. Update your details here. If unverified, payroll may be delayed.",
        isPhish: true
    },
    {
        sender: "feedback@[entered domain]",
        subject: "Your Feedback Matters! Complete Our Survey",
        body: "We value your opinion! Please take a few minutes to complete this survey.",
        isPhish: false
    },
    {
        sender: "account-recovery@youcompany.com",
        subject: "Account Access Recovery Needed",
        body: "Your account access is temporarily restricted. Click below to verify your identity. Immediate action required to prevent account suspension.",
        isPhish: true
    },
    {
        sender: "it@[entered domain]",
        subject: "Project Files for Q4",
        body: "Attached are the project files for Q4. Let us know if you have questions.",
        isPhish: false
    },
    {
    sender: "docs@yourcomapny.com",
    subject: "[Sender Name] shared a document with you",
    body: "[Sender Name] has shared a confidential document with you. Click here to view.",
    isPhish: true
},
{
    sender: "meeting@[entered domain]",
    subject: "Meeting Confirmation for [Date/Time]",
    body: "Your meeting has been confirmed. Details are available here.",
    isPhish: false
},
{
    sender: "it-support@yrcompany.com",
    subject: "Password Expiring in 24 Hours",
    body: "Your password will expire in 24 hours. Update now to avoid lockout.",
    isPhish: true
},
{
    sender: "benefits@[entered domain]",
    subject: "Reminder: Benefits Enrollment Deadline Approaching",
    body: "Please remember to complete your benefits enrollment by [Date]. More information is available here.",
    isPhish: false
},
{
    sender: "security@[entered domain]",
    subject: "Account Suspicious Activity - Verify Immediately",
    body: "We've detected suspicious activity on your account. To secure your account, please verify your recent activity.",
    isPhish: true
}

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
        const scenario = scenarios[currentScenarioIndex];
        document.getElementById("scenario-text").innerHTML = `
            <strong>From:</strong> ${scenario.sender}<br>
            <strong>Subject:</strong> ${scenario.subject}<br><br>
            ${scenario.body}
        `;
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
function showScenario() {
    if (currentScenarioIndex < scenarios.length) {
        const scenario = scenarios[currentScenarioIndex];
        document.getElementById("scenario-text").innerHTML = `
            <div class="email-header">
                <strong>From:</strong> ${scenario.sender}<br>
                <strong>Subject:</strong> ${scenario.subject}
            </div>
            <div class="email-body">
                ${scenario.body}
            </div>
        `;
    } else {
        endGame();
    }
}
