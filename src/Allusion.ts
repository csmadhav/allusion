import { QueueService } from "./QueueService";
import { Utilities } from "./Utilities";
import { AllusionConfig } from "./types";
import { LoadEvent } from "./events/LoadEvent";
import { Environment } from "./Environment";
import { ClickEvent } from "./events/ClickEvent";
import { AllusionErrorEvent } from "./events/AllusionErrorEvent";
import { ChangeEvent } from "./events/ChangeEvent";
import { XHRSentEvent } from "./events/XHRSentEvent";
import { AllusionPromiseRejectionEvent } from "./events/AllusionPromiseRejectionEvent";
import { AllusionEvent } from "./events/AllusionEvent";

export class Allusion {
  public queueService: QueueService = new QueueService;
  public config: AllusionConfig;
  public userID: string | undefined;
  public visitID: string;
  public visitedAt: string;

  constructor(config: AllusionConfig) {
    this.config = config;
    this.userID = Utilities.getCookie("alsn_uid");
    if (!this.userID) {
      this.userID = Utilities.generateId();
      Utilities.setCookie("alsn_uid", this.userID);
    }
    this.visitID = Utilities.generateId();
    this.visitedAt = (new Date).toISOString();
  }
  
  init(): void {
    try {
      window._alsn = this;
      
      const events: Array<AllusionEvent> = [
        new ClickEvent,
        new LoadEvent,
        new XHRSentEvent,
        new AllusionErrorEvent,
        new AllusionPromiseRejectionEvent,
        new ChangeEvent
      ];

      events.forEach((event: AllusionEvent) => {
        event.listen();
      });

    } catch (e) {
      if (Environment.isDev()) {
        throw e;
      } else {
        console.error("[Allusion JS internal]:", e);
      }
    }
  }

  track(exception: Error): void {
    try {
      throw exception;
    } catch (exception) {
      const error = new ErrorEvent("error", {
        error: exception,
        message: exception.message,
      });
      const allusinErrorEvent = new AllusionErrorEvent();
      allusinErrorEvent.handler(error);
    }
  }

  // static method to call via npm module as _alsn.track() from any class.
  static track(exception: Error): void {
    window._alsn.track(exception);
  }
}
