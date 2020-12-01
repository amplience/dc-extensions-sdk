import { FieldSchema } from '../../Field';
import { LocalesModel } from '../../models/Locales';
import { Params } from '../../models/Params';
import { ContextObject, isContextObject } from '../Extension';

export interface ContentFieldContextObject<ParamType extends Params = Params>
  extends ContextObject {
  contentItemId: string;
  fieldSchema: FieldSchema<ParamType>;
  params: ParamType;
  locales: LocalesModel;
  stagingEnvironment: string;
  visualisation: string;
  readOnly: boolean;
}

export function isContentFieldContextObject(
  context: unknown | ContentFieldContextObject
): context is ContentFieldContextObject {
  return (
    isContextObject(context) &&
    (context as ContentFieldContextObject).category === 'CONTENT_FIELD' &&
    (context as ContentFieldContextObject).contentItemId !== undefined &&
    (context as ContentFieldContextObject).fieldSchema !== undefined &&
    (context as ContentFieldContextObject).locales !== undefined &&
    (context as ContentFieldContextObject).params !== undefined &&
    (context as ContentFieldContextObject).readOnly !== undefined &&
    (context as ContentFieldContextObject).stagingEnvironment !== undefined &&
    (context as ContentFieldContextObject).visualisation !== undefined
  );
}
