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
   * Functions to be run after readonly changes you're able to chain this method for better seperation of readOnly changes
   * @param cb function that handles what happens after readonly changes
   *
   * @returns [[Form]]
   *
   * ```typescript
   * const container = document.querySelector('.container');
   * const inputs = Array.from(document.querySelectorAll('input'));
   *
   * function disableInputs(readOnly)  {
   *   inputs.forEach(input => {
   *     input.style.pointerEvents = readOnly ? 'none' : ''
   *   })
   * }
   *
   * function setReadOnlyClass(readOnly) {
   *   container.classList[readOnly ? 'add' : 'remove']('read-only')
   * }
   *
   * sdk.form
   *  .onReadOnlyChange(setReadOnlyClass)
   *  .onReadOnlyChange(disableInputs)
   * ```
   */
  onReadOnlyChange(cb: onChangeHandler): Form {
    this.onChangeStack.push(cb);
    return this;
  }

  /**
   * Get the current model state of all the fields in the form.
   *
   * @type FormModel is the entire parent model that will be a peer to this extension
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
