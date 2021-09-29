import { isRouteContextObject } from './RouteContextObject';

describe('RouteContextObject', () => {
  describe('isRouteContextObject()', () => {
    it('should return true if a valid route context is given', () => {
      const context = {
        category: 'ROUTE',
        hubId: 'abcdef1234567890abcdef12',
        locationHref: 'https://test-extension-location-href',
        params: {
          installation: {},
          instance: {},
        },
      };
      expect(isRouteContextObject(context)).toBe(true);
    });
    it('should return false if a valid route context is given but wrong category', () => {
      const context = {
        category: 'NOT_ROUTE',
        hubId: 'abcdef1234567890abcdef12',
        locationHref: 'https://test-extension-location-href',
        params: {
          installation: {},
          instance: {},
        },
      };
      expect(isRouteContextObject(context)).toBe(false);
    });
    it('should return false if a invalid route context is given', () => {
      const context = {
        category: 'ROUTE',
        params: {
          installation: {},
          instance: {},
        },
      };
      expect(isRouteContextObject(context)).toBe(false);
    });
  });
});
