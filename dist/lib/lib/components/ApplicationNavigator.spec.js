"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("../constants/Errors");
var ApplicationNavigator_1 = require("./ApplicationNavigator");
describe('ApplicationNavigator', function () {
    it('should error if locationHref does not contain a hash bang (#!)', function () {
        expect(function () {
            return new ApplicationNavigator_1.ApplicationNavigator('http://example.com/', window).openContentLibrary();
        }).toThrowError(Errors_1.APPLICATION_NAVIGATOR.MUST_INCLUDE_HASH_BANG);
    });
    describe('window has a parent window ref', function () {
        var mockWindow;
        var applicationNavigation;
        beforeEach(function () {
            mockWindow = { parent: { location: { href: undefined } } };
            applicationNavigation = new ApplicationNavigator_1.ApplicationNavigator('https://example.com/#!/HUB_NAME/dashboard', mockWindow);
        });
        describe('openEventsCalendar()', function () {
            var expectedUrl = 'https://example.com/#!/HUB_NAME/planning/events/calendar';
            it('should return navigate to the requested route ', function () {
                expect(applicationNavigation.openEventsCalendar()).toBeUndefined();
                expect(mockWindow.parent.location.href).toEqual(expectedUrl);
            });
            it('should open return the href', function () {
                expect(applicationNavigation.openEventsCalendar({ returnHref: true })).toEqual(expectedUrl);
                expect(mockWindow.parent.location.href).toBeUndefined();
            });
        });
        describe('openEventsTimeline()', function () {
            var expectedUrl = 'https://example.com/#!/HUB_NAME/planning/events/timeline';
            it('should return navigate to the requested route ', function () {
                expect(applicationNavigation.openEventsTimeline()).toBeUndefined();
                expect(mockWindow.parent.location.href).toEqual(expectedUrl);
            });
            it('should open return the href', function () {
                expect(applicationNavigation.openEventsTimeline({ returnHref: true })).toEqual(expectedUrl);
                expect(mockWindow.parent.location.href).toBeUndefined();
            });
        });
        describe('openEventsList()', function () {
            var expectedUrl = 'https://example.com/#!/HUB_NAME/planning/events/list';
            it('should return navigate to the requested route ', function () {
                expect(applicationNavigation.openEventsList()).toBeUndefined();
                expect(mockWindow.parent.location.href).toEqual(expectedUrl);
            });
            it('should open return the href', function () {
                expect(applicationNavigation.openEventsList({ returnHref: true })).toEqual(expectedUrl);
                expect(mockWindow.parent.location.href).toBeUndefined();
            });
        });
        describe('openEvent()', function () {
            var expectedUrl = 'https://example.com/#!/HUB_NAME/planning/event/EVENT_ID';
            var eventId = 'EVENT_ID';
            it('should return navigate to the requested route ', function () {
                expect(applicationNavigation.openEvent({ id: eventId })).toBeUndefined();
                expect(mockWindow.parent.location.href).toEqual(expectedUrl);
            });
            it('should open return the href', function () {
                expect(applicationNavigation.openEvent({ id: eventId }, { returnHref: true })).toEqual(expectedUrl);
                expect(mockWindow.parent.location.href).toBeUndefined();
            });
        });
        describe('openEdition()', function () {
            var expectedUrl = 'https://example.com/#!/HUB_NAME/planning/edition/EVENT_ID/EDITION_ID/';
            var edition = {
                id: 'EDITION_ID',
                eventId: 'EVENT_ID',
            };
            it('should return navigate to the requested route ', function () {
                expect(applicationNavigation.openEdition(edition)).toBeUndefined();
                expect(mockWindow.parent.location.href).toEqual(expectedUrl);
            });
            it('should open return the href', function () {
                expect(applicationNavigation.openEdition(edition, { returnHref: true })).toEqual(expectedUrl);
                expect(mockWindow.parent.location.href).toBeUndefined();
            });
        });
        describe('openContentLibrary()', function () {
            var expectedUrl = 'https://example.com/#!/HUB_NAME/authoring/content-items';
            it('should return navigate to the requested route ', function () {
                expect(applicationNavigation.openContentLibrary()).toBeUndefined();
                expect(mockWindow.parent.location.href).toEqual(expectedUrl);
            });
            it('should open return the href', function () {
                expect(applicationNavigation.openContentLibrary({ returnHref: true })).toEqual(expectedUrl);
                expect(mockWindow.parent.location.href).toBeUndefined();
            });
        });
        describe('openContentItem()', function () {
            var expectedUrl = 'https://example.com/#!/HUB_NAME/authoring/content-item/edit/CONTENT_ITEM_ID';
            var contentItem = { id: 'CONTENT_ITEM_ID' };
            it('should return navigate to the requested route ', function () {
                expect(applicationNavigation.openContentItem(contentItem)).toBeUndefined();
                expect(mockWindow.parent.location.href).toEqual(expectedUrl);
            });
            it('should open return the href', function () {
                expect(applicationNavigation.openContentItem(contentItem, { returnHref: true })).toEqual(expectedUrl);
                expect(mockWindow.parent.location.href).toBeUndefined();
            });
        });
    });
});
//# sourceMappingURL=ApplicationNavigator.spec.js.map