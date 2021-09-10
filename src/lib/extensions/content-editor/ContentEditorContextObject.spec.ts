import { isContentEditorContextObject } from './ContentEditorContextObject';

describe('ContentEditorContextObject', () => {
  describe('isContentEditorContextObject', () => {
    it('should return true with a valid content field context', () => {
      const context = {
        category: 'CONTENT_EDITOR',
        contentItemId: '12345678-abcd-1234-1234-abcdef123456',
        schema: {
          title: 'test-field-schema-title',
          type: 'test-field-schema-type',
          description: 'test-field-schema-desc',
          properties: {
            title: {
              type: 'string',
            },
          },
        },
        params: {
          installation: {},
          instance: {},
        },
        locales: {
          default: ['en'],
        },
        stagingEnvironment: 'https://test-staging-environment',
        visualisation: 'test-visualization',
        readOnly: true,
      };

      expect(isContentEditorContextObject(context)).toBe(true);
    });

    it('should return false when context does not contain content field params', () => {
      const context = {
        params: { installation: {}, instance: {} },
      };

      expect(isContentEditorContextObject(context)).toBe(false);
    });
  });
});
