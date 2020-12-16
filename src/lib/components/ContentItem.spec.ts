import { ClientConnection } from 'message-event-channel';
import { CONTENT_ITEM } from '../constants/Events';
import { ContentItem } from './ContentItem';
import { ContentItemModel } from '../models/ContentItemModel';
describe('ContentItem', () => {
  let connection: ClientConnection;
  const contentItemModel: ContentItemModel = {
    id: 'id',
    label: 'My Content Item',
    body: {
      _meta: {
        name: 'Name',
        schema: 'http://www.aschema.com',
      },
    },
    version: 1,
    deliveryId: 'deliveryId',
  };
  beforeAll(() => {
    connection = new ClientConnection();
  });

  it('getCurrent() should make one request with CONTENT_ITEM.GET event', async () => {
    const requestSpy = jest.spyOn(connection, 'request').mockResolvedValue({});
    const contentItem: ContentItem = new ContentItem(connection);
    await contentItem.getCurrent();
    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy).toHaveBeenCalledWith(CONTENT_ITEM.GET);
  });

  it('getCurrent() should return what comes back from the request', async () => {
    const p: Promise<object> = new Promise((resolve) => {
      resolve(contentItemModel);
    });
    jest.spyOn(connection, 'request').mockReturnValue(p);
    const contentItem: ContentItem = new ContentItem(connection);
    const value = await contentItem.getCurrent();
    expect(value).toEqual(contentItemModel);
  });
});
