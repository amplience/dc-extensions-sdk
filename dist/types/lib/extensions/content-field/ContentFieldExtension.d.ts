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
export declare class ContentFieldExtension<FieldType = {}, ParamType extends Params = Params> extends Extension<ContentFieldContextObject<ParamType>> {
    /**
     * Assets - Allows you to get assets
     */
    assets: Assets;
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
     * Workflows - Use to fetch workflow states.
     */
    workflows: Workflows;
    /**
     * Params - optional parameters for your extension.
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
    /**
     * Content Types - used for getting content type settings
     */
    contentTypes: ContentTypes;
    form: Form;
    /**
     * stagingEnvironment - Used for accessing staged assets.
     */
    stagingEnvironment: string;
    /**
     * Visualisation - URL of the visualisation
     */
    visualisation: string;
    /**
     * Hub - Hub id and Hub name
     */
    hub: Hub;
    /**
     * collapseByDefault - global setting for whether or not form fields should be open or closed by default
     */
    collapseByDefault: boolean;
    /**
     * ApplicationNavigator - used to navigate within the form
     */
    applicationNavigator: ContentEditorApplicationNavigator;
    constructor(options: ExtensionOptions, context: ContentFieldContextObject<ParamType>);
    setupContext(context: ContentFieldContextObject<ParamType>): void;
}
