import { ClientConnection } from 'message.io';
import { CONTENT_ITEM } from './Events';
import { ContentItemModel } from './models/ContentItemModel';

export class ContentItem<T = {}> {
  /**
   * Content Item - Used for fetching the model of the Content Item that is being edited.
   * @param connection message.io connection
   * @param id Content Item id - optional, Content Item may not have an id if it has not been saved.
   */
  constructor(private connection: ClientConnection, public id?: string) {}
  /**
   * Use to fetch the model of the Content Item that is being edited. Returns a promise which will resolve to a [[ContentItemModel]]
   */
  async getValue(): Promise<ContentItemModel<T>> {
    const contentItem = await this.connection.request(CONTENT_ITEM.GET);

    if (contentItem && contentItem.id) {
      this.id = contentItem.id;
    }

    return contentItem;
  }
}
