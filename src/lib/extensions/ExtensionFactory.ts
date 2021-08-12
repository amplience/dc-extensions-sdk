import { EXTENSION } from '../constants/Errors';
import { isContentEditorContextObject } from './content-editor/ContentEditorContextObject';
import { ContentEditorExtension } from './content-editor/ContentFieldExtension';
import { isContentFieldContextObject } from './content-field/ContentFieldContextObject';
import { ContentFieldExtension } from './content-field/ContentFieldExtension';
import { isDashboardContextObject } from './dashboard/DashboardContextObject';
import { DashboardExtension } from './dashboard/DashboardExtension';
import { ContextObject, Extension, ExtensionOptions } from './Extension';

export function extensionFactory<ExtensionType extends Extension<ContextObject>>(
  context: unknown,
  options: ExtensionOptions
): ExtensionType {
  let extension;

  if (isContentFieldContextObject(context)) {
    extension = new ContentFieldExtension(options);
    extension.setupContext(context);
  }
  if (isDashboardContextObject(context)) {
    extension = new DashboardExtension(options);
    extension.setupContext(context);
  }

  if (isContentEditorContextObject(context)) {
    extension = new ContentEditorExtension(options);
    extension.setupContext(context);
  }

  if (!extension) {
    throw new Error(EXTENSION.UNSUPPORTED_EXTENSION);
  }

  return (extension as unknown) as ExtensionType;
}
