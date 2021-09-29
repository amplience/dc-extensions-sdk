import { ClientConnection } from 'message-event-channel';
import { RouteExtension } from './RouteExtension';

describe('RouteExtension', () => {
  it('should create a new instance of RouteExtension', () => {
    const options = {
      window: window,
      connectionTimeout: false,
      timeout: false,
      debug: false,
    };
    const connection = new ClientConnection(options);
    const instance = new RouteExtension({ connection, ...options });

    expect(instance).toBeInstanceOf(RouteExtension);
  });

  it('should set the context of a RouteExtension', () => {
    const options = {
      window: window,
      connectionTimeout: false,
      timeout: false,
      debug: false,
    };
    const connection = new ClientConnection(options);
    const instance = new RouteExtension({ connection, ...options });
    const context = {
      category: 'ROUTE',
      hubId: 'abcdef1234567890abcdef12',
      locationHref: 'https://test-extension-location-href',
      params: {
        instance: {},
        installation: {
          configParam: 'test-config-param',
        },
      },
    };
    instance.setupContext(context);

    expect(instance.hubId).toEqual(context.hubId);
    expect(instance.locationHref).toEqual(context.locationHref);
    expect(instance.params).toEqual(context.params);
  });
});