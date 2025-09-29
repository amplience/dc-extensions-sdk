"use strict";
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
/* eslint-disable @typescript-eslint/no-floating-promises */
var message_event_channel_1 = require("message-event-channel");
var ContentLink_1 = require("./ContentLink");
var Events_1 = require("../constants/Events");
describe('ContentItem', function () {
    var connection;
    var contentLink;
    beforeEach(function () {
        connection = new message_event_channel_1.ClientConnection();
        contentLink = new ContentLink_1.ContentLink(connection);
    });
    it('get should return a promise', function () {
        jest.spyOn(connection, 'request').mockResolvedValue({});
        var promise = contentLink.get(['123'], '/fieldPointer');
        expect(promise instanceof Promise).toBeTruthy();
    });
    it('should pass an array of ids', function () {
        jest.spyOn(connection, 'request').mockResolvedValue({});
        contentLink.get(['123', '564'], '/fieldPointer').then().catch();
        expect(connection.request).toHaveBeenCalledWith('content-link-get', { contentTypeIds: ['123', '564'], pointer: '/fieldPointer' }, {
            timeout: false,
        });
    });
    it('should throw an error if no ids are passed', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(connection, 'request').mockResolvedValue({});
                    return [4 /*yield*/, expect(contentLink.get([], '/fieldPointer')).rejects.toThrowErrorMatchingInlineSnapshot("\"Please provide content type ids\"")];
                case 1:
                    _a.sent();
                    expect(connection.request).not.toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw an error if params are not in the expected format', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(connection, 'request').mockResolvedValue({});
                    return [4 /*yield*/, expect(contentLink.get('123', '/fieldPointer')).rejects.toThrowErrorMatchingInlineSnapshot("\"Please provide content type ids\"")];
                case 1:
                    _a.sent();
                    expect(connection.request).not.toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should beable to return multiple items', function () {
        jest.spyOn(connection, 'request').mockResolvedValue({});
        contentLink.getMultiple(['123'], { pointer: '/fieldPointer' });
        expect(connection.request).toHaveBeenCalledWith(Events_1.CONTENT_LINK.CONTENT_GET, {
            contentTypeIds: ['123'],
            max: null,
            pointer: '/fieldPointer'
        }, { timeout: false });
    });
    it('should set max to number if passed', function () {
        jest.spyOn(connection, 'request').mockResolvedValue({});
        contentLink.getMultiple(['123'], { max: 2, pointer: '/fieldPointer' });
        expect(connection.request).toHaveBeenCalledWith(Events_1.CONTENT_LINK.CONTENT_GET, {
            contentTypeIds: ['123'],
            max: 2,
            pointer: '/fieldPointer'
        }, { timeout: false });
    });
});
//# sourceMappingURL=ContentLink.spec.js.map