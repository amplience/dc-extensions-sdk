import { ClientConnection } from 'message-event-channel';
import { HttpClient } from '../HttpClient';
import { InitOptions } from '../init';

export interface ExtensionOptions extends InitOptions {
  connection: ClientConnection;
}

export interface ContextObject {
  category: string;
  hubId: string;
  locationHref: string;
}

export function isContextObject(context: unknown | ContextObject): context is ContextObject {
  return (
    (context as ContextObject).category !== undefined &&
    (context as ContextObject).hubId !== undefined &&
    (context as ContextObject).locationHref !== undefined
  );
}

export abstract class Extension<ContextObject> {
  /**
   * message-event-channel [[ClientConnection]] instance. Use to listen to any of the message-event-channel lifecycle events.
   */
  public readonly connection!: ClientConnection;

  /**
   *  Client - used with [dc-management-sdk-js](https://github.com/amplience/dc-management-sdk-js) to make requests to dynamic-content
   */
  public client!: HttpClient;

  constructor(options: ExtensionOptions) {
    this.connection = options.connection;
    this.client = new HttpClient(this.connection);
  }

  public abstract setupContext(context: ContextObject): void;
}
