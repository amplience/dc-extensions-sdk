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
/**
 * Expected format for the provided options
 */
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
  /**
   * message.io [[ClientConnection]] instance. Use to listen to any of the message.io lifecycle events.
   */
  public connection!: ClientConnection;
  /**
   * Content Item - The model of the Content Item that is being edited.
   */
  public contentItem!: ContentItem;
  /**
   * Content Type - The JSON Schema of the Content Item that is being edited.
   */
  public contentType!: ContentType;
  /**
   * Field - Allows you to get and set the value of the field the extension is control of.
   */
  public field!: Field;
  /**
   * Frame - Use to control the height sizing behaviour of your extension.
   */
  public frame!: Frame;
  /**
   * Params - optional paramaters for your extension.
   */
  public params!: Params;
  /**
   * Locales - The locales you currently have available.
   */
  public locales!: LocalesModel;
  /**
   * Content Link - Use to open a content browser.
   */
  public contentLink: ContentLink;
  /**
   * Content Link - Use to open a media browser.
   */
  public mediaLink: MediaLink;
  protected options: Options;
  protected readonly defaultOptions: Options = {
    window: window,
    connectionTimeout: 1000,
    debug: false
  };

  /**
   * The SDK instance is the central place for all SDK methods. It takes an options object.
   * @param options
   */
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
