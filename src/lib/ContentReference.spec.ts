import { ClientConnection } from 'message-event-channel';
import { ContentReference } from './ContentReference';
import { CONTENT_REFERENCE } from './Events';

describe('ContentReference', () => {
  let connection: ClientConnection;
  let contentReference: ContentReference;

  beforeEach(() => {
    connection = new ClientConnection();
    contentReference = new ContentReference(connection);
  });

  it('get should return a promise', () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});
    const promise = contentReference.get([]);
    expect(promise instanceof Promise).toBeTruthy();
  });

  it('should pass an array of ids', () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});
    contentReference
      .get(['123', '564'])
      .then()
      .catch();
    expect(connection.request).toHaveBeenCalledWith(
      'content-reference-get',
      { contentTypeIds: ['123', '564'] },
      {
        timeout: false
      }
    );
  });

  it('should throw an error if no ids are passed', () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});
    contentReference
      .get([])
      .then()
      .catch();
    expect(connection.request).not.toHaveBeenCalled();
  });

  it('should throw an error if params are not in the expected format', () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});
    contentReference
      .get(('123' as unknown) as Array<string>)
      .then()
      .catch();
    expect(connection.request).not.toHaveBeenCalled();
  });

  it('should beable to return multiple items', () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});

    contentReference.getMultiple(['123']);

    expect(connection.request).toHaveBeenCalledWith(
      CONTENT_REFERENCE.CONTENT_REF_GET,
      {
        contentTypeIds: ['123'],
        max: null
      },
      { timeout: false }
    );
  });

  it('should set max to number if passed', () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});

    contentReference.getMultiple(['123'], { max: 2 });

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
