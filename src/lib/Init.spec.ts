import { init } from './init';

describe('init', () => {
  it('should retrun a promise', () => {
    const sdk = init();
    expect(sdk instanceof Promise).toBeTruthy();
  });

  it('should reject the promise when it times out', async done => {
    try {
      await init({ connectionTimeout: 1 });
    } catch (e) {
      expect(e.message).toEqual('Failed to establish connection to DC Application');
      done();
    }
  });

  it('should be able to accept options', async done => {
    try {
      jest.spyOn(console, 'log').mockReturnValue(undefined);
      await init({ debug: true, connectionTimeout: 1 });
      expect(console.log).toHaveBeenCalled();
    } catch (e) {
      expect(e.message).toEqual('Failed to establish connection to DC Application');
      done();
    }
  });
});
