window._alsn = {
    config: {
        trackingUrl: "http://localhost:8080/track",
    }
}

function getInTouch() {
    // Something seems broken here:
    throw new Error(`something broke inside getInTouch`);
}

window.addEventListener('load', () => {
    throw new Error(`something went wrong`);
})