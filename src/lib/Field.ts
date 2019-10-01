import { ClientConnection } from 'message.io';
import { FIELD, CONTEXT } from './Events';
import { ErrorReport } from './models/ErrorReport';
export interface FieldSchema {
  title: string;
  type: string;
}

export class Field<FieldType = {}> {
  /**
   * Allows you to perform actions on the field that is being edited.
   * @param connection message.io connection
   * @param schema JSON Schema of the field
   */
  constructor(private connection: ClientConnection, public schema: FieldSchema) {}

  /**
   * Fetch the value of the field
   */
  getValue(): Promise<FieldType> {
    return this.connection.request(FIELD.MODEL_GET);
  }

  /**
   * Change the value of the field
   * @param value The new value you want to set on the field
   */
  async setValue(value?: FieldType): Promise<[ErrorReport] | void> {
    const errors: [ErrorReport] = await this.connection.request(FIELD.MODEL_SET, value);

    if (errors && errors.length) {
      return Promise.reject(errors);
    }

    return;
  }
  /**
   * Check if your value is valid
   * @param value The value you wish to test
   */
  async isValid(value: FieldType): Promise<Boolean> {
    const isValid = await this.connection.request<Boolean>(FIELD.MODEL_IS_VALID, value);

    return isValid;
  }

  async isReadOnly() {
    const readOnly = await this.connection.request<Boolean>(FIELD.GET_READ_ONLY);

    return readOnly;
  }
  /**
   * Check the validation of your value. Returns an array containing any JSON Schema errors found.
   * @param value The value you whish to test
   */
  async validate(value: FieldType): Promise<[ErrorReport] | void> {
    const errors = await this.connection.request<[ErrorReport] | void>(FIELD.MODEL_VALIDATE, value);

    return errors && errors.length ? errors : undefined;
  }
  /**
   * Reset the value to the previously loaded state
   */
  reset(): Promise<FieldType> {
    return this.connection.request(FIELD.MODEL_RESET);
  }
}
