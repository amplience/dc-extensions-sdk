"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentEditorApplicationNavigator = void 0;
var Events_1 = require("../constants/Events");
var ContentEditorApplicationNavigator = /** @class */ (function () {
    function ContentEditorApplicationNavigator(connection) {
        this.connection = connection;
    }
    /**
     *
     * @param contentItemId - content item you're wanting to navigate to
     * @param contentTypeUri - content type uri from a schema id
     *
     * Used to navigate to nested content item
     *
     */
    ContentEditorApplicationNavigator.prototype.editContentItem = function (contentItemId, contentTypeUri) {
        return this.connection.request(Events_1.CONTENT_ITEM_NAVIGATOR.NAVIGATE_TO_NESTED, {
            uri: contentTypeUri,
            id: contentItemId,
        });
    };
    return ContentEditorApplicationNavigator;
}());
exports.ContentEditorApplicationNavigator = ContentEditorApplicationNavigator;
//# sourceMappingURL=ContentEditorNavigator.js.map