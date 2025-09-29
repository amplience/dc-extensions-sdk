import { LocalesModel } from '../../models/Locales';
import { Params } from '../../models/Params';
import { ContextObject } from '../Extension';
import { SchemaType } from '../content-editor/ContentEditorExtension';
import { Hub } from '../dashboard/DashboardExtension';
export interface ContentEditorContextObject<ParamType extends Params = Params> extends ContextObject {
    contentItemId: string;
    schema: SchemaType;
    params: ParamType;
    locales: LocalesModel;
    stagingEnvironment: string;
    visualisation: string;
    readOnly: boolean;
    hub: Hub;
    collapseByDefault: boolean;
}
export declare function isContentEditorContextObject(context: unknown | ContentEditorContextObject): context is ContentEditorContextObject;
