import { ClientConnection } from 'message-event-channel';
import { CONTENT_ITEM_NAVIGATOR } from '../constants/Events';

export class ContentEditorApplicationNavigator {
  constructor(private readonly connection: ClientConnection) {}

  /**
   *
   * @param contentItemId - content item you're wanting to navigate to
   * @param contentTypeUri - content type uri from a schema id
   *
   * Used to navigate to nested content item
   *
   */
  editContentItem(contentItemId: string, contentTypeUri: string) {
    return this.connection.request<void>(CONTENT_ITEM_NAVIGATOR.NAVIGATE_TO_NESTED, {
      uri: contentTypeUri,
      id: contentItemId,
    });
  }
}
