"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContentEditorContextObject_1 = require("./ContentEditorContextObject");
describe('ContentEditorContextObject', function () {
    describe('isContentEditorContextObject', function () {
        it('should return true with a valid content field context', function () {
            var context = {
                category: 'CONTENT_EDITOR',
                contentItemId: '12345678-abcd-1234-1234-abcdef123456',
                schema: {
                    title: 'test-field-schema-title',
                    type: 'test-field-schema-type',
                    description: 'test-field-schema-desc',
                    properties: {
                        title: {
                            type: 'string',
                        },
                    },
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
                hub: { id: 'hubId', name: 'hubName' }
            };
            expect(ContentEditorContextObject_1.isContentEditorContextObject(context)).toBe(true);
        });
        it('should return false when context does not contain content field params', function () {
            var context = {
                params: { installation: {}, instance: {} },
            };
            expect(ContentEditorContextObject_1.isContentEditorContextObject(context)).toBe(false);
        });
    });
});
//# sourceMappingURL=ContentEditorContextObject.spec.js.map