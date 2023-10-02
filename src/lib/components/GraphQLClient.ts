import { ClientConnection } from 'message-event-channel';
import { HttpResponse } from './HttpClient';

enum ACTIONS {
  QUERY = 'dc-management-sdk-js:graphql-query',
  MUTATION = 'dc-management-sdk-js:graphql-mutation',
}

export class GraphQlClient {
  private DEFAULT_ERROR = {
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
  };

  constructor(private connection: ClientConnection) {}

  public async query(query: string, vars: Record<string, unknown>) {
    try {
      const { data } = await this.connection.request<HttpResponse>(ACTIONS.QUERY, {
        query,
        vars,
      });
      return data;
    } catch (e) {
      if (e) {
        const { data, status } = e as { data: unknown; status: unknown };
        return { data, status };
      }
      return this.DEFAULT_ERROR;
    }
  }

  public async mutation(mutation: string, vars: Record<string, unknown>) {
    try {
      const { data } = await this.connection.request<HttpResponse>(ACTIONS.MUTATION, {
        mutation,
        vars,
      });
      return data;
    } catch (e) {
      if (e) {
        const { data, status } = e as { data: unknown; status: unknown };
        return { data, status };
      }
      return this.DEFAULT_ERROR;
    }
  }
}
