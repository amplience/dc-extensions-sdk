/* eslint-disable @typescript-eslint/no-floating-promises */
import { ClientConnection } from 'message-event-channel';
import { HttpMethod } from './HttpClient';
import { Users } from './Users';

describe('Users', () => {
  let connection: ClientConnection;
  let users: Users;

  beforeEach(() => {
    connection = new ClientConnection();
    users = new Users(connection, { id: 'hubId', name: 'hubName', organizationId: '1234' });
  });

  it('should return a list of users', async () => {
    const request = jest.spyOn(connection, 'request').mockResolvedValue({
      status: 200,
      data: {
        data: [
          {
            id: '7078e5e7-d5bf-4015-4832-b75fb6f60537',
            type: 'users',
            attributes: {
              email: 'testuser@bigcontent.io',
              'first-name': 'Test',
              'last-name': 'User',
              status: 'ACTIVE',
            },
            links: {
              self: '{AUTH}/users/7078e5e7-d5bf-4015-4832-b75fb6f60537',
            },
          },
        ],
        links: {
          self: '{AUTH}/users',
        },
      },
    });

    const response = await users.list();

    expect(request).toHaveBeenCalledWith('dc-management-sdk-js:request', {
      url: 'https://auth.amplience.net/users',
      method: HttpMethod.GET,
      headers: undefined,
      data: undefined,
    });

    expect(response).toEqual([
      {
        id: '7078e5e7-d5bf-4015-4832-b75fb6f60537',
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@bigcontent.io',
      },
    ]);
  });

  it('should return an empty user list', async () => {
    const request = jest.spyOn(connection, 'request').mockResolvedValue({
      status: 200,
      data: {
        data: [],
        links: {
          self: '{AUTH}/users',
        },
      },
    });
    const response = await users.list();

    expect(request).toHaveBeenCalledWith('dc-management-sdk-js:request', {
      url: 'https://auth.amplience.net/users',
      method: HttpMethod.GET,
      headers: undefined,
      data: undefined,
    });

    expect(response).toEqual([]);
  });

  it('should throw an error', async () => {
    const request = jest.spyOn(connection, 'request').mockRejectedValue({
      status: 401,
    });
    await expect(users.list()).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Unable to get users: API responded with a non 200 status code. Error: status code 401"`
    );
  });
});
