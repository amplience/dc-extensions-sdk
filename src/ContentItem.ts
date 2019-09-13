import { ClientConnection } from 'message.io';
import { CONTENT_ITEM } from './Events';
import { ContentItemModel } from './models/ContentItemModel';
export class ContentItem {
  /**
   * Content Item - Used for fetching the model of the Content Item that is being edited.
   * @param connection message.io connection
   */
  constructor(private connection: ClientConnection, private id: string) {}
  /**
   * Use to fetch the model of the Content Item that is being edited. Returns a promise which will resolve to a [[ContentItemModel]]
   */
  getValue(): Promise<ContentItemModel> {
    return this.connection.request(CONTENT_ITEM.GET);
  }
}
