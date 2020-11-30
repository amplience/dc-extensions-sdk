import { FieldSchema } from '../Field';
import { LocalesModel } from './Locales';
import { Params } from './Params';

export type ContentFieldContextObject<ParamType extends Params = Params> = {
  contentItemId: string;
  fieldSchema: FieldSchema<ParamType>;
  params: ParamType;
  locales: LocalesModel;
  stagingEnvironment: string;
  visualisation: string;
  readOnly: boolean;
};
