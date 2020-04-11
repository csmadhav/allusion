import { AllusionEvent } from "./AllusionEvent";
import { PushableEvent } from "../interfaces/PushableEvent";
import { Queueable } from "../interfaces/Queueable";
import { Events } from "../types";

export class ClickEvent extends AllusionEvent implements PushableEvent, Queueable {
  eventType = Events.click;
}
