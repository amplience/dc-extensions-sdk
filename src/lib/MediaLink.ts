import { ClientConnection } from 'message.io';
import { MEDIA_LINK } from './Events';
export interface MediaImageLink {
  _meta: {
    schema: string;
  };
  id: string;
  name: string;
  endpoint: string;
  defaultHost: string;
}
export interface MediaVideoLink {
  _meta: {
    schema: string;
  };
}
export class MediaLink {
  /**
   * Media Link - Use to open the media browser.
   * @param connection message.io connection
   */
  constructor(private connection: ClientConnection) {}
  /**
   * This method will trigger an image browser. It returns a promise that will resolve to the chosen Image Link.
   *
   * Example of fetching an image from DC
   * ```typescript
   * try {
   *   // open browser and waits for image
   *   // returns object that should be saved to the model
   *   const image = await sdk.mediaLink.getImage()
   *
   * } catch (e) {
   *   // no image returned
   * }
   * ```
   *
   * Example of displaying a image in your custom control
   *
   * ```typescript
   * WIP
   * ```
   */
  getImage(): Promise<MediaImageLink> {
    return this.connection.request(MEDIA_LINK.IMAGE_GET, null, { timeout: false });
  }
  /**
   * This method will trigger a video browser. It returns a promise that will resolve to the chosen Video Link.
   *
   * Example of fetching an video from DC
   * ```typescript
   * try {
   *   // open browser and waits for video
   *   // returns object that should be saved to the model
   *   const video = await sdk.mediaLink.getVideo()
   *
   * } catch (e) {
   *   // no video returned
   * }
   * ```
   *
   * Example of displaying a video in your custom control
   *
   * ```typescript
   * WIP
   * ```
   */
  getVideo(): Promise<MediaVideoLink> {
    return this.connection.request(MEDIA_LINK.VIDEO_GET, null, { timeout: false });
  }
}
