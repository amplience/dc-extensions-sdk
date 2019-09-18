import { ClientConnection } from 'message.io';
import { CONTENT_LINK } from './Events';
export interface ContentItemLink {
  _meta: {
    schema: string;
  }
  id: string;
  contentType: string;
}
export class ContentLink {
  /**
   * Content Link - Use to open the content browser.
   * @param connection message.io connection
   */
  constructor(private connection: ClientConnection) {}
  /**
   * This method will trigger a content browser. It returns a promise that will resolve to the chosen Content Link.
   * @param contentTypeIds list of Content Type Ids to filter the Content Browser by.
   */
  get(contentTypeIds: Array<string>): Promise<ContentItemLink> {
    return this.connection.request(CONTENT_LINK.CONTENT_GET, contentTypeIds, { timeout: false });
  }
}
