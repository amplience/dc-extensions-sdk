import {ClientConnection, MIO_EVENTS} from 'message.io';
import Bling from './Bling';
import { ContentItem, ContentItemObject } from './ContentItem';

export enum SDK_EVENTS {
  FIELD_MODEL = 'field-model',
  CONTENT_ITEM = 'content-item',
  CONTENT_TYPE = 'content-type',
  HEIGHT = 'height',
  HEIGHT_UPDATE = 'height-update',
  AUTO_RESIZER_START = 'auto-resizer-start',
  AUTO_RESIZER_STOP = 'auto-resizer-stop',
}


export interface OptionsObject {
  window?: Window;
  debug?: boolean;
}

export interface Options {
  window: Window;
  connectionTimeout: number;
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
    connectionTimeout: 100,
    debug: false
  };

  constructor(options: OptionsObject = {}){
    this.options = { ...this.defaultOptions, ...options };
    this.connection = new ClientConnection(this.options);
    this.listenToSDKEvents();
    this.$ = new Bling(this.options.window);
  }

  public init(): Promise<void> {
    return new Promise((resolve, reject)=>{
      if (this.connection.initiated) {
        this.handleInitiation(resolve);
      } else {
        this.connection.on(MIO_EVENTS.CONNECTED,()=>{
          this.handleInitiation(resolve);
        })
        this.connection.on(MIO_EVENTS.CONNECTION_TIMEOUT,()=>{
          reject("Connection to DC timed out");
        })
      }
    });
  }

  private handleInitiation(resolve: Function) {
    this.requestContentItem();
    resolve();
  }

  private listenToSDKEvents() {
    this.connection.on(SDK_EVENTS.HEIGHT, (_payload: any, resolve: Function, _reject: Function)=>{resolve(this.getHeight())} );
    this.connection.on(SDK_EVENTS.FIELD_MODEL, (payload: any)=>{this.fieldModel = payload});
  }

  private requestContentItem() {
    this.connection.request(SDK_EVENTS.CONTENT_ITEM)
      .then((body: ContentItemObject)=>{
        this.contentItem = new ContentItem(body);
      })
  }

  private getHeight() {
    return this.$.$('body').clientHeight;
  }

  public heightUpdate() {
    this.connection.emit(SDK_EVENTS.HEIGHT_UPDATE, this.getHeight());
  }

  public startAutoResizer() {
    this.connection.emit(SDK_EVENTS.AUTO_RESIZER_START);
  }

  public stopAutoResizer() {
    this.connection.emit(SDK_EVENTS.AUTO_RESIZER_STOP);
  }

}