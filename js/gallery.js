// js/gallery.js

function initializeGallery(data) {
    const gallery = document.getElementById("galleryGrid");
    if (!gallery || !data.gallery) return;

    gallery.innerHTML = "";

    data.gallery.forEach((image, index) => {
        const item = document.createElement("div");
        item.className = "gallery-item";

        item.innerHTML = `
            <img src="${image}" alt="Grace and Abith — moment ${index + 1}" loading="lazy">
        `;

        item.addEventListener("click", () => openLightbox(image));
        gallery.appendChild(item);
    });
}

function openLightbox(imageSrc) {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";

    lightbox.innerHTML = `
        <button class="lightbox-close">×</button>
        <img src="${imageSrc}" alt="Wedding photo zoomed">
    `;

    document.body.appendChild(lightbox);

    const closeLightbox = () => lightbox.remove();

    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) closeLightbox();
    });
}