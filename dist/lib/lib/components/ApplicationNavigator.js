"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationNavigator = void 0;
var BaseNavigator_1 = require("./BaseNavigator");
var ApplicationNavigator = /** @class */ (function () {
    function ApplicationNavigator(locationHref, window) {
        this.navigationService = new BaseNavigator_1.BaseNavigator(locationHref, window);
    }
    ApplicationNavigator.prototype.openEventsCalendar = function (options) {
        if (options === void 0) { options = {}; }
        return this.navigationService.navigate("/planning/events/calendar", options);
    };
    ApplicationNavigator.prototype.openEventsTimeline = function (options) {
        if (options === void 0) { options = {}; }
        return this.navigationService.navigate("/planning/events/timeline", options);
    };
    ApplicationNavigator.prototype.openEventsList = function (options) {
        if (options === void 0) { options = {}; }
        return this.navigationService.navigate("/planning/events/list", options);
    };
    ApplicationNavigator.prototype.openEvent = function (event, options) {
        if (options === void 0) { options = {}; }
        return this.navigationService.navigate("/planning/event/" + event.id, options);
    };
    ApplicationNavigator.prototype.openEdition = function (edition, options) {
        if (options === void 0) { options = {}; }
        return this.navigationService.navigate("/planning/edition/" + edition.eventId + "/" + edition.id + "/", options);
    };
    ApplicationNavigator.prototype.openContentLibrary = function (options) {
        if (options === void 0) { options = {}; }
        return this.navigationService.navigate("/authoring/content-items", options);
    };
    ApplicationNavigator.prototype.openContentItem = function (contentItem, options) {
        if (options === void 0) { options = {}; }
        return this.navigationService.navigate("/authoring/content-item/edit/" + contentItem.id, options);
    };
    return ApplicationNavigator;
}());
exports.ApplicationNavigator = ApplicationNavigator;
//# sourceMappingURL=ApplicationNavigator.js.map