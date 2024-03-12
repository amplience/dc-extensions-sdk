import { CONTENT_TYPES } from '../constants/Events';
import { ClientConnection } from 'message-event-channel';

export class ContentTypes {
  constructor(private connection: ClientConnection) {}

  async getByUri(uri: string) {
    return this.connection.request(CONTENT_TYPES.GET_BY_URI, { uri });
  }

  async getByUris(uris: string[]) {
    return this.connection.request(CONTENT_TYPES.GET_BY_URIS, { uris });
  }
}
