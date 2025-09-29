"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var message_event_channel_1 = require("message-event-channel");
var ContentItem_1 = require("../../components/ContentItem");
var ContentEditorExtension_1 = require("./ContentEditorExtension");
var ContentEditorForm_1 = require("../../components/ContentEditorForm");
var ContentReference_1 = require("../../components/ContentReference");
var ContentLink_1 = require("../../components/ContentLink");
var MediaLink_1 = require("../../components/MediaLink");
var Assets_1 = require("../../components/Assets");
describe('ContentEditorExtension', function () {
    var context = {
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
            available: [
                { locale: 'en-gb', language: 'en', country: 'gb', index: 1, selected: true, label: '' },
            ],
        },
        stagingEnvironment: 'https://test-staging-environment',
        visualisation: 'test-visualization',
        readOnly: true,
        hub: { id: 'hubId', name: 'hubName' },
        collapseByDefault: false,
    };
    var options = {
        window: window,
        connectionTimeout: false,
        timeout: false,
        debug: false,
    };
    it('should create a new instance of ContentEditorExtension', function () {
        var connection = new message_event_channel_1.ClientConnection(options);
        var instance = new ContentEditorExtension_1.ContentEditorExtension(__assign({ connection: connection }, options), context);
        expect(instance).toBeInstanceOf(ContentEditorExtension_1.ContentEditorExtension);
    });
    describe('ContentEditorExtension.setupContext', function () {
        it('should setup up the ContentEditorExtension instance context properties', function () {
            var connection = new message_event_channel_1.ClientConnection(options);
            var instance = new ContentEditorExtension_1.ContentEditorExtension(__assign({ connection: connection }, options), context);
            expect(instance.connection).toEqual(connection);
            expect(instance.assets).toBeInstanceOf(Assets_1.Assets);
            expect(instance.mediaLink).toBeInstanceOf(MediaLink_1.MediaLink);
            expect(instance.contentLink).toBeInstanceOf(ContentLink_1.ContentLink);
            expect(instance.contentReference).toBeInstanceOf(ContentReference_1.ContentReference);
            expect(instance.contentItem).toBeInstanceOf(ContentItem_1.ContentItem);
            expect(instance.form).toBeInstanceOf(ContentEditorForm_1.ContentEditorForm);
            expect(instance.params).toEqual(context.params);
            expect(instance.locales).toEqual(context.locales);
            expect(instance.visualisation).toEqual(context.visualisation);
            expect(instance.stagingEnvironment).toEqual(context.stagingEnvironment);
            expect(instance.hub).toEqual(context.hub);
        });
    });
});
//# sourceMappingURL=ContentEditorExtension.spec.js.map