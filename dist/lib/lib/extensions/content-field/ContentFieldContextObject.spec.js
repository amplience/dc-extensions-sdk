"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContentFieldContextObject_1 = require("./ContentFieldContextObject");
describe('ContentFieldContextObject', function () {
    describe('isContentFieldContextObject', function () {
        it('should return true with a valid content field context', function () {
            var context = {
                category: 'CONTENT_FIELD',
                contentItemId: '12345678-abcd-1234-1234-abcdef123456',
                fieldSchema: {
                    title: 'test-field-schema-title',
                    type: 'test-field-schema-type',
                    description: 'test-field-schema-desc',
                    'ui:extension': {},
                },
                params: {
                    installation: {},
                    instance: {},
                },
                locales: {
                    default: ['en'],
                },
                stagingEnvironment: 'https://test-staging-environment',
                visualisation: 'test-visualization',
                readOnly: true,
                hub: { id: 'hubId', name: 'hubName' },
            };
            expect(ContentFieldContextObject_1.isContentFieldContextObject(context)).toBe(true);
        });
        it('should return false when context does not contain content field params', function () {
            var context = {
                params: { installation: {}, instance: {} },
            };
            expect(ContentFieldContextObject_1.isContentFieldContextObject(context)).toBe(false);
        });
    });
});
//# sourceMappingURL=ContentFieldContextObject.spec.js.map