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
exports.ContentFieldExtension = void 0;
var ContentItem_1 = require("../../components/ContentItem");
var ContentLink_1 = require("../../components/ContentLink");
var ContentReference_1 = require("../../components/ContentReference");
var Field_1 = require("../../components/Field");
var Form_1 = require("../../components/Form");
var Frame_1 = require("../../components/Frame");
var MediaLink_1 = require("../../components/MediaLink");
var Extension_1 = require("../Extension");
var Assets_1 = require("../../components/Assets");
var ContentType_1 = require("../../components/ContentType");
var Workflows_1 = require("../../components/Workflows");
var ContentEditorNavigator_1 = require("../../components/ContentEditorNavigator");
var ContentFieldExtension = /** @class */ (function (_super) {
    __extends(ContentFieldExtension, _super);
    function ContentFieldExtension(options, context) {
        var _this = _super.call(this, options, context) || this;
        _this.mediaLink = new MediaLink_1.MediaLink(_this.connection);
        _this.contentLink = new ContentLink_1.ContentLink(_this.connection);
        _this.contentReference = new ContentReference_1.ContentReference(_this.connection);
        _this.contentTypes = new ContentType_1.ContentTypes(_this.connection);
        _this.workflows = new Workflows_1.Workflows(_this.connection);
        _this.frame = new Frame_1.Frame(_this.connection, options.window);
        return _this;
    }
    ContentFieldExtension.prototype.setupContext = function (context) {
        var fieldSchema = context.fieldSchema, params = context.params, locales = context.locales, stagingEnvironment = context.stagingEnvironment, readOnly = context.readOnly, visualisation = context.visualisation, hub = context.hub, collapseByDefault = context.collapseByDefault;
        this.assets = new Assets_1.Assets(this.connection);
        this.contentItem = new ContentItem_1.ContentItem(this.connection);
        this.field = new Field_1.Field(this.connection, fieldSchema);
        this.form = new Form_1.Form(this.connection, readOnly);
        this.applicationNavigator = new ContentEditorNavigator_1.ContentEditorApplicationNavigator(this.connection);
        this.params = params;
        this.locales = locales;
        this.visualisation = visualisation;
        this.stagingEnvironment = stagingEnvironment;
        this.collapseByDefault = collapseByDefault;
        this.hub = hub;
    };
    return ContentFieldExtension;
}(Extension_1.Extension));
exports.ContentFieldExtension = ContentFieldExtension;
//# sourceMappingURL=ContentFieldExtension.js.map