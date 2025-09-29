import { ClientConnection } from 'message-event-channel';
export interface ContentItemReference {
    _meta: {
        schema: string;
    };
    id: string;
    contentType: string;
    pointer: string;
}
export interface ContentReferenceOptions {
    max?: number | null;
    pointer: string;
}
export declare class ContentReference {
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
     * @param options.max Max amount of selected contnet references
     * @param options.pointer The JSON path of the selected field
     *
     * ### Example
     * ```typescript
     * const enums = sdk.field.schema.allOf[1].properties.contentType.enum;
     * const contentRef = await sdk.contentReference.get(enums);
     *
     * console.log(contentRef);
     * ```
     */
    getMultiple(contentTypeIds: Array<string>, options: ContentReferenceOptions): Promise<ContentItemReference[]>;
    /**
     * This method will trigger a content browser. It returns a promise that will resolve to the chosen Content Reference.
     *
     * @param contentTypeIds list of Content Type Ids to filter the Content Browser by.
     *
     * ### Example
     * ```typescript
     * const enums = sdk.field.schema.allOf[1].properties.contentType.enum;
     * const contentRef = await sdk.contentReference.get(enums);
     *
     * console.log(contentRef);
     * ```
     */
    get(contentTypeIds: Array<string>, pointer: string): Promise<ContentItemReference>;
    private fetchReferences;
}
