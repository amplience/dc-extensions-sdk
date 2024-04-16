import { FieldSchema } from '../../components/Field';
import { LocalesModel } from '../../models/Locales';
import { Params } from '../../models/Params';
import { ContextObject, isContextObject } from '../Extension';
import { Hub } from '../dashboard/DashboardExtension';
import { ContentEditorContextObject } from '../content-editor/ContentEditorContextObject';

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
  collaspseByDefault: boolean;
}

export function isContentFieldContextObject(
  context: unknown | ContentFieldContextObject
): context is ContentFieldContextObject {
  if (!isContextObject(context)) {
    return false;
  }

  const isContentField = context.category === 'CONTENT_FIELD';
  const hasInstanceParams = context?.params?.instance !== undefined;
  const contextHasProp = (prop: string) => context[prop as keyof typeof context] !== undefined;
  const requiredProps = [
    'contentItemId',
    'fieldSchema',
    'locales',
    'readOnly',
    'stagingEnvironment',
    'visualisation',
    'hub',
  ];

  return isContentField && hasInstanceParams && requiredProps.every(contextHasProp);
}
