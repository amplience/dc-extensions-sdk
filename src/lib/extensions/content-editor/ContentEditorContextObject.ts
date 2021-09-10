import { LocalesModel } from '../../models/Locales';
import { Params } from '../../models/Params';
import { ContextObject, isContextObject } from '../Extension';
import { SchemaType } from '../content-editor/ContentEditorExtension';

export interface ContentEditorContextObject<ParamType extends Params = Params>
  extends ContextObject {
  contentItemId: string;
  schema: SchemaType;
  params: ParamType;
  locales: LocalesModel;
  stagingEnvironment: string;
  visualisation: string;
  readOnly: boolean;
}

export function isContentEditorContextObject(
  context: unknown | ContentEditorContextObject
): context is ContentEditorContextObject {
  return (
    isContextObject(context) &&
    (context as ContentEditorContextObject).category === 'CONTENT_EDITOR' &&
    (context as ContentEditorContextObject)?.params?.instance !== undefined &&
    (context as ContentEditorContextObject).contentItemId !== undefined &&
    (context as ContentEditorContextObject).schema !== undefined &&
    (context as ContentEditorContextObject).locales !== undefined &&
    (context as ContentEditorContextObject).readOnly !== undefined &&
    (context as ContentEditorContextObject).stagingEnvironment !== undefined &&
    (context as ContentEditorContextObject).visualisation !== undefined
  );
}
