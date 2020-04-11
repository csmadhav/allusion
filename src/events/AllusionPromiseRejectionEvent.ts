import { AllusionEvent } from "./AllusionEvent";
import { PushableEvent } from "../interfaces/PushableEvent";
import { Queueable } from "../interfaces/Queueable";
import { Events } from "../types";

export class AllusionPromiseRejectionEvent extends AllusionEvent implements PushableEvent, Queueable {
  eventType = Events.promiseRejectionEvent;

  serialize(event: PromiseRejectionEvent): void {
    this.timeStamp = Math.ceil(event.timeStamp);
    if (event.reason) {
      this.event.errorMessage = event.reason.message;
      this.event.stack = event.reason.stack;
    }
  }
}
