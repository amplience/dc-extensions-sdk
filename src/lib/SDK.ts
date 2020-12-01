import { ClientConnection, MC_EVENTS } from 'message-event-channel';
import { Frame } from './Frame';
import { CONTEXT } from './Events';
import { ERRORS_INIT } from './Errors';
import { MediaLink } from './MediaLink';
import { ContentLink } from './ContentLink';
import { ContentItem } from './ContentItem';
import { ContentReference } from './ContentReference';
import { LocalesModel } from './models/Locales';
import { Field } from './Field';
import { Form } from './Form';
import { HttpClient } from './HttpClient';
import { Params } from './models/Params';
import { ContentFieldContextObject } from './extensions/content-field/ContentFieldContextObject';
import { ContentFieldExtension } from './extensions/content-field/ContentFieldExtension';

export interface IClientConnection extends ClientConnection {}

export interface Options {
  window: Window;
  connectionTimeout: number | boolean;
  timeout: number | boolean;
  debug: boolean;
}

export class SDK<FieldType = any, ParamType extends Params = Params> {
  /**
   * message-event-channel [[ClientConnection]] instance. Use to listen to any of the message-event-channel lifecycle events.
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
  /**
   *  Client - used with [dc-management-sdk-js](https://github.com/amplience/dc-management-sdk-js) to make requests to dynamic-content
   */
  public client!: HttpClient;

  protected options: Options;
  protected readonly defaultOptions: Options = {
    window: window,
    connectionTimeout: false,
    timeout: false,
    debug: false
  };

  /**
   * The SDK instance is the central place for all SDK methods. It takes an optional options object.
   * @param options
   */
  constructor(options: Partial<Options> = {}) {
    this.options = { ...this.defaultOptions, ...options };
    this.connection = new ClientConnection(this.options);
    this.mediaLink = new MediaLink(this.connection);
    this.contentLink = new ContentLink(this.connection);
    this.contentReference = new ContentReference(this.connection);
    this.frame = new Frame(this.connection, this.options.window);
    this.client = new HttpClient(this.connection);
  }

  /**
   * Initialiser. Returns a promise that resolves to an instance of the SDK.
   */
  public async init() {
    return new Promise<SDK<FieldType, ParamType>>(async (resolve, reject) => {
      this.connection.init();
      this.connection.on(MC_EVENTS.CONNECTED, async () => {
        try {
          await this.setupContext();
          resolve(this);
        } catch (e) {
          reject(new Error(ERRORS_INIT.CONTEXT));
        }
      });
      this.connection.on(MC_EVENTS.CONNECTION_TIMEOUT, () => {
        reject(new Error(ERRORS_INIT.CONNECTION_TIMEOUT));
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

  private async requestContext(): Promise<ContentFieldContextObject<ParamType>> {
    return this.connection.request(CONTEXT.GET, null, { timeout: false });
  }
}
