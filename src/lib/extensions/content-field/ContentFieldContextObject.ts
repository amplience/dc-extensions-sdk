import { FieldSchema } from '../../components/Field';
import { LocalesModel } from '../../models/Locales';
import { Params } from '../../models/Params';
import { ContextObject, isContextObject } from '../Extension';
import { Hub } from '../dashboard/DashboardExtension';

export interface ContentFieldContextObject<ParamType extends Params = Params>
  extends ContextObject {
  contentItemId: string;
  fieldSchema: FieldSchema<ParamType>;
  params: ParamType;
  locales: LocalesModel;
  stagingEnvironment: string;
  visualisation: string;
  readOnly: boolean;
  hub: Hub;
}

export function isContentFieldContextObject(
  context: unknown | ContentFieldContextObject
): context is ContentFieldContextObject {
  return (
    isContextObject(context) &&
    (context as ContentFieldContextObject).category === 'CONTENT_FIELD' &&
    (context as ContentFieldContextObject)?.params?.instance !== undefined &&
    (context as ContentFieldContextObject).contentItemId !== undefined &&
    (context as ContentFieldContextObject).fieldSchema !== undefined &&
    (context as ContentFieldContextObject).locales !== undefined &&
    (context as ContentFieldContextObject).readOnly !== undefined &&
    (context as ContentFieldContextObject).stagingEnvironment !== undefined &&
    (context as ContentFieldContextObject).visualisation !== undefined 
  );
}
