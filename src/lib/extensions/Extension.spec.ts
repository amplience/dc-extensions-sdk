import { isContextObject } from './Extension';

describe('Extension', () => {
  describe('isContextObject', () => {
    it('should return true when passed a valid context object', () => {
      const context = {
        params: {
          installation: {},
          instance: {},
          category: 'TEST_EXTENSION_CATEGORY',
          hubId: 'abcdef1234567890abcdef12',
          locationHref: 'https://test-extension-location-href'
        }
      };
      expect(isContextObject(context)).toBe(true);
    });
    it('should return false when context object is missing isntance params', () => {
      const context = {
        params: {
          installation: {},
          category: 'TEST_EXTENSION_CATEGORY',
          hubId: 'abcdef1234567890abcdef12',
          locationHref: 'https://test-extension-location-href'
        }
      };
      expect(isContextObject(context)).toBe(false);
    });
    it('should return false when context object is missing installation params', () => {
      const context = {
        params: {
          instance: {},
          category: 'TEST_EXTENSION_CATEGORY',
          hubId: 'abcdef1234567890abcdef12',
          locationHref: 'https://test-extension-location-href'
        }
      };
      expect(isContextObject(context)).toBe(false);
    });
  });
});
