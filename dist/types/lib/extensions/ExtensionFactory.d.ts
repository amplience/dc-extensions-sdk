import { ContextObject, Extension, ExtensionOptions } from './Extension';
export declare function extensionFactory<ExtensionType extends Extension<ContextObject>>(context: ContextObject, options: ExtensionOptions): ExtensionType;
