// js/wishes.js

const SHEETDB_API_URL =
    "https://sheetdb.io/api/v1/dwbzevnvf6hdg";


// =====================================================
// WISH TEMPLATES
// =====================================================

const wishTemplates = {

    wish:
        "Wishing you both a lifetime filled with love, laughter and beautiful memories. Congratulations! ❤️",

    bless:
        "May God bless your marriage with endless love, peace, joy and togetherness. 🙏❤️",

    congratulate:
        "Heartiest congratulations to Grace and Abith! Wishing you both a beautiful life together. 💐",

    love:
        "May your life together always be filled with love, kindness and countless beautiful moments. ❤️",

    funny:
        "Happy married life! ❤️ May your love grow stronger, your fights stay shorter, and your food portions at the wedding stay HUGE. Also, we're coming for the food, so please don't disappoint us! 🍗",

    poetic:
        "Two hearts, one promise, one journey, and a lifetime of memories waiting to be made. Congratulations! ✨❤️",

    short:
        "Congratulations Grace & Abith! Wishing you both a lifetime of happiness. ❤️"

};


// =====================================================
// INITIALIZE WISH FORM
// =====================================================

function initializeWishes() {

    const buttons =
        document.querySelectorAll("[data-command]");


    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const command =
                button.dataset.command;

            generateWish(command);

        });

    });


    const sendBtn =
        document.getElementById(
            "sendWishButton"
        );


    if (sendBtn) {

        sendBtn.addEventListener(
            "click",
            sendWish
        );

    }


    // =================================================
    // NAME VALIDATION
    // =================================================

    const nameInput =
        document.getElementById(
            "wishName"
        );

    const nameError =
        document.getElementById(
            "wishNameError"
        );


    if (nameInput) {

        nameInput.addEventListener(
            "input",
            function () {

                // Allow Unicode letters and spaces only
                this.value =
                    this.value.replace(
                        /[^\p{L}\s]/gu,
                        ""
                    );


                // Replace multiple spaces
                this.value =
                    this.value.replace(
                        /\s{2,}/g,
                        " "
                    );


                // Remove leading spaces
                this.value =
                    this.value.replace(
                        /^\s+/,
                        ""
                    );


                const name =
                    this.value.trim();


                if (!name) {

                    if (nameError) {
                        nameError.style.display =
                            "none";
                    }

                    this.style.borderColor =
                        "var(--border-color)";

                    return;

                }


                if (isValidName(name)) {

                    if (nameError) {
                        nameError.style.display =
                            "none";
                    }

                    this.style.borderColor =
                        "var(--border-color)";

                } else {

                    if (nameError) {

                        nameError.textContent =
                            "Please enter a valid name using letters and spaces only.";

                        nameError.style.display =
                            "block";

                    }

                    this.style.borderColor =
                        "#d9534f";

                }

            }
        );


        // Validate when leaving the field
        nameInput.addEventListener(
            "blur",
            function () {

                const name =
                    this.value.trim();


                if (!name) {
                    return;
                }


                if (!isValidName(name)) {

                    if (nameError) {

                        nameError.textContent =
                            "Please enter a valid name using letters and spaces only.";

                        nameError.style.display =
                            "block";

                    }

                    this.style.borderColor =
                        "#d9534f";

                }

            }
        );

    }

}


// =====================================================
// NAME VALIDATION
// =====================================================

function isValidName(name) {

    /*
     * Name rules:
     *
     * 1. At least one letter
     * 2. Unicode letters allowed
     * 3. Spaces allowed between words
     * 4. No numbers
     * 5. No special characters
     * 6. No emojis
     * 7. No leading/trailing spaces
     */

    return /^[\p{L}]+(?:\s+[\p{L}]+)*$/u.test(
        name
    );

}


// =====================================================
// GENERATE WISH
// =====================================================

function generateWish(command) {

    const message =
        wishTemplates[command];


    if (!message) {
        return;
    }


    const messageBox =
        document.getElementById(
            "wishMessage"
        );


    if (messageBox) {

        messageBox.value =
            message;

    }

}


// =====================================================
// SUCCESS NOTIFICATION
// =====================================================

function showSuccessMessage(text) {

    const toast =
        document.createElement(
            "div"
        );


    toast.textContent =
        text;


    Object.assign(
        toast.style,
        {

            position: "fixed",

            bottom: "20px",

            left: "50%",

            transform:
                "translateX(-50%) translateY(20px)",

            backgroundColor:
                "var(--accent-color, #e07a5f)",

            color: "#fff",

            padding:
                "12px 24px",

            borderRadius:
                "30px",

            boxShadow:
                "0 4px 15px rgba(0,0,0,0.2)",

            fontFamily:
                "var(--font-sans, sans-serif)",

            fontSize:
                "0.95rem",

            zIndex:
                "9999",

            opacity:
                "0",

            transition:
                "all 0.3s ease"

        }
    );


    document.body.appendChild(
        toast
    );


    // Fade in
    setTimeout(() => {

        toast.style.opacity =
            "1";

        toast.style.transform =
            "translateX(-50%) translateY(0)";

    }, 10);


    // Fade out
    setTimeout(() => {

        toast.style.opacity =
            "0";

        toast.style.transform =
            "translateX(-50%) translateY(20px)";


        setTimeout(
            () => toast.remove(),
            300
        );

    }, 3000);

}


// =====================================================
// SEND WISH TO SHEETDB
// =====================================================

async function sendWish() {

    const nameInput =
        document.getElementById(
            "wishName"
        );

    const messageInput =
        document.getElementById(
            "wishMessage"
        );

    const sendBtn =
        document.getElementById(
            "sendWishButton"
        );

    const nameError =
        document.getElementById(
            "wishNameError"
        );


    if (!nameInput || !messageInput) {
        return;
    }


    const name =
        nameInput.value.trim();

    const message =
        messageInput.value.trim();


    // =================================================
    // NAME VALIDATION
    // =================================================

    if (!name) {

        if (nameError) {

            nameError.textContent =
                "Please enter your name.";

            nameError.style.display =
                "block";

        }

        nameInput.style.borderColor =
            "#d9534f";

        nameInput.focus();

        return;

    }


    if (!isValidName(name)) {

        if (nameError) {

            nameError.textContent =
                "Please enter a valid name using letters and spaces only.";

            nameError.style.display =
                "block";

        }

        nameInput.style.borderColor =
            "#d9534f";

        nameInput.focus();

        return;

    }


    // Reset validation

    if (nameError) {

        nameError.style.display =
            "none";

    }

    nameInput.style.borderColor =
        "var(--border-color)";


    // =================================================
    // MESSAGE VALIDATION
    // =================================================

    if (!message) {

        alert(
            "Please choose or write a wish."
        );

        messageInput.focus();

        return;

    }


    // =================================================
    // CREATE DATE
    // =================================================

    const now =
        new Date();


    /*
     * Store the date as ISO 8601.
     *
     * Example:
     *
     * 2026-09-05T04:45:30.000Z
     *
     * This avoids DD/MM/YYYY vs MM/DD/YYYY
     * confusion when reading the data later.
     */

    const formattedDate =
        now.toISOString();


    // =================================================
    // SHEETDB PAYLOAD
    // =================================================

    const payload = {

        data: {

            Name: name,

            Message: message,

            Date: formattedDate

        }

    };


    try {

        if (sendBtn) {

            sendBtn.disabled =
                true;

            sendBtn.textContent =
                "Sending your wish... ❤️";

        }


        // =================================================
        // SEND TO SHEETDB
        // =================================================

        const response =
            await fetch(
                SHEETDB_API_URL,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            payload
                        )

                }
            );


        if (!response.ok) {

            throw new Error(
                `SheetDB request failed: ${response.status}`
            );

        }


        // Read response
        const result =
            await response.json();

        console.log(
            "Wish saved successfully:",
            result
        );


        // =================================================
        // SUCCESS MESSAGE
        // =================================================

        showSuccessMessage(
            "Thank you! Your wish has been saved. ❤️"
        );


        // =================================================
        // CLEAR FORM
        // =================================================

        nameInput.value =
            "";

        messageInput.value =
            "";


        if (nameError) {

            nameError.style.display =
                "none";

        }

        nameInput.style.borderColor =
            "var(--border-color)";


    } catch (error) {

        console.error(
            "Failed to save wish:",
            error
        );


        alert(
            "Oops! Something went wrong saving your wish. Please try again."
        );


    } finally {

        if (sendBtn) {

            sendBtn.disabled =
                false;

            sendBtn.textContent =
                "Send Your Wish ❤️";

        }

    }

}