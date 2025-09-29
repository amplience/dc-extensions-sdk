import { ClientConnection } from 'message-event-channel';
export declare class GraphQlClient {
    private connection;
    private DEFAULT_ERROR;
    constructor(connection: ClientConnection);
    query(query: string, vars: Record<string, unknown>): Promise<string | Record<string, unknown>>;
    mutation(mutation: string, vars: Record<string, unknown>): Promise<string | Record<string, unknown>>;
}
