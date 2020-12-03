import { Params } from '../../models/Params';
import { ContextObject, isContextObject } from '../Extension';

export interface DashboardContextObject<ParamType extends Params = Params> extends ContextObject {
  category: string;
  hubId: string;
  locationHref: string;
  params: ParamType;
}

export function isDashboardContextObject(
  context: unknown | DashboardContextObject
): context is DashboardContextObject {
  return (
    isContextObject(context) &&
    (context as DashboardContextObject).category === 'DASHBOARD' &&
    (context as DashboardContextObject).hubId !== undefined &&
    (context as DashboardContextObject).locationHref !== undefined
  );
}
