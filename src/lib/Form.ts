import { FORM } from './Events';
import { FORM as ERRORS } from './Errors';
import { ClientConnection } from 'message.io';
import { Body } from './models/ContentItemModel';

export type onChangeHandler = (readonly: boolean) => void;

export class Form {
  private onChangeStack: Array<onChangeHandler>;

  constructor(private connection: ClientConnection, public readOnly: boolean) {
    this.onChangeStack = [];

    this.connection.on(FORM.READ_ONLY, (readonly: boolean) => {
      this.readOnly = readonly;
      this.onChangeStack.forEach(cb => cb(this.readOnly));
    });
  }

  /**
   *
   * Functions to be run after readonly changes
   * @param cb function that handles what happens after readonly changes
   */
  onReadOnlyChange(cb: onChangeHandler): Form {
    this.onChangeStack.push(cb);
    cb(this.readOnly);
    return this;
  }

  /**
   * Get the current model state of all the fields in the form.
   */
  async getValue<FormModel = {}>(): Promise<Body<FormModel>> {
    try {
      const value = await this.connection.request<Body<FormModel>>(FORM.GET_FORM_MODEL);

      return value;
    } catch (e) {
      throw new Error(ERRORS.NO_MODEL);
    }
  }
}
