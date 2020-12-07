import { ClientConnection } from 'message-event-channel';
import { DashboardExtension } from './DashboardExtension';

describe('DashboardExtension', () => {
  it('should create a new instance of DashboardExtension', () => {
    const options = {
      window: window,
      connectionTimeout: false,
      timeout: false,
      debug: false,
    };
    const connection = new ClientConnection(options);
    const instance = new DashboardExtension({ connection, ...options });

    expect(instance).toBeInstanceOf(DashboardExtension);
  });

  it('should set the context of a DashboardExtension', () => {
    const options = {
      window: window,
      connectionTimeout: false,
      timeout: false,
      debug: false,
    };
    const connection = new ClientConnection(options);
    const instance = new DashboardExtension({ connection, ...options });
    const context = {
      category: 'DASHBOARD',
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
