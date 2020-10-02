import { ClientConnection } from 'message-event-channel';

/**
 * @hidden
 */
export interface HttpResponse {
  status: number;
  data: string | Record<string, unknown>;
}

/**
 * @hidden
 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

/**
 * @hidden
 */
export interface HttpRequest {
  url: string;
  method: HttpMethod;
  data?: string | Record<string, unknown>;
  headers?: { [key: string]: string };
}

export class HttpClient {
  constructor(private connection: ClientConnection) {}

  public async request(config: HttpRequest): Promise<HttpResponse> {
    try {
      const response = await this.connection.request<HttpResponse>('dc-management-sdk-js:request', {
        data: config.data,
        method: config.method,
        headers: config.headers,
        url: config.url
      });

      return {
        data: response.data,
        status: response.status
      };
    } catch (error) {
      if (error && error.response) {
        return {
          data: error.response.data,
          status: error.response.status
        };
      }
      return error;
    }
  }
}
