import { ClientConnection } from 'message-event-channel';
import { ERRORS_CONTENT_ITEM } from './Errors';
import { CONTENT_REFERENCE } from './Events';

export interface ContentItemReference {
  _meta: {
    schema: string;
  };
  id: string;
  contentType: string;
}

export interface ContentReferenceOptions {
  max?: number | null;
}

export class ContentReference {
  /**
   * Content Link - Use to open the content browser.
   * @param connection message-event-channel connection
   */
  constructor(private connection: ClientConnection) {}

  /**
   * This method will trigger a content browser. It returns a promise that will resolve to the chosen Content References.
   * @param contentTypeIds list of Content Type Ids to filter the Content Browser by.
   * @param options.max Max amount of selected contnet references
   *
   * ### Example
   * ```typescript
   * const enums = sdk.field.schema.allOf[1].properties.contentType.enum;
   * const contentRef = await sdk.contentReference.get(enums);
   *
   * console.log(contentRef);
   * ```
   */
  getMultiple(
    contentTypeIds: Array<string>,
    options: ContentReferenceOptions = { max: null }
  ): Promise<ContentItemReference[]> {
    return this.fetchReferences(contentTypeIds, options.max);
  }
  /**
   * This method will trigger a content browser. It returns a promise that will resolve to the chosen Content Reference.
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
    return this.fetchReferences(contentTypeIds);
  }

  private fetchReferences(contentTypeIds: Array<string>, max?: number | null) {
    if (!contentTypeIds || !Array.isArray(contentTypeIds) || !contentTypeIds.length) {
      throw new Error(ERRORS_CONTENT_ITEM.NO_IDS);
    }

    const response = {
      contentTypeIds,
      ...((max !== undefined && { max }) || {})
    };

    return this.connection.request(CONTENT_REFERENCE.CONTENT_REF_GET, response, {
      timeout: false
    });
  }
}
