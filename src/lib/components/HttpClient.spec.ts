/* eslint-disable @typescript-eslint/no-floating-promises */
import { ClientConnection } from 'message-event-channel';
import { HttpClient, HttpMethod } from './HttpClient';

describe('HttpClient', () => {
  let httpClient: HttpClient;
  let connection: ClientConnection;

  beforeEach(() => {
    connection = new ClientConnection();
    httpClient = new HttpClient(connection);
  });

  it('should pass on request config to connection', () => {
    const request = jest.spyOn(connection, 'request').mockReturnValue(Promise.resolve());

    httpClient.request({
      url: 'https://bigcontent.io',
      method: HttpMethod.GET,
      data: {},
    });

    expect(request).toHaveBeenCalledWith('dc-management-sdk-js:request', {
      url: 'https://bigcontent.io',
      method: HttpMethod.GET,
      headers: undefined,
      data: {},
    });
  });

  it('should just return status and data', async () => {
    jest.spyOn(connection, 'request').mockReturnValue(
      Promise.resolve({
        status: 200,
        data: 'hello world',
        headers: {},
      })
    );

    const response = await httpClient.request({
      url: 'https://bigcontent.io',
      method: HttpMethod.GET,
      data: {},
    });

    expect(response).toEqual({
      status: 200,
      data: 'hello world',
    });
  });

  it('should catch errors and return status and data', async () => {
    jest.spyOn(connection, 'request').mockReturnValue(
      Promise.reject({
        data: 'hello world',
        status: 400,
      })
    );

    const response = await httpClient.request({
      url: 'https://bigcontent.io',
      method: HttpMethod.GET,
      data: {},
    });

    expect(response).toEqual({
      status: 400,
      data: 'hello world',
    });
  });
});
