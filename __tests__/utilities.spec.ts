import { Utilities } from "../src/Utilities";

describe("testing util class", () => {
    test("generateId should return string of length 13", () => {
        const id = Utilities.generateId();
        expect(id.length).toEqual(13);
    });

    test("getTagOnly should return only the tag", () => {
        const outerHtmlOut = Utilities.getTagOnly("<ul onClick=\"hello()\"><li></li></ul>");
        expect(outerHtmlOut).toEqual("<ul onClick=\"hello()\">");
    });

    test("setCookie should set the cookie", () => {
        Utilities.setCookie("test", "value");
        let value: string | undefined;
        value = "; " + document.cookie;
        value = value.split("; test=").pop();
        if (value) {
            value = value.split(";").shift();
        }
        expect(value).toEqual("value");
    });

    test("getCookie should get the correct cookie", () => {
        document.cookie = "test=value; path=/";
        const valueOfCookie = Utilities.getCookie("test");
        expect(valueOfCookie).toEqual("value");
    });

    test("getCookie should undefined if not found", () => {
        document.cookie = "test=value; path=/";
        const valueOfCookie = Utilities.getCookie("koko");
        expect(valueOfCookie).toEqual(undefined);
    });
});