import { ClientConnection } from 'message-event-channel';
import { Body } from '../models/ContentItemModel';
import { ErrorReport } from '../models/ErrorReport';
import { onReadOnlyChangeHandler } from './Form';
export declare type onModelChangeArgs = {
    errors: null | ErrorReport[];
    content: any;
};
export declare type onModelChangeHandler = (errors: null | ErrorReport[], content: any) => void;
export declare class ContentEditorForm<Model = any> {
    private connection;
    readOnly: boolean;
    private onChangeStack;
    private onModelStack;
    constructor(connection: ClientConnection, readOnly: boolean);
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
    validate(model: Body<Model>): Promise<ErrorReport[] | void>;
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
    isValid(model: Body<Model>): Promise<Boolean>;
    /**
     * Set the current model state
     *
     * @param value to set as model
     * @returns an array containing any JSON Schema errors found.
     *
     * ### Example
     * ```typescript
     * const sdk = await init();
     *  try {
     *     await sdk.form.setValue({ title: 'hello world' });
     *  } catch (errors) {
     *    if (errors.length) {
     *       console.log(errors);
     *    }
     *  }
     * ```
     */
    setValue(value: Body<Model>): Promise<ErrorReport[] | void>;
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
    getValue(): Promise<Body<Model>>;
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
    onReadOnlyChange(cb: onReadOnlyChangeHandler): ContentEditorForm;
    /**
     *
     * On changes to the model not explicitly handled by the extension, this method will be called in order to keep model in sync with Dynamic Content
     *
     * @param cb Callback function that executes upon model change.
     * @returns {Function} unsubscribe callback
     *
     * ## Example
     *
     * ```typescript
     * let currentModel;
     *
     * sdk.form.onModelChange(model => {
     *  currentModel = model;
     * });
     *
     * const unsubscribe = sdk.form.onModelChange((errors, model) => {
     *  setErrors(errors);
     *  setModel(model)
     * });
     *
     * unsubscribe()
     * ```
     */
    onModelChange(cb: onModelChangeHandler): any;
}
