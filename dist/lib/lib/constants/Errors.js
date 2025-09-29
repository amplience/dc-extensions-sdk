"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APPLICATION_NAVIGATOR = exports.EXTENSION = exports.FORM = exports.ERRORS_FRAME = exports.ERRORS_CONTENT_ITEM = exports.ERRORS_INIT = void 0;
var ERRORS_INIT;
(function (ERRORS_INIT) {
    /**
     * We failed to fetch all the necessary data for displaying a custom control
     */
    ERRORS_INIT["CONTEXT"] = "Failed to fetch context for UI Extension";
    /**
     * Extension failed to connect to Dynamic content
     */
    ERRORS_INIT["CONNECTION_TIMEOUT"] = "Failed to establish connection to DC Application";
})(ERRORS_INIT = exports.ERRORS_INIT || (exports.ERRORS_INIT = {}));
var ERRORS_CONTENT_ITEM;
(function (ERRORS_CONTENT_ITEM) {
    /**
     * Must supply content type ids in order to fetch a content item/reference
     */
    ERRORS_CONTENT_ITEM["NO_IDS"] = "Please provide content type ids";
})(ERRORS_CONTENT_ITEM = exports.ERRORS_CONTENT_ITEM || (exports.ERRORS_CONTENT_ITEM = {}));
var ERRORS_FRAME;
(function (ERRORS_FRAME) {
    /**
     * Must supply a number or nothing, this normally means you've provided a type setHeight can't handle
     */
    ERRORS_FRAME["SET_HEIGHT_NUMBER"] = "setHeight() only accepts an optional number argument";
})(ERRORS_FRAME = exports.ERRORS_FRAME || (exports.ERRORS_FRAME = {}));
var FORM;
(function (FORM) {
    /**
     * This normally means you're in a context where there is no model to return i.e Schema Editor
     */
    FORM["NO_MODEL"] = "Unable to retrieve form model as form context does not have an active model.";
})(FORM = exports.FORM || (exports.FORM = {}));
var EXTENSION;
(function (EXTENSION) {
    /**
     * This means you are trying to load an extension that isn't supported by this SDK version
     */
    EXTENSION["UNSUPPORTED_EXTENSION"] = "Unsupported extension";
})(EXTENSION = exports.EXTENSION || (exports.EXTENSION = {}));
var APPLICATION_NAVIGATOR;
(function (APPLICATION_NAVIGATOR) {
    /**
     * The location href must include a #!
     */
    APPLICATION_NAVIGATOR["MUST_INCLUDE_HASH_BANG"] = "locationHref must include a hash bang (#!)";
})(APPLICATION_NAVIGATOR = exports.APPLICATION_NAVIGATOR || (exports.APPLICATION_NAVIGATOR = {}));
//# sourceMappingURL=Errors.js.map