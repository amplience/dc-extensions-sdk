"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isContentFieldContextObject = void 0;
var Extension_1 = require("../Extension");
function isContentFieldContextObject(context) {
    var _a;
    if (!Extension_1.isContextObject(context)) {
        return false;
    }
    var isContentField = context.category === 'CONTENT_FIELD';
    var hasInstanceParams = ((_a = context === null || context === void 0 ? void 0 : context.params) === null || _a === void 0 ? void 0 : _a.instance) !== undefined;
    var contextHasProp = function (prop) { return context[prop] !== undefined; };
    var requiredProps = [
        'contentItemId',
        'fieldSchema',
        'locales',
        'readOnly',
        'stagingEnvironment',
        'visualisation',
        'hub',
    ];
    return isContentField && hasInstanceParams && requiredProps.every(contextHasProp);
}
exports.isContentFieldContextObject = isContentFieldContextObject;
//# sourceMappingURL=ContentFieldContextObject.js.map