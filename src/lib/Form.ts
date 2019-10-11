import { FORM } from './Events';
import { ClientConnection } from 'message.io';
import { ContentItemModel, Body } from './models/ContentItemModel';

export type onChangeHandler = (readonly: boolean) => void;

export class Form<FieldType = any> {
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
  onReadOnlyChange(cb: onChangeHandler): Form<FieldType> {
    this.onChangeStack.push(cb);
    cb(this.readOnly);
    return this;
  }

  /**
   * Get the content item's current model state, not just field level model
   */
  async getValue(): Promise<Body<FieldType>> {
    try {
      const value = await this.connection.request<Body<FieldType>>(FORM.GET_FORM_MODEL);

      return value;
    } catch (e) {
      throw new Error(
        `This normally means you're calling get form model in a context where it's not created`
      );
    }
  }
}
