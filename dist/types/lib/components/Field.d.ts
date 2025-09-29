import { ClientConnection } from 'message-event-channel';
import { ObjectMap } from '../models/ContentItemModel';
import { ErrorReport } from '../models/ErrorReport';
import { Params } from '../models/Params';
export declare type FieldSchema<ParamType extends Params = Params> = ObjectMap<{
    title?: string;
    type?: string;
    description?: string;
    ['ui:extension']: UiExtension<ParamType>;
}>;
interface UiExtension<ParamType extends Params = Params> {
    url?: string;
    name?: string;
    params?: ParamType['instance'];
    height?: number;
}
export declare class Field<FieldType = any, ParamType extends Params = Params> {
    private connection;
    schema: FieldSchema<ParamType>;
    /**
     * Allows you to perform actions on the field that is being edited.
     *
     * @param connection message-event-channel connection
     * @param schema JSON Schema of the field
     */
    constructor(connection: ClientConnection, schema: FieldSchema<ParamType>);
    /**
     * Fetch the value of the field
     *
     * ### Example
     * ```typescript
     * const value = await sdk.field.getValue()
     *
     * console.log(value)
     * ```
     */
    getValue(): Promise<FieldType>;
    /**
     * Change the value of the field
     *
     * @param value The new value you want to set on the field
     * @throws Errors are thrown If the value is not set it throws an array of [[ErrorReport]]
     * @returns
     *
     * ### Example
     * ```typescript
     * try {
     *  await sdk.field.setValue({ propertyName1: 'hello world' })
     * } catch(errors) {
     *  // failed to set value returns error report
     * }
     * ```
     */
    setValue(value?: FieldType): Promise<ErrorReport[] | void>;
    /**
     * Fetch the path to the field
     *
     * ### Example
     * ```typescript
     * const path = await sdk.field.getPath();
     *
     * console.log(path);
     * ```
     */
    getPath(): Promise<string>;
    /**
     * Check if your value is valid
     *
     * @param value The value you wish to test
     *
     * Gives the current validity of the field returns a boolean
     *
     * ### Example
     * ```typescript
     * const isValid = await sdk.field.isValid()
     *
     * console.log(isValid) // false
     * ```
     */
    isValid(value: FieldType): Promise<Boolean>;
    /**
     * Check the validation of your value. Returns an array containing any JSON Schema errors found.
     *
     * @param value The value you whish to test
     *
     * If you want to validate a field model and get back an  error reports [[ErrorReport]]
     *
     * ### Example
     * ```typescript
     * const errors = await sdk.field.validate();
     *
     * if (errors && errors.length) {
     *   errors.forEach(error => console.log(error));
     * } else {
     *   // valid
     * }
     * ```
     */
    validate(value: FieldType): Promise<ErrorReport[] | void>;
    /**
     * Reset the value to the previously loaded state
     *
     * ### Example
     * ```typescript
     * const resetValue = await sdk.field.reset()
     *
     * // will be empty content or last saved content
     * console.log(resetValue)
     * ```
     */
    reset(): Promise<FieldType>;
}
export {};
