import { ClientConnection } from 'message.io';
import { CONTENT_ITEM } from './Events';
import { ContentItemModel } from './models/ContentItemModel';

export class ContentItem {
  /**
   * Content Item - Used for retrieving Content Items.
   * @param connection message.io connection
   */
  constructor(private connection: ClientConnection) {}
  /**
   * Use to fetch the Content Item that is currently being edited. Returns a promise which will resolve to a [[ContentItemModel]]
   */
  async getCurrent<ContentItemBody = {}>(): Promise<ContentItemModel<ContentItemBody>> {
    const contentItem = await this.connection.request(CONTENT_ITEM.GET);
    return contentItem;
  }
}
