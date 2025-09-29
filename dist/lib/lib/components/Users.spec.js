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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-floating-promises */
var message_event_channel_1 = require("message-event-channel");
var HttpClient_1 = require("./HttpClient");
var Users_1 = require("./Users");
describe('Users', function () {
    var connection;
    var users;
    beforeEach(function () {
        connection = new message_event_channel_1.ClientConnection();
        users = new Users_1.Users(connection, { id: 'hubId', name: 'hubName', organizationId: '1234' });
    });
    it('should return a list of users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var request, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    request = jest.spyOn(connection, 'request').mockImplementation(function (action) {
                        if (action === 'dc-management-sdk-js:request') {
                            return Promise.resolve({
                                status: 200,
                                data: {
                                    data: [
                                        {
                                            id: '7078e5e7-d5bf-4015-4832-b75fb6f60537',
                                            type: 'users',
                                            attributes: {
                                                email: 'testuser@bigcontent.io',
                                                'first-name': 'Test',
                                                'last-name': 'User',
                                                status: 'ACTIVE',
                                            },
                                            links: {
                                                self: '{AUTH}/users/7078e5e7-d5bf-4015-4832-b75fb6f60537',
                                            },
                                        },
                                    ],
                                    links: {
                                        self: '{AUTH}/users',
                                    },
                                },
                            });
                        }
                        return Promise.resolve({
                            data: {
                                node: {
                                    members: {
                                        edges: [
                                            {
                                                node: {
                                                    id: 'VXNlcjoxMTExMTExMS0xMTExLTExMTEtMTExMS0xMTExMTExMTExMTE=',
                                                    email: 'test@amplience.com',
                                                    name: 'Test user',
                                                },
                                            },
                                        ],
                                        pageInfo: { hasNextPage: false, endCursor: '1234' },
                                    },
                                },
                            },
                        });
                    });
                    return [4 /*yield*/, users.list()];
                case 1:
                    response = _a.sent();
                    expect(request).toHaveBeenCalledWith('dc-management-sdk-js:request', {
                        url: 'https://auth.amplience.net/users',
                        method: HttpClient_1.HttpMethod.GET,
                        headers: undefined,
                        data: undefined,
                    });
                    expect(response).toEqual([
                        {
                            id: '11111111-1111-1111-1111-111111111111',
                            firstName: 'Test user',
                            lastName: '',
                            email: 'test@amplience.com',
                        },
                        {
                            id: '7078e5e7-d5bf-4015-4832-b75fb6f60537',
                            firstName: 'Test',
                            lastName: 'User',
                            email: 'testuser@bigcontent.io',
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return an empty user list', function () { return __awaiter(void 0, void 0, void 0, function () {
        var request, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    request = jest.spyOn(connection, 'request').mockResolvedValue({
                        status: 200,
                        data: {
                            data: [],
                            links: {
                                self: '{AUTH}/users',
                            },
                        },
                    });
                    return [4 /*yield*/, users.list()];
                case 1:
                    response = _a.sent();
                    expect(request).toHaveBeenCalledWith('dc-management-sdk-js:request', {
                        url: 'https://auth.amplience.net/users',
                        method: HttpClient_1.HttpMethod.GET,
                        headers: undefined,
                        data: undefined,
                    });
                    expect(response).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw an error', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(connection, 'request').mockRejectedValue({
                        status: 401,
                    });
                    return [4 /*yield*/, expect(users.list()).rejects.toThrowErrorMatchingInlineSnapshot("\"Unable to get users: API responded with a non 200 status code. Error: status code 401\"")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should make users unique by email and org users should take preference', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(connection, 'request').mockImplementation(function (action) {
                        if (action === 'dc-management-sdk-js:request') {
                            return Promise.resolve({
                                status: 200,
                                data: {
                                    data: [
                                        {
                                            id: '7078e5e7-d5bf-4015-4832-b75fb6f60537',
                                            type: 'users',
                                            attributes: {
                                                email: 'test@amplience.com',
                                                'first-name': 'Auth',
                                                'last-name': 'User',
                                                status: 'ACTIVE',
                                            },
                                            links: {
                                                self: '{AUTH}/users/7078e5e7-d5bf-4015-4832-b75fb6f60537',
                                            },
                                        },
                                    ],
                                    links: {
                                        self: '{AUTH}/users',
                                    },
                                },
                            });
                        }
                        return Promise.resolve({
                            data: {
                                node: {
                                    members: {
                                        edges: [
                                            {
                                                node: {
                                                    id: 'VXNlcjoxMTExMTExMS0xMTExLTExMTEtMTExMS0xMTExMTExMTExMTE=',
                                                    email: 'test@amplience.com',
                                                    name: 'Org User',
                                                },
                                            },
                                        ],
                                        pageInfo: { hasNextPage: false, endCursor: '1234' },
                                    },
                                },
                            },
                        });
                    });
                    return [4 /*yield*/, users.list()];
                case 1:
                    response = _a.sent();
                    expect(response.length).toEqual(1);
                    expect(response[0].firstName).toEqual('Org User');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should handle missing organisationId', function () { return __awaiter(void 0, void 0, void 0, function () {
        var users, request, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    users = new Users_1.Users(connection, {
                        id: 'hubId',
                        name: 'hubName',
                        organizationId: undefined,
                    });
                    request = jest.spyOn(connection, 'request').mockResolvedValue({
                        status: 200,
                        data: {
                            data: [
                                {
                                    id: '7078e5e7-d5bf-4015-4832-b75fb6f60537',
                                    type: 'users',
                                    attributes: {
                                        email: 'test@amplience.com',
                                        'first-name': 'Test',
                                        'last-name': 'User',
                                        status: 'ACTIVE',
                                    },
                                    links: {
                                        self: '{AUTH}/users/7078e5e7-d5bf-4015-4832-b75fb6f60537',
                                    },
                                },
                            ],
                            links: {
                                self: '{AUTH}/users',
                            },
                        },
                    });
                    return [4 /*yield*/, users.list()];
                case 1:
                    response = _a.sent();
                    expect(request).not.toHaveBeenCalledWith('dc-management-sdk-js:graphQL', jasmine.any(Object));
                    expect(response).toEqual([
                        {
                            id: '7078e5e7-d5bf-4015-4832-b75fb6f60537',
                            firstName: 'Test',
                            lastName: 'User',
                            email: 'test@amplience.com',
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should get all users if > 100 org users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var orgUsers, getPage, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orgUsers = Array.from({ length: 200 }).map(function (_, i) { return ({
                        node: {
                            id: btoa('User:11111111-1111-1111-1111-111111111000'.replace(/000/g, ("" + i).padStart(3, '0'))),
                            email: "test" + i + "@amplience.com",
                            name: "Test user " + i,
                        },
                    }); });
                    getPage = function () {
                        // @ts-ignore
                        return Array.from({ length: 100 }).reduce(function (m) { return __spreadArrays(m, [orgUsers.shift()]); }, []);
                    };
                    jest.spyOn(connection, 'request').mockImplementation(function (action) {
                        if (action === 'dc-management-sdk-js:request') {
                            return Promise.resolve({
                                status: 200,
                                data: {
                                    data: [],
                                    links: {
                                        self: '{AUTH}/users',
                                    },
                                },
                            });
                        }
                        return Promise.resolve({
                            data: {
                                node: {
                                    members: {
                                        edges: getPage(),
                                        pageInfo: { hasNextPage: Boolean(orgUsers.length), endCursor: '1234' },
                                    },
                                },
                            },
                        });
                    });
                    return [4 /*yield*/, users.list()];
                case 1:
                    response = _a.sent();
                    expect(response.length).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should handle incorrect org user response', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(connection, 'request').mockImplementation(function (action) {
                        if (action === 'dc-management-sdk-js:request') {
                            return Promise.resolve({
                                status: 200,
                                data: {
                                    data: [
                                        {
                                            id: '7078e5e7-d5bf-4015-4832-b75fb6f60537',
                                            type: 'users',
                                            attributes: {
                                                email: 'test@amplience.com',
                                                'first-name': 'Test',
                                                'last-name': 'User',
                                                status: 'ACTIVE',
                                            },
                                            links: {
                                                self: '{AUTH}/users/7078e5e7-d5bf-4015-4832-b75fb6f60537',
                                            },
                                        },
                                    ],
                                    links: {
                                        self: '{AUTH}/users',
                                    },
                                },
                            });
                        }
                        return Promise.resolve({
                            data: {
                                bad: {},
                            },
                        });
                    });
                    return [4 /*yield*/, users.list()];
                case 1:
                    response = _a.sent();
                    expect(response.length).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should handle org user response errors', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(connection, 'request').mockImplementation(function (action) {
                        if (action === 'dc-management-sdk-js:request') {
                            return Promise.resolve({
                                status: 200,
                                data: {
                                    data: [
                                        {
                                            id: '7078e5e7-d5bf-4015-4832-b75fb6f60537',
                                            type: 'users',
                                            attributes: {
                                                email: 'test@amplience.com',
                                                'first-name': 'Test',
                                                'last-name': 'User',
                                                status: 'ACTIVE',
                                            },
                                            links: {
                                                self: '{AUTH}/users/7078e5e7-d5bf-4015-4832-b75fb6f60537',
                                            },
                                        },
                                    ],
                                    links: {
                                        self: '{AUTH}/users',
                                    },
                                },
                            });
                        }
                        return Promise.resolve({
                            data: {
                                node: {
                                    members: { bad: 'format' },
                                },
                            },
                        });
                    });
                    return [4 /*yield*/, users.list()];
                case 1:
                    response = _a.sent();
                    expect(response.length).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should not return org user with invalid IDs', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(connection, 'request').mockImplementation(function (action) {
                        if (action === 'dc-management-sdk-js:request') {
                            return Promise.resolve({
                                status: 200,
                                data: {
                                    data: [],
                                    links: {
                                        self: '{AUTH}/users',
                                    },
                                },
                            });
                        }
                        return Promise.resolve({
                            data: {
                                node: {
                                    members: {
                                        edges: [
                                            {
                                                node: {
                                                    id: 'VXNlcjoxMTExMTExMS0xMTExLTExMTEtMTExMS0xMTExMTExMTExMTE=',
                                                    email: 'test@amplience.com',
                                                    name: 'Org User',
                                                },
                                            },
                                            {
                                                node: {
                                                    id: 'this is not valid',
                                                    email: 'invalid@amplience.com',
                                                    name: 'Invalid User',
                                                },
                                            },
                                        ],
                                        pageInfo: { hasNextPage: false, endCursor: '1234' },
                                    },
                                },
                            },
                        });
                    });
                    return [4 /*yield*/, users.list()];
                case 1:
                    response = _a.sent();
                    expect(response.length).toEqual(1);
                    expect(response[0].email).toEqual('test@amplience.com');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=Users.spec.js.map