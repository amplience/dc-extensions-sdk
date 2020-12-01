/* eslint-disable @typescript-eslint/no-floating-promises */
import { ClientConnection } from 'message-event-channel';
import { MEDIA_LINK } from '../src/lib/Events';
import { MediaLink } from '../src/lib/MediaLink';

describe('ContentItem', () => {
  let connection: ClientConnection;
  let media: MediaLink;

  beforeEach(() => {
    connection = new ClientConnection();
    media = new MediaLink(connection);
  });

  it('should beable to request image media browser', () => {
    spyOn(connection, 'request');
    media.getImage();
    expect(connection.request).toHaveBeenCalledWith(MEDIA_LINK.IMAGE_GET, null, { timeout: false });
  });

  it('should beable to request video media browser', () => {
    spyOn(connection, 'request');
    media.getVideo();
    expect(connection.request).toHaveBeenCalledWith(MEDIA_LINK.VIDEO_GET, null, { timeout: false });
  });

  it('should beable to request video media browser an ask for multiple', () => {
    spyOn(connection, 'request');
    media.getVideos();
    expect(connection.request).toHaveBeenCalledWith(
      MEDIA_LINK.VIDEO_GET,
      { max: null },
      { timeout: false }
    );
  });
  it('should beable to request video media browser an ask for multiple if asked for max send number', () => {
    spyOn(connection, 'request');
    media.getVideos({ max: 4 });
    expect(connection.request).toHaveBeenCalledWith(
      MEDIA_LINK.VIDEO_GET,
      { max: 4 },
      { timeout: false }
    );
  });
  it('should beable to request image media browser an ask for multiple', () => {
    spyOn(connection, 'request');
    media.getImages();
    expect(connection.request).toHaveBeenCalledWith(
      MEDIA_LINK.IMAGE_GET,
      { max: null },
      { timeout: false }
    );
  });
  it('should beable to request image media browser an ask for multiple if passed max send number', () => {
    spyOn(connection, 'request');
    media.getImages({ max: 5 });
    expect(connection.request).toHaveBeenCalledWith(
      MEDIA_LINK.IMAGE_GET,
      { max: 5 },
      { timeout: false }
    );
  });
});
