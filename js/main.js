// js/main.js
// js/data.js (example structure
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const weddingData = await loadWeddingData();

        initializeWedding(weddingData);
        initializeVerse(weddingData);
        initializeCountdown(weddingData);
        initializeCalendar(weddingData);
        initializeWishes(weddingData);
        initializeGallery(weddingData);
        initializeStoryModal();
        initializeAnimations();

    } catch (error) {
        console.error("Failed to initialize wedding website:", error);
    }
});

async function loadWeddingData() {
    const response = await fetch("data/wedding.json");

    if (!response.ok) {
        throw new Error("Unable to load wedding data.");
    }

    return await response.json();
}

function initializeWedding(data) {
    const setElementText = (id, text) => {
        const el = document.getElementById(id);
        if (el && text) el.textContent = text;
    };

    setElementText("brideName", data.bride.fullName);
    setElementText("groomName", data.groom.fullName);
    setElementText("heroDate", data.wedding.dateDisplay || data.wedding.date);
    setElementText("weddingDate", data.wedding.dateDisplay || data.wedding.date);
    setElementText("venueName", data.venue.name);

    // Clean address formatting using line breaks
    const venueAddressEl = document.getElementById("venueAddress");
    if (venueAddressEl && data.venue.address) {
        venueAddressEl.innerHTML = `
            Opposite Sacred Heart Higher Secondary School<br>
            SH Mount Road, Choottuveli, Kumaranalloor<br>
            Nattassery S H Mount, Kottayam, Kerala — 686006, India
        `;
    }

    // Attach Google Maps URL dynamically
    const mapsLink = document.getElementById("googleMapsLink");
    if (mapsLink && data.venue.googleMapsUrl) {
        mapsLink.href = data.venue.googleMapsUrl;
    }
}

function initializeVerse(data) {
    if (!data.verse) return;

    const verseTextEl = document.getElementById("verseText");
    const verseRefEl = document.getElementById("verseRef");

    if (verseTextEl) verseTextEl.textContent = `"${data.verse.text}"`;
    if (verseRefEl) verseRefEl.textContent = `— ${data.verse.reference}`;
}

function initializeStoryModal() {
    const storyBtn = document.getElementById("storyBtn");
    const storyModal = document.getElementById("storyModal");
    const closeStoryModal = document.getElementById("closeStoryModal");

    if (storyBtn && storyModal && closeStoryModal) {
        // Open modal
        storyBtn.addEventListener("click", () => {
            storyModal.classList.remove("hidden");
        });

        // Close modal on X button
        closeStoryModal.addEventListener("click", () => {
            storyModal.classList.add("hidden");
        });

        // Close modal when clicking outside the chat box
        storyModal.addEventListener("click", (event) => {
            if (event.target === storyModal) {
                storyModal.classList.add("hidden");
            }
        });
    }
}