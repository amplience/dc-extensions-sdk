import { ClientConnection } from 'message-event-channel';
import { CONTENT_LINK } from './Events';
import { ERRORS_CONTENT_ITEM } from './Errors';
export interface ContentItemLink {
  _meta: {
    schema: string;
  };
  id: string;
  contentType: string;
}

export interface CotnentLinkOptions {
  max?: number | null;
}
export class ContentLink {
  /**
   * Content Link - Use to open the content browser.
   * @param connection message-event-channel connection
   */
  constructor(private connection: ClientConnection) {}
  /**
   * This method will trigger a content browser. It returns a promise that will resolve to the chosen Content References.
   * @param contentTypeIds list of Content Type Ids to filter the Content Browser by.
   * @param options.max Max amount of selected contnet links
   *
   * ### Example
   * ```typescript
   * const enums = sdk.field.schema.allOf[1].properties.contentType.enum;
   * const contentLink = await sdk.contentLink.getMultiple(enums);
   *
   * console.log(contentLink);
   * ```
   */
  getMultiple(
    contentTypeIds: Array<string>,
    options: CotnentLinkOptions = { max: null }
  ): Promise<ContentItemLink[]> {
    if (options.max === undefined) {
      options.max = null;
    }
    return this.fetchLinks(contentTypeIds, options.max);
  }
  /**
   * This method will trigger a content browser. It returns a promise that will resolve to the chosen Content Link.
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
  async get(contentTypeIds: Array<string>): Promise<ContentItemLink> {
    return this.fetchLinks(contentTypeIds);
  }

  async fetchLinks(contentTypeIds: Array<string>, max?: number | null) {
    if (!contentTypeIds || !Array.isArray(contentTypeIds) || !contentTypeIds.length) {
      throw new Error(ERRORS_CONTENT_ITEM.NO_IDS);
    }

    const response = {
      contentTypeIds,
      ...((max !== undefined && { max }) || {})
    };

    return this.connection.request(CONTENT_LINK.CONTENT_GET, response, {
      timeout: false
    });
  }
}
