import { QueueService } from "../QueueService";
import { ClickEvent } from "../events/ClickEvent";
import { Events } from "../types";
import { TestUtils } from "./TestUtils";
import { AllusionErrorEvent } from "../events/AllusionErrorEvent";

describe("testing queue service", () => {
    const queueService = new QueueService();
    TestUtils.setAllusionObjectInWindow();

    test("pushing a non error event", () => {
        TestUtils.simulateClickEvent((ev): void => {
            const clickEvent = new ClickEvent();
            clickEvent.serialize(ev);
            queueService.push(clickEvent);
            const serializedEvent = queueService.getQueue().pop();
            const expectedEvent = {
                eventType: Events.click,
                visitTimestamp: Math.ceil(ev.timeStamp) - (new Date(window._alsn.visitedAt)).getTime(),
                eventData: {
                    srcElement: "<button>"
                }
            };
            expect(serializedEvent).toEqual(expectedEvent);
        });
    });

    test("pushing a error event", () => {
        TestUtils.simulateClickEvent((ev): void => {
            const clickEvent = new ClickEvent();
            clickEvent.serialize(ev);
            queueService.push(clickEvent);
            const customErrorEvent = TestUtils.getErrorEvent();
            const errorEvent = new AllusionErrorEvent();
            errorEvent.serialize(customErrorEvent);
            window.XMLHttpRequest.prototype.open = (method: string, url: string): void => {
                expect(method).toEqual("POST");
                expect(url).toEqual(window._alsn.config.trackingUrl);
            };
            window.XMLHttpRequest.prototype.setRequestHeader = (name: string, value: string): void => {
                expect(name).toEqual("Content-Type");
                expect(value).toEqual("application/json");
            };
            window.XMLHttpRequest.prototype.send = function (body: string): void {
                expect(JSON.parse(body)).toEqual({
                    "url": "http://localhost/",
                    "visitedAt": window._alsn.visitedAt,
                    "globalUserID": window._alsn.userID,
                    "globalVisitID": window._alsn.visitID,
                    "events": [
                        {
                            "eventType": "click",
                            "visitTimestamp": Math.ceil(ev.timeStamp) - (new Date(window._alsn.visitedAt)).getTime(),
                            "eventData": {
                                "srcElement": "<button>"
                            }
                        },
                        {
                            "eventType": "error",
                            "visitTimestamp": Math.ceil(customErrorEvent.timeStamp) - (new Date(window._alsn.visitedAt)).getTime(),
                            "eventData": {
                                "errorMessage": customErrorEvent.message,
                                "stack": customErrorEvent.error.stack,
                                "fileName": customErrorEvent.filename,
                                "colNo": customErrorEvent.colno,
                                "lineNo": customErrorEvent.lineno,
                            }
                        }
                    ],
                    "userAgent": window.navigator.userAgent
                });
                this.dispatchEvent(new Event("load"));
                expect(queueService.getQueue().length).toEqual(0);
            };
            queueService.push(errorEvent);
        });
    });
});