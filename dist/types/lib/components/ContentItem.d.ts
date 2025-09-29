import { ClientConnection } from 'message-event-channel';
import { ContentItemModel } from '../models/ContentItemModel';
export declare class ContentItem {
    private connection;
    /**
     * Content Item - Used for retrieving Content Items.
     *
     * @param connection message-event-channel connection
     */
    constructor(connection: ClientConnection);
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
    getCurrent<ContentItemBody = {}>(): Promise<ContentItemModel<ContentItemBody>>;
}
