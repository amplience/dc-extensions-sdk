import { SDK, Params, OptionsObject } from './SDK';
/**
 * The method that starts it all
 *
 * @type FieldType This is the field model that the extension is acting on
 * @type Params The installation parameters and instance parameters provided from Dynamic Content
 * @param options The configuration object to change the behaviour of the extension
 *
 * @return Returns a promise that will resolve with a new [[SDK]] instance
 *
 * ```typescript
 * import { init } from 'dc-extensions-sdk';
 *
 * async function initialize() {
 *  const sdk = await init();
 *
 *  //.. setup extension
 * }
 * ```
 */
export async function init<FieldType = {}, ParamType extends Params = Params>(
  options?: OptionsObject
): Promise<SDK<FieldType, ParamType>> {
  const sdk = new SDK<FieldType, ParamType>(options);

  return sdk.init();
}
