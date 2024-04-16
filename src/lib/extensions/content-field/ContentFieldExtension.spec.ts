import { ClientConnection } from 'message-event-channel';
import { ContentItem } from '../../components/ContentItem';
import { ContentFieldExtension } from './ContentFieldExtension';
import { Field } from '../../components/Field';
import { Form } from '../../components/Form';
import { Frame } from '../../components/Frame';
import { ContentReference } from '../../components/ContentReference';
import { ContentLink } from '../../components/ContentLink';
import { MediaLink } from '../../components/MediaLink';
import { Assets } from '../../components/Assets';

describe('ContentFieldExtension', () => {
  const options = {
    window: window,
    connectionTimeout: false,
    timeout: false,
    debug: false,
  };
  const context = {
    category: 'CONTENT_FIELD',
    contentItemId: '12345678-abcd-1234-1234-abcdef123456',
    fieldSchema: {
      title: 'test-field-schema-title',
      type: 'test-field-schema-type',
      description: 'test-field-schema-desc',
      'ui:extension': {},
    },
    params: {
      instance: {},
      installation: {},
      category: 'CONTENT_FIELD',
      hubId: 'abcdef1234567890abcdef12',
      locationHref: 'https://test-extension-location-href',
    },
    locales: {
      default: ['en'],
      available: [
        { locale: 'en-gb', language: 'en', country: 'gb', index: 1, selected: true, label: '' },
      ],
    },
    stagingEnvironment: 'https://test-staging-environment',
    visualisation: 'test-visualization',
    readOnly: true,
    hub: { id: 'hubId', name: 'hubName' },
    collaspseByDefault: false,
  };
  it('should create a new instance of ContentFieldExtension', () => {
    const connection = new ClientConnection(options);
    const instance = new ContentFieldExtension({ connection, ...options }, context);

    expect(instance).toBeInstanceOf(ContentFieldExtension);
  });

  describe('ContentFieldExtension.setupContext', () => {
    it('should setup up the ContentFieldExtension instance context properties', () => {
      const connection = new ClientConnection(options);
      const instance = new ContentFieldExtension({ connection, ...options }, context);

      expect(instance.connection).toEqual(connection);

      expect(instance.mediaLink).toBeInstanceOf(MediaLink);
      expect(instance.contentLink).toBeInstanceOf(ContentLink);
      expect(instance.contentReference).toBeInstanceOf(ContentReference);
      expect(instance.frame).toBeInstanceOf(Frame);

      expect(instance.assets).toBeInstanceOf(Assets);
      expect(instance.contentItem).toBeInstanceOf(ContentItem);
      expect(instance.field).toBeInstanceOf(Field);
      expect(instance.form).toBeInstanceOf(Form);
      expect(instance.params).toEqual(context.params);
      expect(instance.locales).toEqual(context.locales);
      expect(instance.visualisation).toEqual(context.visualisation);
      expect(instance.stagingEnvironment).toEqual(context.stagingEnvironment);
    });
  });
});
