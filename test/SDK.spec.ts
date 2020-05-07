import { SDK } from '../src/lib/SDK';

let contextObject = {
  contentItemId: '',
  fieldSchema: {},
  params: {},
  locales: {
    default: ['en-GB'],
    available: ['en-GB', 'fr-Fr']
  },
  stagingEnvironment: {
    src: '',
    domain: ''
  },
  visualisation: ''
};

describe('SDK', () => {
  it('init() should retrun a promise', () => {
    const sdk = new SDK();
    const p = sdk.init().catch(e => ({}));
    expect(p instanceof Promise).toBeTruthy();
  });

  it('init() should reject the promise when it times out', async done => {
    const sdk = new SDK({ connectionTimeout: 1 });
    try {
      await sdk.init();
    } catch (e) {
      expect(e.message).toEqual('Failed to establish connection to DC Application');
      done();
    }
  });

  it('init() should reject if it fails to retrieve the context object', async done => {
    const sdk = new SDK();
    const p = new Promise((resolve, reject) => {
      reject();
    });
    spyOn(sdk.connection, 'request').and.returnValue(p);
    const cOn = spyOn(sdk.connection, 'on');
    sdk
      .init()
      .then(() => ({}))
      .catch(e => {
        expect(e.message).toEqual('Failed to fetch context for UI Extension');
        done();
      });
    const fnCall = cOn.calls.argsFor(0)[1] as Function;
    fnCall();
  });

  it('init() should return sdk instance if it completes', async done => {
    const sdk = new SDK({ debug: false });
    const p = new Promise((resolve, reject) => {
      resolve(contextObject);
    });
    spyOn(sdk.connection, 'request').and.returnValue(p);
    const cOn = spyOn(sdk.connection, 'on');
    sdk
      .init()
      .then(sdkInstance => {
        expect(sdkInstance instanceof SDK).toBeTruthy();
        done();
      })
      .catch(e => ({}));
    const fnCall = cOn.calls.argsFor(0)[1] as Function;
    fnCall();
  });
});
