import { ClientConnection } from 'message.io';
import { FIELD } from './Events';
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
  constructor (private connection: ClientConnection, public schema: FieldSchema) {}

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
  setValue(value: FieldType): Promise<[ErrorReport]> {
    return new Promise(async (resolve, reject) => {
      const errors: [ErrorReport] = await this.connection.request(FIELD.MODEL_SET, value);
      if (errors.length) {
        reject(errors);
      } else {
        resolve();
      }
    });
  }
  /**
   * Check if your value is valid
   * @param value The value you whish to test
   */
  isValid(value: FieldType): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      const isValid: Boolean = await this.connection.request(FIELD.MODEL_IS_VALID, value);
      resolve(isValid);
    });
  }
  /**
   * Check the validation of your value. Returns an array containing any JSON Schema errors found.
   * @param value The value you whish to test
   */
  validate(value: FieldType): Promise<[ErrorReport]> {
    return new Promise(async (resolve, reject) => {
      const errors: [ErrorReport] = await this.connection.request(FIELD.MODEL_VALIDATE, value);
      resolve(errors);
    });
  }
  /**
   * Reset the value to the previously loaded state
   */
  reset(): Promise<any> {
    return this.connection.request(FIELD.MODEL_RESET);
  }
}
