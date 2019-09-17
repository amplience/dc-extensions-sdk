/**
 * This JSON Schema defines the data structure of your Content Type
 */
export interface ContentType {
  $schema: string;
  $id: string;
  title: string;
  description: string;
  properties: object;
  required?: Array<string>;
  propertyOrder?: Array<string>;
}
