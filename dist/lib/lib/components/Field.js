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
exports.Field = void 0;
var Events_1 = require("../constants/Events");
var Field = /** @class */ (function () {
    /**
     * Allows you to perform actions on the field that is being edited.
     *
     * @param connection message-event-channel connection
     * @param schema JSON Schema of the field
     */
    function Field(connection, schema) {
        this.connection = connection;
        this.schema = schema;
    }
    /**
     * Fetch the value of the field
     *
     * ### Example
     * ```typescript
     * const value = await sdk.field.getValue()
     *
     * console.log(value)
     * ```
     */
    Field.prototype.getValue = function () {
        return this.connection.request(Events_1.FIELD.MODEL_GET);
    };
    /**
     * Change the value of the field
     *
     * @param value The new value you want to set on the field
     * @throws Errors are thrown If the value is not set it throws an array of [[ErrorReport]]
     * @returns
     *
     * ### Example
     * ```typescript
     * try {
     *  await sdk.field.setValue({ propertyName1: 'hello world' })
     * } catch(errors) {
     *  // failed to set value returns error report
     * }
     * ```
     */
    Field.prototype.setValue = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var errors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.request(Events_1.FIELD.MODEL_SET, value)];
                    case 1:
                        errors = _a.sent();
                        if (errors && errors.length) {
                            return [2 /*return*/, Promise.reject(errors)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetch the path to the field
     *
     * ### Example
     * ```typescript
     * const path = await sdk.field.getPath();
     *
     * console.log(path);
     * ```
     */
    Field.prototype.getPath = function () {
        return this.connection.request(Events_1.FIELD.PATH_GET);
    };
    /**
     * Check if your value is valid
     *
     * @param value The value you wish to test
     *
     * Gives the current validity of the field returns a boolean
     *
     * ### Example
     * ```typescript
     * const isValid = await sdk.field.isValid()
     *
     * console.log(isValid) // false
     * ```
     */
    Field.prototype.isValid = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var isValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.request(Events_1.FIELD.MODEL_IS_VALID, value)];
                    case 1:
                        isValid = _a.sent();
                        return [2 /*return*/, isValid];
                }
            });
        });
    };
    /**
     * Check the validation of your value. Returns an array containing any JSON Schema errors found.
     *
     * @param value The value you whish to test
     *
     * If you want to validate a field model and get back an  error reports [[ErrorReport]]
     *
     * ### Example
     * ```typescript
     * const errors = await sdk.field.validate();
     *
     * if (errors && errors.length) {
     *   errors.forEach(error => console.log(error));
     * } else {
     *   // valid
     * }
     * ```
     */
    Field.prototype.validate = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var errors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.request(Events_1.FIELD.MODEL_VALIDATE, value)];
                    case 1:
                        errors = _a.sent();
                        return [2 /*return*/, errors && errors.length ? errors : undefined];
                }
            });
        });
    };
    /**
     * Reset the value to the previously loaded state
     *
     * ### Example
     * ```typescript
     * const resetValue = await sdk.field.reset()
     *
     * // will be empty content or last saved content
     * console.log(resetValue)
     * ```
     */
    Field.prototype.reset = function () {
        return this.connection.request(Events_1.FIELD.MODEL_RESET);
    };
    return Field;
}());
exports.Field = Field;
//# sourceMappingURL=Field.js.map