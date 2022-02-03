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
