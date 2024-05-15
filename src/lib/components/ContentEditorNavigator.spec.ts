import { ClientConnection } from 'message-event-channel';
import { ContentEditorApplicationNavigator } from './ContentEditorNavigator';

describe('ContentEditorNavigator', () => {
  let navigator: ContentEditorApplicationNavigator;
  let onSpy: jest.SpyInstance;
  let connection: ClientConnection;
  let localWindow: Window;

  beforeEach(() => {
    connection = new ClientConnection();
    onSpy = jest.spyOn(connection, 'on');
    localWindow = {
      parent: {
        location: {
          href: '',
        },
      },
    } as Window;
    navigator = new ContentEditorApplicationNavigator(connection);
  });

  describe('editContentItem', () => {
    it('should request from connection', async () => {
      jest.spyOn(connection, 'request').mockReturnValue(Promise.resolve());

      await navigator.editContentItem(
        '3fc3a416-574f-48df-aa29-d96fdbdb6279',
        'https://simple-text.com'
      );

      expect(connection.request).toBeCalledWith('navigate-to-nested', {
        uri: 'https://simple-text.com',
        id: '3fc3a416-574f-48df-aa29-d96fdbdb6279',
      });
    });
  });
});
