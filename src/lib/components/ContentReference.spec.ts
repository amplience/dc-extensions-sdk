import { ClientConnection } from 'message-event-channel';
import { ContentReference } from './ContentReference';
import { CONTENT_REFERENCE } from '../constants/Events';

describe('ContentReference', () => {
  let connection: ClientConnection;
  let contentReference: ContentReference;

  beforeEach(() => {
    connection = new ClientConnection();
    contentReference = new ContentReference(connection);
  });

  it('get should return a promise', () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});
    const promise = contentReference.get(['123'], '/fieldPointer');
    expect(promise instanceof Promise).toBeTruthy();
  });

  it('should pass an array of ids', async () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});
    await expect(contentReference.get(['123', '564'], '/fieldPointer')).resolves.toEqual({});
    expect(connection.request).toHaveBeenCalledWith(
      'content-reference-get',
      { contentTypeIds: ['123', '564'], pointer: '/fieldPointer' },
      {
        timeout: false,
      }
    );
  });

  it('should throw an error if no ids are passed', async () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});
    await expect(contentReference.get([], '/fieldPointer')).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Please provide content type ids"`
    );
    expect(connection.request).not.toHaveBeenCalled();
  });

  it('should throw an error if params are not in the expected format', async () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});
    await expect(
      contentReference.get(('123' as unknown) as Array<string>, '/fieldPointer')
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Please provide content type ids"`);
    expect(connection.request).not.toHaveBeenCalled();
  });

  it('should beable to return multiple items', async () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});

    await expect(contentReference.getMultiple(['123'], { max: null, pointer: '/fieldPointer' })).resolves.toEqual({});

    expect(connection.request).toHaveBeenCalledWith(
      CONTENT_REFERENCE.CONTENT_REF_GET,
      {
        contentTypeIds: ['123'],
        max: null,
        pointer: '/fieldPointer'
      },
      { timeout: false }
    );
  });

  it('should set max to number if passed', async () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});

    await expect(contentReference.getMultiple(['123'], { max: 2, pointer: '/fieldPointer' })).resolves.toEqual({});

    expect(connection.request).toHaveBeenCalledWith(
      CONTENT_REFERENCE.CONTENT_REF_GET,
      {
        contentTypeIds: ['123'],
        max: 2,
        pointer: '/fieldPointer'
      },
      { timeout: false }
    );
  });
});
