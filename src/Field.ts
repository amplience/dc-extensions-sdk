import { ClientConnection } from 'message.io';
import { FIELD } from './Events';
import { FieldSchema } from './models/FieldSchema';
import { Error } from './models/Error';
export class Field {
  constructor(private connection: ClientConnection, public schema: FieldSchema) {}

  getValue(): Promise<any> {
    return this.connection.request(FIELD.MODEL_GET);
  }

  setValue(value: any): Promise<[Error] | null> {
    return new Promise(async (resolve, reject) => {
      const errors: [Error] = await this.connection.request(FIELD.MODEL_SET, value);
      if (errors.length) {
        reject(errors);
      } else {
        resolve();
      }
    });
  }

  reset(): Promise<any> {
    return this.connection.request(FIELD.MODEL_RESET);
  }
}
