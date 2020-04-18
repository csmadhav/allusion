import { AllusionEvent } from "./AllusionEvent";
import { PushableEvent } from "../interfaces/PushableEvent";
import { Queueable } from "../interfaces/Queueable";
import { Events } from "../types";

export class AllusionErrorEvent extends AllusionEvent implements PushableEvent, Queueable {
  eventType = Events.error;

  serialize(event: ErrorEvent): void {
    this.timeStamp = Math.ceil(event.timeStamp);
    this.event.errorMessage = event.message;
    this.event.stack = event.error.stack;
    this.event.fileName = event.filename;
    this.event.lineNo = event.lineno;
    this.event.colNo = event.colno;
  }
}
