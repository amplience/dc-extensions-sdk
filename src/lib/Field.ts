import { ClientConnection } from 'message.io';
import { FIELD } from './Events';
import { ObjectMap } from './models/ContentItemModel';
import { ErrorReport } from './models/ErrorReport';
import { Params } from './SDK';

export type FieldSchema<ParamType extends Params = Params> = ObjectMap<{
  title?: string;
  type?: string;
  description?: string;
  ['ui:extension']: UiExtension<ParamType>;
}>;

interface UiExtension<ParamType extends Params = Params> {
  url?: string;
  name?: string;
  params?: ParamType['instance'];
  height?: number;
}

export class Field<FieldType = any, ParamType extends Params = Params> {
  /**
   * Allows you to perform actions on the field that is being edited.
   * @param connection message.io connection
   * @param schema JSON Schema of the field
   */
  constructor(private connection: ClientConnection, public schema: FieldSchema<ParamType>) {}

  /**
   * Fetch the value of the field
   *
   * ### Example
   * ```typescript
   * const value = await sdk.field.getValue()
   *
   * console.log(value)
   * ```
   */
  getValue(): Promise<FieldType> {
    return this.connection.request(FIELD.MODEL_GET);
  }

  /**
   * Change the value of the field
   * @param value The new value you want to set on the field
   * @throws Errors are thrown If the value is not set it throws an array of [[ErrorReport]]
   * @returns
   *
   * ### Example
   * ```typescript
   * try {
   *  await sdk.field.setValue({ propertyName1: 'hello world' })
   * } catch(errors) {
   *  // failed to set value returns error report
   * }
   * ```
   */
  async setValue(value?: FieldType): Promise<ErrorReport[] | void> {
    const errors = await this.connection.request<ErrorReport[]>(FIELD.MODEL_SET, value);

    if (errors && errors.length) {
      return Promise.reject(errors);
    }

    return;
  }
  /**
   * Check if your value is valid
   * @param value The value you wish to test
   *
   * Gives the current validity of the field returns a boolean
   *
   * ### Example
   * ```typescript
   * const isValid = await sdk.field.isValid()
   *
   * console.log(isValid) // false
   * ```
   */
  async isValid(value: FieldType): Promise<Boolean> {
    const isValid = await this.connection.request<Boolean>(FIELD.MODEL_IS_VALID, value);

    return isValid;
  }

  /**
   * Check the validation of your value. Returns an array containing any JSON Schema errors found.
   *
   * @param value The value you whish to test
   *
   * If you want to validate a field model and get back an  error reports [[ErrorReport]]
   *
   * ### Example
   * ```typescript
   * const errors = await sdk.field.validate();
   *
   * if (errors && errors.length) {
   *   errors.forEach(error => console.log(error));
   * } else {
   *   // valid
   * }
   * ```
   */

  async validate(value: FieldType): Promise<ErrorReport[] | void> {
    const errors = await this.connection.request<ErrorReport[] | void>(FIELD.MODEL_VALIDATE, value);

    return errors && errors.length ? errors : undefined;
  }
  /**
   * Reset the value to the previously loaded state
   *
   * ### Example
   * ```typescript
   * const resetValue = await sdk.field.reset()
   *
   * // will be empty content or last saved content
   * console.log(resetValue)
   * ```
   */
  reset(): Promise<FieldType> {
    return this.connection.request(FIELD.MODEL_RESET);
  }
}
