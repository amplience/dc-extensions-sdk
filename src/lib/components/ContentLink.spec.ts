/* eslint-disable @typescript-eslint/no-floating-promises */
import { ClientConnection } from 'message-event-channel';
import { ContentLink } from './ContentLink';
import { CONTENT_LINK } from '../constants/Events';

describe('ContentItem', () => {
  let connection: ClientConnection;
  let contentLink: ContentLink;

  beforeEach(() => {
    connection = new ClientConnection();
    contentLink = new ContentLink(connection);
  });

  it('get should return a promise', () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});
    const promise = contentLink.get(['123'], '/fieldPointer');
    expect(promise instanceof Promise).toBeTruthy();
  });

  it('should pass an array of ids', () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});
    contentLink.get(['123', '564'], '/fieldPointer').then().catch();
    expect(connection.request).toHaveBeenCalledWith(
      'content-link-get',
      { contentTypeIds: ['123', '564'], pointer: '/fieldPointer' },
      {
        timeout: false,
      }
    );
  });

  it('should throw an error if no ids are passed', async () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});
    await expect(contentLink.get([], '/fieldPointer')).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Please provide content type ids"`
    );
    expect(connection.request).not.toHaveBeenCalled();
  });

  it('should throw an error if params are not in the expected format', async () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});
    await expect(
      contentLink.get(('123' as unknown) as Array<string>, '/fieldPointer')
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Please provide content type ids"`);
    expect(connection.request).not.toHaveBeenCalled();
  });

  it('should beable to return multiple items', () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});

    contentLink.getMultiple(['123'], { pointer: '/fieldPointer' });

    expect(connection.request).toHaveBeenCalledWith(
      CONTENT_LINK.CONTENT_GET,
      {
        contentTypeIds: ['123'],
        max: null,
        pointer: '/fieldPointer'
      },
      { timeout: false }
    );
  });

  it('should set max to number if passed', () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});

    contentLink.getMultiple(['123'], { max: 2, pointer: '/fieldPointer' });

    expect(connection.request).toHaveBeenCalledWith(
      CONTENT_LINK.CONTENT_GET,
      {
        contentTypeIds: ['123'],
        max: 2,
        pointer: '/fieldPointer'
      },
      { timeout: false }
    );
  });
});
