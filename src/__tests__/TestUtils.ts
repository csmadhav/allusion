import { Allusion } from "../Allusion";

class TestUtils {
    static setAllusionObjectInWindow(): void {
        window._alsn = new Allusion({
            trackingUrl: "http://localhost:8080/track"
        });
    }

    static getErrorEvent(): ErrorEvent {
        return new ErrorEvent("custom error", {
            error : new Error("custom error object"),
            message : "custom error message",
            lineno : 402,
            filename : "test.js",
            colno: 90
        });
    }

    static simulateClickEvent(onClick: (arg: MouseEvent) => void): void {
        const button = document.createElement("button");
        button.onclick = onClick;
        document.body.appendChild(button);
        button.click();
    }
}

export { TestUtils };