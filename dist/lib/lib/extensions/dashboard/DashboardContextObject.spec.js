"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DashboardContextObject_1 = require("./DashboardContextObject");
describe('DashboardContextObject', function () {
    describe('isDashboardContextObject()', function () {
        it('should return true if a valid dashboard context is given', function () {
            var context = {
                category: 'DASHBOARD',
                hubId: 'abcdef1234567890abcdef12',
                hub: { id: 'hubId', name: 'hubName' },
                locationHref: 'https://test-extension-location-href',
                params: {
                    installation: {},
                    instance: {},
                },
            };
            expect(DashboardContextObject_1.isDashboardContextObject(context)).toBe(true);
        });
        it('should return true if hubID provided without hub', function () {
            var context = {
                category: 'DASHBOARD',
                hubId: 'abcdef1234567890abcdef12',
                locationHref: 'https://test-extension-location-href',
                params: {
                    installation: {},
                    instance: {},
                },
            };
            expect(DashboardContextObject_1.isDashboardContextObject(context)).toBe(true);
        });
        it('should return true if hub provided without hubId', function () {
            var context = {
                category: 'DASHBOARD',
                hub: { id: 'hubId', name: 'hubName' },
                locationHref: 'https://test-extension-location-href',
                params: {
                    installation: {},
                    instance: {},
                },
            };
            expect(DashboardContextObject_1.isDashboardContextObject(context)).toBe(true);
        });
        it('should return false if a valid dashboard context is given but wrong category', function () {
            var context = {
                category: 'NOT_DASHBOARD',
                hubId: 'abcdef1234567890abcdef12',
                hub: { id: 'hubId', name: 'hubName' },
                locationHref: 'https://test-extension-location-href',
                params: {
                    installation: {},
                    instance: {},
                },
            };
            expect(DashboardContextObject_1.isDashboardContextObject(context)).toBe(false);
        });
        it('should return false if a invalid dashboard context is given', function () {
            var context = {
                category: 'DASHBOARD',
                params: {
                    installation: {},
                    instance: {},
                },
            };
            expect(DashboardContextObject_1.isDashboardContextObject(context)).toBe(false);
        });
    });
});
//# sourceMappingURL=DashboardContextObject.spec.js.map