"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTENT_ITEM_NAVIGATOR = exports.CONTENT_TYPES = exports.WORKFLOWS = exports.ASSETS = exports.FRAME = exports.FORM = exports.CONTENT_EDITOR_FORM = exports.FIELD = exports.CONTENT_REFERENCE = exports.CONTENT_LINK = exports.MEDIA_LINK = exports.CONTENT_ITEM = exports.CONTEXT = void 0;
var CONTEXT;
(function (CONTEXT) {
    CONTEXT["GET"] = "context-get";
})(CONTEXT = exports.CONTEXT || (exports.CONTEXT = {}));
var CONTENT_ITEM;
(function (CONTENT_ITEM) {
    CONTENT_ITEM["GET"] = "content-item-get";
})(CONTENT_ITEM = exports.CONTENT_ITEM || (exports.CONTENT_ITEM = {}));
var MEDIA_LINK;
(function (MEDIA_LINK) {
    MEDIA_LINK["IMAGE_GET"] = "media-image-get";
    MEDIA_LINK["VIDEO_GET"] = "media-video-get";
    MEDIA_LINK["GET"] = "media-get";
})(MEDIA_LINK = exports.MEDIA_LINK || (exports.MEDIA_LINK = {}));
var CONTENT_LINK;
(function (CONTENT_LINK) {
    CONTENT_LINK["CONTENT_GET"] = "content-link-get";
})(CONTENT_LINK = exports.CONTENT_LINK || (exports.CONTENT_LINK = {}));
var CONTENT_REFERENCE;
(function (CONTENT_REFERENCE) {
    CONTENT_REFERENCE["CONTENT_REF_GET"] = "content-reference-get";
})(CONTENT_REFERENCE = exports.CONTENT_REFERENCE || (exports.CONTENT_REFERENCE = {}));
var FIELD;
(function (FIELD) {
    FIELD["MODEL_GET"] = "field-model-get";
    FIELD["MODEL_SET"] = "field-model-set";
    FIELD["MODEL_RESET"] = "field-model-reset";
    FIELD["MODEL_IS_VALID"] = "field-model-is-valid";
    FIELD["MODEL_VALIDATE"] = "field-model-validate";
    FIELD["SCHEMA_GET"] = "field-schema-get";
    FIELD["PATH_GET"] = "field-path-get";
})(FIELD = exports.FIELD || (exports.FIELD = {}));
var CONTENT_EDITOR_FORM;
(function (CONTENT_EDITOR_FORM) {
    CONTENT_EDITOR_FORM["CONTENT_EDITOR_FORM_GET"] = "content-editor-model-get";
    CONTENT_EDITOR_FORM["CONTENT_EDITOR_FORM_SET"] = "content-editor-model-set";
    CONTENT_EDITOR_FORM["CONTENT_EDITOR_FORM_VALIDATE"] = "content-editor-model-validate";
    CONTENT_EDITOR_FORM["CONTENT_EDITOR_FORM_IS_VALID"] = "content-editor-model-is-valid";
    CONTENT_EDITOR_FORM["CONTENT_EDITOR_MODEL_CHANGE"] = "content-editor-model-change";
})(CONTENT_EDITOR_FORM = exports.CONTENT_EDITOR_FORM || (exports.CONTENT_EDITOR_FORM = {}));
var FORM;
(function (FORM) {
    FORM["READ_ONLY"] = "form-read-only-change";
    FORM["GET_FORM_MODEL"] = "form-model-get";
    FORM["FORM_VALUE_CHANGE"] = "form-value-change";
})(FORM = exports.FORM || (exports.FORM = {}));
var FRAME;
(function (FRAME) {
    FRAME["HEIGHT_GET"] = "height-get";
    FRAME["HEIGHT_SET"] = "height-set";
})(FRAME = exports.FRAME || (exports.FRAME = {}));
var ASSETS;
(function (ASSETS) {
    ASSETS["GET_BY_ID"] = "get-asset-by-id";
})(ASSETS = exports.ASSETS || (exports.ASSETS = {}));
var WORKFLOWS;
(function (WORKFLOWS) {
    WORKFLOWS["GET_ALL_WORKFLOWS"] = "get-workflows";
})(WORKFLOWS = exports.WORKFLOWS || (exports.WORKFLOWS = {}));
var CONTENT_TYPES;
(function (CONTENT_TYPES) {
    CONTENT_TYPES["GET_BY_URI"] = "get-content-type-by-uri";
    CONTENT_TYPES["GET_BY_URIS"] = "get-content-type-by-uris";
})(CONTENT_TYPES = exports.CONTENT_TYPES || (exports.CONTENT_TYPES = {}));
var CONTENT_ITEM_NAVIGATOR;
(function (CONTENT_ITEM_NAVIGATOR) {
    CONTENT_ITEM_NAVIGATOR["NAVIGATE_TO_NESTED"] = "navigate-to-nested";
})(CONTENT_ITEM_NAVIGATOR = exports.CONTENT_ITEM_NAVIGATOR || (exports.CONTENT_ITEM_NAVIGATOR = {}));
//# sourceMappingURL=Events.js.map