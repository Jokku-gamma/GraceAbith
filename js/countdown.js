// js/countdown.js

function initializeCountdown(data) {
    const weddingDate = parseWeddingDate(
        data.wedding.date,
        data.wedding.startTime
    );

    if (!weddingDate) return;

    updateCountdown(weddingDate);

    setInterval(() => {
        updateCountdown(weddingDate);
    }, 1000);
}

function parseWeddingDate(dateString, timeString) {
    if (!dateString) return null;
    return new Date(`${dateString}T${timeString || "00:00:00"}`);
}

function updateCountdown(targetDate) {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
        showWeddingDayMessage();
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

function showWeddingDayMessage() {
    const titleEl = document.getElementById("countdownTitle");
    if (titleEl) titleEl.textContent = "Today is the day! ❤️";

    ["days", "hours", "minutes", "seconds"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = "00";
    });
}