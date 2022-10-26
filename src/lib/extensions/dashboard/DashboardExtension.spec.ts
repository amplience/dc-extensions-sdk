import { ClientConnection } from 'message-event-channel';
import { DashboardExtension } from './DashboardExtension';

describe('DashboardExtension', () => {
  const context = {
    category: 'DASHBOARD',
    hubId: 'abcdef1234567890abcdef12',
    hub: { id: 'hubid', name: 'hubName' },
    locationHref: 'https://test-extension-location-href',
    params: {
      instance: {},
      installation: {
        configParam: 'test-config-param',
      },
    },
  };
  const options = {
    window: window,
    connectionTimeout: false,
    timeout: false,
    debug: false,
  };
  it('should create a new instance of DashboardExtension', () => {
    const connection = new ClientConnection(options);
    const instance = new DashboardExtension({ connection, ...options }, context);

    expect(instance).toBeInstanceOf(DashboardExtension);
  });

  it('should set the context of a DashboardExtension', () => {
    const connection = new ClientConnection(options);
    const instance = new DashboardExtension({ connection, ...options }, context);

    expect(instance.hubId).toEqual(context.hubId);
    expect(instance.hub.id).toEqual(context.hub.id);
    expect(instance.hub.name).toEqual(context.hub.name);
    expect(instance.locationHref).toEqual(context.locationHref);
    expect(instance.params).toEqual(context.params);
  });
});
