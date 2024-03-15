import { CONTENT_TYPES } from '../constants/Events';
import { ClientConnection } from 'message-event-channel';
import { ContentTypeModel } from '../models/ContentType';

export class ContentTypes {
  constructor(private connection: ClientConnection) {}

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
  async getByUri(uri: string): Promise<ContentTypeModel> {
    return this.connection.request(CONTENT_TYPES.GET_BY_URI, { uri });
  }

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
  async getByUris(uris: string[]): Promise<ContentTypeModel[]> {
    return this.connection.request(CONTENT_TYPES.GET_BY_URIS, { uris });
  }
}
