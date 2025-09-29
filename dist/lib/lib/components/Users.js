"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.Users = void 0;
var Users_1 = require("../constants/Users");
var GraphQLClient_1 = require("./GraphQLClient");
var HttpClient_1 = require("./HttpClient");
var orgUsersQuery = "\n  query getOrganizationMembersByOrgId($orgId: ID!, $first: Int!, $after: String) {\n    node(id: $orgId) {\n      id\n      ... on Organization {\n        id\n        members(first: $first, after: $after) {\n          edges {\n            node {\n              id\n              email\n              picture\n              name\n            }\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            startCursor\n            endCursor\n          }\n        }\n      }\n    }\n  }";
var Users = /** @class */ (function () {
    function Users(connection, hub) {
        this.hub = hub;
        this.httpClient = new HttpClient_1.HttpClient(connection);
        this.graphQlClient = new GraphQLClient_1.GraphQlClient(connection);
    }
    Users.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, orgUsers, authUsers, includesUser, uniqueByEmail;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([this.getOrgUsers(), this.getAuthUsers()])];
                    case 1:
                        _a = _b.sent(), orgUsers = _a[0], authUsers = _a[1];
                        includesUser = function (users, user) {
                            return Boolean(users.find(function (_a) {
                                var email = _a.email;
                                return email === user.email;
                            }));
                        };
                        uniqueByEmail = function (users, user) {
                            return includesUser(users, user) ? users : __spreadArrays(users, [user]);
                        };
                        return [2 /*return*/, __spreadArrays(orgUsers, authUsers).map(this.transformUser).reduce(uniqueByEmail, [])];
                }
            });
        });
    };
    Users.prototype.getAuthUsers = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.request({
                                url: Users_1.USERS_URL,
                                method: HttpClient_1.HttpMethod.GET,
                            })];
                    case 1:
                        response = _b.sent();
                        if (response.status !== 200) {
                            throw new Error("API responded with a non 200 status code. Error: " + (response.data || "status code " + response.status));
                        }
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data) || []];
                    case 2:
                        error_1 = _b.sent();
                        throw new Error("Unable to get users: " + (error_1 === null || error_1 === void 0 ? void 0 : error_1.message));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Users.prototype.getOrgUsers = function (after) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var organisationId, vars, response, members, _b, hasNextPage, endCursor, otherMembers, _c, error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        organisationId = this.hub.organizationId;
                        if (!organisationId) {
                            return [2 /*return*/, []];
                        }
                        vars = __assign({ orgId: btoa("Organization:" + organisationId), first: 100 }, (after ? { after: after } : null));
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.graphQlClient.query(orgUsersQuery, vars)];
                    case 2:
                        response = (_d.sent());
                        members = (_a = response === null || response === void 0 ? void 0 : response.node) === null || _a === void 0 ? void 0 : _a.members;
                        if (!members) {
                            return [2 /*return*/, []];
                        }
                        _b = members.pageInfo, hasNextPage = _b.hasNextPage, endCursor = _b.endCursor;
                        if (!hasNextPage) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getOrgUsers(endCursor)];
                    case 3:
                        _c = _d.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _c = [];
                        _d.label = 5;
                    case 5:
                        otherMembers = _c;
                        return [2 /*return*/, __spreadArrays(members.edges.reduce(this.transformMembersToAuthUsers, []), otherMembers)];
                    case 6:
                        error_2 = _d.sent();
                        return [2 /*return*/, []];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Users.prototype.transformMembersToAuthUsers = function (members, _a) {
        var member = _a.node;
        var parsedId = atob(member.id);
        var uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
        var userId = parsedId.match(uuidRegex);
        return userId
            ? __spreadArrays(members, [
                {
                    id: userId[0].toLowerCase(),
                    attributes: {
                        email: member.email,
                        'first-name': member.name,
                        'last-name': '',
                    },
                },
            ]) : members;
    };
    Users.prototype.transformUser = function (authUser) {
        return {
            id: authUser.id,
            firstName: authUser.attributes['first-name'],
            lastName: authUser.attributes['last-name'],
            email: authUser.attributes.email,
        };
    };
    return Users;
}());
exports.Users = Users;
//# sourceMappingURL=Users.js.map