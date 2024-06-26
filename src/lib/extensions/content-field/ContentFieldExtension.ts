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
import { Hub } from '../dashboard/DashboardExtension';
import { Assets } from '../../components/Assets';
import { ContentTypes } from '../../components/ContentType';
import { Workflows } from '../../components/Workflows';
import { ContentEditorApplicationNavigator } from '../../components/ContentEditorNavigator';

export class ContentFieldExtension<
  FieldType = {},
  ParamType extends Params = Params
> extends Extension<ContentFieldContextObject<ParamType>> {
  /**
   * Assets - Allows you to get assets
   */
  public assets!: Assets;
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
   * Workflows - Use to fetch workflow states.
   */
  public workflows!: Workflows;
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

  /**
   * Content Types - used for getting content type settings
   */
  public contentTypes!: ContentTypes;

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
   * Hub - Hub id and Hub name
   */
  public hub!: Hub;
  /**
   * collapseByDefault - global setting for whether or not form fields should be open or closed by default
   */
  public collapseByDefault!: boolean;

  /**
   * ApplicationNavigator - used to navigate within the form
   */
  public applicationNavigator!: ContentEditorApplicationNavigator;

  constructor(options: ExtensionOptions, context: ContentFieldContextObject<ParamType>) {
    super(options, context);

    this.mediaLink = new MediaLink(this.connection);
    this.contentLink = new ContentLink(this.connection);
    this.contentReference = new ContentReference(this.connection);
    this.contentTypes = new ContentTypes(this.connection);
    this.workflows = new Workflows(this.connection);
    this.frame = new Frame(this.connection, options.window);
  }

  setupContext(context: ContentFieldContextObject<ParamType>): void {
    const {
      fieldSchema,
      params,
      locales,
      stagingEnvironment,
      readOnly,
      visualisation,
      hub,
      collapseByDefault,
    } = context;

    this.assets = new Assets(this.connection);
    this.contentItem = new ContentItem(this.connection);
    this.field = new Field(this.connection, fieldSchema);
    this.form = new Form(this.connection, readOnly);
    this.applicationNavigator = new ContentEditorApplicationNavigator(this.connection);
    this.params = params;
    this.locales = locales;
    this.visualisation = visualisation;
    this.stagingEnvironment = stagingEnvironment;
    this.collapseByDefault = collapseByDefault;
    this.hub = hub;
  }
}
