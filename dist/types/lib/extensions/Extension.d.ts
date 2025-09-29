import { ClientConnection } from 'message-event-channel';
import { HttpClient } from '../components/HttpClient';
import { Users } from '../components/Users';
import { InitOptions } from '../init';
import { Params } from '../models/Params';
import { Hub } from './dashboard/DashboardExtension';
export interface ExtensionOptions extends InitOptions {
    connection: ClientConnection;
}
export interface ContextObject {
    category: string;
    params: Params;
    hub: Hub;
}
export declare function isContextObject(context: unknown | ContextObject): context is ContextObject;
export declare abstract class Extension<ContextObject> {
    protected readonly options: ExtensionOptions;
    /**
     * message-event-channel [[ClientConnection]] instance. Use to listen to any of the message-event-channel lifecycle events.
     */
    readonly connection: ClientConnection;
    /**
     * Client - used with [dc-management-sdk-js](https://github.com/amplience/dc-management-sdk-js) to make requests to dynamic-content
     */
    client: HttpClient;
    /**
     * Users - used to get the current user or all users under the company
     */
    users: Users;
    constructor(options: ExtensionOptions, context: ContextObject);
    abstract setupContext(context: ContextObject): void;
}
