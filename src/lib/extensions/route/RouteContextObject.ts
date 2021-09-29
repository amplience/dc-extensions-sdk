import { Params } from '../../models/Params';
import { ContextObject, isContextObject } from '../Extension';

export interface RouteContextObject<ParamType extends Params = Params> extends ContextObject {
  hubId: string;
  locationHref: string;
  params: ParamType;
}

export function isRouteContextObject(
  context: unknown | RouteContextObject
): context is RouteContextObject {
  return (
    isContextObject(context) &&
    (context as RouteContextObject).category === 'ROUTE' &&
    (context as RouteContextObject).hubId !== undefined &&
    (context as RouteContextObject).locationHref !== undefined
  );
}
