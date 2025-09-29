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
exports.ContentEditorExtension = void 0;
var ContentEditorForm_1 = require("../../components/ContentEditorForm");
var ContentItem_1 = require("../../components/ContentItem");
var ContentLink_1 = require("../../components/ContentLink");
var ContentReference_1 = require("../../components/ContentReference");
var MediaLink_1 = require("../../components/MediaLink");
var Extension_1 = require("../Extension");
var Assets_1 = require("../../components/Assets");
var ContentEditorNavigator_1 = require("../../components/ContentEditorNavigator");
var ContentType_1 = require("../../components/ContentType");
var Workflows_1 = require("../../components/Workflows");
var ContentEditorExtension = /** @class */ (function (_super) {
    __extends(ContentEditorExtension, _super);
    function ContentEditorExtension(options, context) {
        var _this = _super.call(this, options, context) || this;
        _this.mediaLink = new MediaLink_1.MediaLink(_this.connection);
        _this.contentLink = new ContentLink_1.ContentLink(_this.connection);
        _this.contentReference = new ContentReference_1.ContentReference(_this.connection);
        _this.contentTypes = new ContentType_1.ContentTypes(_this.connection);
        _this.workflows = new Workflows_1.Workflows(_this.connection);
        return _this;
    }
    ContentEditorExtension.prototype.setupContext = function (context) {
        var schema = context.schema, params = context.params, locales = context.locales, stagingEnvironment = context.stagingEnvironment, readOnly = context.readOnly, visualisation = context.visualisation, hub = context.hub, collapseByDefault = context.collapseByDefault;
        this.assets = new Assets_1.Assets(this.connection);
        this.contentItem = new ContentItem_1.ContentItem(this.connection);
        this.schema = schema;
        this.form = new ContentEditorForm_1.ContentEditorForm(this.connection, readOnly);
        this.params = params;
        this.locales = locales;
        this.visualisation = visualisation;
        this.stagingEnvironment = stagingEnvironment;
        this.collapseByDefault = collapseByDefault;
        this.hub = hub;
        this.applicationNavigator = new ContentEditorNavigator_1.ContentEditorApplicationNavigator(this.connection);
    };
    return ContentEditorExtension;
}(Extension_1.Extension));
exports.ContentEditorExtension = ContentEditorExtension;
//# sourceMappingURL=ContentEditorExtension.js.map