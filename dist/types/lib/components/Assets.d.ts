import { ClientConnection } from 'message-event-channel';
import { Asset } from './Asset';
export declare class Assets {
    private connection;
    /**
     * Assets - Used for retrieving assets.
     *
     * @param connection message-event-channel connection
     */
    constructor(connection: ClientConnection);
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
    getById(id: string): Promise<Asset | Error>;
}
