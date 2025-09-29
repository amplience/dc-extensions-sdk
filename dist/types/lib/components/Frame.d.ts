import { ClientConnection } from 'message-event-channel';
export declare class Frame {
    private connection;
    private win;
    isAutoResizing: boolean;
    private previousHeight?;
    private observer;
    private updateHeightHandler;
    /**
     * Use in order to control the re-sizing of the Extension
     *
     * @param connection message-event-channel connection
     * @param win override the default window object
     */
    constructor(connection: ClientConnection, win?: Window);
    /**
     * Get the height of the Extension
     *
     * Returns the extensions total height
     *
     * ### Example
     * ```typescript
     * const height = sdk.frame.getHeight()
     *
     * // 200
     * console.log(height)
     * ```
     */
    getHeight(): number;
    /**
     * Set the height of the frame to the height of the Extension. Can optionally override the measured height with a defined value.
     *
     * @param height - should be used if you want to override the calculated height of your extension
     *
     * If no height is passed it will try get the extension height or default to 0
     *
     * ### Example
     *
     * ```typescript
     * // sets height to extension height
     * sdk.frame.setHeight()
     * // sets height to 200
     * sdk.frame.setHeight(200)
     * ```
     */
    setHeight(height?: number): void;
    /**
     * Starts the auto-resizer
     *
     * It creates an event listener on resize and creates a mutation observer that updates
     * the height when the body height changes you should clean up from this function on unmount
     * to avoid memory leaks
     *
     * If called when already active it does nothing
     *
     * ### Example
     * ```typescript
     * sdk.frame.startAutoResizer();
     * ```
     */
    startAutoResizer(): void;
    /**
     * Stops the auto-resizer
     *
     * It tears down the event listeners and observers created from startAutoResizer should be
     * called when you want to mannaully handle the height or when unmounting
     *
     * If called without autoResizer being active it does nothing
     *
     * ### Example
     * ```typescript
     * sdk.frame.stopAutoResizer();
     * ```
     */
    stopAutoResizer(): void;
    private updateHeight;
}
