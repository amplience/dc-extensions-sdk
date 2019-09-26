/**
 * This JSON Schema defines the data structure of your Content Type
 */
export interface ContentType {
  id: string;
  contentTypeUri: string;
  settings: ContentTypeSettings;
  schema: ContentTypeV4 | ContentTypeV7;
}

interface ContentTypeSettings {
  label: string;
  icons: Array<string>;
  cards: Array<string>;
  visualisation: Array<string>;
}
interface ContentTypeV4 extends DefaultSchemaProperties {
  id: string;
  schema: string;
}

interface ContentTypeV7 extends DefaultSchemaProperties {
  $id: string;
  $schema: string;
}

interface DefaultSchemaProperties {
  title: string;
  description: string;
  type?: Types;
  allOf: Array<Object>;
  properties: ObjectMap<Object, ObjectMap<PropertyBody>>;
  required?: Array<string>;
  propertyOrder?: Array<string>;
}

type ObjectMap<T = Object, K = any> = T & {
  [key: string]: K;
};

type Types = 'string' | 'number' | 'integer' | 'object' | 'array' | 'boolean';

interface PropertyBody {
  title?: string;
  type?: Types;
  const?: string | number | Array<any> | Object;
  description?: string;
  properties?: ObjectMap<Object, ObjectMap<PropertyBody>>;
  allOf?: Array<Object>;
  minLength?: number;
  maxLength?: number;
  maximum?: number;
  minimum?: number;
  format?: string;
  pattern?: RegExp;
  uniqueItems?: boolean;
  examples?: Array<any>;
}
