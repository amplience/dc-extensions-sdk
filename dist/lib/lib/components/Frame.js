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
exports.Frame = void 0;
var Events_1 = require("../constants/Events");
var Errors_1 = require("../constants/Errors");
var Frame = /** @class */ (function () {
    /**
     * Use in order to control the re-sizing of the Extension
     *
     * @param connection message-event-channel connection
     * @param win override the default window object
     */
    function Frame(connection, win) {
        var _this = this;
        if (win === void 0) { win = window; }
        this.connection = connection;
        this.win = win;
        this.isAutoResizing = false;
        this.observer = new MutationObserver(function () { return _this.updateHeight(); });
        var frameLoaded = new Promise(function (resolve) {
            if (win.document.readyState === 'complete') {
                resolve(true);
            }
            win.addEventListener('load', function () {
                resolve(true);
            });
        });
        this.connection.on(Events_1.FRAME.HEIGHT_GET, function (_payload, resolve) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, frameLoaded];
                    case 1:
                        _a.sent();
                        resolve(this.getHeight());
                        return [2 /*return*/];
                }
            });
        }); });
        this.updateHeightHandler = this.updateHeight.bind(this);
    }
    /**
     * Get the height of the Extension
     *
     * Returns the extensions total height
     *
     * ### Example
     * ```typescript
     * const height = sdk.frame.getHeight()
     *
     * // 200
     * console.log(height)
     * ```
     */
    Frame.prototype.getHeight = function () {
        var documentElement = this.win.document.documentElement;
        if (documentElement) {
            var height = documentElement.getBoundingClientRect().height;
            return height;
        }
        return 0;
    };
    /**
     * Set the height of the frame to the height of the Extension. Can optionally override the measured height with a defined value.
     *
     * @param height - should be used if you want to override the calculated height of your extension
     *
     * If no height is passed it will try get the extension height or default to 0
     *
     * ### Example
     *
     * ```typescript
     * // sets height to extension height
     * sdk.frame.setHeight()
     * // sets height to 200
     * sdk.frame.setHeight(200)
     * ```
     */
    Frame.prototype.setHeight = function (height) {
        if (height !== undefined && typeof height !== 'number') {
            throw new TypeError(Errors_1.ERRORS_FRAME.SET_HEIGHT_NUMBER);
        }
        var h = height === undefined ? this.getHeight() : height;
        this.previousHeight = height;
        this.connection.emit(Events_1.FRAME.HEIGHT_SET, h < 0 ? 0 : h);
    };
    /**
     * Starts the auto-resizer
     *
     * It creates an event listener on resize and creates a mutation observer that updates
     * the height when the body height changes you should clean up from this function on unmount
     * to avoid memory leaks
     *
     * If called when already active it does nothing
     *
     * ### Example
     * ```typescript
     * sdk.frame.startAutoResizer();
     * ```
     */
    Frame.prototype.startAutoResizer = function () {
        if (this.isAutoResizing) {
            return;
        }
        this.isAutoResizing = true;
        this.observer.observe(this.win.document.body, {
            attributes: true,
            childList: true,
            subtree: true,
            characterData: true,
        });
        this.win.addEventListener('resize', this.updateHeightHandler);
    };
    /**
     * Stops the auto-resizer
     *
     * It tears down the event listeners and observers created from startAutoResizer should be
     * called when you want to mannaully handle the height or when unmounting
     *
     * If called without autoResizer being active it does nothing
     *
     * ### Example
     * ```typescript
     * sdk.frame.stopAutoResizer();
     * ```
     */
    Frame.prototype.stopAutoResizer = function () {
        if (!this.isAutoResizing) {
            return;
        }
        this.isAutoResizing = false;
        this.observer.disconnect();
        this.win.removeEventListener('resize', this.updateHeightHandler);
    };
    Frame.prototype.updateHeight = function () {
        var height = this.getHeight();
        if (height === this.previousHeight) {
            return;
        }
        this.setHeight(height);
    };
    return Frame;
}());
exports.Frame = Frame;
//# sourceMappingURL=Frame.js.map