import { ClientConnection } from 'message.io';
import { FRAME } from './Events';
export class Frame {
  constructor(private connection: ClientConnection, private window: Window) {
    this.connection.on(FRAME.HEIGHT_GET, (_payload: any, resolve: Function, _reject: Function) => {
      resolve(this.getHeight());
    });
  }

  public getHeight(): number {
    const body = this.window.document.querySelector('body');
    let height = 0;
    if (body) {
      height = body.clientHeight;
    }
    return height;
  }

  public setHeight() {
    this.connection.emit(FRAME.HEIGHT_SET, this.getHeight());
  }

  public startAutoResizer() {
    this.connection.emit(FRAME.AUTO_RESIZER_START);
  }

  public stopAutoResizer() {
    this.connection.emit(FRAME.AUTO_RESIZER_STOP);
  }
}
