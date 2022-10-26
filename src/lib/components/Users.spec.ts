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
    const request = jest.spyOn(connection, 'request').mockImplementation((action) => {
      if (action === 'dc-management-sdk-js:request') {
        return Promise.resolve({
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
      }
      return Promise.resolve({
        data: {
          node: {
            members: {
              edges: [
                {
                  node: {
                    id: 'VXNlcjoxMTExMTExMS0xMTExLTExMTEtMTExMS0xMTExMTExMTExMTE=',
                    email: 'test@amplience.com',
                    name: 'Test user',
                  },
                },
              ],
              pageInfo: { hasNextPage: false, endCursor: '1234' },
            },
          },
        },
      });
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
        id: '11111111-1111-1111-1111-111111111111',
        firstName: 'Test user',
        lastName: '',
        email: 'test@amplience.com',
      },
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
    jest.spyOn(connection, 'request').mockRejectedValue({
      status: 401,
    });
    await expect(users.list()).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Unable to get users: API responded with a non 200 status code. Error: status code 401"`
    );
  });

  it('Should make users unique by email and org users should take preference', async () => {
    jest.spyOn(connection, 'request').mockImplementation((action) => {
      if (action === 'dc-management-sdk-js:request') {
        return Promise.resolve({
          status: 200,
          data: {
            data: [
              {
                id: '7078e5e7-d5bf-4015-4832-b75fb6f60537',
                type: 'users',
                attributes: {
                  email: 'test@amplience.com',
                  'first-name': 'Auth',
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
      }
      return Promise.resolve({
        data: {
          node: {
            members: {
              edges: [
                {
                  node: {
                    id: 'VXNlcjoxMTExMTExMS0xMTExLTExMTEtMTExMS0xMTExMTExMTExMTE=',
                    email: 'test@amplience.com',
                    name: 'Org User',
                  },
                },
              ],
              pageInfo: { hasNextPage: false, endCursor: '1234' },
            },
          },
        },
      });
    });

    const response = await users.list();

    expect(response.length).toEqual(1);
    expect(response[0].firstName).toEqual('Org User');
  });
  it('Should handle missing organisationId', async () => {
    const users = new Users(connection, {
      id: 'hubId',
      name: 'hubName',
      organizationId: undefined,
    });

    const request = jest.spyOn(connection, 'request').mockResolvedValue({
      status: 200,
      data: {
        data: [
          {
            id: '7078e5e7-d5bf-4015-4832-b75fb6f60537',
            type: 'users',
            attributes: {
              email: 'test@amplience.com',
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

    expect(request).not.toHaveBeenCalledWith('dc-management-sdk-js:graphQL', jasmine.any(Object));

    expect(response).toEqual([
      {
        id: '7078e5e7-d5bf-4015-4832-b75fb6f60537',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@amplience.com',
      },
    ]);
  });

  it('Should get all users if > 100 org users', async () => {
    const orgUsers = Array.from({ length: 200 }).map((_, i) => ({
      node: {
        id: btoa(
          'User:11111111-1111-1111-1111-111111111000'.replace(/000/g, `${i}`.padStart(3, '0'))
        ),
        email: `test${i}@amplience.com`,
        name: `Test user ${i}`,
      },
    }));
    const getPage = () => {
      // @ts-ignore
      return Array.from({ length: 100 }).reduce((m) => [...m, orgUsers.shift()], []);
    };

    jest.spyOn(connection, 'request').mockImplementation((action) => {
      if (action === 'dc-management-sdk-js:request') {
        return Promise.resolve({
          status: 200,
          data: {
            data: [],
            links: {
              self: '{AUTH}/users',
            },
          },
        });
      }

      return Promise.resolve({
        data: {
          node: {
            members: {
              edges: getPage(),
              pageInfo: { hasNextPage: Boolean(orgUsers.length), endCursor: '1234' },
            },
          },
        },
      });
    });

    const response = await users.list();

    expect(response.length).toEqual(200);
  });

  it('Should handle incorrect org user response', async () => {
    jest.spyOn(connection, 'request').mockImplementation((action) => {
      if (action === 'dc-management-sdk-js:request') {
        return Promise.resolve({
          status: 200,
          data: {
            data: [
              {
                id: '7078e5e7-d5bf-4015-4832-b75fb6f60537',
                type: 'users',
                attributes: {
                  email: 'test@amplience.com',
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
      }

      return Promise.resolve({
        data: {
          bad: {},
        },
      });
    });

    const response = await users.list();
    expect(response.length).toEqual(1);
  });

  it('Should handle org user response errors', async () => {
    jest.spyOn(connection, 'request').mockImplementation((action) => {
      if (action === 'dc-management-sdk-js:request') {
        return Promise.resolve({
          status: 200,
          data: {
            data: [
              {
                id: '7078e5e7-d5bf-4015-4832-b75fb6f60537',
                type: 'users',
                attributes: {
                  email: 'test@amplience.com',
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
      }

      return Promise.resolve({
        data: {
          node: {
            members: { bad: 'format' },
          },
        },
      });
    });

    const response = await users.list();
    expect(response.length).toEqual(1);
  });

  it('Should not return org user with invalid IDs', async () => {
    jest.spyOn(connection, 'request').mockImplementation((action) => {
      if (action === 'dc-management-sdk-js:request') {
        return Promise.resolve({
          status: 200,
          data: {
            data: [],
            links: {
              self: '{AUTH}/users',
            },
          },
        });
      }
      return Promise.resolve({
        data: {
          node: {
            members: {
              edges: [
                {
                  node: {
                    id: 'VXNlcjoxMTExMTExMS0xMTExLTExMTEtMTExMS0xMTExMTExMTExMTE=',
                    email: 'test@amplience.com',
                    name: 'Org User',
                  },
                },
                {
                  node: {
                    id: 'this is not valid',
                    email: 'invalid@amplience.com',
                    name: 'Invalid User',
                  },
                },
              ],
              pageInfo: { hasNextPage: false, endCursor: '1234' },
            },
          },
        },
      });
    });

    const response = await users.list();

    expect(response.length).toEqual(1);
    expect(response[0].email).toEqual('test@amplience.com');
  });
});
