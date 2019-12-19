import { AllusionEvent } from './event';
import { IEvent } from '../interfaces/event';
import { IShouldQueue } from '../interfaces/should-queue';

export class ErrorEvent extends AllusionEvent implements IEvent, IShouldQueue {
  EVENT_TYPE: string = 'error';

  serialize(event: any) {
    this.event = {};

    this.timeStamp = (event.timeStamp) ? Math.ceil(event.timeStamp) : undefined;

    this.event.errorMessage = event.message;

    this.event.stack = (event.error) ? event.error.stack : undefined;
  }
}
