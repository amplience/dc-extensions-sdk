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
    navigator = new ContentEditorApplicationNavigator(
      connection,
      'http://test.com/#!/hubname/',
      localWindow
    );
  });

  describe('openContentItem', () => {
    it('should return window location to authoring endpoint', () => {
      const href = navigator.openContentItem({ id: '123' }, { returnHref: true });

      expect(href).toEqual('http://test.com/#!/hubname/authoring/content-item/edit/123');
    });

    it('should set window location to authoring endpoint', () => {
      navigator.openContentItem({ id: '123' }, { returnHref: false });

      expect(localWindow.parent.location.href).toEqual(
        'http://test.com/#!/hubname/authoring/content-item/edit/123'
      );
    });
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
