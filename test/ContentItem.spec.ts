import { ClientConnection } from 'message.io';
import { CONTENT_ITEM } from '../src/lib/Events';
import { ContentItem } from '../src/lib/ContentItem';
import { ContentItemModel } from '../src/lib/models/ContentItemModel';
describe('ContentItem', () => {
  let connection: ClientConnection;
  const contentItemModel: ContentItemModel = {
    id: 'id',
    label: 'My Content Item',
    body: {
      _meta: {
        name: 'Name',
        schema: 'http://www.aschema.com'
      }
    },
    deliveryId: 'deliveryId'
  };
  beforeAll(() => {
    connection = new ClientConnection();
  });

  it('Constructor should assign Content Item Id and it should be accessible', () => {
    const contentItem: ContentItem = new ContentItem(connection, 'myid');
    expect(contentItem.id === 'myid');
  });

  it('Constructor should allow for no Content Item Id argument', () => {
    const contentItem: ContentItem = new ContentItem(connection);
    expect(contentItem.id === undefined);
  });

  it('getValue() should make one request with CONTENT_ITEM.GET event', async () => {
    const requestSpy = spyOn(connection, 'request');
    const contentItem: ContentItem = new ContentItem(connection, 'myid');
    await contentItem.getValue();
    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy).toHaveBeenCalledWith(CONTENT_ITEM.GET);
  });

  it('getValue() should return what comes back from the request', async () => {
    const p: Promise<object> = new Promise(resolve => {
      resolve(contentItemModel);
    });
    spyOn(connection, 'request').and.returnValue(p);
    const contentItem: ContentItem = new ContentItem(connection, 'myid');
    const value = await contentItem.getValue();
    expect(value).toEqual(contentItemModel);
  });
});
