let targetButton = document.querySelector('.target');
let startButton = document.querySelector('.start');
let score = 0;
let count = 0;
let tries = 25;
let targetDuration;
let speed = document.querySelector('.speed').value;

function showDetails() {
    document.querySelector('.score').innerHTML = 'Score: ' + score + ' / ' + tries;
};

function getRandomPosTop() {
    return Math.floor(Math.random() * (Math.floor(880) - Math.ceil(25)) + Math.ceil(25));
};
function getRandomPosLeft() {
    return Math.floor(Math.random() * (Math.floor(1800) - Math.ceil(25)) + Math.ceil(25));
};

function chooseSpeed() {
    return parseInt(document.querySelector('.speed').value);
}

showDetails();

document.querySelector('.speed').addEventListener("change",
    function () {
        startButton.innerText = "Start";
        count = 0;
        score = 0;
        showDetails();
    });

document.querySelector('.difficulty').addEventListener("change",
    function chooseDifficulty() {
        startButton.innerText = "Start";
        count = 0;
        score = 0;
        showDetails();
        let difficulty = document.querySelector('.difficulty').value;
        switch (difficulty) {
            case "easy":
                targetButton.classList.add("target__easy");
                targetButton.classList.remove("target__medium");
                targetButton.classList.remove("target__hard");
                break;

            case "medium":
                targetButton.classList.remove("target__easy");
                targetButton.classList.add("target__medium");
                targetButton.classList.remove("target__hard");
                break;
            case "hard":
                targetButton.classList.remove("target__easy");
                targetButton.classList.remove("target__medium");
                targetButton.classList.add("target__hard");
                break;
        }
    });

startButton.addEventListener("mouseenter", function () {
    count++;
    startButton.classList.add("start--disable")
    startButton.innerText = "Next";
    setTimeout(function () {
        targetButton.classList.remove("target--disable");
        targetButton.classList.add("target--enable");
        targetButton.style.left = getRandomPosLeft() + 'px';
        targetButton.style.top = getRandomPosTop() + 'px';
    }, 500);

    targetDuration = setTimeout(function () {
        targetButton.classList.remove("target--enable");
        targetButton.classList.add("target--disable");
        if (startButton.classList.contains("start--disable")) {
            startButton.classList.remove("start--disable");
        }
        if (count === tries) {
            startButton.innerText = "Start";
            alert('koniec, Twoja celnosc to: ' + Math.floor(score / tries * 100) + '%');
            count = 0;
            score = 0;
        }
    }, chooseSpeed())
});

targetButton.addEventListener("click", function () {
    score++;
    showDetails();
    targetButton.classList.remove("target--enable");
    startButton.classList.remove("start--disable");
    clearTimeout(targetDuration);
    if (count === tries) {
        startButton.innerText = "Start";
        alert('koniec, Twoja celnosc to: ' + Math.floor(score / tries * 100) + '%');
        count = 0;
        score = 0;
    }
});

