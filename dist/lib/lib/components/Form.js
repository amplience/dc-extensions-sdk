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
exports.Form = void 0;
var Events_1 = require("../constants/Events");
var Errors_1 = require("../constants/Errors");
var Form = /** @class */ (function () {
    function Form(connection, readOnly) {
        var _this = this;
        this.connection = connection;
        this.readOnly = readOnly;
        this.readOnlyObservers = [];
        this.formValueObservers = [];
        this.connection.on(Events_1.FORM.READ_ONLY, function (readonly) {
            _this.readOnly = readonly;
            _this.readOnlyObservers.forEach(function (cb) { return cb(_this.readOnly); });
        });
        this.connection.on(Events_1.FORM.FORM_VALUE_CHANGE, function (formModel) {
            return _this.formValueObservers.forEach(function (cb) { return cb(formModel); });
        });
    }
    /**
     *
     * Allows you to provide a callback to be executed after the readonly state changes. This method can be chained to append multiple callbacks.
     *
     * @param cb Callback function that executes upon readonly state change.
     *
     * @returns [[Form]]
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
    Form.prototype.onReadOnlyChange = function (cb) {
        this.readOnlyObservers.push(cb);
        return this;
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
    Form.prototype.getValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var value, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.connection.request(Events_1.FORM.GET_FORM_MODEL)];
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
     * Allows you to provide a callback to be executed after the form value changes. This method can be chained to append multiple callbacks.
     *
     * @param cb Callback function that executes upon form value change.
     *
     * @returns [[Form]]
     *
     * ### Example
     * ```typescript
     * const container = document.querySelector('.container');
     * const submitBtn = document.querySelector('.submitBtn');
     *
     * sdk.form
     *  .onFormValueChange(setActiveClass)
     *  .onFormValueChange(enableSubmit);
     *
     * function enableSubmit(formValue)  {
     *   const isEmpty = Object.keys(formValue).length === 0;
     *   submitBtn.disabled = isEmpty;
     * }
     *
     * function setActiveClass(formValue) {
     *   const hasTitle formValue?.title !== undefined;
     *   container.classList[hasTitle ? 'add' : 'remove']('active');
     * }
     * ```
     */
    Form.prototype.onFormValueChange = function (cb) {
        this.formValueObservers.push(cb);
        return this;
    };
    return Form;
}());
exports.Form = Form;
//# sourceMappingURL=Form.js.map