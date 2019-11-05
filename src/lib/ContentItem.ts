import { ClientConnection } from 'message.io';
import { CONTENT_ITEM } from './Events';
import { ContentItemModel } from './models/ContentItemModel';

export class ContentItem {
  /**
   * Content Item - Used for fetching the model of the Content Item that is being edited.
   * @param connection message.io connection
   */
  constructor(private connection: ClientConnection) {}
  /**
   * Use to fetch the Content Item that is currently being edited. Returns a promise which will resolve to a [[ContentItemModel]]
   */
  async getCurrent<FormModel = {}>(): Promise<ContentItemModel<FormModel>> {
    const contentItem = await this.connection.request(CONTENT_ITEM.GET);
    return contentItem;
  }
}
