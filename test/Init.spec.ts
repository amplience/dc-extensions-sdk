import { init } from '../src/lib/init';

describe('init', () => {
  it('should retrun a promise', () => {
    const sdk = init();
    expect(sdk instanceof Promise).toBeTruthy();
  });

  it('should reject the promise when it times out', async done => {
    try {
      await init();
    } catch (e) {
      expect(e.message).toEqual('Failed to establish connection to DC Application');
      done();
    }
  });
});
