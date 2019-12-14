import {QueueService} from './queue';
import {Utilities} from './utilities';
import {AllusionConfig} from './types';

export class Allusion {
  public queueService: QueueService = new QueueService;
  public events: Object = {
    click: 'click',
    load: 'load',
    xhrSent: 'xhrSent',
    error: 'error',
    promiseRejectionEvent: 'unhandledrejection',
    readyStateChanged: 'readystatechange',
    change: 'change'
  }
  public listenerMethod: string = 'addEventListener';
  public dispatchMethod: string = 'dispatchEvent';
  public config: AllusionConfig;
  public userId: string;
  public visit_id: string;
  public visited_at: string;
  
  constructor(config: AllusionConfig) {
    this.config = config;
    this.userId = Utilities.getCookie('alsn_uid');
    if(! this.userId) {
      this.userId = Utilities.generateId();
      Utilities.setCookie('alsn_uid', this.userId);
    }
    this.visit_id = Utilities.generateId();
    this.visited_at = (new Date).toISOString();
  }
}
