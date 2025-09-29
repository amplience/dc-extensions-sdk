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
exports.MediaLink = void 0;
var Events_1 = require("../constants/Events");
var MediaLink = /** @class */ (function () {
    /**
     * Media Link - Use to open the media browser.
     *
     * @param connection message-event-channel connection
     */
    function MediaLink(connection) {
        this.connection = connection;
    }
    /**
     * This method will trigger opening the media browser. It returns a promise that will resolve to the chosen Image or Video Link.
     *
     * Example of fetching media from DC
     * ```typescript
     * try {
     *   // open browser and waits for media browser
     *   // returns object that should be saved to the model
     *   const video = await sdk.mediaLink.get()
     *
     * } catch (e) {
     *   // no media returned
     * }
     * ```
     */
    MediaLink.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.connection.request(Events_1.MEDIA_LINK.GET, null, {
                        timeout: false,
                    })];
            });
        });
    };
    /**
     * This method will trigger opening the media overlay. It returns a promise that will resolve to the chosen Image and Video Links.
     *
     * Example of fetching an media from DC
     * ```typescript
     * try {
     *   // open browser and waits for media selection
     *   // returns object that should be saved to the model
     *   const media = await sdk.mediaLink.getMultiple({ max: 10 })
     *
     * } catch (e) {
     *   // no media returned
     * }
     * ```
     */
    MediaLink.prototype.getMultiple = function (_a) {
        var _b = _a === void 0 ? { max: null } : _a, max = _b.max;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                return [2 /*return*/, this.connection.request(Events_1.MEDIA_LINK.GET, { max: max }, {
                        timeout: false,
                    })];
            });
        });
    };
    /**
     * This method will trigger an image browser. It returns a promise that will resolve to the chosen Image Link.
     *
     * Example of fetching an image from DC
     * ```typescript
     * try {
     *   // open browser and waits for image
     *   // returns object that should be saved to the model
     *   const image = await sdk.mediaLink.getImage()
     *
     * } catch (e) {
     *   // no image returned
     * }
     * ```
     *
     * Example of displaying a image in your custom control
     *
     * ```typescript
     * import { init } from 'dc-extensions-sdk';
     * import { Image: ImageBuilder } from 'dc-delivery-sdk-js';
     *
     * async function start() {
     *   const sdk = await init();
     *   const img = document.querySelector('img');
     *   const button = document.querySelector('button')
     *
     *   function onClick() {
     *     sdk.mediaLink
     *      .getImage()
     *      .then(image => {
     *         setImage(image)
     *       })
     *      .catch(err => console.log('not selected'));
     *   }
     *
     *   function setImage(image) {
     *      img.src = (
     *         new ImageBuilder(image, { stagingEnvironment: sdk.stagingEnvironment })
     *         .url()
     *         .build()
     *      )
     *   }
     *
     *   button.onclick = onClick;
     * }
     *
     * start()
     * ```
     */
    MediaLink.prototype.getImage = function () {
        return this.connection.request(Events_1.MEDIA_LINK.IMAGE_GET, null, {
            timeout: false,
        });
    };
    /**
     * This method will trigger an image browser. It returns a promise that will resolve to the chosen Image Links.
     *
     * Example of fetching an image from DC
     * ```typescript
     * try {
     *   // open browser and waits for image
     *   // returns object that should be saved to the model
     *   const images = await sdk.mediaLink.getImages({ max: 10 })
     *
     * } catch (e) {
     *   // no image returned
     * }
     * ```
     */
    MediaLink.prototype.getImages = function (_a) {
        var _b = _a === void 0 ? { max: null } : _a, max = _b.max;
        return this.connection.request(Events_1.MEDIA_LINK.IMAGE_GET, { max: max }, { timeout: false });
    };
    /**
     * This method will trigger a video browser. It returns a promise that will resolve to the chosen Video Link.
     *
     * Example of fetching an video from DC
     * ```typescript
     * try {
     *   // open browser and waits for video
     *   // returns object that should be saved to the model
     *   const video = await sdk.mediaLink.getVideo()
     *
     * } catch (e) {
     *   // no video returned
     * }
     * ```
     */
    MediaLink.prototype.getVideo = function () {
        return this.connection.request(Events_1.MEDIA_LINK.VIDEO_GET, null, {
            timeout: false,
        });
    };
    /**
     * This method will trigger a video browser. It returns a promise that will resolve to the chosen Video Links.
     *
     * Example of fetching an video from DC
     * ```typescript
     * try {
     *   // open browser and waits for video
     *   // returns object that should be saved to the model
     *   const videos = await sdk.mediaLink.getVideos()
     *
     * } catch (e) {
     *   // no video returned
     * }
     * ```
     */
    MediaLink.prototype.getVideos = function (_a) {
        var _b = _a === void 0 ? { max: null } : _a, max = _b.max;
        return this.connection.request(Events_1.MEDIA_LINK.VIDEO_GET, { max: max }, {
            timeout: false,
        });
    };
    return MediaLink;
}());
exports.MediaLink = MediaLink;
//# sourceMappingURL=MediaLink.js.map