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
  DELETE = 'DELETE',
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
 * You must have enabled your extension in Dynamic Content for this service to work
 *
 * ```typescript
 * import { init } from 'dc-extensions-sdk';
 * import { DynamicContent } from "dc-management-sdk-js";
 *
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

  public async request(config: HttpRequest): Promise<HttpResponse> {
    try {
      const response = await this.connection.request<HttpResponse>('dc-management-sdk-js:request', {
        data: config.data,
        method: config.method,
        headers: config.headers,
        url: config.url,
      });

      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      if (error) {
        return {
          data: error.data,
          status: error.status,
        };
      }

      return this.DEFAULT_ERROR;
    }
  }
}
