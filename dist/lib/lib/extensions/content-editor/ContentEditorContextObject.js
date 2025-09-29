"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isContentEditorContextObject = void 0;
var Extension_1 = require("../Extension");
function isContentEditorContextObject(context) {
    var _a;
    if (!Extension_1.isContextObject(context)) {
        return false;
    }
    var isContentEditor = context.category === 'CONTENT_EDITOR';
    var hasInstanceParams = ((_a = context === null || context === void 0 ? void 0 : context.params) === null || _a === void 0 ? void 0 : _a.instance) !== undefined;
    var contextHasProp = function (prop) { return context[prop] !== undefined; };
    var requiredProps = [
        'contentItemId',
        'schema',
        'locales',
        'readOnly',
        'stagingEnvironment',
        'visualisation',
        'hub',
    ];
    return isContentEditor && hasInstanceParams && requiredProps.every(contextHasProp);
}
exports.isContentEditorContextObject = isContentEditorContextObject;
//# sourceMappingURL=ContentEditorContextObject.js.map