import {AllusionEvent} from './event';
import {IEvent} from '../interfaces/event';
import {IShouldQueue} from '../interfaces/should-queue';

export class PromiseRejectionEvent extends AllusionEvent implements IEvent, IShouldQueue {
  EVENT_TYPE:string = 'promiseRejectionEvent';

  serialize(event: Event):any {
    console.log(event);
    this.event = {};

    this.timeStamp = Math.ceil(event.timeStamp);

    this.event.errorMessage = ((event as any).reason) ? (event as any).reason.message : undefined;

    this.event.stack = ((event as any).reason.stack) ? (event as any).reason.stack : undefined;
    
  }
}
