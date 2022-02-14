import { ContentEditorForm } from '../../components/ContentEditorForm';
import { ContentItem } from '../../components/ContentItem';
import { ContentLink } from '../../components/ContentLink';
import { ContentReference } from '../../components/ContentReference';
import { MediaLink } from '../../components/MediaLink';
import { LocalesModel } from '../../models/Locales';
import { Params } from '../../models/Params';
import { Extension, ExtensionOptions } from '../Extension';
import { ContentEditorContextObject } from './ContentEditorContextObject';
import { FieldSchema } from '../../components/Field';
import { ObjectMap } from '../../models/ContentItemModel';
import { Hub } from '../dashboard/DashboardExtension';

export type SchemaType = ObjectMap<{
  id?: string;
  $id?: string;
  $schema: string;
  title?: string;
  description?: string;
  allOf: Array<{ $ref: string }>;
  type?: string;
  propertyOrder?: Array<string>;
  required?: Array<string>;
  properties: ObjectMap<any, FieldSchema>;
}>;

export class ContentEditorExtension<ParamType extends Params = Params> extends Extension<
  ContentEditorContextObject<ParamType>
> {
  /**
   * Content Item - The model of the Content Item that is being edited.
   */
  public contentItem!: ContentItem;

  public schema!: SchemaType;
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
  public form!: ContentEditorForm;
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
  public hub?: Hub

  constructor(options: ExtensionOptions) {
    super(options);

    this.mediaLink = new MediaLink(this.connection);
    this.contentLink = new ContentLink(this.connection);
    this.contentReference = new ContentReference(this.connection);
  }

  setupContext(context: ContentEditorContextObject<ParamType>): void {
    const { schema, params, locales, stagingEnvironment, readOnly, visualisation, hub } = context;

    this.contentItem = new ContentItem(this.connection);
    this.schema = schema;
    this.form = new ContentEditorForm(this.connection, readOnly);
    this.params = params;
    this.locales = locales;
    this.visualisation = visualisation;
    this.stagingEnvironment = stagingEnvironment;
    this.hub = hub;
  }
}
