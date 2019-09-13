import { SDK, OptionsObject } from './SDK';
export async function init(options: OptionsObject): Promise<SDK> {
  const sdk = new SDK(options);
  return sdk.init();
}
