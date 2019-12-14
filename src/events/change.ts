import {AllusionEvent} from './event';
import {IEvent} from '../interfaces/event';
import {IShouldQueue} from '../interfaces/should-queue';

export class ChangeEvent extends AllusionEvent implements IEvent, IShouldQueue {
  EVENT_TYPE:string = 'change';
}
