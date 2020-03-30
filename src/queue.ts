import { Environment } from './environment';
import { ErrorEvent } from './events/error';
import { AllusionEvent } from './events/event';
import { PromiseRejectionEvent } from './events/promise-rejection-event';

export class QueueService {
  queue: Array<any> = [];

  errorEvents = [ErrorEvent, PromiseRejectionEvent];

  push(allusionEvent: AllusionEvent) {
    let length = this.queue.length;
    let eventData = {
      event_type: allusionEvent.EVENT_TYPE,
      visit_timestamp: allusionEvent.timeStamp,
      event_data: allusionEvent.event
    };

    /**
     * Converting Epoch timestamp in milliseconds to DOMHighResTimeStamp
     * By checking if timeStamp length is quite huge and comparable with Epoch timestamp (in milliseconds)
     * Subtracting it by visit timestamp.
     */

    if (allusionEvent.timeStamp && allusionEvent.timeStamp.toString().length >= 13) {
      eventData.visit_timestamp = allusionEvent.timeStamp - (new Date((window as any)._alsn.visited_at)).getTime();
    }
    this.queue.push(eventData);
    this.errorEvents.forEach((errorEvent) => {
      if (allusionEvent instanceof errorEvent) {
        this.send();
      }
    });
  }

  send() {
    let lastIndex = this.queue.length - 1;

    let payload = {
      global_user_id: (window as any)._alsn.userId,
      global_visit_id: (window as any)._alsn.visit_id,
      url: (window as any).location.href,
      visited_at: (window as any)._alsn.visited_at,
      user_agent: (window as any).navigator.userAgent,
      events: this.queue.slice(0, lastIndex + 1)
    }

    let xhr = new XMLHttpRequest;
    xhr.open('POST', (window as any)._alsn.config.trackingUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    (xhr as any).alsn_xhr = true;
    xhr.addEventListener("load", () => {
      this.queue = this.queue.slice(lastIndex + 1);
    });
    xhr.send(JSON.stringify(payload));
  }

  clear() {
    this.queue = [];
  }
}
