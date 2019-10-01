import { FORM } from './Events';
import { ClientConnection } from 'message.io';

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
}
