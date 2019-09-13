import { ClientConnection } from 'message.io';
import { MEDIA_LINK } from './Events';
export interface MediaImageLink {
  _meta: {
    schema: string;
  }
  id: string;
  name: string;
  endpoint: string;
  defaultHost: string;
}
export interface MediaVideoLink {
  _meta: {
    schema: string;
  }
}
export class MediaLink {
  /**
   * Media Link - Use to open the media browser.
   * @param connection message.io connection
   */
  constructor(private connection: ClientConnection) {}
  /**
   * This method will trigger an image browser. It returns a promise that will resolve to the chosen Image Link.
   */
  getImage(): Promise<MediaImageLink> {
    return this.connection.request(MEDIA_LINK.IMAGE_GET);
  }
  /**
   * This method will trigger a video browser. It returns a promise that will resolve to the chosen Video Link.
   */
  getVideo(): Promise<MediaVideoLink> {
    return this.connection.request(MEDIA_LINK.VIDEO_GET);
  }
}
