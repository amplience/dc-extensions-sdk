import { ContentItemBody } from './ContentItemBody';
export interface ContentItemModel {
  id: string;
  label: string;
  body: ContentItemBody;
  deliveryId: string;
}
