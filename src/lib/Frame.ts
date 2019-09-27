import { ClientConnection } from 'message.io';

import { FRAME } from './Events';
import { ERRORS_FRAME } from './Errors';
export class Frame {
  frameLoaded: boolean = false;
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
    alert('HELLLLLOOOOO');
    this.connection.on(FRAME.HEIGHT_GET, async (_payload: any, resolve: Function) => {
      await frameLoaded;
      alert('loaded');
      resolve(this.getHeight());
    });
  }

  /**
   * Get the height of the Extension
   */
  public getHeight(): number {
    const doc = this.win.document.querySelector('html');
    return doc ? doc.clientHeight : 0;
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

    this.connection.emit(FRAME.HEIGHT_SET, h < 0 ? 0 : h);
  }

  /**
   * Start the auto-resizer
   */
  public startAutoResizer() {
    this.connection.emit(FRAME.AUTO_RESIZER_START);
  }
  /**
   * Stop the auto-resizer
   */
  public stopAutoResizer() {
    this.connection.emit(FRAME.AUTO_RESIZER_STOP);
  }
}
