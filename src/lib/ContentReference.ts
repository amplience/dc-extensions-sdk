import { ClientConnection } from 'message.io';
import { ERRORS_CONTENT_ITEM } from './Errors';
import { CONTENT_REFERENCE } from './Events';

export interface ContentItemReference {
  _meta: {
    schema: string;
  };
  id: string;
  contentType: string;
}

export class ContentReference {
  /**
   * Content Link - Use to open the content browser.
   * @param connection message.io connection
   */
  constructor(private connection: ClientConnection) {}
  /**
   * This method will trigger a content browser. It returns a promise that will resolve to the chosen Content Link.
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
  async get(contentTypeIds: Array<string>): Promise<ContentItemReference> {
    if (!contentTypeIds || !Array.isArray(contentTypeIds) || !contentTypeIds.length) {
      throw new Error(ERRORS_CONTENT_ITEM.NO_IDS);
    }
    return this.connection.request(CONTENT_REFERENCE.CONTENT_REF_GET, contentTypeIds, {
      timeout: false
    });
  }
}
