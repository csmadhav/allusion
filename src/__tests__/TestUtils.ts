import { Allusion } from "../Allusion";

class TestUtils {
    static setAllusionObjectInWindow(): void {
        window._alsn = {
            visitedAt: (new Date).toISOString(),
            config: {
                trackingUrl: "https://localhost:8080/track"
            }
        } as Allusion;
    }

    static getErrorEvent(): ErrorEvent {
        return new ErrorEvent("custom error", {
            error : new Error("custom error object"),
            message : "custom error message",
            lineno : 402,
            filename : "test.js"
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