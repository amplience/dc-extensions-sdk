"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseNavigator = void 0;
var LocationHref_1 = require("../constants/LocationHref");
var Errors_1 = require("../constants/Errors");
var BaseNavigator = /** @class */ (function () {
    function BaseNavigator(locationHref, window) {
        this.locationHref = locationHref;
        this.window = window;
    }
    BaseNavigator.prototype.navigate = function (templatedUri, options) {
        if (options === void 0) { options = {}; }
        var base = this.getBaseHref();
        return this.processHref("" + base + templatedUri, options);
    };
    BaseNavigator.prototype.processHref = function (href, options) {
        if (options === void 0) { options = {}; }
        if (options.returnHref) {
            return href;
        }
        this.window.parent.location.href = href;
    };
    BaseNavigator.prototype.getBaseHref = function () {
        if (this.locationHref.indexOf(LocationHref_1.LOCATION_HREF.HASH_BANG) === -1) {
            throw new Error(Errors_1.APPLICATION_NAVIGATOR.MUST_INCLUDE_HASH_BANG);
        }
        var _a = this.locationHref.split(LocationHref_1.LOCATION_HREF.HASH_BANG), baseUrl = _a[0], hash = _a[1];
        var hubName = hash.split('/')[1];
        return "" + baseUrl + LocationHref_1.LOCATION_HREF.HASH_BANG + "/" + hubName;
    };
    return BaseNavigator;
}());
exports.BaseNavigator = BaseNavigator;
//# sourceMappingURL=BaseNavigator.js.map