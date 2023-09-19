import { FORM } from '../constants/Events';
import { FORM as ERRORS } from '../constants/Errors';
import { ClientConnection } from 'message-event-channel';
import { Body } from '../models/ContentItemModel';

export type onReadOnlyChangeHandler = (readonly: boolean) => void;
export type onFormValueChangeHandler = (formModel: Record<string, unknown>) => void;

export class Form {
  private readOnlyObservers: onReadOnlyChangeHandler[] = [];
  private formValueObservers: onFormValueChangeHandler[] = [];

  constructor(private connection: ClientConnection, public readOnly: boolean) {
    this.connection.on(FORM.READ_ONLY, (readonly: boolean) => {
      this.readOnly = readonly;
      this.readOnlyObservers.forEach((cb) => cb(this.readOnly));
    });

    this.connection.on(FORM.FORM_VALUE_CHANGE, (formModel: Record<string, unknown>) =>
      this.formValueObservers.forEach((cb) => cb(formModel))
    );
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
  onReadOnlyChange(cb: onReadOnlyChangeHandler): Form {
    this.readOnlyObservers.push(cb);
    return this;
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
      const value = await this.connection.request<Body<FormModel>>(FORM.GET_FORM_MODEL);

      return value;
    } catch (e) {
      throw new Error(ERRORS.NO_MODEL);
    }
  }

  /**
   *
   * Allows you to provide a callback to be executed after the form value changes. This method can be chained to append multiple callbacks.
   *
   * @param cb Callback function that executes upon form value change.
   *
   * @returns [[Form]]
   *
   * ### Example
   * ```typescript
   * const container = document.querySelector('.container');
   * const submitBtn = document.querySelector('.submitBtn');
   *
   * sdk.form
   *  .onFormValueChange(setActiveClass)
   *  .onFormValueChange(enableSubmit);
   *
   * function enableSubmit(formValue)  {
   *   const isEmpty = Object.keys(formValue).length === 0;
   *   submitBtn.disabled = isEmpty;
   * }
   *
   * function setActiveClass(formValue) {
   *   const hasTitle formValue?.title !== undefined;
   *   container.classList[hasTitle ? 'add' : 'remove']('active');
   * }
   * ```
   */
  onFormValueChange(cb: onFormValueChangeHandler): Form {
    this.formValueObservers.push(cb);
    return this;
  }
}
