import { ClientConnection, MIO_EVENTS } from 'message.io';
import { Frame } from './Frame';
import { CONTEXT } from './Events';
import { ERRORS_INIT } from './Errors';
import { MediaLink } from './MediaLink';
import { ContentLink } from './ContentLink';
import { ContentItem } from './ContentItem';
import { ContentReference } from './ContentReference';
import { LocalesModel } from './models/Locales';
import { Field, FieldSchema } from './Field';
import { Form } from './Form';

export interface IClientConnection extends ClientConnection {}
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
export interface Params {
  instance: object;
  installation: object;
}

type ContextObject<ParamType extends Params = Params> = {
  contentItemId: string;
  fieldSchema: FieldSchema<ParamType>;
  params: ParamType;
  locales: LocalesModel;
  stagingEnvironment: string;
  visualisation: string;
  readOnly: boolean;
};

export class SDK<FieldType = any, ParamType extends Params = Params> {
  /**
   * message.io [[ClientConnection]] instance. Use to listen to any of the message.io lifecycle events.
   */
  public connection!: ClientConnection;
  /**
   * Content Item - The model of the Content Item that is being edited.
   */
  public contentItem!: ContentItem;
  /**
   * Field - Allows you to get and set the value of the field the extension is control of.
   */
  public field!: Field<FieldType, ParamType>;
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
   * Content Reference - Use to open a content browser.
   */
  public contentReference: ContentReference;
  /**
   * Media Link - Use to open a media browser.
   */
  public mediaLink: MediaLink;
  /**
   * Form - controls over the form such as readonly change handlers.
   */
  public form!: Form;
  /**
   * stagingEnvironment - Used for accessing staged assets.
   */
  public stagingEnvironment!: string;
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
    this.contentReference = new ContentReference(this.connection);
    this.frame = new Frame(this.connection, this.options.window);
  }

  /**
   * Initialiser. Returns a promise that resolves to an instance of the SDK.
   */
  public async init() {
    return new Promise<SDK<FieldType, ParamType>>(async (resolve, reject) => {
      this.connection.init();
      this.connection.on(MIO_EVENTS.CONNECTED, async () => {
        try {
          await this.setupContext();
          resolve(this);
        } catch (e) {
          reject(new Error(ERRORS_INIT.CONTEXT));
        }
      });
      this.connection.on(MIO_EVENTS.CONNECTION_TIMEOUT, () => {
        reject(new Error(ERRORS_INIT.CONNTECTION_TIMEOUT));
      });
    });
  }

  private async setupContext() {
    const {
      fieldSchema,
      params,
      locales,
      stagingEnvironment,
      readOnly,
      visualisation
    } = await this.requestContext();
    this.contentItem = new ContentItem(this.connection);
    this.field = new Field(this.connection, fieldSchema);
    this.form = new Form(this.connection, readOnly);
    this.params = params;
    this.locales = locales;
    this.visualisation = visualisation;
    this.stagingEnvironment = stagingEnvironment;
  }

  private async requestContext(): Promise<ContextObject<ParamType>> {
    return this.connection.request(CONTEXT.GET, null, { timeout: false });
  }
}
