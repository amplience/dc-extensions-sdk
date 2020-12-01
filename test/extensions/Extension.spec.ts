import { isContextObject } from '../../src/lib/extensions/Extension';

describe('Extension', () => {
  describe('isContextObject', () => {
    it('should return true when passed a valid context object', () => {
      const context = {
        category: 'TEST_EXTENSION_CATEGORY',
        hubId: 'abcdef1234567890abcdef12',
        locationHref: 'https://test-extension-location-href'
      };
      expect(isContextObject(context)).toBe(true);
    });
    it('should return false when context object is missing a category', () => {
      const context = {
        hubId: 'abcdef1234567890abcdef12',
        locationHref: 'https://test-extension-location-href'
      };
      expect(isContextObject(context)).toBe(false);
    });
    it('should return false when context object is missing a hub id', () => {
      const context = {
        category: 'TEST_EXTENSION_CATEGORY',
        locationHref: 'https://test-extension-location-href'
      };
      expect(isContextObject(context)).toBe(false);
    });
    it('should return false when context object is missing a category', () => {
      const context = {
        category: 'TEST_EXTENSION_CATEGORY',
        hubId: 'abcdef1234567890abcdef12'
      };
      expect(isContextObject(context)).toBe(false);
    });
  });
});
