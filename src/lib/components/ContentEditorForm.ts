import { ClientConnection } from 'message-event-channel';
import { FORM as ERRORS } from '../constants/Errors';
import { CONTENT_EDITOR_FORM, FORM } from '../constants/Events';
import { Body } from '../models/ContentItemModel';
import { ErrorReport } from '../models/ErrorReport';
import { onChangeHandler } from './Form';

export type onModelChangeArgs = { errors: null | ErrorReport[]; content: any };
export type onModelChangeHandler = (errors: null | ErrorReport[], content: any) => void;

export class ContentEditorForm<Model = any> {
  private onChangeStack: Array<onChangeHandler>;
  private onModelStack: Array<onModelChangeHandler>;

  constructor(private connection: ClientConnection, public readOnly: boolean) {
    this.onChangeStack = [];
    this.onModelStack = [];

    this.connection.on(FORM.READ_ONLY, (readonly: boolean) => {
      this.readOnly = readonly;
      this.onChangeStack.forEach((cb) => cb(this.readOnly));
    });

    this.connection.on(
      CONTENT_EDITOR_FORM.CONTENT_EDITOR_MODEL_CHANGE,
      ({ errors, content }: onModelChangeArgs) => {
        this.onModelStack.forEach((cb) => cb(errors, content));
      }
    );
  }

  /**
   * Check the validation of your model. Returns an array containing any JSON Schema errors found.
   *
   * @param model The model you wish to test
   *
   * If you want to validate a field model and get back an  error report [[ErrorReport]]
   *
   * ### Example
   * ```typescript
   * const errors = await sdk.form.validate({ title: 'Hello World' })});
   *
   * if (errors && errors.length) {
   *   errors.forEach(error => console.log(error));
   * } else {
   *   // valid
   * }
   * ```
   */
  async validate(model: Body<Model>): Promise<ErrorReport[] | void> {
    const errors = await this.connection.request<ErrorReport[] | void>(
      CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_VALIDATE,
      model
    );

    return errors && errors.length ? errors : undefined;
  }

  /**
   * Check if your model is valid
   *
   * @param model The model you wish to test
   *
   * Gives the current validity of the form returns a boolean
   *
   * ### Example
   * ```typescript
   * const isValid = await sdk.form.isValid({ title: 'Hello World' })
   *
   * console.log(isValid) // false
   * ```
   */
  async isValid(model: Body<Model>): Promise<Boolean> {
    const isValid = await this.connection.request<Boolean>(
      CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_IS_VALID,
      model
    );

    return isValid;
  }

  async setValue(value: Body<Model>): Promise<ErrorReport[] | void> {
    const errors = await this.connection.request<ErrorReport[]>(
      CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_SET,
      value
    );

    if (errors && errors.length) {
      return Promise.reject(errors);
    }
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
  async getValue(): Promise<Body<Model>> {
    try {
      const value = await this.connection.request<Body<Model>>(
        CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_GET
      );

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
   * @returns [[ContentEditorForm]]
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
  onReadOnlyChange(cb: onChangeHandler): ContentEditorForm {
    this.onChangeStack.push(cb);
    return this;
  }

  /**
   *
   * On changes to the model not explicitly handled by the extension, this method will be called in order to keep model in sync with Dynamic Content
   *
   * @param cb Callback function that executes upon model change.
   * @returns {Function} unsubscribes callback
   *
   * ## Example
   *
   * ```typescript
   * let currentModel;
   *
   * sdk.form.onModelChange(model => {
   *  currentModel = model;
   * });
   * ```
   */
  onModelChange(cb: onModelChangeHandler): any {
    this.onModelStack.push(cb);
    const unsubscribe = () => {
      const index = this.onModelStack.indexOf(cb);
      if (index !== -1) {
        this.onModelStack.splice(index, 1);
      }
    };
    return unsubscribe;
  }
}
