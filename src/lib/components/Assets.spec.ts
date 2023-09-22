import { ClientConnection } from 'message-event-channel';
import { Assets } from './Assets';

const asset = {
  srcName: 'an-image.jpg',
  revisionNumber: 8,
  bucketID: '00000000-0000-0000-0000-000000000000',
  label: 'an-image.jpg',
  mimeType: 'image/jpeg',
  type: 'image',
  userID: '00000000-0000-0000-0000-000000000000',
  thumbFile: '00000000-0000-0000-0000-000000000000',
  folderID: '00000000-0000-0000-0000-000000000000',
  file: '00000000-0000-0000-0000-000000000000',
  createdDate: 1683798022161,
  name: 'an-image',
  subType: null,
  id: '634e3733-91d4-41d3-b340-011e2d2d5103',
  thumbURL: 'https://thumbs.amplience.net/r/00000000-0000-0000-0000-000000000000',
  publishStatus: 'PUBLISHED',
  status: 'active',
  timestamp: 1688563779803,
};

describe('Assets', () => {
  let connection: ClientConnection;
  let assets: Assets;

  beforeEach(() => {
    connection = new ClientConnection();
    assets = new Assets(connection);
  });

  describe('getById', () => {
    it('Should get asset', async () => {
      jest.spyOn(connection, 'request').mockResolvedValue(asset);

      const response = await assets.getById('123-456-789');

      expect(response).toBe(asset);
    });
    it('Should return an error if get asset fails', () => {
      jest.spyOn(connection, 'request').mockRejectedValue(new Error('Could not get asset'));

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      expect(assets.getById('123-456-789')).rejects.toThrow('Could not get asset');
    });
  });
});
