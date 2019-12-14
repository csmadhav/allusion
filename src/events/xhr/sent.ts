import {AllusionEvent} from '../event';
import {IEvent} from '../../interfaces/event';
import {IShouldQueue} from '../../interfaces/should-queue';

export class XHRSentEvent extends AllusionEvent implements IEvent, IShouldQueue {

  EVENT_TYPE:string = 'xhrSent';

  listen() {
    let wndw = (window as any);
    (wndw)[wndw._alsn.listenerMethod]((wndw)._alsn.events[this.EVENT_TYPE], (event: any) => {
      this.handler(event);
    });

    let reference = this;

    (XMLHttpRequest as any).prototype.originalSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.send = function(...args: any[]) {
      let originalRSC = this.onreadystatechange;
      
      if(this.alsn_xhr === undefined) {
        //Works in IE7 above only
        this[wndw._alsn.listenerMethod]((wndw)._alsn.events.readyStateChanged, function(){
          if(this.readyState === 4) {

            let xhrSentEvent = new CustomEvent(wndw._alsn.events[reference.EVENT_TYPE], { detail:this });

            wndw[wndw._alsn.dispatchMethod](xhrSentEvent)
          }
        })
      }

      this.originalSend(...args);
    }    
  }

  serialize(event: CustomEvent) {
    let xhr = event.detail;
    this.event = {
      url: xhr.responseURL,
      method: xhr.method,
      responseText: xhr.responseText,
      status: xhr.status,
    }
    this.timeStamp = (event.timeStamp)? Math.ceil(event.timeStamp) : undefined;
  }
}
