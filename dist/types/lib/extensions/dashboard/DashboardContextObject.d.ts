import { Params } from '../../models/Params';
import { ContextObject } from '../Extension';
import { Hub } from './DashboardExtension';
export interface DashboardContextObject<ParamType extends Params = Params> extends ContextObject {
    hubId: string;
    hub: Hub;
    locationHref: string;
    params: ParamType;
}
export declare function isDashboardContextObject(context: unknown | DashboardContextObject): context is DashboardContextObject;
