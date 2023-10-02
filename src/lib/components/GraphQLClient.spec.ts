import { ClientConnection } from 'message-event-channel';
import { GraphQlClient } from './GraphQLClient';

describe('GraphQlClient', () => {
  let graphQlClient: GraphQlClient;
  let connection: ClientConnection;

  beforeEach(() => {
    connection = new ClientConnection();
    graphQlClient = new GraphQlClient(connection);
  });

  describe('query', () => {
    it('Should make a GraphQL request through DC', async () => {
      const response = {
        data: { node: { members: { edges: [] } } },
      };
      const spy = jest.spyOn(connection, 'request').mockResolvedValue(response);
      const result = await graphQlClient.query('GraphQL query', { a: true });
      expect(result).toEqual(response.data);
      expect(spy).toHaveBeenCalledWith('dc-management-sdk-js:graphql-query', {
        query: 'GraphQL query',
        vars: { a: true },
      });
    });
    it('Should return error details if error is in the correct format', async () => {
      const response = {
        data: { error: 'Something went wrong' },
        status: 500,
      };
      jest.spyOn(connection, 'request').mockRejectedValue(response);
      const result = await graphQlClient.query('GraphQL query', { a: true });
      expect(result).toEqual(response);
    });

    it('Should return the default error', async () => {
      jest.spyOn(connection, 'request').mockRejectedValue(null);
      const result = await graphQlClient.query('GraphQL query', { a: true });
      expect(result).toEqual({
        status: 403,
        data: {
          errors: [
            {
              code: 'UNKNOWN',
              level: 'ERROR',
              message: 'Unknown error',
            },
          ],
        },
      });
    });
  });

  describe('mutation', () => {
    it('Should make a GraphQL request through DC', async () => {
      const response = {
        data: { node: { members: { edges: [] } } },
      };
      const spy = jest.spyOn(connection, 'request').mockResolvedValue(response);
      const result = await graphQlClient.mutation('GraphQL query', { a: true });
      expect(result).toEqual(response.data);
      expect(spy).toHaveBeenCalledWith('dc-management-sdk-js:graphql-mutation', {
        mutation: 'GraphQL query',
        vars: { a: true },
      });
    });
    it('Should return error details if error is in the correct format', async () => {
      const response = {
        data: { error: 'Something went wrong' },
        status: 500,
      };
      jest.spyOn(connection, 'request').mockRejectedValue(response);
      const result = await graphQlClient.mutation('GraphQL query', { a: true });
      expect(result).toEqual(response);
    });

    it('Should return the default error', async () => {
      jest.spyOn(connection, 'request').mockRejectedValue(null);
      const result = await graphQlClient.mutation('GraphQL query', { a: true });
      expect(result).toEqual({
        status: 403,
        data: {
          errors: [
            {
              code: 'UNKNOWN',
              level: 'ERROR',
              message: 'Unknown error',
            },
          ],
        },
      });
    });
  });
});
