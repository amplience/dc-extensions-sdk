import { ClientConnection } from 'message-event-channel';
import { FORM as ERRORS } from '../constants/Errors';
import { CONTENT_EDITOR_FORM, FORM } from '../constants/Events';
import { Body } from '../models/ContentItemModel';
import { ErrorReport } from '../models/ErrorReport';
import { onChangeHandler } from './Form';

export class ContentEditorForm {
    private onChangeStack: Array<onChangeHandler>;

  constructor(private connection: ClientConnection, public readOnly: boolean) {
    this.onChangeStack = [];

    this.connection.on(FORM.READ_ONLY, (readonly: boolean) => {
      this.readOnly = readonly;
      this.onChangeStack.forEach((cb) => cb(this.readOnly));
    });
  }

  async validate(value: any): Promise<ErrorReport[] | void> {
    const errors = await this.connection.request<ErrorReport[] | void>(CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_VALIDATE, value);

    return errors && errors.length ? errors : undefined;
  }

  async isValid(value: any): Promise<Boolean> {
    const isValid = await this.connection.request<Boolean>(CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_IS_VALID, value);

    return isValid;
  }

  setValue(value: any) {
    return this.connection.request(CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_SET, value);
  }

  /**
   * Get the current model state of all the fields in the form.
   *
   * @type FormModel is the entire parent model that will be a peer to this extension
   *
   * ### Example
   * ```typescript
   * try {
   *   const value = await sdk.form.getValue();
   *
   *   console.log(value)
   * } catch (e) {
   *   // In a context where there is no form model
   * }
   * ```
   */
   async getValue<FormModel = {}>(): Promise<Body<FormModel>> {
    try {
      const value = await this.connection.request<Body<FormModel>>(CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_GET);

      return value;
    } catch (e) {
      throw new Error(ERRORS.NO_MODEL);
    }
  }

  /**
   *
   * Allows you to provide a callback to be executed after the readonly state changes. This method can be chained to append multiple callbacks.
   *
   * @param cb Callback function that executes upon readonly state change.
   *
   * @returns [[Form]]
   *
   * ### Example
   * ```typescript
   * const container = document.querySelector('.container');
   * const inputs = Array.from(document.querySelectorAll('input'));
   *
   * sdk.form
   *  .onReadOnlyChange(setReadOnlyClass)
   *  .onReadOnlyChange(disableInputs)
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
   * ```
   */
     onReadOnlyChange(cb: onChangeHandler): ContentEditorForm{
        this.onChangeStack.push(cb);
        return this;
    }

}
