"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDashboardContextObject = void 0;
var Extension_1 = require("../Extension");
function isDashboardContextObject(context) {
    return (Extension_1.isContextObject(context) &&
        context.category === 'DASHBOARD' &&
        context.locationHref !== undefined &&
        (context.hub !== undefined ||
            context.hubId !== undefined));
}
exports.isDashboardContextObject = isDashboardContextObject;
//# sourceMappingURL=DashboardContextObject.js.map