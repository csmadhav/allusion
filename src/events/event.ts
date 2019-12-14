import {Utilities} from '../utilities';

export abstract class AllusionEvent {
  public event:any;
  public EVENT_TYPE:string;
  public timeStamp:number;

  handler(event: Event) {
    this.serialize(event);
    (window as any)._alsn.queueService.push(this);
  }

  listen():any {
    let wndw = (window as any);
    (wndw)[wndw._alsn.listenerMethod](wndw._alsn.events[this.EVENT_TYPE], (event: any) => {
      this.handler(event);
    });
  }

  serialize(event: Event):any {
    this.event = {};
    this.timeStamp = (event.timeStamp)? Math.ceil(event.timeStamp) : undefined;
    this.event.srcElement = (typeof (event as any).target.outerHTML !== "undefined")? Utilities.getTagOnly((event as any).target.outerHTML) : null;
  }
}
