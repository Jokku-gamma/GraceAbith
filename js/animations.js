// js/animations.js

function initializeAnimations() {
    initializeScrollReveal();
    initializePetals();
    initializeSmoothScrolling();
    initializeMusic();
}

function initializeScrollReveal() {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elements.forEach(element => observer.observe(element));
}

function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        });
    });
}

function initializePetals() {
    const container = document.querySelector(".petals");
    if (!container) return;

    const petalCount = 18;
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement("span");
        petal.className = "petal";
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDelay = `${Math.random() * 8}s`;
        petal.style.animationDuration = `${7 + Math.random() * 6}s`;
        container.appendChild(petal);
    }
}

function initializeMusic() {
    const button = document.getElementById("musicToggle");
    if (!button) return;

    const audio = new Audio("assets/audio/wedding-music.mp3");
    audio.loop = true;
    audio.volume = 0.5;

    let playing = false;

    button.addEventListener("click", () => {
        if (playing) {
            audio.pause();
            button.textContent = "♫";
        } else {
            audio.play().catch(error => {
                console.log("Music playback blocked by browser policy:", error);
            });
            button.textContent = "🔊";
        }
        playing = !playing;
    });
}