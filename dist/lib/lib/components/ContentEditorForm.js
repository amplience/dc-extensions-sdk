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
exports.ContentEditorForm = void 0;
var Errors_1 = require("../constants/Errors");
var Events_1 = require("../constants/Events");
var ContentEditorForm = /** @class */ (function () {
    function ContentEditorForm(connection, readOnly) {
        var _this = this;
        this.connection = connection;
        this.readOnly = readOnly;
        this.onChangeStack = [];
        this.onModelStack = [];
        this.connection.on(Events_1.FORM.READ_ONLY, function (readonly) {
            _this.readOnly = readonly;
            _this.onChangeStack.forEach(function (cb) { return cb(_this.readOnly); });
        });
        this.connection.on(Events_1.CONTENT_EDITOR_FORM.CONTENT_EDITOR_MODEL_CHANGE, function (_a) {
            var errors = _a.errors, content = _a.content;
            _this.onModelStack.forEach(function (cb) { return cb(errors, content); });
        });
    }
    /**
     * Check the validation of your model. Returns an array containing any JSON Schema errors found.
     *
     * @param model The model you wish to test
     *
     * If you want to validate a field model and get back an  error report [[ErrorReport]]
     *
     * ### Example
     * ```typescript
     * const errors = await sdk.form.validate({ title: 'Hello World' })});
     *
     * if (errors && errors.length) {
     *   errors.forEach(error => console.log(error));
     * } else {
     *   // valid
     * }
     * ```
     */
    ContentEditorForm.prototype.validate = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var errors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.request(Events_1.CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_VALIDATE, model)];
                    case 1:
                        errors = _a.sent();
                        return [2 /*return*/, errors && errors.length ? errors : undefined];
                }
            });
        });
    };
    /**
     * Check if your model is valid
     *
     * @param model The model you wish to test
     *
     * Gives the current validity of the form returns a boolean
     *
     * ### Example
     * ```typescript
     * const isValid = await sdk.form.isValid({ title: 'Hello World' })
     *
     * console.log(isValid) // false
     * ```
     */
    ContentEditorForm.prototype.isValid = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var isValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.request(Events_1.CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_IS_VALID, model)];
                    case 1:
                        isValid = _a.sent();
                        return [2 /*return*/, isValid];
                }
            });
        });
    };
    /**
     * Set the current model state
     *
     * @param value to set as model
     * @returns an array containing any JSON Schema errors found.
     *
     * ### Example
     * ```typescript
     * const sdk = await init();
     *  try {
     *     await sdk.form.setValue({ title: 'hello world' });
     *  } catch (errors) {
     *    if (errors.length) {
     *       console.log(errors);
     *    }
     *  }
     * ```
     */
    ContentEditorForm.prototype.setValue = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var errors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.request(Events_1.CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_SET, value)];
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
     * Get the current model state of all the fields in the form.
     *
     * @type FormModel is the entire parent model that will be a peer to this extension
     *
     * ### Example
     * ```typescript
     * try {
     *   const value = await sdk.form.getValue();
     *
     *   console.log(value)
     * } catch (e) {
     *   // In a context where there is no form model
     * }
     * ```
     */
    ContentEditorForm.prototype.getValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var value, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.connection.request(Events_1.CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_GET)];
                    case 1:
                        value = _a.sent();
                        return [2 /*return*/, value];
                    case 2:
                        e_1 = _a.sent();
                        throw new Error(Errors_1.FORM.NO_MODEL);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * Allows you to provide a callback to be executed after the readonly state changes. This method can be chained to append multiple callbacks.
     *
     * @param cb Callback function that executes upon readonly state change.
     *
     * @returns [[ContentEditorForm]]
     *
     * ### Example
     * ```typescript
     * const container = document.querySelector('.container');
     * const inputs = Array.from(document.querySelectorAll('input'));
     *
     * sdk.form
     *  .onReadOnlyChange(setReadOnlyClass)
     *  .onReadOnlyChange(disableInputs)
     *
     * function disableInputs(readOnly)  {
     *   inputs.forEach(input => {
     *     input.style.pointerEvents = readOnly ? 'none' : ''
     *   })
     * }
     *
     * function setReadOnlyClass(readOnly) {
     *   container.classList[readOnly ? 'add' : 'remove']('read-only')
     * }
     * ```
     */
    ContentEditorForm.prototype.onReadOnlyChange = function (cb) {
        this.onChangeStack.push(cb);
        return this;
    };
    /**
     *
     * On changes to the model not explicitly handled by the extension, this method will be called in order to keep model in sync with Dynamic Content
     *
     * @param cb Callback function that executes upon model change.
     * @returns {Function} unsubscribe callback
     *
     * ## Example
     *
     * ```typescript
     * let currentModel;
     *
     * sdk.form.onModelChange(model => {
     *  currentModel = model;
     * });
     *
     * const unsubscribe = sdk.form.onModelChange((errors, model) => {
     *  setErrors(errors);
     *  setModel(model)
     * });
     *
     * unsubscribe()
     * ```
     */
    ContentEditorForm.prototype.onModelChange = function (cb) {
        var _this = this;
        this.onModelStack.push(cb);
        var unsubscribe = function () {
            var index = _this.onModelStack.indexOf(cb);
            if (index !== -1) {
                _this.onModelStack.splice(index, 1);
            }
        };
        return unsubscribe;
    };
    return ContentEditorForm;
}());
exports.ContentEditorForm = ContentEditorForm;
//# sourceMappingURL=ContentEditorForm.js.map