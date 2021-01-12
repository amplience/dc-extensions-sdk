import { ClientConnection } from 'message-event-channel';
import { HttpClient } from '../components/HttpClient';
import { Users } from '../components/Users';
import { InitOptions } from '../init';
import { Params } from '../models/Params';

export interface ExtensionOptions extends InitOptions {
  connection: ClientConnection;
}

export interface ContextObject {
  category: string;
  params: Params;
}

export function isContextObject(context: unknown | ContextObject): context is ContextObject {
  return (context as ContextObject)?.params?.installation !== undefined;
}

export abstract class Extension<ContextObject> {
  /**
   * message-event-channel [[ClientConnection]] instance. Use to listen to any of the message-event-channel lifecycle events.
   */
  public readonly connection!: ClientConnection;

  /**
   * Client - used with [dc-management-sdk-js](https://github.com/amplience/dc-management-sdk-js) to make requests to dynamic-content
   */
  public client!: HttpClient;

  /**
   * Users - used to get the current user or all users under the company
   */
  public users!: Users;

  constructor(protected readonly options: ExtensionOptions) {
    this.connection = this.options.connection;
    this.client = new HttpClient(this.connection);
    this.users = new Users(this.connection);
  }

  public abstract setupContext(context: ContextObject): void;
}
