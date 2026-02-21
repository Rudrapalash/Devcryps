const section = document.getElementById("auto-section");
const cards = Array.from(section.children);

const intervalTime = 2000;
let currentIndex = 0;

// Clone first card and append it to the end
const firstClone = cards[0].cloneNode(true);
section.appendChild(firstClone);

const totalCards = section.children.length;

function snapScroll() {
    currentIndex++;

    section.scrollTo({
        left: section.clientWidth * currentIndex,
        behavior: "auto"
    });

    // If we're at the cloned slide
    if (currentIndex === totalCards - 1) {
        setTimeout(() => {
            section.scrollTo({
                left: 0,
                behavior: "auto"
            });
            currentIndex = 0;
        }, 50);
    }
}

let autoLoop = setInterval(snapScroll, intervalTime);

// Pause on hover
section.addEventListener("mouseenter", () => {
    clearInterval(autoLoop);
});

section.addEventListener("mouseleave", () => {
    autoLoop = setInterval(snapScroll, intervalTime);
});