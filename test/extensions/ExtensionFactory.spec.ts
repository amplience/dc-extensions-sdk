import { ClientConnection } from 'message-event-channel';
import { ContentFieldExtension } from '../../src/lib/extensions/content-field/ContentFieldExtension';
import { extensionFactory } from '../../src/lib/extensions/ExtensionFactory';

describe('ExtensionFactory', () => {
  it('should return a content field extension', () => {
    const options = {
      window: window,
      connectionTimeout: false,
      timeout: false,
      debug: false
    };
    const connection = new ClientConnection(options);
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
        default: ['en'],
        available: [
          {
            locale: 'en-GB',
            language: 'en',
            country: 'gb',
            index: 1,
            selected: true
          }
        ]
      },
      stagingEnvironment: 'https://test-staging-environment',
      visualisation: 'test-visualization',
      readOnly: true
    };

    expect(
      extensionFactory<ContentFieldExtension>(context, { connection, ...options })
    ).toBeInstanceOf(ContentFieldExtension);
  });

  it('should throw an error when extension context is not recognised', () => {
    const options = {
      window: window,
      connectionTimeout: false,
      timeout: false,
      debug: false
    };
    const connection = new ClientConnection(options);
    const context = {
      category: 'UNKNOWN_CATEGORY'
    };

    expect(() =>
      extensionFactory<ContentFieldExtension>(context, { connection, ...options })
    ).toThrowError('Unsupported extension');
  });
});
