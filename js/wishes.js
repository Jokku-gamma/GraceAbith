// js/wishes.js

const wishTemplates = {
    wish: "Wishing you both a lifetime filled with love, laughter and beautiful memories. Congratulations! ❤️",
    bless: "May God bless your marriage with endless love, peace, joy and togetherness. 🙏❤️",
    congratulate: "Heartiest congratulations to Grace and Abith! Wishing you both a beautiful life together. 💐",
    love: "May your life together always be filled with love, kindness and countless beautiful moments. ❤️",
    funny: "Congratulations! 🎉 Wishing you both a lifetime of love, laughter and only the occasional argument about where to eat. 😂❤️",
    poetic: "Two hearts, one promise, one journey, and a lifetime of memories waiting to be made. Congratulations! ✨❤️",
    short: "Congratulations Grace & Abith! Wishing you both a lifetime of happiness. ❤️"
};

// Replace with your SheetDB API endpoint URL after setting up your Google Sheet
const SHEETDB_API_URL = "https://sheetdb.io/api/v1/dwbzevnvf6hdg";

function initializeWishes() {
    const buttons = document.querySelectorAll("[data-command]");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const command = button.dataset.command;
            generateWish(command);
        });
    });

    const sendBtn = document.getElementById("sendWishButton");
    if (sendBtn) {
        sendBtn.addEventListener("click", sendWish);
    }
}

function generateWish(command) {
    const message = wishTemplates[command];
    if (!message) return;

    const messageBox = document.getElementById("wishMessage");
    if (messageBox) messageBox.value = message;
}

async function sendWish() {
    const nameInput = document.getElementById("wishName");
    const messageInput = document.getElementById("wishMessage");
    const sendBtn = document.getElementById("sendWishButton");

    if (!nameInput || !messageInput) return;

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name) {
        alert("Please enter your name.");
        return;
    }

    if (!message) {
        alert("Please choose or write a wish.");
        return;
    }

    // SheetDB expects data formatted in an object wrapper
    const payload = {
        data: {
            Name: name,
            Message: message,
            Date: new Date().toLocaleString()
        }
    };

    try {
        if (sendBtn) {
            sendBtn.disabled = true;
            sendBtn.textContent = "Sending your wish... ❤️";
        }

        const response = await fetch(SHEETDB_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        alert("Thank you! Your wish has been saved for Grace & Abith. ❤️");
        nameInput.value = "";
        messageInput.value = "";
    } catch (error) {
        console.error("Failed to save wish:", error);
        alert("Oops! Something went wrong saving your wish. Please try again.");
    } finally {
        if (sendBtn) {
            sendBtn.disabled = false;
            sendBtn.textContent = "Send Your Wish ❤️";
        }
    }
}