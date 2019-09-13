import { ClientConnection } from 'message.io';
import { FRAME } from './Events';
export class Frame {
  /**
   * Use in order to control the re-sizing of the Extension
   * @param connection message.io connection
   * @param window override the default window object
   */
  constructor(private connection: ClientConnection, private window: Window) {
    this.connection.on(FRAME.HEIGHT_GET, (_payload: any, resolve: Function, _reject: Function) => {
      resolve(this.getHeight());
    });
  }

  /**
   * Get the height of the Extension
   */
  public getHeight(): number {
    const body = this.window.document.querySelector('body');
    return body ? body.clientHeight : 0;
  }

  /**
   * Set the height of the frame to the height of the Extension. Can optionally override the measured height with a defined value.
   * @param height - should be used if you want to override the calculated height of your extension
   */
  public setHeight(height?: number) {
    this.connection.emit(FRAME.HEIGHT_SET, height === undefined ? this.getHeight() : height);
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
