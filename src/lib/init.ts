import { SDK, Params, OptionsObject } from './SDK';
/**
 * The method that starts it all
 * @param options
 * @return Returns a promise that will resolve with a new [[SDK]] instance
 */
export async function init<FieldType, ParamType extends Params = Params>(
  options?: OptionsObject
): Promise<SDK<FieldType, ParamType>> {
  const sdk = new SDK<FieldType, ParamType>(options);
  return sdk.init();
}
