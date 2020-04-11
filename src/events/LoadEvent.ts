import { AllusionEvent } from "./AllusionEvent";
import { PushableEvent } from "../interfaces/PushableEvent";
import { Queueable } from "../interfaces/Queueable";
import { Events } from "../types";

export class LoadEvent extends AllusionEvent implements PushableEvent, Queueable {
  eventType = Events.load;
}
