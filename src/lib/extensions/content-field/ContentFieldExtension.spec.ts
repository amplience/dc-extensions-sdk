import { ClientConnection } from 'message-event-channel';
import { ContentItem } from '../../ContentItem';
import { ContentFieldExtension } from './ContentFieldExtension';
import { Field } from '../../Field';
import { Form } from '../../Form';

describe('ContentFieldExtension', () => {
  it('should create a new instance of ContentFieldExtension', () => {
    const options = {
      window: window,
      connectionTimeout: false,
      timeout: false,
      debug: false
    };
    const connection = new ClientConnection(options);
    const instance = new ContentFieldExtension({ connection, ...options });

    expect(instance).toBeInstanceOf(ContentFieldExtension);
  });

  describe('ContentFieldExtension.setupContext', () => {
    it('should setup up the ContentFieldExtension instance context properties', () => {
      const options = {
        window: window,
        connectionTimeout: false,
        timeout: false,
        debug: false
      };
      const connection = new ClientConnection(options);
      const instance = new ContentFieldExtension({ connection, ...options });
      const context = {
        contentItemId: '12345678-abcd-1234-1234-abcdef123456',
        fieldSchema: {
          title: 'test-field-schema-title',
          type: 'test-field-schema-type',
          description: 'test-field-schema-desc',
          'ui:extension': {}
        },
        params: {
          instance: {},
          installation: {},
          category: 'CONTENT_FIELD',
          hubId: 'abcdef1234567890abcdef12',
          locationHref: 'https://test-extension-location-href'
        },
        locales: {
          default: ['en'],
          available: [{ locale: 'en-gb', language: 'en', country: 'gb', index: 1, selected: true }]
        },
        stagingEnvironment: 'https://test-staging-environment',
        visualisation: 'test-visualization',
        readOnly: true
      };

      instance.setupContext(context);

      expect(instance.contentItem).toBeInstanceOf(ContentItem);
      expect(instance.field).toBeInstanceOf(Field);
      expect(instance.form).toBeInstanceOf(Form);
      expect(instance).toEqual(
        jasmine.objectContaining({
          params: context.params,
          locales: context.locales,
          visualisation: context.visualisation,
          stagingEnvironment: context.stagingEnvironment
        })
      );
    });
  });
});
