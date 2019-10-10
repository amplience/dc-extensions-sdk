import { FRAME } from '../src/lib/Events';
import { Frame } from '../src/lib/Frame';
import { ClientConnection } from 'message.io';
describe('Frame', () => {
  let connection: ClientConnection;
  let body: HTMLBodyElement;

  beforeEach(() => {
    connection = new ClientConnection();
    body = window.document.querySelector('body');
    body.style.margin = '0';
  });

  it('Constructor should set the FAME.GET_HEIGHT event', () => {
    const onSpy = spyOn(connection, 'on');
    const frame = new Frame(connection);
    expect(onSpy).toHaveBeenCalledTimes(1);
    expect(onSpy).toHaveBeenCalledWith(FRAME.HEIGHT_GET, jasmine.any(Function));
  });

  it('Constructor should set the FAME.GET_HEIGHT event with a method that returns the height', () => {
    const onSpy = spyOn(connection, 'on');
    const frame = new Frame(connection);
    const callback = onSpy.calls.argsFor(0)[1];
    callback(null, height => {
      expect(typeof height === 'number').toBeTruthy();
      expect(height).toEqual(frame.getHeight());
    });
  });

  it('getHeight() returns the height of the body', () => {
    const frame: Frame = new Frame(connection);
    body.style.height = '100px';
    const height: number = frame.getHeight();
    expect(height).toEqual(body.clientHeight);
    expect(height).toEqual(100);
    body.style.height = null;
  });

  it('setHeight() triggers a FRAME.HEIGHT_SET event with the body height', () => {
    const frame: Frame = new Frame(connection);
    const onSpy = spyOn(connection, 'emit');
    body.style.height = '100px';
    frame.setHeight();
    expect(onSpy).toHaveBeenCalledTimes(1);
    expect(onSpy).toHaveBeenCalledWith(FRAME.HEIGHT_SET, 100);
  });

  it('setHeight(1) sends value 1', () => {
    const frame: Frame = new Frame(connection);
    const onSpy = spyOn(connection, 'emit');
    frame.setHeight(1);
    expect(onSpy).toHaveBeenCalledTimes(1);
    expect(onSpy).toHaveBeenCalledWith(FRAME.HEIGHT_SET, 1);
  });

  it('setHeight(0) sends value 0', () => {
    const frame: Frame = new Frame(connection);
    const onSpy = spyOn(connection, 'emit');
    frame.setHeight(0);
    expect(onSpy).toHaveBeenCalledTimes(1);
    expect(onSpy).toHaveBeenCalledWith(FRAME.HEIGHT_SET, 0);
  });

  it('setHeight(-100) sends value 0', () => {
    const frame: Frame = new Frame(connection);
    const onSpy = spyOn(connection, 'emit');
    frame.setHeight(-100);
    expect(onSpy).toHaveBeenCalledTimes(1);
    expect(onSpy).toHaveBeenCalledWith(FRAME.HEIGHT_SET, 0);
  });

  it('setHeight("bananas") throws exception', done => {
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

  it('setHeight(<HTMLBodyElement>) throws exception', done => {
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

  it('startAutoResizer()', () => {
    const frame: Frame = new Frame(connection);
    const emitSpy = spyOn(connection, 'emit');
    body.style.height = '100px';
    frame.startAutoResizer();
    expect(frame.isAutoResizing).toEqual(true);
    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).toHaveBeenCalledWith(FRAME.HEIGHT_SET, 100);
  });

  it('stopAutoResizer()', () => {
    const frame: Frame = new Frame(connection);
    const eventHandlerSpy = spyOn(window, 'removeEventListener');
    frame.startAutoResizer();
    expect(frame.isAutoResizing).toEqual(true);
    frame.stopAutoResizer();
    expect(frame.isAutoResizing).toEqual(false);
    expect(eventHandlerSpy).toHaveBeenCalled();
  });
});
