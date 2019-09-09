import { ContentItem } from '../src/ContentItem';
describe('Content Item Body', () => {

  it('should generate a content item ', ()=>{
    const cItemObject = {
      id: "id",
      label: "contentLabel",
      body: {
        "_meta": {
          "name": "blah",
          "schema": "blah"
        },
        "hi": "there"
      },
      deliveryId: "fadfasdf"
    }
    const cItem = new ContentItem(cItemObject);
  })

});