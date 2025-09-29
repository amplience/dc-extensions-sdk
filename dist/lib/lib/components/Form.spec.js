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
var Errors_1 = require("../constants/Errors");
var message_event_channel_1 = require("message-event-channel");
var Form_1 = require("./Form");
var Events_1 = require("../constants/Events");
describe('Form', function () {
    var connection;
    var form;
    var callbacks = {};
    beforeEach(function () {
        connection = new message_event_channel_1.ClientConnection();
        jest.spyOn(connection, 'on').mockImplementation(function (e, cb) {
            callbacks[e] = cb;
            return connection;
        });
        form = new Form_1.Form(connection, true);
    });
    describe('Form.constructor()', function () {
        it('should set up FORM events', function () {
            expect(connection.on).toHaveBeenCalledWith(Events_1.FORM.READ_ONLY, expect.any(Function));
            expect(connection.on).toHaveBeenCalledWith(Events_1.FORM.FORM_VALUE_CHANGE, expect.any(Function));
        });
    });
    describe('Form.onReadOnlyChange()', function () {
        it('should push callback to the onChangeStack, return an instance of the class and set readOnly value', function () {
            var cb = jest.fn();
            var $form = form.onReadOnlyChange(cb);
            callbacks[Events_1.FORM.READ_ONLY](false);
            expect($form).toBe(form);
            expect(cb).toHaveBeenCalledWith(false);
            expect(form.readOnly).toEqual(false);
        });
    });
    describe('Form.getValue()', function () {
        it('should get the value of the form', function () { return __awaiter(void 0, void 0, void 0, function () {
            var formModel, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formModel = {
                            _meta: {
                                name: 'test',
                                schema: 'http://test.test',
                            },
                            properties: {
                                test: true,
                            },
                        };
                        jest.spyOn(connection, 'request').mockReturnValue(Promise.resolve(formModel));
                        return [4 /*yield*/, form.getValue()];
                    case 1:
                        value = _a.sent();
                        expect(value).toBe(formModel);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw an error if the connection request fails', function () { return __awaiter(void 0, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(connection, 'request').mockReturnValue(Promise.reject());
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, form.getValue()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        expect(e_1).toEqual(new Error(Errors_1.FORM.NO_MODEL));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Form.onFormValueChange()', function () {
        it('should push callback to the onChangeStack and return an instance of the class', function () {
            var cb = jest.fn();
            var $form = form.onFormValueChange(cb);
            callbacks[Events_1.FORM.FORM_VALUE_CHANGE]({ test: 'hello' });
            expect($form).toBe(form);
            expect(cb).toHaveBeenCalledWith({ test: 'hello' });
        });
    });
});
//# sourceMappingURL=Form.spec.js.map