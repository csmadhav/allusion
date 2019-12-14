import {Allusion} from './allusion';
import {LoadEvent} from './events/load';
import {Environment} from './environment';
import {ClickEvent} from './events/click';
import {ErrorEvent} from './events/error';
import {ChangeEvent} from './events/change';
import {XHRSentEvent} from './events/xhr/sent';
import {PromiseRejectionEvent} from './events/promise-rejection-event';

try {
  if((window as any)._alsn && typeof ((window as any)._alsn.config) !== "undefined" ) {
    (window as any)._alsn = new Allusion((window as any)._alsn.config);
    let events =  [
      ClickEvent, 
      LoadEvent, 
      XHRSentEvent, 
      ErrorEvent, 
      PromiseRejectionEvent,
      ChangeEvent
    ];

    events = events.map((event:any) => {
      event = (new event);
      event.listen();
      return event;
    });  
  }
} catch (e) {
  if(Environment.isDev()) {
    throw e;
  } else {
    console.error(`[Allusion JS internal]:`, e);
  }
}

