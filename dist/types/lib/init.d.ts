import { Extension } from './extensions/Extension';
export interface InitOptions {
    window: Window;
    connectionTimeout: number | boolean;
    timeout: number | boolean;
    debug: boolean;
}
/**
 * The method that starts it all
 *
 * @type FieldType This is the field model that the extension is acting on
 * @type Params The installation parameters and instance parameters provided from Dynamic Content
 * @param options The configuration object to change the behaviour of the extension
 *
 * @return Returns a promise that will resolve with a new [[SDK]] instance
 *
 * ```typescript
 * import { init } from 'dc-extensions-sdk';
 *
 * async function initialize() {
 *  const contentFieldExtension = await <ContentFieldExtension>init();
 *
 *  //.. setup extension
 * }
 * ```
 */
export declare function init<ExtensionType extends Extension<{}>>(options?: Partial<InitOptions>): Promise<ExtensionType>;
