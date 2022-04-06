import { isDashboardContextObject } from './DashboardContextObject';

describe('DashboardContextObject', () => {
  describe('isDashboardContextObject()', () => {
    it('should return true if a valid dashboard context is given', () => {
      const context = {
        category: 'DASHBOARD',
        hubId: 'abcdef1234567890abcdef12',
        hub: { id: 'hubId', name: 'hubName' },
        locationHref: 'https://test-extension-location-href',
        params: {
          installation: {},
          instance: {},
        },
      };
      expect(isDashboardContextObject(context)).toBe(true);
    });

    it('should return true if hubID provided without hub', () => {
      const context = {
        category: 'DASHBOARD',
        hubId: 'abcdef1234567890abcdef12',
        locationHref: 'https://test-extension-location-href',
        params: {
          installation: {},
          instance: {},
        },
      };
      expect(isDashboardContextObject(context)).toBe(true);
    });
    it('should return true if hub provided without hubId', () => {
      const context = {
        category: 'DASHBOARD',
        hub: { id: 'hubId', name: 'hubName' },
        locationHref: 'https://test-extension-location-href',
        params: {
          installation: {},
          instance: {},
        },
      };
      expect(isDashboardContextObject(context)).toBe(true);
    });

    it('should return false if a valid dashboard context is given but wrong category', () => {
      const context = {
        category: 'NOT_DASHBOARD',
        hubId: 'abcdef1234567890abcdef12',
        hub: { id: 'hubId', name: 'hubName' },
        locationHref: 'https://test-extension-location-href',
        params: {
          installation: {},
          instance: {},
        },
      };
      expect(isDashboardContextObject(context)).toBe(false);
    });
    it('should return false if a invalid dashboard context is given', () => {
      const context = {
        category: 'DASHBOARD',
        params: {
          installation: {},
          instance: {},
        },
      };
      expect(isDashboardContextObject(context)).toBe(false);
    });
  });
});
