"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Extension_1 = require("./Extension");
describe('Extension', function () {
    describe('isContextObject', function () {
        it('should return true when passed a valid context object', function () {
            var context = {
                params: {
                    installation: {},
                    instance: {},
                },
            };
            expect(Extension_1.isContextObject(context)).toBe(true);
        });
        it('should return true when context object has undefined instance param', function () {
            var context = {
                params: {
                    installation: {},
                    instance: undefined,
                },
            };
            expect(Extension_1.isContextObject(context)).toBe(true);
        });
        it('should return false when context object has undefined installation param', function () {
            var context = {
                params: {
                    installation: undefined,
                    instance: {},
                },
            };
            expect(Extension_1.isContextObject(context)).toBe(false);
        });
        it('should return false when context object is missing all params', function () {
            var context = {};
            expect(Extension_1.isContextObject(context)).toBe(false);
        });
        it('should return false when context object has empty params', function () {
            var context = { params: {} };
            expect(Extension_1.isContextObject(context)).toBe(false);
        });
    });
});
//# sourceMappingURL=Extension.spec.js.map