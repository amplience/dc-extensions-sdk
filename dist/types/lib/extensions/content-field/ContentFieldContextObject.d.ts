import { FieldSchema } from '../../components/Field';
import { LocalesModel } from '../../models/Locales';
import { Params } from '../../models/Params';
import { ContextObject } from '../Extension';
import { Hub } from '../dashboard/DashboardExtension';
export interface ContentFieldContextObject<ParamType extends Params = Params> extends ContextObject {
    contentItemId: string;
    fieldSchema: FieldSchema<ParamType>;
    params: ParamType;
    locales: LocalesModel;
    stagingEnvironment: string;
    visualisation: string;
    readOnly: boolean;
    hub: Hub;
    collapseByDefault: boolean;
}
export declare function isContentFieldContextObject(context: unknown | ContentFieldContextObject): context is ContentFieldContextObject;
