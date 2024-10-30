// script.js

let userDomain = "";
let currentScenarioIndex = 0;
let score = 0;

// Scenarios array with placeholders for domain
const scenarios = [
    {
        sender: "alerts@[domain]",
        subject: "Urgent: Unusual Login Attempt Detected",
        body: "We detected an unusual login attempt on your account. Please verify your activity. Failure to respond may result in account suspension.",
        isPhish: true,
        explanation: "This email is phishing because of the suspicious sender domain and the urgent tone pressuring you to act quickly."
    },
    {
        sender: "nickf@[domain]",
        subject: "Important: Update to HR Policies",
        body: "Please review the latest HR policy updates here. No more fantasy football is allowed at the company, please cease all activity!",
        isPhish: false,
        explanation: "This is a legitimate email from your HR department. It has a reasonable sender address and no suspicious language or links."
    },
    {
        sender: "payroll@[domain]",
        subject: "Immediate Action: Payroll Information Needed",
        body: "Your recent payroll information needs verification. Update your details here. If unverified, payroll may be delayed.",
        isPhish: true,
        explanation: "This is a phishing email because of a slight alteration in the sender domain and the sense of urgency."
    },
    {
        sender: "feedback@[domain]",
        subject: "Your Feedback Matters! Complete Our Survey",
        body: "We value your opinion! Please take a few minutes to complete this survey.",
        isPhish: false,
        explanation: "This is a legitimate email inviting you to participate in a company survey, with no unusual sender domain or urgent language."
    },
        sender: "account-recovery@[domain]",
        subject: "Account Access Recovery Needed",
        body: "Your account access is temporarily restricted. Click below to verify your identity. Immediate action required to prevent account suspension.",
        isPhish: true,
        explanation: "This is a phishing email due to the incorrect domain 'youcompany.com' and the pressure to act immediately."
    },
    {
        sender: "tamib@[domain]",
        subject: "Project Files for Q4",
        body: "Attached are the project files for Q4. Let us know if you have questions.",
        isPhish: false,
        explanation: "This email is legitimate, sent from the company's IT department with no suspicious language or sender."
    },
    {
        sender: "docs@[domain]",
        subject: "John shared a document with you",
        body: "John has shared a confidential document with you. Click here to view as soon as possible.",
        isPhish: true,
        explanation: "This is a phishing email as it uses a misspelled domain 'yourcomapny.com' and tries to trick you into clicking a link."
    },
    {
        sender: "sallyj@[domain]",
        subject: "Meeting Confirmation for [Date/Time]",
        body: "Your meeting has been confirmed. Details are available here.",
        isPhish: false,
        explanation: "This is a legitimate meeting confirmation from a company address with no suspicious content."
    },
    {
        sender: "it-support@[domain]",
        subject: "Password Expiring in 24 Hours",
        body: "Your password will expire in 24 hours. Update now to avoid lockout.",
        isPhish: true,
        explanation: "This is phishing as it uses 'yrcompany.com' instead of your company's domain and includes urgency to act quickly."
    },
    {
        sender: "adrienner@[domain]",
        subject: "Reminder: Benefits Enrollment Deadline Approaching",
        body: "Please remember to complete your benefits enrollment by [Date]. More information is available here.",
        isPhish: false,
        explanation: "This is a legitimate reminder about benefits enrollment with no suspicious sender or content."
    }
];

// Event listener for the Start button
document.getElementById("start-button").addEventListener("click", startGame);

function startGame() {
    console.log("Start button clicked"); // Log to confirm the button is working

    const emailInput = document.getElementById("email-input").value;
    console.log("Email entered:", emailInput); // Log the email entered

    // Basic email validation
    if (emailInput && emailInput.includes("@")) {
        userDomain = extractDomain(emailInput);
        console.log("User domain extracted:", userDomain); // Log the domain extracted

        if (userDomain) {
            personalizeScenarios();
            score = 0;
            currentScenarioIndex = 0;
            shuffleScenarios();
            document.getElementById("start-screen").style.display = "none";
            document.getElementById("scenario-screen").style.display = "block";
            showScenario();
        } else {
            console.log("Invalid domain extracted."); // Log if the domain is not valid
            alert("Please enter a valid email address with a proper domain.");
        }
    } else {
        console.log("Invalid email format."); // Log if the email format is invalid
        alert("Please enter a valid email address.");
    }
}

// Function to extract the domain from the email address
function extractDomain(email) {
    const domain = email.substring(email.lastIndexOf("@") + 1);
    return domain.includes(".") ? domain : "";
}

// Function to personalize scenarios with the user's domain
function personalizeScenarios() {
    for (let scenario of scenarios) {
        if (scenario.isPhish) {
            // Apply typosquatting for phishing emails
            scenario.sender = `alerts@${applyTyposquatting(userDomain)}`;
        } else {
            // Use the actual user domain for legitimate emails
            scenario.sender = scenario.sender.replace("[domain]", userDomain);
        }
        scenario.body = scenario.body.replace("[domain]", userDomain);
    }
}

// Function to apply typosquatting techniques to the domain
function applyTyposquatting(domain) {
    const techniques = [
        () => domain.replace("o", "0"),                 // Replace character
        () => domain.replace("a", "4"),                 // Replace another character
        () => domain.replace(".com", ".co"),            // Change TLD
        () => domain.replace(".", "-"),                 // Add hyphen
        () => domain + "e"                              // Add an extra character
    ];
    
    const randomTechnique = techniques[Math.floor(Math.random() * techniques.length)];
    return randomTechnique();
}

// Function to shuffle scenarios
function shuffleScenarios() {
    scenarios.sort(() => Math.random() - 0.5);
}

// Function to display the current scenario
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

// Function to handle the user's answer and provide feedback
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

// Function to end the game and display the results
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

// Event listeners for the Phish and Safe buttons
document.getElementById("phish-button").addEventListener("click", () => checkAnswer(true));
document.getElementById("safe-button").addEventListener("click", () => checkAnswer(false));


