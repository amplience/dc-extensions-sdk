"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentLink = void 0;
var Events_1 = require("../constants/Events");
var Errors_1 = require("../constants/Errors");
var ContentLink = /** @class */ (function () {
    /**
     * Content Link - Use to open the content browser.
     *
     * @param connection message-event-channel connection
     */
    function ContentLink(connection) {
        this.connection = connection;
    }
    /**
     * This method will trigger a content browser. It returns a promise that will resolve to the chosen Content References.
     *
     * @param contentTypeIds list of Content Type Ids to filter the Content Browser by.
     * @param options.max Max amount of selected contnet links
     * @param options.pointer The JSON path of the selected field
     *
     * ### Example
     * ```typescript
     * const enums = sdk.field.schema.allOf[1].properties.contentType.enum;
     * const contentLink = await sdk.contentLink.getMultiple(enums);
     *
     * console.log(contentLink);
     * ```
     */
    ContentLink.prototype.getMultiple = function (contentTypeIds, options) {
        var defaultOptions = {
            max: null
        };
        var mergedOptions = __assign(__assign({}, defaultOptions), options);
        return this.fetchLinks(contentTypeIds, mergedOptions.pointer, mergedOptions.max);
    };
    /**
     * This method will trigger a content browser. It returns a promise that will resolve to the chosen Content Link.
     *
     * @param contentTypeIds list of Content Type Ids to filter the Content Browser by.
     *
     * ### Example
     * ```typescript
     * const enums = sdk.field.schema.allOf[1].properties.contentType.enum;
     * const contentLink = await sdk.contentLink.get(enums);
     *
     * console.log(contentLink);
     * ```
     */
    ContentLink.prototype.get = function (contentTypeIds, pointer) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchLinks(contentTypeIds, pointer)];
            });
        });
    };
    ContentLink.prototype.fetchLinks = function (contentTypeIds, pointer, max) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                if (!contentTypeIds || !Array.isArray(contentTypeIds) || !contentTypeIds.length) {
                    throw new Error(Errors_1.ERRORS_CONTENT_ITEM.NO_IDS);
                }
                response = __assign({ contentTypeIds: contentTypeIds,
                    pointer: pointer }, ((max !== undefined && { max: max }) || {}));
                return [2 /*return*/, this.connection.request(Events_1.CONTENT_LINK.CONTENT_GET, response, {
                        timeout: false,
                    })];
            });
        });
    };
    return ContentLink;
}());
exports.ContentLink = ContentLink;
//# sourceMappingURL=ContentLink.js.map