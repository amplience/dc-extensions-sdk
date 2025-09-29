import { ClientConnection } from 'message-event-channel';
export declare class ContentEditorApplicationNavigator {
    private readonly connection;
    constructor(connection: ClientConnection);
    /**
     *
     * @param contentItemId - content item you're wanting to navigate to
     * @param contentTypeUri - content type uri from a schema id
     *
     * Used to navigate to nested content item
     *
     */
    editContentItem(contentItemId: string, contentTypeUri: string): Promise<void>;
}
