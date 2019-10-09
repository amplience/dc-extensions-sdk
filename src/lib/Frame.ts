import { ClientConnection } from 'message.io';

import { FRAME } from './Events';
import { ERRORS_FRAME } from './Errors';
export class Frame {
  public isAutoResizing: boolean = false;
  private frameLoaded: boolean = false;
  private previousHeight?: number;
  private observer: MutationObserver = new MutationObserver(this.updateHeight.bind(this));
  /**
   * Use in order to control the re-sizing of the Extension
   * @param connection message.io connection
   * @param win override the default window object
   */
  constructor(private connection: ClientConnection, private win: Window = window) {
    const frameLoaded = new Promise(resolve => {
      if (this.frameLoaded) {
        resolve(true);
      }
      window.addEventListener('load', () => {
        this.frameLoaded = true;
        resolve(true);
      });
    });

    this.connection.on(FRAME.HEIGHT_GET, async (_payload: any, resolve: Function) => {
      await frameLoaded;
      resolve(this.getHeight());
    });
  }

  /**
   * Get the height of the Extension
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
   * @param height - should be used if you want to override the calculated height of your extension
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
   * Start the auto-resizer
   */
  public startAutoResizer() {
    this.updateHeight();

    if (this.isAutoResizing) return;

    this.isAutoResizing = true;

    this.observer.observe(this.win.document.body, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true
    });

    this.win.addEventListener('resize', this.updateHeight.bind(this));
  }
  /**
   * Stop the auto-resizer
   */
  public stopAutoResizer() {
    if (!this.isAutoResizing) return;

    this.isAutoResizing = false;
    this.observer.disconnect();
    this.win.removeEventListener('resize', this.updateHeight.bind(this));
  }

  private updateHeight() {
    const height = this.getHeight();

    if (height === this.previousHeight) {
      return;
    }

    this.setHeight(height);
  }
}
