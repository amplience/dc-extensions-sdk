import { ClientConnection } from 'message-event-channel';
export interface ContentItemLink {
    _meta: {
        schema: string;
    };
    id: string;
    contentType: string;
    pointer: string;
}
export interface ContentLinkOptions {
    max?: number | null;
    pointer: string;
}
export declare class ContentLink {
    private connection;
    /**
     * Content Link - Use to open the content browser.
     *
     * @param connection message-event-channel connection
     */
    constructor(connection: ClientConnection);
    /**
     * This method will trigger a content browser. It returns a promise that will resolve to the chosen Content References.
     *
     * @param contentTypeIds list of Content Type Ids to filter the Content Browser by.
     * @param options.max Max amount of selected contnet links
     * @param options.pointer The JSON path of the selected field
     *
     * ### Example
     * ```typescript
     * const enums = sdk.field.schema.allOf[1].properties.contentType.enum;
     * const contentLink = await sdk.contentLink.getMultiple(enums);
     *
     * console.log(contentLink);
     * ```
     */
    getMultiple(contentTypeIds: Array<string>, options: ContentLinkOptions): Promise<ContentItemLink[]>;
    /**
     * This method will trigger a content browser. It returns a promise that will resolve to the chosen Content Link.
     *
     * @param contentTypeIds list of Content Type Ids to filter the Content Browser by.
     *
     * ### Example
     * ```typescript
     * const enums = sdk.field.schema.allOf[1].properties.contentType.enum;
     * const contentLink = await sdk.contentLink.get(enums);
     *
     * console.log(contentLink);
     * ```
     */
    get(contentTypeIds: Array<string>, pointer: string): Promise<ContentItemLink>;
    fetchLinks(contentTypeIds: Array<string>, pointer: string, max?: number | null): Promise<any>;
}
