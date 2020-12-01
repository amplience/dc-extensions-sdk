import { isContentFieldContextObject } from '../../../src/lib/extensions/content-field/ContentFieldContextObject';

describe('ContentFieldContextObject', () => {
  describe('isContentFieldContextObject', () => {
    it('should return true with a valid content field context', () => {
      const context = {
        category: 'CONTENT_FIELD',
        hubId: 'abcdef1234567890abcdef12',
        locationHref: 'https://test-extension-location-href',
        contentItemId: '12345678-abcd-1234-1234-abcdef123456',
        fieldSchema: {
          title: 'test-field-schema-title',
          type: 'test-field-schema-type',
          description: 'test-field-schema-desc',
          'ui:extension': {}
        },
        params: {},
        locales: {
          default: ['en']
        },
        stagingEnvironment: 'https://test-staging-environment',
        visualisation: 'test-visualization',
        readOnly: true
      };

      expect(isContentFieldContextObject(context)).toBe(true);
    });

    it('should return false when context category is not `CONTENT_FIELD`', () => {
      const context = {
        category: 'NOT_CONTENT_FIELD',
        hubId: 'abcdef1234567890abcdef12',
        locationHref: 'https://test-extension-location-href',
        contentItemId: '12345678-abcd-1234-1234-abcdef123456',
        fieldSchema: {
          title: 'test-field-schema-title',
          type: 'test-field-schema-type',
          description: 'test-field-schema-desc',
          'ui:extension': {}
        },
        params: {},
        locales: {
          default: ['en']
        },
        stagingEnvironment: 'https://test-staging-environment',
        visualisation: 'test-visualization',
        readOnly: true
      };

      expect(isContentFieldContextObject(context)).toBe(false);
    });

    it('should return false when context does not contain content field properties`', () => {
      const context = {
        category: 'CONTENT_FIELD',
        hubId: 'abcdef1234567890abcdef12',
        locationHref: 'https://test-extension-location-href'
      };

      expect(isContentFieldContextObject(context)).toBe(false);
    });
  });
});
