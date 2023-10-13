import { ClientConnection } from 'message-event-channel';
import { ContentItem } from '../../components/ContentItem';
import { ContentEditorExtension } from './ContentEditorExtension';
import { Field } from '../../components/Field';
import { ContentEditorForm } from '../../components/ContentEditorForm';
import { Frame } from '../../components/Frame';
import { ContentReference } from '../../components/ContentReference';
import { ContentLink } from '../../components/ContentLink';
import { MediaLink } from '../../components/MediaLink';
import { Assets } from '../../components/Assets';

describe('ContentEditorExtension', () => {
  const context = {
    category: 'CONTENT_EDITOR',
    contentItemId: '12345678-abcd-1234-1234-abcdef123456',
    schema: {
      id: 'http://simple.com',
      $schema: 'http://json-schema.org/draft-07/schema#',
      allOf: [
        {
          $ref: 'http://bigcontent.io/cms/schema/v1/core#/definitions/content',
        },
      ],
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
      instance: {},
      installation: {},
    },
    locales: {
      default: ['en'],
      available: [{ locale: 'en-gb', language: 'en', country: 'gb', index: 1, selected: true }],
    },
    stagingEnvironment: 'https://test-staging-environment',
    visualisation: 'test-visualization',
    readOnly: true,
    hub: { id: 'hubId', name: 'hubName' },
  };

  const options = {
    window: window,
    connectionTimeout: false,
    timeout: false,
    debug: false,
  };

  it('should create a new instance of ContentEditorExtension', () => {
    const connection = new ClientConnection(options);
    const instance = new ContentEditorExtension({ connection, ...options }, context);

    expect(instance).toBeInstanceOf(ContentEditorExtension);
  });

  describe('ContentEditorExtension.setupContext', () => {
    it('should setup up the ContentEditorExtension instance context properties', () => {
      const connection = new ClientConnection(options);
      const instance = new ContentEditorExtension({ connection, ...options }, context);

      expect(instance.connection).toEqual(connection);

      expect(instance.assets).toBeInstanceOf(Assets);
      expect(instance.mediaLink).toBeInstanceOf(MediaLink);
      expect(instance.contentLink).toBeInstanceOf(ContentLink);
      expect(instance.contentReference).toBeInstanceOf(ContentReference);
      expect(instance.contentItem).toBeInstanceOf(ContentItem);
      expect(instance.form).toBeInstanceOf(ContentEditorForm);
      expect(instance.params).toEqual(context.params);
      expect(instance.locales).toEqual(context.locales);
      expect(instance.visualisation).toEqual(context.visualisation);
      expect(instance.stagingEnvironment).toEqual(context.stagingEnvironment);
      expect(instance.hub).toEqual(context.hub);
    });
  });
});
