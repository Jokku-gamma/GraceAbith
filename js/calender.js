// js/calendar.js

function initializeCalendar(data) {
    const calendarButton = document.getElementById("calendarButton");
    const googleButton = document.getElementById("googleCalendarButton");
    const icsButton = document.getElementById("icsCalendarButton");

    if (calendarButton) {
        calendarButton.addEventListener("click", () => {
            const options = document.getElementById("calendarOptions");
            if (options) options.classList.toggle("hidden");
        });
    }

    if (googleButton) {
        googleButton.addEventListener("click", () => openGoogleCalendar(data));
    }

    if (icsButton) {
        icsButton.addEventListener("click", () => downloadICS(data));
    }
}

function openGoogleCalendar(data) {
    const title = `${data.bride.firstName} & ${data.groom.firstName} — Wedding`;
    const details = `Join us as we celebrate the wedding of ${data.bride.fullName} & ${data.groom.fullName}.`;
    const location = `${data.venue.name}, ${data.venue.address || ""}`;
    
    const startDate = data.wedding.date.replace(/-/g, "");
    const startTime = (data.wedding.startTime || "10:00:00").replace(/:/g, "");
    const endTime = (data.wedding.endTime || "14:00:00").replace(/:/g, "");
    const dates = `${startDate}T${startTime}/${startDate}T${endTime}`;

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    
    window.open(url, "_blank");
}

function downloadICS(data) {
    const title = `${data.bride.firstName} & ${data.groom.firstName} Wedding`;
    const location = `${data.venue.name}, ${data.venue.address || ""}`;
    const description = `Wedding celebration of ${data.bride.fullName} and ${data.groom.fullName}.`;
    
    const startIso = data.wedding.date.replace(/-/g, "") + "T" + (data.wedding.startTime || "100000").replace(/:/g, "");
    const endIso = data.wedding.date.replace(/-/g, "") + "T" + (data.wedding.endTime || "140000").replace(/:/g, "");

    const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "BEGIN:VEVENT",
        `SUMMARY:${title}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        `DTSTART:${startIso}`,
        `DTEND:${endIso}`,
        "END:VEVENT",
        "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "wedding-invite.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}