import { ClientConnection } from 'message-event-channel';
import { ContentReference } from '../src/lib/ContentReference';

describe('ContentReference', () => {
  let connection: ClientConnection;
  let contentReference: ContentReference;

  beforeEach(() => {
    connection = new ClientConnection();
    contentReference = new ContentReference(connection);
  });

  it('get should return a promise', () => {
    spyOn(connection, 'request').and.callThrough();
    const promise = contentReference.get([]);
    expect(promise instanceof Promise).toBeTruthy();
  });

  it('should pass an array of ids', () => {
    spyOn(connection, 'request');
    contentReference
      .get(['123', '564'])
      .then()
      .catch();
    expect(connection.request).toHaveBeenCalledWith('content-reference-get', ['123', '564'], {
      timeout: false
    });
  });

  it('should throw an error if no ids are passed', () => {
    spyOn(connection, 'request');
    contentReference
      .get([])
      .then()
      .catch();
    expect(connection.request).not.toHaveBeenCalled();
  });

  it('should throw an error if params are not in the expected format', () => {
    spyOn(connection, 'request');
    contentReference
      .get(('123' as unknown) as Array<string>)
      .then()
      .catch();
    expect(connection.request).not.toHaveBeenCalled();
  });
});
