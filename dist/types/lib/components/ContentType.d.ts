import { ClientConnection } from 'message-event-channel';
import { ContentTypeModel } from '../models/ContentType';
export declare class ContentTypes {
    private connection;
    constructor(connection: ClientConnection);
    /**
     *
     * @param uri schema id / content type uri
     *
     * Used to get content type settings for a schema
     *
     * @returns [[Promise<ContentTypeModel>]]
     *
     * ### Example
     *
     * ```typescript
     * const contentType = sdk.contentTypes.getByUri('https://example-schema.com/blog.json')
     *
     * console.log(contentType)
     * ```
     * @returns
     */
    getByUri(uri: string): Promise<ContentTypeModel>;
    /**
     *
     * @param uri list of schema id / content type uri
     *
     * Used to get content type settings for a schema
     *
     * @returns [[Promise<ContentTypeModel[]>]]
     *
     * ### Example
     *
     * ```typescript
     * const contentTypes = sdk.contentTypes.getByUri(['https://example-schema.com/blog.json', 'https://example-schema.com/user.json'])
     *
     * console.log(contentTypes)
     * ```
     * @returns
     */
    getByUris(uris: string[]): Promise<ContentTypeModel[]>;
}
