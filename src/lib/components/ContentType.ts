import { CONTENT_TYPES } from '../constants/Events';
import { ClientConnection } from 'message-event-channel';

export class ContentTypes {
  constructor(private connection: ClientConnection) {}

  async getByUri(id: string, uri: string) {
    return this.connection.request(CONTENT_TYPES.GET_BY_URI, { id, uri });
  }

  async getByUris(id: string, uris: string[]) {
    return this.connection.request(CONTENT_TYPES.GET_BY_URIS, { id, uris });
  }
}
