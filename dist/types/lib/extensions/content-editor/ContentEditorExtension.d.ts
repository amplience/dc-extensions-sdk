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
export declare type SchemaType = ObjectMap<{
    id?: string;
    $id?: string;
    $schema: string;
    title?: string;
    description?: string;
    allOf: Array<{
        $ref: string;
    }>;
    type?: string;
    propertyOrder?: Array<string>;
    required?: Array<string>;
    properties: ObjectMap<any, FieldSchema>;
}>;
export declare class ContentEditorExtension<ParamType extends Params = Params> extends Extension<ContentEditorContextObject<ParamType>> {
    /**
     * Assets - Allows you to get assets
     */
    assets: Assets;
    /**
     * Content Item - The model of the Content Item that is being edited.
     */
    contentItem: ContentItem;
    /**
     * Schema - The JSON Schema of the Content Item that is being edited.
     */
    schema: SchemaType;
    /**
     * Params - optional parameters for your extension.
     */
    params: ParamType;
    /**
     * Locales - The locales you currently have available.
     */
    locales: LocalesModel;
    /**
     * Content Types - used for getting content type settings
     */
    contentTypes: ContentTypes;
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
     * Workflows - Use to fetch workflow states.
     */
    workflows: Workflows;
    form: ContentEditorForm;
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
     * ApplicationNavigator - used to navigate within the form
     */
    applicationNavigator: ContentEditorApplicationNavigator;
    /**
     * collapseByDefault - global setting for whether or not form fields should be open or closed by default
     */
    collapseByDefault: boolean;
    constructor(options: ExtensionOptions, context: ContentEditorContextObject<ParamType>);
    setupContext(context: ContentEditorContextObject<ParamType>): void;
}
