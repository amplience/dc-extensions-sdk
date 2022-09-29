import { ClientConnection } from 'message-event-channel';
import { HttpResponse } from './HttpClient';

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

  public async query(query: string, vars: object) {
    try {
      const { data, status } = await this.connection.request<HttpResponse>(
        'dc-management-sdk-js:graphQL',
        {
          query,
          vars,
        }
      );
      return { data, status };
    } catch (e) {
      if (e) {
        const { data, status } = e as { data: any; status: any };
        return { data, status };
      }
      return this.DEFAULT_ERROR;
    }
  }
}
