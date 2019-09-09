import { ContentItemBody, ContentItemBodyObject } from '../src/ContentItemBody';

describe('Content Item Body', () => {
  it('should return JSON that matches source', () => {
    const cBodyJson = {
      "_meta": {
        "name": "blah",
        "schema": "blah"
      },
      "hi": "there"
    }
    const cBody = new ContentItemBody(cBodyJson);
    expect(cBody instanceof ContentItemBody).toBeTruthy();
    expect(cBody.toJSON()).toEqual(cBodyJson);
  });
});