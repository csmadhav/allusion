import { QueueService } from "./queue";
import { Utilities } from "./utilities";
import { AllusionConfig } from "./types";
import { LoadEvent } from "./events/load";
import { Environment } from "./environment";
import { ClickEvent } from "./events/click";
import { ErrorEvent } from "./events/error";
import { ChangeEvent } from "./events/change";
import { XHRSentEvent } from "./events/xhr/sent";
import { PromiseRejectionEvent } from "./events/promise-rejection-event";

export class Allusion {
  public queueService: QueueService = new QueueService();
  public events: Object = {
    click: "click",
    load: "load",
    xhrSent: "xhrSent",
    error: "error",
    promiseRejectionEvent: "unhandledrejection",
    readyStateChanged: "readystatechange",
    change: "change",
  };
  public listenerMethod: string = "addEventListener";
  public dispatchMethod: string = "dispatchEvent";
  public config: AllusionConfig;
  public userId: string | undefined;
  public visit_id: string;
  public visited_at: string;

  constructor(config: AllusionConfig) {
    this.config = config;
    this.userId = Utilities.getCookie("alsn_uid");
    if (!this.userId) {
      this.userId = Utilities.generateId();
      Utilities.setCookie("alsn_uid", this.userId);
    }
    this.visit_id = Utilities.generateId();
    this.visited_at = new Date().toISOString();
  }

  init() {
    try {
      (window as any)._alsn = this;

      let events = [
        ClickEvent,
        LoadEvent,
        XHRSentEvent,
        ErrorEvent,
        PromiseRejectionEvent,
        ChangeEvent,
      ];

      events = events.map((event: any) => {
        event = new event();
        event.listen();
        return event;
      });
    } catch (e) {
      if (Environment.isDev()) {
        throw e;
      } else {
        console.error(`[Allusion JS internal]:`, e);
      }
    }
  }

  // track error as event when the user will call this method by passing the error object as parameter.
  track(exception: Error) {
    try {
      throw exception;
    } catch (exception) {
      let error = new ErrorEvent();
      error.handler(exception);
    }
  }

  // static method to call via npm module as _alsn.track() from any class.
  static track(exception: Error) {
    (window as any)._alsn.track(exception);
  }
}
