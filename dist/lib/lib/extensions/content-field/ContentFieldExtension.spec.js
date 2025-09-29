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
var ContentFieldExtension_1 = require("./ContentFieldExtension");
var Field_1 = require("../../components/Field");
var Form_1 = require("../../components/Form");
var Frame_1 = require("../../components/Frame");
var ContentReference_1 = require("../../components/ContentReference");
var ContentLink_1 = require("../../components/ContentLink");
var MediaLink_1 = require("../../components/MediaLink");
var Assets_1 = require("../../components/Assets");
describe('ContentFieldExtension', function () {
    var options = {
        window: window,
        connectionTimeout: false,
        timeout: false,
        debug: false,
    };
    var context = {
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
        locationHref: '#!',
        stagingEnvironment: 'https://test-staging-environment',
        visualisation: 'test-visualization',
        readOnly: true,
        hub: { id: 'hubId', name: 'hubName' },
        collapseByDefault: false,
    };
    it('should create a new instance of ContentFieldExtension', function () {
        var connection = new message_event_channel_1.ClientConnection(options);
        var instance = new ContentFieldExtension_1.ContentFieldExtension(__assign({ connection: connection }, options), context);
        expect(instance).toBeInstanceOf(ContentFieldExtension_1.ContentFieldExtension);
    });
    describe('ContentFieldExtension.setupContext', function () {
        it('should setup up the ContentFieldExtension instance context properties', function () {
            var connection = new message_event_channel_1.ClientConnection(options);
            var instance = new ContentFieldExtension_1.ContentFieldExtension(__assign({ connection: connection }, options), context);
            expect(instance.connection).toEqual(connection);
            expect(instance.mediaLink).toBeInstanceOf(MediaLink_1.MediaLink);
            expect(instance.contentLink).toBeInstanceOf(ContentLink_1.ContentLink);
            expect(instance.contentReference).toBeInstanceOf(ContentReference_1.ContentReference);
            expect(instance.frame).toBeInstanceOf(Frame_1.Frame);
            expect(instance.assets).toBeInstanceOf(Assets_1.Assets);
            expect(instance.contentItem).toBeInstanceOf(ContentItem_1.ContentItem);
            expect(instance.field).toBeInstanceOf(Field_1.Field);
            expect(instance.form).toBeInstanceOf(Form_1.Form);
            expect(instance.params).toEqual(context.params);
            expect(instance.locales).toEqual(context.locales);
            expect(instance.visualisation).toEqual(context.visualisation);
            expect(instance.stagingEnvironment).toEqual(context.stagingEnvironment);
        });
    });
});
//# sourceMappingURL=ContentFieldExtension.spec.js.map