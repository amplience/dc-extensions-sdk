import { ClientConnection } from 'message-event-channel';

import { FRAME } from '../constants/Events';
import { ERRORS_FRAME } from '../constants/Errors';
export class Frame {
  public isAutoResizing: boolean = false;
  private previousHeight?: number;
  private observer: MutationObserver = new MutationObserver(() => this.updateHeight());
  private updateHeightHandler: () => void;

  /**
   * Use in order to control the re-sizing of the Extension
   *
   * @param connection message-event-channel connection
   * @param win override the default window object
   */
  constructor(private connection: ClientConnection, private win: Window = window) {
    const frameLoaded = new Promise((resolve) => {
      if (win.document.readyState === 'complete') {
        resolve(true);
      }
      win.addEventListener('load', () => {
        resolve(true);
      });
    });

    this.connection.on(FRAME.HEIGHT_GET, async (_payload: any, resolve: Function) => {
      await frameLoaded;
      resolve(this.getHeight());
    });

    this.updateHeightHandler = this.updateHeight.bind(this);
  }

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
  public getHeight(): number {
    const { documentElement } = this.win.document;

    if (documentElement) {
      const { height } = documentElement.getBoundingClientRect();

      return height;
    }

    return 0;
  }

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
  public setHeight(height?: number) {
    if (height !== undefined && (typeof height as unknown) !== 'number') {
      throw new TypeError(ERRORS_FRAME.SET_HEIGHT_NUMBER);
    }

    const h = height === undefined ? this.getHeight() : height;

    this.previousHeight = height;
    this.connection.emit(FRAME.HEIGHT_SET, h < 0 ? 0 : h);
  }

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
  public startAutoResizer() {
    if (this.isAutoResizing) {
      return;
    }

    this.isAutoResizing = true;

    this.observer.observe(this.win.document.body, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    });

    this.win.addEventListener('resize', this.updateHeightHandler);
  }

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
  public stopAutoResizer() {
    if (!this.isAutoResizing) {
      return;
    }

    this.isAutoResizing = false;
    this.observer.disconnect();
    this.win.removeEventListener('resize', this.updateHeightHandler);
  }

  private updateHeight() {
    const height = this.getHeight();

    if (height === this.previousHeight) {
      return;
    }

    this.setHeight(height);
  }
}
