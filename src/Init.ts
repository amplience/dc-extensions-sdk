import { SDK, OptionsObject } from './SDK';
/**
 * The method that starts it all
 * @param options
 * @return Returns a promise that will resolve with a new [[SDK]] instance
 */
export async function init(options: OptionsObject): Promise<SDK> {
  const sdk = new SDK(options);
  return sdk.init();
}
