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

interface OrgUserResponse extends HttpResponse {
  data: {
    node: {
      members: { edges: OrgUser[]; pageInfo: { hasNextPage: boolean; endCursor: string } };
    };
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
    const users = await Promise.all([this.getOrgUsers(), this.getAuthUsers()]);

    const includesUser = (users: User[], user: User) =>
      Boolean(users.find(({ email }) => email === user.email));

    const uniqueByEmail = (users: User[], user: User) =>
      includesUser(users, user) ? users : [...users, user];

    return users.flat().map(this.transformUser).reduce(uniqueByEmail, []);
  }

  private async getAuthUsers(): Promise<AuthUser[]> {
    try {
      const response: HttpResponse = await this.httpClient.request({
        url: USERS_URL,
        method: HttpMethod.GET,
      });

      this.throwIfResponseError(response);

      return (response.data as unknown) as AuthUser[];
    } catch (error) {
      throw new Error(`Unable to get users: ${error.message}`);
    }
  }

  private async getOrgUsers(after?: string): Promise<AuthUser[]> {
    const organisationId = this.hub.organizationId;
    const vars = {
      orgId: `Organization:${organisationId}`,
      first: 100,
      ...(after ? { after } : null),
    };

    // {a: 1, ...true ? null : {b: 2}

    try {
      const response: OrgUserResponse = await this.graphQlClient.query(orgUsersQuery, vars);

      this.throwIfResponseError(response);

      const members = response.data.node.members;
      const { hasNextPage, endCursor } = members.pageInfo;
      const otherMembers = hasNextPage ? await this.getOrgUsers(endCursor) : [];

      return [...members.edges.reduce(this.transformMembersToAuthUsers, []), ...otherMembers];
    } catch (error) {
      throw new Error(`Unable to get users: ${error.message}`);
    }
  }

  private transformMembersToAuthUsers(members: AuthUser[], { node: member }: OrgUser) {
    const parsedId = atob(member.id);
    const uuidRegex = new RegExp(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
    const userId = parsedId.match(uuidRegex);

    if (userId) {
      return [
        ...members,
        {
          id: userId[0].toLowerCase(),
          attributes: {
            email: member.email,
            'first-name': member.name,
            'last-name': '',
          },
        },
      ];
    }
    return members;
  }

  private transformUser(authUser: AuthUser): User {
    return {
      id: authUser.id,
      firstName: authUser.attributes['first-name'],
      lastName: authUser.attributes['last-name'],
      email: authUser.attributes.email,
    };
  }

  private throwIfResponseError(response: HttpResponse) {
    if (response.status !== 200) {
      throw new Error(
        `API responded with a non 200 status code. Error: ${
          response.data || `status code ${response.status}`
        }`
      );
    }
  }
}
