import { ClientConnection } from 'message.io';
import { CONTENT_TYPE } from './Events';
import { ContentItemModel } from './models/ContentItemModel';
export class ContentItem {
  constructor(private connection: ClientConnection) {}
  getValue(): Promise<ContentItemModel> {
    return this.connection.request(CONTENT_TYPE.GET);
  }
}
