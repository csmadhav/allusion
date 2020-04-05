window._alsn = {
    config: {
        trackingUrl: "http://localhost:8080/track",
    }
}

function getInTouch() {
    // calling track API here.
    _alsn.track(new Error(`something broke inside getInTouch`));
}

window.addEventListener('load', () => {
    throw new Error(`something went wrong`);
})