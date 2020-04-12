import { Utilities } from "../Utilities";
import { Events, AllusionEventData } from "../types";

export abstract class AllusionEvent {
  public event = {} as AllusionEventData;
  abstract eventType: Events;
  public timeStamp: number | undefined;

  handler(event: Event): void {
    this.serialize(event);
    window._alsn.queueService.push(this);
  }

  listen(): void {
    window.addEventListener(this.eventType, (event: Event) => {
      this.handler(event);
    });
  }

  serialize(event: Event): void {
    this.event = {} as AllusionEventData;
    this.timeStamp = (event.timeStamp) ? Math.ceil(event.timeStamp) : undefined;
    if (event.target instanceof Element) {
      this.event.srcElement = Utilities.getTagOnly(event.target.outerHTML);
    }
  }
}
