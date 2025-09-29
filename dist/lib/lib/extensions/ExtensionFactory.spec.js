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
var ContentFieldExtension_1 = require("./content-field/ContentFieldExtension");
var DashboardExtension_1 = require("./dashboard/DashboardExtension");
var ExtensionFactory_1 = require("./ExtensionFactory");
describe('ExtensionFactory', function () {
    it('should return a content field extension', function () {
        var options = {
            window: window,
            connectionTimeout: false,
            timeout: false,
            debug: false,
        };
        var connection = new message_event_channel_1.ClientConnection(options);
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
                installation: {},
                instance: {},
            },
            locales: {
                default: ['en'],
                available: [
                    {
                        locale: 'en-GB',
                        language: 'en',
                        country: 'gb',
                        index: 1,
                        selected: true,
                    },
                ],
            },
            stagingEnvironment: 'https://test-staging-environment',
            visualisation: 'test-visualization',
            readOnly: true,
            hub: { id: 'id', name: 'name' },
        };
        expect(ExtensionFactory_1.extensionFactory(context, __assign({ connection: connection }, options))).toBeInstanceOf(ContentFieldExtension_1.ContentFieldExtension);
    });
    it('should return a dashboard extension', function () {
        var options = {
            window: window,
            connectionTimeout: false,
            timeout: false,
            debug: false,
        };
        var connection = new message_event_channel_1.ClientConnection(options);
        var context = {
            category: 'DASHBOARD',
            hubId: 'abcdef1234567890abcdef12',
            hub: { id: 'hubId', name: 'hubName' },
            locationHref: 'https://test-extension-location-href',
            params: {
                instance: {},
                installation: {
                    configParam: 'test-config-param',
                },
            },
        };
        expect(ExtensionFactory_1.extensionFactory(context, __assign({ connection: connection }, options))).toBeInstanceOf(DashboardExtension_1.DashboardExtension);
    });
    it('should throw an error when extension context is not recognised', function () {
        var options = {
            window: window,
            connectionTimeout: false,
            timeout: false,
            debug: false,
        };
        var connection = new message_event_channel_1.ClientConnection(options);
        var context = {
            category: 'UNKNOWN_CATEGORY',
            hub: { id: 'hubId', name: 'hubName' },
            params: { installation: {} },
        };
        expect(function () {
            return ExtensionFactory_1.extensionFactory(context, __assign({ connection: connection }, options));
        }).toThrowError('Unsupported extension');
    });
});
//# sourceMappingURL=ExtensionFactory.spec.js.map