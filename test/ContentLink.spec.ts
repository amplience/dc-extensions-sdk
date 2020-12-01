/* eslint-disable @typescript-eslint/no-floating-promises */
import { ClientConnection } from 'message-event-channel';
import { ContentLink } from '../src/lib/ContentLink';
import { CONTENT_LINK } from '../src/lib/Events';

describe('ContentItem', () => {
  let connection: ClientConnection;
  let contentLink: ContentLink;

  beforeEach(() => {
    connection = new ClientConnection();
    contentLink = new ContentLink(connection);
  });

  it('should pass an array of ids', async () => {
    spyOn(connection, 'request');
    const promise = contentLink.get(['123', '564']);
    expect(promise instanceof Promise).toBeTruthy();
    await promise;
    expect(connection.request).toHaveBeenCalledWith(
      'content-link-get',
      { contentTypeIds: ['123', '564'] },
      {
        timeout: false
      }
    );
  });

  it('should throw an error if no ids are passed', async () => {
    spyOn(connection, 'request');
    await expectAsync(contentLink.get([])).toBeRejectedWithError('Please provide content type ids');
    expect(connection.request).not.toHaveBeenCalled();
  });

  it('should throw an error if params are not in the expected format', async () => {
    spyOn(connection, 'request');
    await expectAsync(contentLink.get(('123' as unknown) as Array<string>)).toBeRejectedWithError(
      'Please provide content type ids'
    );
    expect(connection.request).not.toHaveBeenCalled();
  });

  it('should beable to return multiple items', async () => {
    spyOn(connection, 'request');
    await contentLink.getMultiple(['123']);
    expect(connection.request).toHaveBeenCalledWith(
      CONTENT_LINK.CONTENT_GET,
      {
        contentTypeIds: ['123'],
        max: null
      },
      { timeout: false }
    );
  });

  it('should set max to number if passed', async () => {
    spyOn(connection, 'request');
    await contentLink.getMultiple(['123'], { max: 2 });
    expect(connection.request).toHaveBeenCalledWith(
      CONTENT_LINK.CONTENT_GET,
      {
        contentTypeIds: ['123'],
        max: 2
      },
      { timeout: false }
    );
  });
});
