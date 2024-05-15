import { LocalesModel } from '../../models/Locales';
import { Params } from '../../models/Params';
import { ContextObject, isContextObject } from '../Extension';
import { SchemaType } from '../content-editor/ContentEditorExtension';
import { Hub } from '../dashboard/DashboardExtension';

export interface ContentEditorContextObject<ParamType extends Params = Params>
  extends ContextObject {
  contentItemId: string;
  schema: SchemaType;
  params: ParamType;
  locales: LocalesModel;
  stagingEnvironment: string;
  visualisation: string;
  readOnly: boolean;
  hub: Hub;
  collapseByDefault: boolean;
}

export function isContentEditorContextObject(
  context: unknown | ContentEditorContextObject
): context is ContentEditorContextObject {
  if (!isContextObject(context)) {
    return false;
  }

  const isContentEditor = context.category === 'CONTENT_EDITOR';
  const hasInstanceParams = context?.params?.instance !== undefined;
  const contextHasProp = (prop: string) => context[prop as keyof typeof context] !== undefined;
  const requiredProps = [
    'contentItemId',
    'schema',
    'locales',
    'readOnly',
    'stagingEnvironment',
    'visualisation',
    'hub',
  ];

  return isContentEditor && hasInstanceParams && requiredProps.every(contextHasProp);
}
