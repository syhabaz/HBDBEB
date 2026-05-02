const welcomeTexts = [
    { main: "you make everything feel better", sub: "another year, another reason to smile ✦" },
    { main: "us, always", sub: "every little moment, saved here forever." },
    { main: "i'm just grateful i have u", sub: "on your special day." }
];

let textIndex = 0;
const mainTextElement = document.getElementById("typingText");
const subTextElement = document.getElementById("subText");
const audio = document.getElementById("myAudio");
const playIcon = document.getElementById("mainPlayIcon");
const songTitle = document.getElementById("currentSongTitle");
const playerContainer = document.querySelector(".player");

let currentPlayingKey = null;

const songs = {
    XXL: { url: "myAudio/XXL.mp3", title: "XXL - Lany" },
    PINKSKIES: { url: "myAudio/PINKSKIES.mp3", title: "Pink Skies - Lany" },
    ILYSB: { url: "myAudio/ILYSB.mp3", title: "ILYSB - Lany" }
};

function changeText() {
    mainTextElement.style.opacity = 0;
    subTextElement.style.opacity = 0;

    setTimeout(() => {
        textIndex = (textIndex + 1) % welcomeTexts.length;
        mainTextElement.innerText = welcomeTexts[textIndex].main;
        subTextElement.innerText = welcomeTexts[textIndex].sub;

        mainTextElement.style.opacity = 1;
        subTextElement.style.opacity = 1;
    }, 500);
}

let textInterval = setInterval(changeText, 3000);

function enterWebsite() {
    clearInterval(textInterval);

    const welcome = document.getElementById("welcomeScreen");
    const main = document.getElementById("mainContent");

    welcome.style.opacity = "0";
    setTimeout(() => {
        welcome.style.display = "none";
        main.classList.add("show-content");
        audio.volume = 0.5;
        audio.play().catch(error => {
            console.log("Autoplay blocked:", error);
        });
    }, 800);
}

const startDate = new Date("2026-01-20T00:00:00").getTime();

function updateTimer() {
    const now = new Date().getTime();
    const distance = now - startDate;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}
setInterval(updateTimer, 1000);
updateTimer();

window.addEventListener("scroll", reveal);

function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

function playSong(key) {
    const song = songs[key];
    const playerBar = document.getElementById("playerBar");

    if (currentPlayingKey === key) {
        if (audio.paused) {
            audio.play();
            playerBar.classList.add("show-player");
            updatePlayerUI(true, song.title);
            updateListIcon(key, true);
        } else {
            audio.pause();
            playerBar.classList.remove("show-player");
            updatePlayerUI(false, song.title);
            updateListIcon(key, false);
        }
    } else {
        currentPlayingKey = key;
        audio.src = song.url;
        audio.volume = 1.0;
        audio.play();

        playerBar.classList.add("show-player");
        updatePlayerUI(true, song.title);

        resetAllListIcons();
        updateListIcon(key, true);

        const activeTrack = document.getElementById(`track-${key}`);
        if (activeTrack) activeTrack.classList.add('playing');
    }
}

function toggleMusic() {
    if (!currentPlayingKey) return;

    const playerBar = document.getElementById("playerBar");

    if (audio.paused) {
        audio.play();
        playerBar.classList.add("show-player");
        updatePlayerUI(true);
        updateListIcon(currentPlayingKey, true);
    } else {
        audio.pause();
        playerBar.classList.remove("show-player");
        updatePlayerUI(false);
        updateListIcon(currentPlayingKey, false);
    }
}

function updateListIcon(key, isPlaying) {
    const trackItem = document.getElementById(`track-${key}`);
    if (trackItem) {
        const icon = trackItem.querySelector('.t-ico i') || trackItem.querySelector('.track-icon i');
        if (!icon) return;
        if (isPlaying) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        } else {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
    }
}

function resetAllListIcons() {
    document.querySelectorAll('.track, .track-item').forEach(item => {
        item.classList.remove('playing');
        const icon = item.querySelector('.t-ico i') || item.querySelector('.track-icon i');
        if (icon) {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
    });
}

function updatePlayerUI(isPlaying, title = null) {
    if (title) songTitle.innerText = title;

    if (isPlaying) {
        playIcon.classList.remove("fa-play");
        playIcon.classList.add("fa-pause");
        playerContainer.classList.add("music-playing");
    } else {
        playIcon.classList.remove("fa-pause");
        playIcon.classList.add("fa-play");
        playerContainer.classList.remove("music-playing");
    }
}

function createHeartShower() {
    const container = document.body;
    const colors = ["#7ab8ff", "#4a90e8", "#a8d4ff", "#c0e0ff", "#82b8ff"];

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement("div");
        heart.classList.add("floating-flower");

        heart.innerHTML = '<i class="fas fa-heart"></i>';

        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        heart.style.color = randomColor;

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (Math.random() * 20 + 15) + "px";
        heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
        heart.style.animationDelay = Math.random() + "s";

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// PASSWORD LOCK SCREEN
const CORRECT_PWD = "200126"; // ← ganti passwordnya di sini!
let pwdCurrent = "";

function pwdInput(num) {
    if (pwdCurrent.length >= 6) return;
    pwdCurrent += num;
    updateDots();
    if (pwdCurrent.length === 6) setTimeout(checkPassword, 150);
}

function pwdDelete() {
    pwdCurrent = pwdCurrent.slice(0, -1);
    updateDots();
    document.getElementById('pwdError').style.opacity = '0';
}

function updateDots() {
    document.querySelectorAll('.pwd-dots .dot').forEach((dot, i) => {
        dot.classList.toggle('filled', i < pwdCurrent.length);
    });
}

function setCharMood(mood) {
    document.getElementById('eyesNormal').style.display = mood === 'normal' ? '' : 'none';
    document.getElementById('eyesSad').style.display = mood === 'sad' ? '' : 'none';
    document.getElementById('eyesHappy').style.display = mood === 'happy' ? '' : 'none';
    document.getElementById('mouthNormal').style.display = mood === 'normal' ? '' : 'none';
    document.getElementById('mouthSad').style.display = mood === 'sad' ? '' : 'none';
    document.getElementById('tongueHappy').style.display = mood === 'happy' ? '' : 'none';
}

function checkPassword() {
    if (pwdCurrent === CORRECT_PWD) {
        setCharMood('happy');
        document.getElementById('pwdChar').classList.add('bounce');
        setTimeout(() => {
            const screen = document.getElementById('passwordScreen');
            screen.style.opacity = '0';
            screen.style.transform = 'scale(1.04)';
            document.body.classList.remove('locked');
            setTimeout(() => screen.style.display = 'none', 600);
        }, 800);
    } else {
        setCharMood('sad');
        const dots = document.getElementById('pwdDots');
        const err = document.getElementById('pwdError');
        dots.classList.add('shake');
        err.style.opacity = '1';
        setTimeout(() => {
            dots.classList.remove('shake');
            pwdCurrent = "";
            updateDots();
            setTimeout(() => setCharMood('normal'), 600);
            setTimeout(() => { err.style.opacity = '0'; }, 1500);
        }, 600);
    }
}