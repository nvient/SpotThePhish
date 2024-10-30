// script.js

let userDomain = "";
let currentScenarioIndex = 0;
let score = 0;

// Scenarios array with placeholders for domain
const scenarios = [
    {
        sender: "alerts@yourcompany-secure.com",
        subject: "Urgent: Unusual Login Attempt Detected",
        body: "We detected an unusual login attempt on your account. Please verify your activity. Failure to respond may result in account suspension.",
        isPhish: true,
        explanation: "This email is phishing because of the suspicious sender domain ('yourcompany-secure.com' instead of your company's real domain) and the urgent tone pressuring you to act quickly."
    },
    {
        sender: "hr@[domain]",
        subject: "Important: Update to HR Policies",
        body: "Please review the latest HR policy updates here.",
        isPhish: false,
        explanation: "This is a legitimate email from your HR department. It has a reasonable sender address and no suspicious language or links."
    },
    {
        sender: "payroll@your-compay.com",
        subject: "Immediate Action: Payroll Information Needed",
        body: "Your recent payroll information needs verification. Update your details here. If unverified, payroll may be delayed.",
        isPhish: true,
        explanation: "This is a phishing email because the sender domain 'your-compay.com' is a typographical error designed to trick you. Also, there is an unnecessary sense of urgency."
    },
    {
        sender: "feedback@[domain]",
        subject: "Your Feedback Matters! Complete Our Survey",
        body: "We value your opinion! Please take a few minutes to complete this survey.",
        isPhish: false,
        explanation: "This is a legitimate email inviting you to participate in a company survey, with no unusual sender domain or urgent language."
    },
    {
        sender: "account-recovery@youcompany.com",
        subject: "Account Access Recovery Needed",
        body: "Your account access is temporarily restricted. Click below to verify your identity. Immediate action required to prevent account suspension.",
        isPhish: true,
        explanation: "This is a phishing email due to the incorrect domain 'youcompany.com' and the pressure to act immediately."
    },
    {
        sender: "it@[domain]",
        subject: "Project Files for Q4",
        body: "Attached are the project files for Q4. Let us know if you have questions.",
        isPhish: false,
        explanation: "This email is legitimate, sent from the company's IT department with no suspicious language or sender."
    },
    {
        sender: "docs@yourcomapny.com",
        subject: "[Sender Name] shared a document with you",
        body: "[Sender Name] has shared a confidential document with you. Click here to view.",
        isPhish: true,
        explanation: "This is a phishing email as it uses a misspelled domain 'yourcomapny.com' and tries to trick you into clicking a link."
    },
    {
        sender: "meeting@[domain]",
        subject: "Meeting Confirmation for [Date/Time]",
        body: "Your meeting has been confirmed. Details are available here.",
        isPhish: false,
        explanation: "This is a legitimate meeting confirmation from a company address with no suspicious content."
    },
    {
        sender: "it-support@yrcompany.com",
        subject: "Password Expiring in 24 Hours",
        body: "Your password will expire in 24 hours. Update now to avoid lockout.",
        isPhish: true,
        explanation: "This is phishing as it uses 'yrcompany.com' instead of your company's domain and includes urgency to act quickly."
    },
    {
        sender: "benefits@[domain]",
        subject: "Reminder: Benefits Enrollment Deadline Approaching",
        body: "Please remember to complete your benefits enrollment by [Date]. More information is available here.",
        isPhish: false,
        explanation: "This is a legitimate reminder about benefits enrollment with no suspicious sender or content."
    }
];

// Event listeners
document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("phish-button").addEventListener("click", () => checkAnswer(true));
document.getElementById("safe-button").addEventListener("click", () => checkAnswer(false));

function startGame() {
    const emailInput = document.getElementById("email-input").value;
    userDomain = extractDomain(emailInput);
    
    if (userDomain) {
        personalizeScenarios();
        score = 0;
        currentScenarioIndex = 0;
        shuffleScenarios();
        document.getElementById("start-screen").style.display = "none";
        document.getElementById("scenario-screen").style.display = "block";
        showScenario();
    } else {
        alert("Please enter a valid email address.");
    }
}

function extractDomain(email) {
    const domain = email.substring(email.lastIndexOf("@") + 1);
    return domain.includes(".") ? domain : "";
}

function personalizeScenarios() {
    for (let scenario of scenarios) {
        scenario.sender = scenario.sender.replace("[domain]", userDomain);
        scenario.body = scenario.body.replace("[domain]", userDomain);
    }
}

function shuffleScenarios() {
    scenarios.sort(() => Math.random() - 0.5);
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

function checkAnswer(isPhish) {
    const scenario = scenarios[currentScenarioIndex];
    let feedback = "";
    if (scenario.isPhish === isPhish) {
        score++;
        feedback = `<p style="color: green;">Correct!</p>`;
    } else {
        feedback = `<p style="color: red;">Incorrect!</p>`;
    }

    feedback += `<p>${scenario.explanation}</p>`;
    
    document.getElementById("scenario-text").innerHTML = feedback;

    setTimeout(() => {
        currentScenarioIndex++;
        showScenario();
    }, 3000);
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
