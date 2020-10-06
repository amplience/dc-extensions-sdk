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

/**
 * Client to be used with [dc-management-sdk-js](https://github.com/amplience/dc-management-sdk-js)
 *
 * You must enabled your extension for this service to work like so:
 *
 * @TODO talk about how to enable a extension to make requests
 *
 * ```typescript
 * const dcExtension = await init();
 * const dcManagement = new DynamicContent(
 *  {},
 *  {},
 *  dcExtension.client
 * );
 *
 * const hubs = await dcManagement.hubs.list();
 * ```
 */
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
