import {ClientConnection, MIO_EVENTS} from 'message.io';
import Bling from './Bling';
import { ContentItem, ContentItemObject } from './ContentItem';

export enum SDK_EVENTS {
  FIELD_MODEL = 'field-model',
  CONTENT_ITEM = 'content-item',
  CONTENT_TYPE = 'content-type',
  HEIGHT = 'height',
  AUTO_RESIZER_START = 'auto-resizer-start',
  AUTO_RESIZER_STOP = 'auto-resizer-stop',
}


export interface OptionsObject {
  window?: Window;
  debug?: boolean;
}

export interface Options {
  window: Window;
  debug: boolean;
}

export class DCUI {
  public connection!: ClientConnection;
  public fieldModel: any;
  public contentItem!: ContentItem;
  private $:Bling;
  protected options: Options;
  protected readonly defaultOptions: Options = {
    window: window,
    debug: false
  };

  constructor(options: OptionsObject = {}){
    this.options = { ...this.defaultOptions, ...options };
    this.$ = new Bling(this.options.window);
  }

  public init(): Promise<void> {
    return new Promise((resolve, reject)=>{
      this.connection = new ClientConnection(this.options);
      this.connection.on(MIO_EVENTS.CONNECTED,()=>{
        resolve();
      })
      this.listenToSDKEvents();
      this.requestInfo();
    });
  }

  private listenToSDKEvents() {
    this.connection.on(SDK_EVENTS.HEIGHT, (_payload: any, resolve: Function, _reject: Function)=>{resolve(this.getHeight())} );
    this.connection.on(SDK_EVENTS.FIELD_MODEL, (payload: any)=>{this.fieldModel = payload});
  }

  private requestInfo() {
    this.connection.request(SDK_EVENTS.CONTENT_ITEM)
      .then((body: ContentItemObject)=>{
        this.contentItem = new ContentItem(body);
      })
  }

  private getHeight() {
    return this.$.$('body').clientHeight;
  }

  public startAutoResizer() {
    this.connection.emit(SDK_EVENTS.AUTO_RESIZER_START);
  }

  public stopAutoResizer() {
    this.connection.emit(SDK_EVENTS.AUTO_RESIZER_STOP);
  }

}