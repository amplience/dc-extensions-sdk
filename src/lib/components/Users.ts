import { ClientConnection } from 'message-event-channel';
import { Hub } from '../../dc-extensions-sdk';
import { USERS_URL } from '../constants/Users';
import { GraphQlClient } from './GraphQLClient';
import { HttpClient, HttpMethod, HttpResponse } from './HttpClient';

interface AuthUser {
  id: string;
  attributes: {
    email: string;
    'first-name': string;
    'last-name': string;
  };
}

interface OrgUser {
  node: {
    id: string;
    email: string;
    name: string;
  };
}

interface OrgUserResponse {
  node: {
    members: { edges: OrgUser[]; pageInfo: { hasNextPage: boolean; endCursor: string } };
  };
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const orgUsersQuery = `
  query getOrganizationMembersByOrgId($orgId: ID!, $first: Int!, $after: String) {
    node(id: $orgId) {
      id
      ... on Organization {
        id
        members(first: $first, after: $after) {
          edges {
            node {
              id
              email
              picture
              name
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
        }
      }
    }
  }`;

export class Users {
  private httpClient: HttpClient;
  private graphQlClient: GraphQlClient;

  constructor(connection: ClientConnection, private hub: Hub) {
    this.httpClient = new HttpClient(connection);
    this.graphQlClient = new GraphQlClient(connection);
  }

  async list(): Promise<User[]> {
    const [orgUsers, authUsers] = await Promise.all([this.getOrgUsers(), this.getAuthUsers()]);

    const includesUser = (users: User[], user: User) =>
      Boolean(users.find(({ email }) => email === user.email));

    const uniqueByEmail = (users: User[], user: User) =>
      includesUser(users, user) ? users : [...users, user];

    return [...orgUsers, ...authUsers].map(this.transformUser).reduce(uniqueByEmail, []);
  }

  private async getAuthUsers(): Promise<AuthUser[]> {
    try {
      const response = await this.httpClient.request({
        url: USERS_URL,
        method: HttpMethod.GET,
      });

      if (response.status !== 200) {
        throw new Error(
          `API responded with a non 200 status code. Error: ${
            response.data || `status code ${response.status}`
          }`
        );
      }

      return (response?.data as Record<'data', AuthUser[]>)?.data || [];
    } catch (error: any) {
      throw new Error(`Unable to get users: ${error?.message}`);
    }
  }

  private async getOrgUsers(after?: string): Promise<AuthUser[]> {
    const organisationId = this.hub.organizationId;
    if (!organisationId) {
      return [];
    }
    const vars = {
      orgId: btoa(`Organization:${organisationId}`),
      first: 100,
      ...(after ? { after } : null),
    };

    try {
      const response: OrgUserResponse = ((await this.graphQlClient.query(
        orgUsersQuery,
        vars
      )) as unknown) as OrgUserResponse;
      const members = response?.node?.members;

      if (!members) {
        return [];
      }

      const { hasNextPage, endCursor } = members.pageInfo;
      const otherMembers = hasNextPage ? await this.getOrgUsers(endCursor) : [];
      return [...members.edges.reduce(this.transformMembersToAuthUsers, []), ...otherMembers];
    } catch (error) {
      return [];
    }
  }

  private transformMembersToAuthUsers(members: AuthUser[], { node: member }: OrgUser) {
    const parsedId = atob(member.id);
    const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
    const userId = parsedId.match(uuidRegex);

    return userId
      ? [
          ...members,
          {
            id: userId[0].toLowerCase(),
            attributes: {
              email: member.email,
              'first-name': member.name,
              'last-name': '',
            },
          },
        ]
      : members;
  }

  private transformUser(authUser: AuthUser): User {
    return {
      id: authUser.id,
      firstName: authUser.attributes['first-name'],
      lastName: authUser.attributes['last-name'],
      email: authUser.attributes.email,
    };
  }
}
