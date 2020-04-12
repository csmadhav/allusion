import { AllusionErrorEvent } from "./events/AllusionErrorEvent";
import { AllusionEvent } from "./events/AllusionEvent";
import { AllusionPromiseRejectionEvent } from "./events/AllusionPromiseRejectionEvent";
import { QueuePayload } from "./types";

export class QueueService {
  private queue: Array<QueuePayload> = [];

  private errorEvents = [AllusionErrorEvent, AllusionPromiseRejectionEvent];

  public push(allusionEvent: AllusionEvent): void {
    const respectedEventData = {
      eventType: allusionEvent.eventType,
      visitTimestamp: allusionEvent.timeStamp,
      eventData: allusionEvent.event
    };

    // Converting Epoch timestamp in milliseconds to DOMHighResTimeStamp
    // By checking if timeStamp length is quite huge and comparable with Epoch timestamp (in milliseconds)
    // Subtracting it by visit timestamp.

    if (allusionEvent.timeStamp && allusionEvent.timeStamp.toString().length >= 13) {
      respectedEventData.visitTimestamp = allusionEvent.timeStamp - (new Date((window)._alsn.visitedAt)).getTime();
    }
    this.queue.push(respectedEventData);
    this.errorEvents.forEach((errorEvent) => {
      if (allusionEvent instanceof errorEvent) {
        this.send();
      }
    });
  }

  private send(): void {
    const lastIndex = this.queue.length - 1;
    const payload = {
      globalUserID: window._alsn.userID,
      globalVisitID: window._alsn.visitID,
      url: window.location.href,
      visitedAt: window._alsn.visitedAt,
      events: this.queue.slice(0, lastIndex + 1),
      userAgent: window.navigator.userAgent
    };
    const xhr = new XMLHttpRequest;
    xhr.open("POST", window._alsn.config.trackingUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.alsnXHR = true;
    xhr.addEventListener("load", () => {
      this.queue = this.queue.slice(lastIndex + 1);
    });
    xhr.send(JSON.stringify(payload));
  }

  public getQueue(): Array<QueuePayload> {
    return this.queue;
  }
}
