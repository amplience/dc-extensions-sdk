import { FRAME } from '../src/lib/Events';
import { Frame } from '../src/lib/Frame';
import { ClientConnection } from 'message-event-channel';
describe('Frame', () => {
  let connection: ClientConnection;
  let body: HTMLBodyElement;

  beforeEach(() => {
    connection = new ClientConnection();
    body = window.document.querySelector('body');
    body.style.margin = '0';
  });

  describe('Frame.constructor()', () => {
    it('should set the FRAME.GET_HEIGHT event', () => {
      const onSpy = spyOn(connection, 'on');
      new Frame(connection);
      expect(onSpy).toHaveBeenCalledTimes(1);
      expect(onSpy).toHaveBeenCalledWith(FRAME.HEIGHT_GET, jasmine.any(Function));
    });

    it('should resolve on load if window is not ready', () => {
      const mockWindow = {
        document: { readyState: false },
        addEventListener: () => {}
      };
      let callBack;
      // @ts-ignore
      spyOn(mockWindow, 'addEventListener').and.callFake((_, cb) => {
        callBack = cb;
        cb();
      });

      // @ts-ignore
      new Frame(connection, mockWindow);

      expect(mockWindow.addEventListener).toHaveBeenCalledWith('load', callBack);
    });

    it('should set the FRAME.GET_HEIGHT event with a method that returns the height', () => {
      const onSpy = spyOn(connection, 'on');
      const frame = new Frame(connection);
      const callback = onSpy.calls.argsFor(0)[1];
      callback(null, height => {
        expect(typeof height === 'number').toBeTruthy();
        expect(height).toEqual(frame.getHeight());
      });
    });
  });

  describe('Frame.getHeight()', () => {
    it('should return the height of the body', () => {
      const frame: Frame = new Frame(connection);
      body.style.height = '100px';
      const height: number = frame.getHeight();
      expect(height).toEqual(body.clientHeight);
      expect(height).toEqual(100);
      body.style.height = null;
    });
    it('should return 0 if window does not have a body', () => {
      const frame: Frame = new Frame(connection);
      //@ts-ignore
      frame.win = { document: {} };
      const height = frame.getHeight();
      expect(height).toEqual(0);
    });
  });

  describe('Frame.setHeight()', () => {
    it('should trigger a FRAME.HEIGHT_SET event with the body height', () => {
      const frame: Frame = new Frame(connection);
      const onSpy = spyOn(connection, 'emit');
      body.style.height = '100px';
      frame.setHeight();
      expect(onSpy).toHaveBeenCalledTimes(1);
      expect(onSpy).toHaveBeenCalledWith(FRAME.HEIGHT_SET, 100);
    });

    it('should send value 1', () => {
      const frame: Frame = new Frame(connection);
      const onSpy = spyOn(connection, 'emit');
      frame.setHeight(1);
      expect(onSpy).toHaveBeenCalledTimes(1);
      expect(onSpy).toHaveBeenCalledWith(FRAME.HEIGHT_SET, 1);
    });

    it('should send value 0', () => {
      const frame: Frame = new Frame(connection);
      const onSpy = spyOn(connection, 'emit');
      frame.setHeight(0);
      expect(onSpy).toHaveBeenCalledTimes(1);
      expect(onSpy).toHaveBeenCalledWith(FRAME.HEIGHT_SET, 0);
    });

    it('should send value 0 when passed a negative number', () => {
      const frame: Frame = new Frame(connection);
      const onSpy = spyOn(connection, 'emit');
      frame.setHeight(-100);
      expect(onSpy).toHaveBeenCalledTimes(1);
      expect(onSpy).toHaveBeenCalledWith(FRAME.HEIGHT_SET, 0);
    });

    it('should throw an exception when not passed a numeric value', done => {
      const frame: Frame = new Frame(connection);
      const onSpy = spyOn(connection, 'emit');
      try {
        frame.setHeight(('bananas' as unknown) as number);
      } catch (e) {
        expect(e.message).toEqual('setHeight() only accepts an optional number argument');
        expect(onSpy).not.toHaveBeenCalled();
        done();
      }
    });

    it('should throw an exception when passed an HTML element', done => {
      const frame: Frame = new Frame(connection);
      const emitSpy = spyOn(connection, 'emit');
      try {
        frame.setHeight((body as unknown) as number);
      } catch (e) {
        expect(e.message).toEqual('setHeight() only accepts an optional number argument');
        expect(emitSpy).not.toHaveBeenCalled();
        done();
      }
    });
  });

  describe('Frame.startAutoResizer()', () => {
    it('should start auto resizer', done => {
      const frame: Frame = new Frame(connection);
      body.style.height = '0px';
      const emitSpy = spyOn(connection, 'emit');
      frame.startAutoResizer();
      body.style.height = '100px';
      setTimeout(() => {
        expect(frame.isAutoResizing).toEqual(true);
        expect(emitSpy).toHaveBeenCalledWith(FRAME.HEIGHT_SET, 100);
        done();
      });
    });
    it('should not do anything if autoResizing is true', () => {
      const frame: Frame = new Frame(connection);
      spyOn(window, 'addEventListener');
      frame.isAutoResizing = true;
      frame.startAutoResizer();
      expect(window.addEventListener).not.toHaveBeenCalled();
    });
  });

  describe('Frame.stopAutoResizer()', () => {
    it('should stop auto resizer', () => {
      const frame: Frame = new Frame(connection);
      const eventHandlerSpy = spyOn(window, 'removeEventListener');
      frame.startAutoResizer();
      expect(frame.isAutoResizing).toEqual(true);
      frame.stopAutoResizer();
      expect(frame.isAutoResizing).toEqual(false);
      expect(eventHandlerSpy).toHaveBeenCalled();
    });
    it('should not do anything if autoResiszing is false', () => {
      const frame: Frame = new Frame(connection);
      spyOn(window, 'removeEventListener');
      frame.isAutoResizing = false;
      frame.stopAutoResizer();
      expect(window.removeEventListener).not.toHaveBeenCalled();
    });
  });

  describe('Frame.updateHeight()', () => {
    it('should set a new height', () => {
      const frame: Frame = new Frame(connection);
      // @ts-ignore
      spyOn(frame, 'getHeight').and.returnValue(10);
      spyOn(frame, 'setHeight');
      // @ts-ignore
      frame.previousHeight = 20;
      //@ts-ignore
      frame.updateHeight();
      expect(frame.setHeight).toHaveBeenCalledWith(10);
    });
    it('should not set a new height if the height has not changed', () => {
      const frame: Frame = new Frame(connection);
      // @ts-ignore
      spyOn(frame, 'getHeight').and.returnValue(10);
      spyOn(frame, 'setHeight');
      // @ts-ignore
      frame.previousHeight = 10;
      //@ts-ignore
      frame.updateHeight();
      expect(frame.setHeight).not.toHaveBeenCalled();
    });
  });
});
