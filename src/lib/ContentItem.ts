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
   *
   * @type ContentItemBody defines the shape of the data that is expected to be returned in the Content Item body
   *
   * Use to fetch the Content Item that is currently being edited. Returns a promise which will resolve to a [[ContentItemModel]]
   *
   * ### Example
   * ```typescript
   * try {
   *   const contentItem = await sdk.contentItem.getCurrent();
   *
   *   console.log(contentItem)
   * } catch (e) {
   *   // In a context where contentItem doesn't exist yet
   * }
   *
   * ```
   */
  async getCurrent<ContentItemBody = {}>(): Promise<ContentItemModel<ContentItemBody>> {
    const contentItem = await this.connection.request(CONTENT_ITEM.GET);
    return contentItem;
  }
}
