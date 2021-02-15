import { ContentItem } from '../../components/ContentItem';
import { ContentLink } from '../../components/ContentLink';
import { ContentReference } from '../../components/ContentReference';
import { Field } from '../../components/Field';
import { Form } from '../../components/Form';
import { Frame } from '../../components/Frame';
import { MediaLink } from '../../components/MediaLink';
import { LocalesModel } from '../../models/Locales';
import { Params } from '../../models/Params';
import { Extension, ExtensionOptions } from '../Extension';
import { ContentFieldContextObject } from './ContentFieldContextObject';

export class ContentFieldExtension<
  FieldType = {},
  ParamType extends Params = Params
> extends Extension<ContentFieldContextObject<ParamType>> {
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
   * Params - optional parameters for your extension.
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

  constructor(options: ExtensionOptions) {
    super(options);

    this.mediaLink = new MediaLink(this.connection);
    this.contentLink = new ContentLink(this.connection);
    this.contentReference = new ContentReference(this.connection);
    this.frame = new Frame(this.connection, options.window);
  }

  setupContext(context: ContentFieldContextObject<ParamType>): void {
    const { fieldSchema, params, locales, stagingEnvironment, readOnly, visualisation } = context;

    this.contentItem = new ContentItem(this.connection);
    this.field = new Field(this.connection, fieldSchema);
    this.form = new Form(this.connection, readOnly);
    this.params = params;
    this.locales = locales;
    this.visualisation = visualisation;
    this.stagingEnvironment = stagingEnvironment;
  }
}
