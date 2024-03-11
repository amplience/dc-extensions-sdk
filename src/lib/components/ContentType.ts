import { ClientConnection } from 'message-event-channel';
import { CONTENT_TYPES } from '../constants/Events';

export class ContentTypes {
  constructor(private connection: ClientConnection) {}

  async getByUri(uri: string) {
    return this.connection.request(CONTENT_TYPES.GET_BY_URI, { uri });
  }
}
