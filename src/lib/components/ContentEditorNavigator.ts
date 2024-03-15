import { ClientConnection } from 'message-event-channel';

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
    return this.connection.request<void>('navigate-to-nested', {
      uri: contentTypeUri,
      id: contentItemId,
    });
  }
}
