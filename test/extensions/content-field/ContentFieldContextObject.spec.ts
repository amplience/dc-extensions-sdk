import { isContentFieldContextObject } from '../../../src/lib/extensions/content-field/ContentFieldContextObject';

describe('ContentFieldContextObject', () => {
  describe('isContentFieldContextObject', () => {
    it('should return true with a valid content field context', () => {
      const context = {
        contentItemId: '12345678-abcd-1234-1234-abcdef123456',
        fieldSchema: {
          title: 'test-field-schema-title',
          type: 'test-field-schema-type',
          description: 'test-field-schema-desc',
          'ui:extension': {}
        },
        params: {
          installation: {},
          instance: {}
        },
        locales: {
          default: ['en']
        },
        stagingEnvironment: 'https://test-staging-environment',
        visualisation: 'test-visualization',
        readOnly: true
      };

      expect(isContentFieldContextObject(context)).toBe(true);
    });

    it('should return false when context does not contain content field params', () => {
      const context = {
        params: { installation: {}, instance: {} }
      };

      expect(isContentFieldContextObject(context)).toBe(false);
    });
  });
});
