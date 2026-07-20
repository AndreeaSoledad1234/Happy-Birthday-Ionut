const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const page4 = document.getElementById("page4");
const page5 = document.getElementById("page5");
const page6 = document.getElementById("page6");

const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");
const videosButton = document.getElementById("videosButton");
const playVideoButton = document.getElementById("playVideoButton");
const surprisesButton = document.getElementById("surprisesButton");
const backButton = document.getElementById("backButton");
const backgroundMusic = document.getElementById("backgroundMusic");
const introVideo = document.getElementById("introVideo");
const hourVideo = document.getElementById("hourVideo");
const hourVideoSource = document.getElementById("hourVideoSource");

if (window.innerWidth <= 768) {

    introVideo.controls = true;
    hourVideo.controls = true;

} else {

    introVideo.controls = false;
    hourVideo.controls = false;

}

const videoHourTitle = document.getElementById("videoHourTitle");
const videoMessage = document.getElementById("videoMessage");
const backToPage1 = document.getElementById("backToPage1");
const backToPage2 = document.getElementById("backToPage2");
const backToPage3 = document.getElementById("backToPage3");
const backToPage4 = document.getElementById("backToPage4");

const hourMessages = {
    "09:00":"❤️ Bună dimineața! Prima surpriză a zilei te așteaptă.",
    "10:00":"☀️ Încă o surpriză pregătită cu drag pentru tine.",
    "11:00":"😊 Sperăm că până acum ai zâmbit măcar o dată.",
    "12:00":"❤️ Continuăm aventura împreună.",
    "13:00":"🎉 Încă o persoană dragă are ceva să-ți spună.",
    "14:00":"🥳 Ziua continuă... iar surprizele la fel.",
    "15:00":"❤️ Îți mulțumim că faci parte din viețile noastre.",
    "16:00":"🎁 O nouă surpriză te așteaptă.",
    "17:00":"😊 Sperăm că îți place această zi.",
    "18:00":"❤️ Suntem abia la jumătatea poveștii.",
    "19:00":"🎉 Încă puțin și ajungem la final.",
    "20:00":"❤️ O surpriză din suflet pentru tine.",
    "21:00":"🥂 Mai este foarte puțin.",
    "22:00":"✨ Aproape de ultima surpriză.",
    "23:00":"❤️ Ultima oră din ziua ta... o vom dansa."
};

// PAGINI

startButton.onclick = () => {
    page1.classList.add("hidden");
    page2.classList.remove("hidden");
    backgroundMusic.volume = 0.25;
backgroundMusic.play().catch(()=>{});
};

nextButton.onclick = () => {
    page2.classList.add("hidden");
    page3.classList.remove("hidden");
};

videosButton.onclick = () => {
    page3.classList.add("hidden");
    page4.classList.remove("hidden");
    backgroundMusic.volume = 0.25;
backgroundMusic.play().catch(() => {});
};

// VIDEO INTRO

playVideoButton.onclick = () => {

    document.querySelector(".videoIntroTitle").style.display = "none";

    playVideoButton.style.display = "none";
backgroundMusic.pause();
    introVideo.style.display = "block";

    document.querySelector(".controls").style.display = "flex";

    introVideo.currentTime = 0;
console.log(introVideo.readyState);
console.log(introVideo.src);
    introVideo.play();
    introVideo.onended = () => {

    backgroundMusic.play().catch(()=>{});

};

    playPause.innerHTML = "⏸️";

    surprisesButton.style.display = "inline-block";

};

// MERGI LA SURPRIZE

surprisesButton.onclick = () => {
    page4.classList.add("hidden");
    page5.classList.remove("hidden");
};

// VIDEO PE ORE

document.querySelectorAll(".hour").forEach(button => {

    button.onclick = () => {

        if (button.disabled) return;

        page5.classList.add("hidden");
        page6.classList.remove("hidden");

        videoHourTitle.innerText = button.dataset.time;
        videoMessage.innerText = hourMessages[button.dataset.time];

        hourVideo.pause();
        hourVideo.currentTime = 0;

        hourVideoSource.src =  button.dataset.video;

       hourVideo.load();

hourVideo.onloadedmetadata = () => {

    backgroundMusic.pause();

hourVideo.play().catch(err => console.log(err));
hourVideo.onended = () => {

    backgroundMusic.play().catch(()=>{});

};

    playPauseHour.innerHTML = "⏸️";

};

    };

});

// ÎNAPOI

backButton.onclick = () => {

    hourVideo.pause();
    backgroundMusic.play().catch(()=>{});

    page6.classList.add("hidden");
    page5.classList.remove("hidden");

};

// ÎNAPOI PAGINA 2 -> 1
backToPage1.onclick = () => {

    page2.classList.add("hidden");
    page1.classList.remove("hidden");

};

// ÎNAPOI PAGINA 3 -> 2
backToPage2.onclick = () => {

    page3.classList.add("hidden");
    page2.classList.remove("hidden");

};

// ÎNAPOI PAGINA 4 -> 3
backToPage3.onclick = () => {

    introVideo.pause();
    introVideo.currentTime = 0;

    page4.classList.add("hidden");
    page3.classList.remove("hidden");

};

// ÎNAPOI PAGINA 5 -> 4
backToPage4.onclick = () => {

    page5.classList.add("hidden");
    page4.classList.remove("hidden");

};

// ===============================
// Deblocarea videoclipurilor
// ===============================

function updateHours() {

    const now = new Date();

    const eventDate = new Date(2026, 6, 21); // 24 iulie 2026

    const isEventDay =
        now.getFullYear() === eventDate.getFullYear() &&
        now.getMonth() === eventDate.getMonth() &&
        now.getDate() === eventDate.getDate();

    document.querySelectorAll(".hour").forEach(button => {

        const hourText = button.dataset.time;

        // Înainte de 24 iulie -> toate deschise
        if (now < eventDate) {

            button.disabled = false;

            if (button.classList.contains("last")) {

                button.innerHTML = `
                    23:00 ❤️
                    <br>
                    <small>Ultima oră din ziua ta, o vom dansa ❤️</small>
                `;

            } else {

                button.innerHTML = hourText + " 🎁";

            }

            return;
        }

        // După 24 iulie -> toate deschise
        if (!isEventDay && now > eventDate) {

            button.disabled = false;

            if (button.classList.contains("last")) {

                button.innerHTML = `
                    23:00 ❤️
                    <br>
                    <small>Ultima oră din ziua ta, o vom dansa ❤️</small>
                `;

            } else {

                button.innerHTML = hourText + " 🎁";

            }

            return;
        }

        // Doar pe 24 iulie
        const [hour, minute] = hourText.split(":");

        const unlockMinutes = Number(hour) * 60 + Number(minute);

        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        if (currentMinutes >= unlockMinutes) {

            button.disabled = false;

            if (button.classList.contains("last")) {

                button.innerHTML = `
                    23:00 ❤️
                    <br>
                    <small>Ultima oră din ziua ta, o vom dansa ❤️</small>
                `;

            } else {

                button.innerHTML = hourText + " 🎁";

            }

        } else {

            button.disabled = true;

            if (button.classList.contains("last")) {

                button.innerHTML = `
                    23:00 🔒
                    <br>
                    <small>Ultima oră din ziua ta, o vom dansa ❤️</small>
                `;

            } else {

                button.innerHTML = hourText + " 🔒";

            }

        }

    });

}

updateHours();

setInterval(updateHours, 60000);


// =========================
// PLAYER VIDEO PE ORE
// =========================

const playPauseHour = document.getElementById("playPauseHour");
const back10Hour = document.getElementById("back10Hour");
const forward10Hour = document.getElementById("forward10Hour");
const progressHour = document.getElementById("progressHour");
const fullscreenHour = document.getElementById("fullscreenHour");
const volumeHour = document.getElementById("volumeHour");
const timeDisplayHour = document.getElementById("timeDisplayHour");



volumeHour.addEventListener("input", () => {

    hourVideo.volume = volumeHour.value;

});


// Play / Pause
playPauseHour.onclick = () => {

    if (hourVideo.paused) {

        hourVideo.play();
        playPauseHour.innerHTML = "⏸️";

    } else {

        hourVideo.pause();
        playPauseHour.innerHTML = "▶️";

    }

};

// Înapoi 10 secunde
back10Hour.onclick = () => {

    hourVideo.currentTime = Math.max(0, hourVideo.currentTime - 10);

};

// Înainte 10 secunde
forward10Hour.onclick = () => {

    hourVideo.currentTime = Math.min(hourVideo.duration, hourVideo.currentTime + 10);

};

// Actualizare bară progres

hourVideo.addEventListener("timeupdate", () => {

    if (timeDisplayHour) {
        timeDisplayHour.innerHTML =
`${formatTime(hourVideo.currentTime)} / ${formatTime(hourVideo.duration)}`;
    }

    progressHour.max = hourVideo.duration || 0;
    progressHour.value = hourVideo.currentTime;

});

// Derulare cu bara
progressHour.addEventListener("input", () => {

    hourVideo.currentTime = progressHour.value;

});

// Fullscreen
fullscreenHour.onclick = () => {

    if (hourVideo.requestFullscreen) {

        hourVideo.requestFullscreen();

    }

};

function formatTime(seconds){

    if(isNaN(seconds)) return "00:00";

    const min = Math.floor(seconds/60);
    const sec = Math.floor(seconds%60);

    return `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;

}

// =========================
// PLAYER PERSONALIZAT INTRO
// =========================

const playPause = document.getElementById("playPause");
const back10 = document.getElementById("back10");
const forward10 = document.getElementById("forward10");
const progress = document.getElementById("progress");
const fullscreen = document.getElementById("fullscreen");
const volume = document.getElementById("volume");
const timeDisplay = document.getElementById("timeDisplay");


volume.addEventListener("input", () => {

    introVideo.volume = volume.value;

});


// Play / Pause
playPause.onclick = () => {

    if (introVideo.paused) {

        introVideo.play();
        playPause.innerHTML = "⏸️";

    } else {

        introVideo.pause();
        playPause.innerHTML = "▶️";

    }

};

// Înapoi 10 secunde
back10.onclick = () => {

    introVideo.currentTime = Math.max(0, introVideo.currentTime - 10);

};

// Înainte 10 secunde
forward10.onclick = () => {

    introVideo.currentTime = Math.min(introVideo.duration, introVideo.currentTime + 10);

};

// Actualizare bară progres
introVideo.addEventListener("timeupdate", () => {

    if (timeDisplay) {
        timeDisplay.innerHTML =
`${formatTime(introVideo.currentTime)} / ${formatTime(introVideo.duration)}`;
    }

    progress.max = introVideo.duration || 0;
    progress.value = introVideo.currentTime;

});

// Derulare cu bara
progress.addEventListener("input", () => {

    introVideo.currentTime = progress.value;

});

// Fullscreen
fullscreen.onclick = () => {

    if (introVideo.requestFullscreen) {

        introVideo.requestFullscreen();

    }

};
// =========================
// INIMI PLUTITOARE
// =========================

const hearts = document.querySelector(".hearts");

for(let i = 0; i < 12; i++){

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤️";

    heart.style.left = Math.random()*100 + "%";

    heart.style.fontSize = (18 + Math.random()*28) + "px";

    heart.style.animationDuration = (10 + Math.random()*10) + "s";

    heart.style.animationDelay = (Math.random()*10) + "s";

    hearts.appendChild(heart);

}

// =========================
// INIMI TITLU
// =========================

const titleContainer = document.querySelector(".titleContainer");

for(let i=0;i<3;i++){

    const heart = document.createElement("div");

    heart.className="titleHeart";

    heart.innerHTML="💖";

    heart.style.fontSize=(18+Math.random()*12)+"px";

    titleContainer.appendChild(heart);

}