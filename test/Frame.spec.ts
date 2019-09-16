import { FRAME } from '../src/Events';
import { Frame } from '../src/Frame';
import { ClientConnection } from 'message.io';
describe('Frame', () => {
  var connection: ClientConnection, frame: Frame, body:HTMLBodyElement = window.document.querySelector('body');

  beforeAll(() => {
    connection = new ClientConnection();
  });

  it('Constructor should set the FAME.GET_HEIGHT event', () => {
    const onSpy = spyOn(connection, 'on');
    new Frame(connection);
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

  it('setHeight("bananas") throws exception', (done) => {
    const frame: Frame = new Frame(connection);
    const onSpy = spyOn(connection, 'emit');
    try {
      frame.setHeight('bananas' as unknown as number);
    } catch (e) {
      expect(e.toString()).toEqual('Error: setHeight() only accepts an optional number argument');
      expect(onSpy).not.toHaveBeenCalled();
      done();
    }
  });

  it('setHeight(<HTMLBodyElement>) throws exception', (done) => {
    const frame: Frame = new Frame(connection);
    const emitSpy = spyOn(connection, 'emit');
    try {
      frame.setHeight(body as unknown as number);
    } catch (e) {
      expect(e.toString()).toEqual('Error: setHeight() only accepts an optional number argument');
      expect(emitSpy).not.toHaveBeenCalled();
      done();
    }
  });

  it('startAutoResizer() triggers a FRAME.AUTO_RESIZER_START event', () => {
    const frame: Frame = new Frame(connection);
    const emitSpy = spyOn(connection, 'emit');
    frame.startAutoResizer();
    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).toHaveBeenCalledWith(FRAME.AUTO_RESIZER_START);
  });

  it('stopAutoResizer() triggers a FRAME.AUTO_RESIZER_STOP event', () => {
    const frame: Frame = new Frame(connection);
    const emitSpy = spyOn(connection, 'emit');
    frame.stopAutoResizer();
    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).toHaveBeenCalledWith(FRAME.AUTO_RESIZER_STOP);
  });

});
