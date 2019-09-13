import { ClientConnection } from 'message.io';
import { FIELD } from './Events';
import { Error } from './models/Error';
export interface FieldSchema {
  title: string;
  type: string;
}

export class Field {
  /**
   * Allows you to perform actions on the field that is being edited.
   * @param connection message.io connection
   * @param schema JSON Schema of the field
   */
  constructor(private connection: ClientConnection, public schema: FieldSchema) {}

  /**
   * Fetch the value of the field
   */
  getValue(): Promise<any> {
    return this.connection.request(FIELD.MODEL_GET);
  }

  /**
   * Change the value of the field
   * @param value The new value you want to set on the field
   */
  setValue(value: any): Promise<[Error]> {
    return new Promise(async (resolve, reject) => {
      const errors: [Error] = await this.connection.request(FIELD.MODEL_SET, value);
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
  isValid(value: any): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      const errors: [Error] = await this.connection.request(FIELD.MODEL_IS_VALID, value);
      resolve(errors.length <= 0);
    });
  }
  /**
   * Check the validation of your value. Returns an array containing any JSON Schema errors found.
   * @param value The value you whish to test
   */
  validate(value: any): Promise<[Error]> {
    return new Promise(async (resolve, reject) => {
      const errors: [Error] = await this.connection.request(FIELD.MODEL_VALIDATE, value);
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
