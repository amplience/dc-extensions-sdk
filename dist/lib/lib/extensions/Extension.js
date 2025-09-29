"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extension = exports.isContextObject = void 0;
var HttpClient_1 = require("../components/HttpClient");
var Users_1 = require("../components/Users");
function isContextObject(context) {
    var _a, _b;
    return ((_b = (_a = context) === null || _a === void 0 ? void 0 : _a.params) === null || _b === void 0 ? void 0 : _b.installation) !== undefined;
}
exports.isContextObject = isContextObject;
var Extension = /** @class */ (function () {
    function Extension(options, context) {
        this.options = options;
        var hub = context.hub;
        this.connection = this.options.connection;
        this.client = new HttpClient_1.HttpClient(this.connection);
        this.users = new Users_1.Users(this.connection, hub);
        this.setupContext(context);
    }
    return Extension;
}());
exports.Extension = Extension;
//# sourceMappingURL=Extension.js.map