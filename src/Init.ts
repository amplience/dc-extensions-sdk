import { SDK, Params, OptionsObject } from './SDK';
import { callbackify } from 'util';
/**
 * The method that starts it all
 * @param options
 * @return Returns a promise that will resolve with a new [[SDK]] instance
 */
export async function init<FieldType, ParamsType extends Params = Params>(options?: OptionsObject): Promise<SDK<FieldType, ParamsType>> {
  const sdk:SDK = new SDK(options);
  return sdk.init();
}