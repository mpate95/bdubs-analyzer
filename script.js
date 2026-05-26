const responses = [
    "No.",
    "Absolutely Not.",
    "Maybe. No.",
    "Ask Again, Still No.",
    "Fuck No.",
    "Not This Week.",
    "The Spreadsheet Says No.",
    "No With Confidence.",
    "Latest Projections: No.",
    "Couch Advantage Too Strong.",
    "Hard No.",
    "Sources Say Unlikely.",
    "Signs Point To No.",
    "He Will Respectfully Decline.",
    "Maybe In Spirit.",
    "Negative, Chief.",
    "No After Further Review.",
    "Forecast Remains Grim.",
    "Hope Detected. Rejected.",
    "Extremely Offline Behavior.",
    "No But Thanks For Asking.",
    "Not Even A Little.",
    "The Model Laughed.",
    "No, But With Warm Regards."
];

const thinkingSteps = [
    "Loading historical decline archive",
    "Checking group chat momentum",
    "Recalculating false hope index",
    "Reviewing maybe-to-no conversion rate",
    "Consulting advanced couch analytics"
];

const predictButton = document.getElementById("predictButton");
const identityPrompt = document.getElementById("identityPrompt");
const shiboomYes = document.getElementById("shiboomYes");
const shiboomNo = document.getElementById("shiboomNo");
const oracleStatus = document.getElementById("oracleStatus");
const oracleAnswer = document.getElementById("oracleAnswer");
const confidenceValue = document.getElementById("confidenceValue");
const statValues = document.querySelectorAll(".stat-value");

let isRunning = false;
let thinkingTimer = null;

function pickRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function setConfidence() {
    const confidence = (98.7 + Math.random() * 1.2).toFixed(1);
    confidenceValue.textContent = `${confidence}%`;
}

function animateCount(element) {
    const target = Number.parseFloat(element.dataset.target || "0");
    const isPercent = element.classList.contains("stat-percent");
    const duration = 1100;
    const start = performance.now();

    function step(timestamp) {
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;

        if (isPercent) {
            element.textContent = `${current.toFixed(1)}%`;
        } else {
            element.textContent = `${Math.round(current)}`;
        }

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

function beginThinking() {
    let stepIndex = 0;
    oracleStatus.textContent = "Simulation running";
    oracleAnswer.textContent = `${thinkingSteps[stepIndex]}...`;
    oracleAnswer.classList.remove("reveal");

    thinkingTimer = window.setInterval(() => {
        stepIndex = (stepIndex + 1) % thinkingSteps.length;
        oracleAnswer.textContent = `${thinkingSteps[stepIndex]}...`;
    }, 520);
}

function endThinking() {
    if (thinkingTimer) {
        window.clearInterval(thinkingTimer);
        thinkingTimer = null;
    }
}

function setPromptVisibility(isVisible) {
    identityPrompt.hidden = !isVisible;
}

function runPrediction(forcedResponse) {
    if (isRunning) {
        return;
    }

    isRunning = true;
    setPromptVisibility(false);
    predictButton.disabled = true;
    predictButton.textContent = "Consulting The Data";
    setConfidence();
    beginThinking();

    window.setTimeout(() => {
        endThinking();
        oracleStatus.textContent = "Result delivered";
        oracleAnswer.textContent = forcedResponse || pickRandom(responses);
        oracleAnswer.classList.remove("reveal");

        window.setTimeout(() => {
            oracleAnswer.classList.add("reveal");
        }, 10);

        predictButton.disabled = false;
        predictButton.textContent = "Will He Attend?";
        isRunning = false;
    }, 2600);
}

function handlePredictClick() {
    if (isRunning) {
        return;
    }

    setPromptVisibility(true);
}

const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        animateCount(entry.target);
        observer.unobserve(entry.target);
    });
}, { threshold: 0.45 });

statValues.forEach((stat) => {
    statObserver.observe(stat);
});

predictButton.addEventListener("click", handlePredictClick);
shiboomYes.addEventListener("click", () => runPrediction("Fuck No."));
shiboomNo.addEventListener("click", () => runPrediction());

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if (!identityPrompt.hidden) {
            runPrediction();
            return;
        }

        handlePredictClick();
    }
});
