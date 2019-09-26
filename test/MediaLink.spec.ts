import { ClientConnection } from 'message.io';
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
});
