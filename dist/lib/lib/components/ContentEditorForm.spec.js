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
var message_event_channel_1 = require("message-event-channel");
var ContentEditorForm_1 = require("./ContentEditorForm");
var Events_1 = require("../constants/Events");
var Errors_1 = require("../constants/Errors");
describe('ContentEditorForm', function () {
    var form;
    var onSpy;
    var connection;
    beforeEach(function () {
        connection = new message_event_channel_1.ClientConnection();
        onSpy = jest.spyOn(connection, 'on');
        form = new ContentEditorForm_1.ContentEditorForm(connection, true);
    });
    describe('ContentEditorForm.constructor', function () {
        it('should set up ContentEditorForm.READ_ONLY event', function () {
            expect(connection.on).toHaveBeenCalledWith(Events_1.FORM.READ_ONLY, expect.any(Function));
        });
        it('should set up ContentEditorForm.CONTENT_EDITOR_MODEL_CHANGE event', function () {
            expect(connection.on).toHaveBeenCalledWith(Events_1.CONTENT_EDITOR_FORM.CONTENT_EDITOR_MODEL_CHANGE, expect.any(Function));
        });
    });
    describe('ContentEditorForm.onReadOnlyChange()', function () {
        it('should push callback to the onChangeStack, return an instance of the class and set readOnly value', function () {
            var cb = jest.fn();
            var $form = form.onReadOnlyChange(cb);
            var callOn = onSpy.mock.calls[0][1];
            callOn(false);
            expect($form).toBe(form);
            expect(cb).toHaveBeenCalledWith(false);
            expect(form.readOnly).toEqual(false);
        });
    });
    describe('ContentEditorForm.onModelChange()', function () {
        it('should push callback to the onModelChange, and callback method is called', function () {
            var cb = jest.fn();
            form.onModelChange(cb);
            var callOn = onSpy.mock.calls[1][1];
            callOn({ content: { hello: 'world' }, errors: [] });
            expect(cb).toHaveBeenCalledWith([], { hello: 'world' });
        });
        it('should push callback to the onModelChange, callback should not be called', function () {
            var cb = jest.fn();
            var unsubscribe = form.onModelChange(cb);
            var callOn = onSpy.mock.calls[1][1];
            unsubscribe();
            callOn({ content: { hello: 'world' }, errors: [] });
            expect(cb).not.toHaveBeenCalled();
        });
        it('should push callback to the onModelChange, and callback method is called once', function () {
            var cb = jest.fn();
            var unsubscribe = form.onModelChange(cb);
            var secoondUnsubscribe = form.onModelChange(cb);
            secoondUnsubscribe();
            var callOn = onSpy.mock.calls[1][1];
            callOn({ content: { hello: 'world' }, errors: [] });
            expect(cb).toHaveBeenCalledTimes(1);
        });
    });
    describe('ContentEditorForm.isValid', function () {
        it('should return true if the form is valid', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        jest.spyOn(connection, 'request').mockReturnValue(Promise.resolve(true));
                        _a = expect;
                        return [4 /*yield*/, form.isValid({ hello: 'world' })];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toBeTruthy();
                        expect(connection.request).toHaveBeenCalledWith(Events_1.CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_IS_VALID, { hello: 'world' });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('ContentEditorForm.validate', function () {
        it('should return error report if the form is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        jest
                            .spyOn(connection, 'request')
                            .mockReturnValue(Promise.resolve([{ path: 'hello', message: 'hello is required' }]));
                        _a = expect;
                        return [4 /*yield*/, form.validate({ hello: 'world' })];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toEqual([
                            { path: 'hello', message: 'hello is required' },
                        ]);
                        expect(connection.request).toHaveBeenCalledWith(Events_1.CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_VALIDATE, { hello: 'world' });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return undefined if no errors found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        jest.spyOn(connection, 'request').mockReturnValue(Promise.resolve([]));
                        _a = expect;
                        return [4 /*yield*/, form.validate({ hello: 'world' })];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toBeUndefined();
                        expect(connection.request).toHaveBeenCalledWith(Events_1.CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_VALIDATE, { hello: 'world' });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('ContentEditorForm.setValue', function () {
        it('should return undefined if no errors found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        jest.spyOn(connection, 'request').mockReturnValue(Promise.resolve([]));
                        _a = expect;
                        return [4 /*yield*/, form.setValue({ hello: 'world' })];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toBeUndefined();
                        expect(connection.request).toHaveBeenCalledWith(Events_1.CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_SET, {
                            hello: 'world',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        var testError = {
            message: 'wrong',
            pointer: '/here',
            data: {
                keyword: 'fail',
                params: {},
            },
            schema: {
                id: 'aschema',
                pointer: '/blah/blah',
            },
        };
        it('setValue(testValue) should throw when validation errors are returned', function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(connection, 'request').mockResolvedValue([testError]);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, form.setValue({ hello: 'world' })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        expect(e_1).toEqual([testError]);
                        done();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    describe('ContentEditorForm.getValue', function () {
        it('should get the value of the form', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        jest.spyOn(connection, 'request').mockReturnValue(Promise.resolve({ hello: 'world' }));
                        _a = expect;
                        return [4 /*yield*/, form.getValue()];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toEqual({ hello: 'world' });
                        expect(connection.request).toHaveBeenCalledWith(Events_1.CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_GET);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw error if no model available', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                jest.spyOn(connection, 'request').mockReturnValue(Promise.reject(undefined));
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                expect(form.getValue()).rejects.toThrowError(Errors_1.FORM.NO_MODEL);
                return [2 /*return*/];
            });
        }); });
    });
});
//# sourceMappingURL=ContentEditorForm.spec.js.map