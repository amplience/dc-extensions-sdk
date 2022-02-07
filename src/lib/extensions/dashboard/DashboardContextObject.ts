import { Params } from '../../models/Params';
import { ContextObject, isContextObject } from '../Extension';
import { Hub } from './DashboardExtension';

export interface DashboardContextObject<ParamType extends Params = Params> extends ContextObject {
  hubId: string;
  hub: Hub;
  locationHref: string;
  params: ParamType;
}

export function isDashboardContextObject(
  context: unknown | DashboardContextObject
): context is DashboardContextObject {
  return (
    isContextObject(context) &&
    (context as DashboardContextObject).category === 'DASHBOARD' &&
    (context as DashboardContextObject).locationHref !== undefined &&
    (context as DashboardContextObject).hub !== undefined &&
    (context as DashboardContextObject).hubId !== undefined
  );
}
