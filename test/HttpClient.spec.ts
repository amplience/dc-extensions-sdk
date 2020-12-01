/* eslint-disable @typescript-eslint/no-floating-promises */
import { ClientConnection } from 'message-event-channel';
import { HttpClient, HttpMethod } from '../src/lib/HttpClient';

describe('HttpClient', () => {
  let httpClient: HttpClient;
  let connection: ClientConnection;

  beforeEach(() => {
    connection = new ClientConnection();
    httpClient = new HttpClient(connection);
  });

  it('should pass on request config to connection', () => {
    const request = spyOn(connection, 'request').and.returnValue(Promise.resolve());

    httpClient.request({
      url: 'https://bigcontent.io',
      method: HttpMethod.GET,
      data: {}
    });

    expect(request).toHaveBeenCalledWith('dc-management-sdk-js:request', {
      url: 'https://bigcontent.io',
      method: HttpMethod.GET,
      headers: undefined,
      data: {}
    });
  });

  it('should just return status and data', async () => {
    spyOn(connection, 'request').and.returnValue(
      Promise.resolve({
        status: 200,
        data: 'hello world',
        headers: {}
      })
    );

    const response = await httpClient.request({
      url: 'https://bigcontent.io',
      method: HttpMethod.GET,
      data: {}
    });

    expect(response).toEqual({
      status: 200,
      data: 'hello world'
    });
  });

  it('should catch errors and return status and data', async () => {
    spyOn(connection, 'request').and.returnValue(
      Promise.reject({
        data: 'hello world',
        status: 400
      })
    );

    const response = await httpClient.request({
      url: 'https://bigcontent.io',
      method: HttpMethod.GET,
      data: {}
    });

    expect(response).toEqual({
      status: 400,
      data: 'hello world'
    });
  });
});
