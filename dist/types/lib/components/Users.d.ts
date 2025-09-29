import { ClientConnection } from 'message-event-channel';
import { Hub } from '../../dc-extensions-sdk';
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}
export declare class Users {
    private hub;
    private httpClient;
    private graphQlClient;
    constructor(connection: ClientConnection, hub: Hub);
    list(): Promise<User[]>;
    private getAuthUsers;
    private getOrgUsers;
    private transformMembersToAuthUsers;
    private transformUser;
}
