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
var DashboardExtension_1 = require("./DashboardExtension");
describe('DashboardExtension', function () {
    var context = {
        category: 'DASHBOARD',
        hubId: 'abcdef1234567890abcdef12',
        hub: { id: 'hubid', name: 'hubName' },
        locationHref: 'https://test-extension-location-href',
        params: {
            instance: {},
            installation: {
                configParam: 'test-config-param',
            },
        },
    };
    var options = {
        window: window,
        connectionTimeout: false,
        timeout: false,
        debug: false,
    };
    it('should create a new instance of DashboardExtension', function () {
        var connection = new message_event_channel_1.ClientConnection(options);
        var instance = new DashboardExtension_1.DashboardExtension(__assign({ connection: connection }, options), context);
        expect(instance).toBeInstanceOf(DashboardExtension_1.DashboardExtension);
    });
    it('should set the context of a DashboardExtension', function () {
        var connection = new message_event_channel_1.ClientConnection(options);
        var instance = new DashboardExtension_1.DashboardExtension(__assign({ connection: connection }, options), context);
        expect(instance.hubId).toEqual(context.hubId);
        expect(instance.hub.id).toEqual(context.hub.id);
        expect(instance.hub.name).toEqual(context.hub.name);
        expect(instance.locationHref).toEqual(context.locationHref);
        expect(instance.params).toEqual(context.params);
    });
});
//# sourceMappingURL=DashboardExtension.spec.js.map