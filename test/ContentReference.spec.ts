import { ClientConnection } from 'message-event-channel';
import { ContentReference } from '../src/lib/ContentReference';
import { CONTENT_REFERENCE } from '../src/lib/Events';

describe('ContentReference', () => {
  let connection: ClientConnection;
  let contentReference: ContentReference;

  beforeEach(() => {
    connection = new ClientConnection();
    contentReference = new ContentReference(connection);
  });

  it('should pass an array of ids', async () => {
    spyOn(connection, 'request');
    const promise = contentReference.get(['123', '564']);
    expect(promise instanceof Promise).toBeTruthy();
    await promise;
    expect(connection.request).toHaveBeenCalledWith(
      'content-reference-get',
      { contentTypeIds: ['123', '564'] },
      {
        timeout: false
      }
    );
  });

  it('should throw an error if no ids are passed', async () => {
    spyOn(connection, 'request');
    await expectAsync(contentReference.get([])).toBeRejectedWithError(
      'Please provide content type ids'
    );
    expect(connection.request).not.toHaveBeenCalled();
  });

  it('should throw an error if params are not in the expected format', async () => {
    spyOn(connection, 'request');
    await expectAsync(
      contentReference.get(('123' as unknown) as Array<string>)
    ).toBeRejectedWithError('Please provide content type ids');
    expect(connection.request).not.toHaveBeenCalled();
  });

  it('should be able to return multiple items', async () => {
    spyOn(connection, 'request');
    await contentReference.getMultiple(['123']);
    expect(connection.request).toHaveBeenCalledWith(
      CONTENT_REFERENCE.CONTENT_REF_GET,
      {
        contentTypeIds: ['123'],
        max: null
      },
      { timeout: false }
    );
  });

  it('should set max to number if passed', async () => {
    spyOn(connection, 'request');
    await contentReference.getMultiple(['123'], { max: 2 });
    expect(connection.request).toHaveBeenCalledWith(
      CONTENT_REFERENCE.CONTENT_REF_GET,
      {
        contentTypeIds: ['123'],
        max: 2
      },
      { timeout: false }
    );
  });
});
