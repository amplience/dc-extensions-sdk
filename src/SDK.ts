import { ClientConnection, MIO_EVENTS } from 'message.io';
import { ContentItem } from './ContentItem';
import { ContentType } from './models/ContentType';
import { Field } from './Field';
import { Frame } from './Frame';
import { Params } from './models/Params';
import { FIELD, PARAMS, LOCALES, CONTENT_TYPE } from './Events';
import { MediaLink } from './MediaLink';
import { ContentLink } from './ContentLink';
import { LocalesModel } from './models/Locales';

export interface OptionsObject {
  window?: Window;
  connectionTimeout?: number;
  debug?: boolean;
}

export interface Options {
  window: Window;
  connectionTimeout: number;
  debug: boolean;
}

export class SDK {
  public connection!: ClientConnection;
  public contentItem!: ContentItem;
  public contentType!: ContentType;
  public field!: Field;
  public frame!: Frame;
  public params!: Params;
  public locales!: LocalesModel;
  public contentLink: ContentLink;
  public mediaLink: MediaLink;
  protected options: Options;
  protected readonly defaultOptions: Options = {
    window: window,
    connectionTimeout: 1000,
    debug: false
  };

  constructor(options: OptionsObject = {}) {
    this.options = { ...this.defaultOptions, ...options };
    this.connection = new ClientConnection(this.options);
    this.contentItem = new ContentItem(this.connection);
    this.mediaLink = new MediaLink(this.connection);
    this.contentLink = new ContentLink(this.connection);
    this.frame = new Frame(this.connection, this.options.window);
  }

  public async init(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (this.connection.initiated) {
        this.handleInitiation(resolve, reject);
      } else {
        this.connection.on(MIO_EVENTS.CONNECTED, async () => {
          this.handleInitiation(resolve, reject);
        });
        this.connection.on(MIO_EVENTS.CONNECTION_TIMEOUT, () => {
          reject('Connection timed out');
        });
      }
    });
  }

  private async handleInitiation(resolve: Function, reject: Function) {
    try {
      const [field, params, contentType, locales] = await this.requestInitial();
      this.field = new Field(this.connection, field);
      this.contentType = contentType;
      this.params = params;
      this.locales = locales;
      resolve(this);
    } catch {
      reject();
    }
  }

  private async requestInitial(): Promise<Array<any>> {
    return Promise.all([
      this.connection.request(FIELD.SCHEMA_GET),
      this.connection.request(PARAMS.GET),
      this.connection.request(CONTENT_TYPE.GET),
      this.connection.request(LOCALES.GET)
    ]);
  }
}
