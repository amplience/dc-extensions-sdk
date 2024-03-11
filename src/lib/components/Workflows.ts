import { WORKFLOWS } from '../constants/Events';
import { ClientConnection } from 'message-event-channel';

export class Workflows {
  constructor(private connection: ClientConnection) {}

  async getAll() {
    return this.connection.request(WORKFLOWS.GET_ALL_WORKFLOWS);
  }
}
