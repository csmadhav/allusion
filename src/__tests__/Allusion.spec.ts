import { Allusion } from "../Allusion";
import { AllusionConfig } from "../types";
import { Utilities } from "../Utilities";
import { ClickEvent } from "../events/ClickEvent";
import { AllusionErrorEvent } from "../events/AllusionErrorEvent";
import { ChangeEvent } from "../events/ChangeEvent";
import { XHRSentEvent } from "../events/XHRSentEvent";
import { AllusionPromiseRejectionEvent } from "../events/AllusionPromiseRejectionEvent";
import { LoadEvent } from "../events/LoadEvent";
import { Environment } from "../Environment";

jest.mock("../Utilities");
jest.mock("../events/ClickEvent");
jest.mock("../events/AllusionErrorEvent");
jest.mock("../events/ChangeEvent");
jest.mock("../events/XHRSentEvent");
jest.mock("../events/AllusionPromiseRejectionEvent");
jest.mock("../events/LoadEvent");

describe("testing allusion", () => {
    const config: AllusionConfig = {
        trackingUrl: "http://localhost:8080/track"
    };

    let alsn: Allusion;
    beforeEach(() => {
        alsn = new Allusion(config);
        jest.resetAllMocks();
    });

    test("testing constructor", () => {
        alsn = new Allusion(config);
        expect(alsn.config).toEqual(config);
        // verifying number of calls here.
        expect(Utilities.setCookie).toHaveBeenCalledTimes(1);
        expect(Utilities.generateId).toHaveBeenCalledTimes(2);
        expect(Utilities.getCookie).toHaveBeenCalledTimes(1);
    });

    test("call to init", () => {
        alsn.init();
        expect(ClickEvent.prototype.listen).toHaveBeenCalledTimes(1);
        expect(LoadEvent.prototype.listen).toHaveBeenCalledTimes(1);
        expect(XHRSentEvent.prototype.listen).toHaveBeenCalledTimes(1);
        expect(AllusionErrorEvent.prototype.listen).toHaveBeenCalledTimes(1);
        expect(AllusionPromiseRejectionEvent.prototype.listen).toHaveBeenCalledTimes(1);
        expect(ChangeEvent.prototype.listen).toHaveBeenCalledTimes(1);
    });

    test("call to init fails with exception on non-dev env", () => {
        const err = new Error("random error");
        console.error = (message?: string, errorActual?: Error): void => {
            expect(message).toEqual("[Allusion JS internal]:");
            expect(errorActual).toEqual(err);
        };
        ClickEvent.prototype.listen = (): void => {
            throw err;
        };
        alsn.init();
    });

    test("call to init fails with exception on dev env", () => {
        Environment.isDev = (): boolean => true;
        const err = new Error("random error");
        ClickEvent.prototype.listen = (): void => {
            throw err;
        };
        expect(() => {
            alsn.init();
        }).toThrow();
    });

    test("call to track using allusin object", () => {
        alsn.track(new Error("Custom Error"));
        expect(AllusionErrorEvent.prototype.handler).toHaveBeenCalledTimes(1);
    });

    test("call to static track, which internall call to track", () => {
        window._alsn = alsn;
        Allusion.track(new Error("Custom Error"));
        expect(AllusionErrorEvent.prototype.handler).toHaveBeenCalledTimes(1);
    });
 });