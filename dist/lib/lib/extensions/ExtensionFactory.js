"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extensionFactory = void 0;
var Errors_1 = require("../constants/Errors");
var ContentEditorContextObject_1 = require("./content-editor/ContentEditorContextObject");
var ContentEditorExtension_1 = require("./content-editor/ContentEditorExtension");
var ContentFieldContextObject_1 = require("./content-field/ContentFieldContextObject");
var ContentFieldExtension_1 = require("./content-field/ContentFieldExtension");
var DashboardContextObject_1 = require("./dashboard/DashboardContextObject");
var DashboardExtension_1 = require("./dashboard/DashboardExtension");
function extensionFactory(context, options) {
    var extension;
    if (ContentFieldContextObject_1.isContentFieldContextObject(context)) {
        extension = new ContentFieldExtension_1.ContentFieldExtension(options, context);
    }
    if (DashboardContextObject_1.isDashboardContextObject(context)) {
        extension = new DashboardExtension_1.DashboardExtension(options, context);
    }
    if (ContentEditorContextObject_1.isContentEditorContextObject(context)) {
        extension = new ContentEditorExtension_1.ContentEditorExtension(options, context);
    }
    if (!extension) {
        throw new Error(Errors_1.EXTENSION.UNSUPPORTED_EXTENSION);
    }
    return extension;
}
exports.extensionFactory = extensionFactory;
//# sourceMappingURL=ExtensionFactory.js.map