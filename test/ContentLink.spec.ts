import { ClientConnection } from 'message.io';
import { ContentLink } from '../src/lib/ContentLink';

describe('ContentItem', () => {
  let connection: ClientConnection;
  let contentLink: ContentLink;

  beforeEach(() => {
    connection = new ClientConnection();
    contentLink = new ContentLink(connection);
  });

  it('get should return a promise', () => {
    spyOn(connection, 'request').and.callThrough();
    const promise = contentLink.get([]);
    expect(promise instanceof Promise).toBeTruthy();
  });

  it('should pass an array of ids', () => {
    spyOn(connection, 'request');
    contentLink
      .get(['123', '564'])
      .then()
      .catch();
    expect(connection.request).toHaveBeenCalledWith('content-link-get', ['123', '564'], {
      timeout: false
    });
  });

  it('should throw an error if no ids are passed', () => {
    spyOn(connection, 'request');
    contentLink
      .get([])
      .then()
      .catch();
    expect(connection.request).not.toHaveBeenCalled();
  });

  it('should throw an error if params are not in the expected format', () => {
    spyOn(connection, 'request');
    contentLink
      .get(('123' as unknown) as Array<string>)
      .then()
      .catch();
    expect(connection.request).not.toHaveBeenCalled();
  });
});
