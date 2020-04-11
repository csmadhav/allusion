import { AllusionEvent } from "./AllusionEvent";
import { PushableEvent } from "../interfaces/PushableEvent";
import { Queueable } from "../interfaces/Queueable";
import { Events } from "../types";

export class XHRSentEvent extends AllusionEvent implements PushableEvent, Queueable {

  eventType = Events.xhrSent;

  listen(): void {
    window.addEventListener(Events.xhrSent, (event: Event) => {
      this.handler(event);
    });

    (XMLHttpRequest).prototype.originalSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.send = function(args?: Document | BodyInit | null): void {      
      if(this.alsnXHR === undefined) {
        // works in IE7 above only
        this.addEventListener(Events.readyStateChanged, function(){
          if(this.readyState === 4) {
            const xhrSentEvent = new CustomEvent(Events.xhrSent, { detail:this });
            window.dispatchEvent(xhrSentEvent);
          }
        });
      }
      this.originalSend(args);
    };    
  }

  serialize(event: CustomEvent): void {
    const xhr = event.detail;
    this.event.url = xhr.responseURL;
    this.event.method= xhr.method;
    this.event.statusCode= xhr.statusCode;
    this.timeStamp = Math.ceil(event.timeStamp);
  }
}
