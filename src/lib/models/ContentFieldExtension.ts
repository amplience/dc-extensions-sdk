import { Frame } from '../Frame';
import { MediaLink } from '../MediaLink';
import { ContentLink } from '../ContentLink';
import { ContentItem } from '../ContentItem';
import { ContentReference } from '../ContentReference';
import { LocalesModel } from './Locales';
import { Field } from '../Field';
import { Form } from '../Form';
import { Params } from './Params';

export interface ContentFieldExtension<FieldType = any, ParamType extends Params = Params> {
  /**
   * Content Item - The model of the Content Item that is being edited.
   */
  contentItem: ContentItem;
  /**
   * Field - Allows you to get and set the value of the field the extension is control of.
   */
  field: Field<FieldType, ParamType>;
  /**
   * Frame - Use to control the height sizing behaviour of your extension.
   */
  frame: Frame;
  /**
   * Params - optional paramaters for your extension.
   */
  params: ParamType;
  /**
   * Locales - The locales you currently have available.
   */
  locales: LocalesModel;
  /**
   * Content Link - Use to open a content browser.
   */
  contentLink: ContentLink;
  /**
   * Content Reference - Use to open a content browser.
   */
  contentReference: ContentReference;
  /**
   * Media Link - Use to open a media browser.
   */
  mediaLink: MediaLink;
  /**
   * Form - controls over the form such as readonly change handlers.
   */
  form: Form;
  /**
   * stagingEnvironment - Used for accessing staged assets.
   */
  stagingEnvironment: string;
  /**
   * Visualisation - URL of the visualisation
   */
  visualisation: string;
}
