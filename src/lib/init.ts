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

// async () => {
//   interface Set1 {
//     foo: string;
//     bar: number;
//   }
//   interface Set2 {
//     installation: {
//       format: string
//     }
//     instance: {
//       format: string
//     }
//   }
//   const s = await init<Set1, Set2>();
//   const f = await s.field.getValue();
  
// };
