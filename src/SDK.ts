import { ClientConnection, MIO_EVENTS } from 'message.io';
import { ContentItem } from './ContentItem';
import { ContentType } from './models/ContentType';
import { Field, FieldSchema } from './Field';
import { Frame } from './Frame';
import { CONTEXT } from './Events';
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
export interface VSE {
  domain: string
  src: string
}

export interface Options {
  window: Window;
  connectionTimeout: number;
  debug: boolean;
}

export interface Params {
  instance: object;
  installation: object;
}

export interface ContextObject<ParamType> {
  contentItemId: string,
  contentType: ContentType,
  fieldSchema: FieldSchema,
  params: ParamType,
  locales: LocalesModel,
  vse: VSE,
  visualisation: string
}

export class SDK <FieldType = any, ParamType extends Params = Params>{
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
  public field!: Field<FieldType>;
  /**
   * Frame - Use to control the height sizing behaviour of your extension.
   */
  public frame!: Frame;
  /**
   * Params - optional paramaters for your extension.
   */
  public params!: ParamType;
  /**
   * Locales - The locales you currently have available.
   */
  public locales!: LocalesModel;
  /**
   * Content Link - Use to open a content browser.
   */
  public contentLink: ContentLink;
  /**
   * Media Link - Use to open a media browser.
   */
  public mediaLink: MediaLink;
  /**
   * VSE - Virtual Staging Environment - used for accessing staged assets.
   */
  public vse!: VSE;
  /**
   * Visualisation - URL of the visualisation
   */
  public visualisation!: string;
  protected options: Options;
  protected readonly defaultOptions: Options = {
    window: window,
    connectionTimeout: 1000,
    debug: false
  };

  /**
   * The SDK instance is the central place for all SDK methods. It takes an optional options object.
   * @param options
   */
  constructor(options: OptionsObject = {}) {
    this.options = { ...this.defaultOptions, ...options };
    this.connection = new ClientConnection(this.options);
    this.mediaLink = new MediaLink(this.connection);
    this.contentLink = new ContentLink(this.connection);
    this.frame = new Frame(this.connection, this.options.window);
  }

  /**
   * Initialiser. Returns a promise that resolves to an instance of the SDK.
   */
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
      const {contentItemId, contentType, fieldSchema, params, locales, vse, visualisation} = await this.requestContext();
      this.contentItem = new ContentItem(this.connection, contentItemId);
      this.field = new Field(this.connection, fieldSchema);
      this.contentType = contentType;
      this.params = params;
      this.locales = locales;
      this.visualisation = visualisation;
      this.vse = vse;
      resolve(this);
    } catch {
      reject();
    }
  }

  private async requestContext(): Promise<ContextObject<ParamType>> {
    return this.connection.request(CONTEXT.GET);
  }
}
