import { ContentItemBody, ContentItemBodyObject } from './ContentItemBody';
import { throws } from 'assert';
export interface ContentItemObject {
  id: string,
  label: string,
  body: ContentItemBodyObject
  deliveryId: string
}

export class ContentItem {
  public id: string;
  public label: string;
  public body: ContentItemBody;
  public deliveryId: string;
  constructor({id, label, body, deliveryId}: ContentItemObject){
    this.id = id;
    this.label = label;
    this.body = new ContentItemBody(body);
    this.deliveryId = deliveryId;
  }
  toJson() {
    return {
      id: this.id,
      label: this.label,
      body: this.body.toJSON(),
      deliveryId: this.deliveryId
    }
  }
}