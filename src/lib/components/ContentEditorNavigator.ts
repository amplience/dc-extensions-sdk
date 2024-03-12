import { BaseNavigator } from './BaseNavigator';
import { OpenOptions } from '../constants/Navigation';
import { ContentItemModel } from '../models/ContentItemModel';
import { ClientConnection } from 'message-event-channel';

export class ContentEditorApplicationNavigator {
  private navigationService: BaseNavigator;

  constructor(private readonly connection: ClientConnection, locationHref: string, window: Window) {
    this.navigationService = new BaseNavigator(locationHref, window);
  }

  openContentItem(contentItem: Partial<ContentItemModel>, options: Partial<OpenOptions> = {}) {
    return this.navigationService.navigate(
      `/authoring/content-item/edit/${contentItem.id}`,
      options
    );
  }

  editContentItem(contentItemId: string, contentTypeUri: string) {
    return this.connection.request<void>('navigate-to-nested', {
      uri: contentTypeUri,
      id: contentItemId,
    });
  }
}
