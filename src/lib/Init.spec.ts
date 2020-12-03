import { init } from './init';
import { ClientConnection, MC_EVENTS } from 'message-event-channel';
import { extensionFactory } from './extensions/ExtensionFactory';
import { EXTENSION } from './Errors';

jest.mock('message-event-channel');
jest.mock('./extensions/ExtensionFactory');

describe('init', () => {
  const mockedConnection = {
    init: jest.fn(),
    on: jest.fn(),
    request: jest.fn(),
  };

  beforeAll(() => {
    (ClientConnection as jest.Mock).mockImplementation(() => {
      return mockedConnection;
    });
  });

  beforeEach(() => jest.clearAllMocks());

  it('should return a promise', () => {
    const sdk = init();
    expect(sdk instanceof Promise).toBeTruthy();
  });

  it('should reject the promise when it times out', async () => {
    mockedConnection.on.mockImplementation((event, handler) => {
      if (event === MC_EVENTS.CONNECTION_TIMEOUT) {
        handler();
      }
    });

    await expect(init()).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Failed to establish connection to DC Application"`
    );
  });

  it('should be able to accept no options and use defaults', async () => {
    mockedConnection.on.mockImplementation((event, handler) => {
      if (event === MC_EVENTS.CONNECTION_TIMEOUT) {
        handler();
      }
    });

    await expect(init()).rejects.toBeTruthy();
    expect(ClientConnection).toHaveBeenCalledWith({
      window: window,
      connectionTimeout: false,
      timeout: false,
      debug: false,
    });
  });

  it('should be able to accept options', async () => {
    mockedConnection.on.mockImplementation((event, handler) => {
      if (event === MC_EVENTS.CONNECTION_TIMEOUT) {
        handler();
      }
    });
    const options = {
      window: ({} as unknown) as Window,
      connectionTimeout: 1,
      timeout: 2,
      debug: true,
    };

    await expect(init(options)).rejects.toBeTruthy();
    expect(ClientConnection).toHaveBeenCalledWith(options);
  });

  it('should reject if it fails to retrieve the context object fails', async () => {
    mockedConnection.on.mockImplementation((event, handler) => {
      if (event === MC_EVENTS.CONNECTED) {
        handler();
      }
    });

    mockedConnection.request.mockRejectedValue(new Error('Test'));
    await expect(init()).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Failed to fetch context for UI Extension"`
    );
  });

  it('should reject if the call to extensionFactory() fails', async () => {
    mockedConnection.on.mockImplementation((event, handler) => {
      if (event === MC_EVENTS.CONNECTED) {
        handler();
      }
    });

    mockedConnection.request.mockReturnValue({});
    (extensionFactory as jest.Mock).mockImplementation(() => {
      throw new Error(EXTENSION.UNSUPPORTED_EXTENSION);
    });

    await expect(init()).rejects.toThrowErrorMatchingInlineSnapshot(`"Unsupported extension"`);
  });

  it('should resolve the extension from the extensionFactory()', async () => {
    mockedConnection.on.mockImplementation((event, handler) => {
      if (event === MC_EVENTS.CONNECTED) {
        handler();
      }
    });

    const fakeContext = { params: { instance: {}, installation: {} } };
    mockedConnection.request.mockReturnValue(fakeContext);

    (extensionFactory as jest.Mock).mockReturnValue({});

    await expect(init()).resolves.toEqual({});

    expect(extensionFactory).toBeCalledWith(fakeContext, {
      connection: mockedConnection,
      window: window,
      connectionTimeout: false,
      timeout: false,
      debug: false,
    });
  });
});
