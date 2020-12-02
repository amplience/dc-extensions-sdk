import { ClientConnection } from 'message-event-channel';
import { MEDIA_LINK } from './Events';
import { MediaLink } from './MediaLink';

describe('ContentItem', () => {
  let connection: ClientConnection;
  let media: MediaLink;

  beforeEach(() => {
    connection = new ClientConnection();
    media = new MediaLink(connection);
  });

  it('should beable to request image media browser', () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});
    media.getImage();
    expect(connection.request).toHaveBeenCalledWith(MEDIA_LINK.IMAGE_GET, null, { timeout: false });
  });

  it('should beable to request video media browser', () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});
    media.getVideo();
    expect(connection.request).toHaveBeenCalledWith(MEDIA_LINK.VIDEO_GET, null, { timeout: false });
  });

  it('should beable to request video media browser an ask for multiple', () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});
    media.getVideos();
    expect(connection.request).toHaveBeenCalledWith(
      MEDIA_LINK.VIDEO_GET,
      { max: null },
      { timeout: false }
    );
  });
  it('should beable to request video media browser an ask for multiple if asked for max send number', () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});
    media.getVideos({ max: 4 });
    expect(connection.request).toHaveBeenCalledWith(
      MEDIA_LINK.VIDEO_GET,
      { max: 4 },
      { timeout: false }
    );
  });
  it('should beable to request image media browser an ask for multiple', () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});
    media.getImages();
    expect(connection.request).toHaveBeenCalledWith(
      MEDIA_LINK.IMAGE_GET,
      { max: null },
      { timeout: false }
    );
  });
  it('should beable to request image media browser an ask for multiple if passed max send number', () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});
    media.getImages({ max: 5 });
    expect(connection.request).toHaveBeenCalledWith(
      MEDIA_LINK.IMAGE_GET,
      { max: 5 },
      { timeout: false }
    );
  });
});
