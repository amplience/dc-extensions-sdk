import { ClientConnection } from 'message-event-channel';
/**
 * @hidden
 */
export interface HttpResponse<Resource = string | Record<string, unknown>> {
    status: number;
    data: Resource;
}
/**
 * @hidden
 */
export interface HttpError {
    code: string;
    level: string;
    message: string;
}
/**
 * @hidden
 */
export interface HttpErrors {
    errors: HttpError[];
}
/**
 * @hidden
 */
export declare enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE"
}
/**
 * @hidden
 */
export interface HttpRequest {
    url: string;
    method: HttpMethod;
    data?: string | Record<string, unknown>;
    headers?: {
        [key: string]: string;
    };
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
export declare class HttpClient {
    private connection;
    private DEFAULT_ERROR;
    constructor(connection: ClientConnection);
    request<Resource = string | Record<string, unknown>>(config: HttpRequest): Promise<HttpResponse<Resource | HttpErrors>>;
}
