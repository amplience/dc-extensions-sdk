import { ClientConnection } from 'message-event-channel';
import { ASSETS } from '../constants/Events';
import { Asset } from './Asset';

export class Assets {
  /**
   * Assets - Used for retrieving assets.
   *
   * @param connection message-event-channel connection
   */
  constructor(private connection: ClientConnection) {}

  /**
   * Get an asset by id
   *
   *
   * ### Example
   * ```typescript
   * try {
   *   const asset = await sdk.asset.getById('123-456');
   *
   *   console.log(asset)
   * } catch (e) {
   *   // Could not get asset
   *   ...
   * }
   *
   * ```
   */
  async getById(id: string): Promise<Asset | Error> {
    return this.connection.request(ASSETS.GET_BY_ID, id);
  }
}
