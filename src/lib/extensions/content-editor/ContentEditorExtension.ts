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
import { Assets } from '../../components/Assets';
import { ContentEditorApplicationNavigator } from '../../components/ContentEditorNavigator';
import { ContentTypes } from '../../components/ContentType';
import { Workflows } from '../../components/Workflows';

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
   * Assets - Allows you to get assets
   */
  public assets!: Assets;
  /**
   * Content Item - The model of the Content Item that is being edited.
   */
  public contentItem!: ContentItem;
  /**
   * Schema - The JSON Schema of the Content Item that is being edited.
   */
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
   * Content Types - used for getting content type settings
   */
  public contentTypes!: ContentTypes;

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
   * Workflows - Use to fetch workflow states.
   */
  public workflows!: Workflows;

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
  public hub!: Hub;

  /**
   * ApplicationNavigator - used to navigate within the form
   */
  public applicationNavigator!: ContentEditorApplicationNavigator;

  /**
   * CollaspseByDefault - global setting for whether or not form fields should be open or closed by default
   */
  public collaspseByDefault!: boolean;

  constructor(options: ExtensionOptions, context: ContentEditorContextObject<ParamType>) {
    super(options, context);

    this.mediaLink = new MediaLink(this.connection);
    this.contentLink = new ContentLink(this.connection);
    this.contentReference = new ContentReference(this.connection);
    this.contentTypes = new ContentTypes(this.connection);
    this.workflows = new Workflows(this.connection);
  }

  setupContext(context: ContentEditorContextObject<ParamType>): void {
    const {
      schema,
      params,
      locales,
      stagingEnvironment,
      readOnly,
      visualisation,
      hub,
      collaspseByDefault,
    } = context;

    this.assets = new Assets(this.connection);
    this.contentItem = new ContentItem(this.connection);
    this.schema = schema;
    this.form = new ContentEditorForm(this.connection, readOnly);
    this.params = params;
    this.locales = locales;
    this.visualisation = visualisation;
    this.stagingEnvironment = stagingEnvironment;
    this.collaspseByDefault = collaspseByDefault;
    this.hub = hub;

    this.applicationNavigator = new ContentEditorApplicationNavigator(this.connection);
  }
}
