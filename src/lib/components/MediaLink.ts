import { ClientConnection } from 'message-event-channel';
import { MEDIA_LINK } from '../constants/Events';
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

export interface MediaOptions {
  max: number | null;
}
export class MediaLink {
  /**
   * Media Link - Use to open the media browser.
   *
   * @param connection message-event-channel connection
   */
  constructor(private connection: ClientConnection) {}

  /**
   * This method will trigger opening the media browser. It returns a promise that will resolve to the chosen Image or Video Link.
   *
   * Example of fetching media from DC
   * ```typescript
   * try {
   *   // open browser and waits for media browser
   *   // returns object that should be saved to the model
   *   const video = await sdk.mediaLink.get()
   *
   * } catch (e) {
   *   // no media returned
   * }
   * ```
   */
  async get(): Promise<MediaImageLink | MediaVideoLink> {
    return this.connection.request(MEDIA_LINK.GET, null, {
      timeout: false,
    });
  }

  /**
   * This method will trigger opening the media overlay. It returns a promise that will resolve to the chosen Image and Video Links.
   *
   * Example of fetching an media from DC
   * ```typescript
   * try {
   *   // open browser and waits for media selection
   *   // returns object that should be saved to the model
   *   const media = await sdk.mediaLink.getMultiple({ max: 10 })
   *
   * } catch (e) {
   *   // no media returned
   * }
   * ```
   */
  async getMultiple(
    { max }: MediaOptions = { max: null }
  ): Promise<Array<MediaImageLink | MediaImageLink>> {
    return this.connection.request(
      MEDIA_LINK.GET,
      { max },
      {
        timeout: false,
      }
    );
  }
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
   * import { init } from 'dc-extensions-sdk';
   * import { Image: ImageBuilder } from 'dc-delivery-sdk-js';
   *
   * async function start() {
   *   const sdk = await init();
   *   const img = document.querySelector('img');
   *   const button = document.querySelector('button')
   *
   *   function onClick() {
   *     sdk.mediaLink
   *      .getImage()
   *      .then(image => {
   *         setImage(image)
   *       })
   *      .catch(err => console.log('not selected'));
   *   }
   *
   *   function setImage(image) {
   *      img.src = (
   *         new ImageBuilder(image, { stagingEnvironment: sdk.stagingEnvironment })
   *         .url()
   *         .build()
   *      )
   *   }
   *
   *   button.onclick = onClick;
   * }
   *
   * start()
   * ```
   */
  getImage(): Promise<MediaImageLink> {
    return this.connection.request(MEDIA_LINK.IMAGE_GET, null, {
      timeout: false,
    });
  }
  /**
   * This method will trigger an image browser. It returns a promise that will resolve to the chosen Image Links.
   *
   * Example of fetching an image from DC
   * ```typescript
   * try {
   *   // open browser and waits for image
   *   // returns object that should be saved to the model
   *   const images = await sdk.mediaLink.getImages({ max: 10 })
   *
   * } catch (e) {
   *   // no image returned
   * }
   * ```
   */
  getImages({ max }: MediaOptions = { max: null }): Promise<MediaImageLink[]> {
    return this.connection.request(MEDIA_LINK.IMAGE_GET, { max }, { timeout: false });
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
   */
  getVideo(): Promise<MediaVideoLink> {
    return this.connection.request(MEDIA_LINK.VIDEO_GET, null, {
      timeout: false,
    });
  }
  /**
   * This method will trigger a video browser. It returns a promise that will resolve to the chosen Video Links.
   *
   * Example of fetching an video from DC
   * ```typescript
   * try {
   *   // open browser and waits for video
   *   // returns object that should be saved to the model
   *   const videos = await sdk.mediaLink.getVideos()
   *
   * } catch (e) {
   *   // no video returned
   * }
   * ```
   */
  getVideos({ max }: MediaOptions = { max: null }): Promise<MediaVideoLink[]> {
    return this.connection.request(
      MEDIA_LINK.VIDEO_GET,
      { max },
      {
        timeout: false,
      }
    );
  }
}
