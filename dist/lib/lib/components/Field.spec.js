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
var Events_1 = require("../constants/Events");
var Field_1 = require("./Field");
var message_event_channel_1 = require("message-event-channel");
var testValue = {
    hello: 'world',
};
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
describe('Field', function () {
    var connection;
    var field;
    var schema = {
        title: 'My Field',
        type: 'string',
        'ui:extension': { url: '124' },
    };
    beforeAll(function () {
        connection = new message_event_channel_1.ClientConnection();
        field = new Field_1.Field(connection, schema);
    });
    beforeEach(function () {
        jest.resetAllMocks();
    });
    it('set schema should be accessible', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(field.schema).toEqual(schema);
            return [2 /*return*/];
        });
    }); });
    it('getValue() should emit one request with the FIELD.MODEL_GET event and return the value from request', function () { return __awaiter(void 0, void 0, void 0, function () {
        var p, requestSpy, fieldGet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    p = new Promise(function (resolve) {
                        resolve(testValue);
                    });
                    requestSpy = jest.spyOn(connection, 'request').mockReturnValue(p);
                    return [4 /*yield*/, field.getValue()];
                case 1:
                    fieldGet = _a.sent();
                    expect(requestSpy).toHaveBeenCalledTimes(1);
                    expect(requestSpy).toHaveBeenCalledWith(Events_1.FIELD.MODEL_GET);
                    expect(fieldGet).toEqual(testValue);
                    return [2 /*return*/];
            }
        });
    }); });
    it('getValue() should return undefined value from request', function () { return __awaiter(void 0, void 0, void 0, function () {
        var fieldGet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(connection, 'request').mockResolvedValue(undefined);
                    return [4 /*yield*/, field.getValue()];
                case 1:
                    fieldGet = _a.sent();
                    expect(fieldGet).toEqual(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
    it('getValue() should return null value from request', function () { return __awaiter(void 0, void 0, void 0, function () {
        var fieldGet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(connection, 'request').mockResolvedValue(null);
                    return [4 /*yield*/, field.getValue()];
                case 1:
                    fieldGet = _a.sent();
                    expect(fieldGet).toEqual(null);
                    return [2 /*return*/];
            }
        });
    }); });
    it('setValue(testValue) should should emit one request with the FIELD.MODEL_SET event with testValue', function () { return __awaiter(void 0, void 0, void 0, function () {
        var requestSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestSpy = jest.spyOn(connection, 'request');
                    return [4 /*yield*/, expect(field.setValue(testValue)).resolves.toBeUndefined()];
                case 1:
                    _a.sent();
                    expect(requestSpy).toHaveBeenCalledTimes(1);
                    expect(requestSpy).toHaveBeenCalledWith(Events_1.FIELD.MODEL_SET, testValue);
                    return [2 /*return*/];
            }
        });
    }); });
    it('setValue(null) should should emit FIELD.MODEL_SET event with null', function () { return __awaiter(void 0, void 0, void 0, function () {
        var requestSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestSpy = jest.spyOn(connection, 'request');
                    return [4 /*yield*/, expect(field.setValue(null)).resolves.toBeUndefined()];
                case 1:
                    _a.sent();
                    expect(requestSpy).toHaveBeenCalledWith(Events_1.FIELD.MODEL_SET, null);
                    return [2 /*return*/];
            }
        });
    }); });
    it('setValue() should should emit FIELD.MODEL_SET event with undefined value', function () { return __awaiter(void 0, void 0, void 0, function () {
        var requestSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestSpy = jest.spyOn(connection, 'request');
                    return [4 /*yield*/, expect(field.setValue(undefined)).resolves.toBeUndefined()];
                case 1:
                    _a.sent();
                    expect(requestSpy).toHaveBeenCalledWith(Events_1.FIELD.MODEL_SET, undefined);
                    return [2 /*return*/];
            }
        });
    }); });
    it('setValue(testValue) should not throw if no validation errors are returned', function () { return __awaiter(void 0, void 0, void 0, function () {
        var fieldSet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(connection, 'request').mockResolvedValue([]);
                    return [4 /*yield*/, field.setValue(testValue)];
                case 1:
                    fieldSet = _a.sent();
                    expect(fieldSet).toEqual(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
    it('setValue(testValue) should not throw if no validation undefined is returned', function () { return __awaiter(void 0, void 0, void 0, function () {
        var fieldSet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(connection, 'request').mockResolvedValue(undefined);
                    return [4 /*yield*/, field.setValue(testValue)];
                case 1:
                    fieldSet = _a.sent();
                    expect(fieldSet).toEqual(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
    it('setValue(testValue) should throw when validation errors are returned', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(connection, 'request').mockResolvedValue([testError]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, field.setValue(testValue)];
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
    describe('getPath()', function () {
        it('Should get the path', function () { return __awaiter(void 0, void 0, void 0, function () {
            var path;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(connection, 'request').mockResolvedValue('/path/t/0/field');
                        return [4 /*yield*/, field.getPath()];
                    case 1:
                        path = _a.sent();
                        expect(path).toEqual('/path/t/0/field');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('isValid(testValue) should emit one request with the FIELD.MODEL_IS_VALID event with testValue', function () { return __awaiter(void 0, void 0, void 0, function () {
        var requestSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestSpy = jest.spyOn(connection, 'request').mockResolvedValue(true);
                    return [4 /*yield*/, field.isValid(testValue)];
                case 1:
                    _a.sent();
                    expect(requestSpy).toHaveBeenCalledTimes(1);
                    expect(requestSpy).toHaveBeenCalledWith(Events_1.FIELD.MODEL_IS_VALID, testValue);
                    return [2 /*return*/];
            }
        });
    }); });
    it('isValid(testValue) should resolve a false boolean value', function () { return __awaiter(void 0, void 0, void 0, function () {
        var valid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(connection, 'request').mockResolvedValue(true);
                    return [4 /*yield*/, field.isValid(testValue)];
                case 1:
                    valid = _a.sent();
                    expect(typeof valid === 'boolean').toBeTruthy();
                    expect(valid).toEqual(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('isValid(testValue) should resolve a true boolean value', function () { return __awaiter(void 0, void 0, void 0, function () {
        var valid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(connection, 'request').mockResolvedValue(false);
                    return [4 /*yield*/, field.isValid(testValue)];
                case 1:
                    valid = _a.sent();
                    expect(typeof valid === 'boolean').toBeTruthy();
                    expect(valid).toEqual(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validate(testValue) should emit one request with the FIELD.MODEL_VALIDATE event with testValue', function () { return __awaiter(void 0, void 0, void 0, function () {
        var requestSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestSpy = jest.spyOn(connection, 'request').mockResolvedValue([testError]);
                    return [4 /*yield*/, field.validate(testValue)];
                case 1:
                    _a.sent();
                    expect(requestSpy).toHaveBeenCalledTimes(1);
                    expect(requestSpy).toHaveBeenCalledWith(Events_1.FIELD.MODEL_VALIDATE, testValue);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validate(testValue) should return nothing if it resolved with []', function () { return __awaiter(void 0, void 0, void 0, function () {
        var errors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(connection, 'request').mockResolvedValue([]);
                    return [4 /*yield*/, field.validate(testValue)];
                case 1:
                    errors = _a.sent();
                    expect(errors).toEqual(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validate(testValue) should return nothing if it resolved with nothing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var errors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(connection, 'request').mockResolvedValue(undefined);
                    return [4 /*yield*/, field.validate(testValue)];
                case 1:
                    errors = _a.sent();
                    expect(errors).toEqual(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
    it('validate(testValue) should be able to return errors', function () { return __awaiter(void 0, void 0, void 0, function () {
        var errors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(connection, 'request').mockResolvedValue([testError]);
                    return [4 /*yield*/, field.validate(testValue)];
                case 1:
                    errors = _a.sent();
                    expect(errors).toEqual([testError]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to reset model to original value', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(connection, 'request').mockResolvedValue({});
                    return [4 /*yield*/, expect(field.reset()).resolves.toEqual({})];
                case 1:
                    _a.sent();
                    expect(connection.request).toHaveBeenCalledWith(Events_1.FIELD.MODEL_RESET);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=Field.spec.js.map