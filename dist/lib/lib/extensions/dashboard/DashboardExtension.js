"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardExtension = void 0;
var ApplicationNavigator_1 = require("../../components/ApplicationNavigator");
var Extension_1 = require("../Extension");
var DashboardExtension = /** @class */ (function (_super) {
    __extends(DashboardExtension, _super);
    function DashboardExtension(options, context) {
        return _super.call(this, options, context) || this;
    }
    DashboardExtension.prototype.setupContext = function (context) {
        var hubId = context.hubId, hub = context.hub, locationHref = context.locationHref, params = context.params;
        this.hub = hub;
        this.hubId = hubId;
        this.locationHref = locationHref;
        this.params = params;
        this.applicationNavigator = new ApplicationNavigator_1.ApplicationNavigator(this.locationHref, this.options.window);
    };
    return DashboardExtension;
}(Extension_1.Extension));
exports.DashboardExtension = DashboardExtension;
//# sourceMappingURL=DashboardExtension.js.map