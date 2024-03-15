import { Event } from '../models/Event';
import { Edition } from '../models/Edition';
import { BaseNavigator } from './BaseNavigator';
import { OpenOptions } from '../constants/Navigation';
import { ContentItemModel } from '../models/ContentItemModel';

export class ApplicationNavigator {
  private navigationService: BaseNavigator;

  constructor(locationHref: string, window: Window) {
    this.navigationService = new BaseNavigator(locationHref, window);
  }

  openEventsCalendar(options: Partial<OpenOptions> = {}): undefined | string {
    return this.navigationService.navigate(`/planning/events/calendar`, options);
  }

  openEventsTimeline(options: Partial<OpenOptions> = {}): undefined | string {
    return this.navigationService.navigate(`/planning/events/timeline`, options);
  }

  openEventsList(options: Partial<OpenOptions> = {}): undefined | string {
    return this.navigationService.navigate(`/planning/events/list`, options);
  }

  openEvent(event: Event, options: Partial<OpenOptions> = {}): undefined | string {
    return this.navigationService.navigate(`/planning/event/${event.id}`, options);
  }

  openEdition(edition: Edition, options: Partial<OpenOptions> = {}): undefined | string {
    return this.navigationService.navigate(
      `/planning/edition/${edition.eventId}/${edition.id}/`,
      options
    );
  }

  openContentLibrary(options: Partial<OpenOptions> = {}): undefined | string {
    return this.navigationService.navigate(`/authoring/content-items`, options);
  }

  openContentItem(
    contentItem: Partial<ContentItemModel>,
    options: Partial<OpenOptions> = {}
  ): undefined | string {
    return this.navigationService.navigate(
      `/authoring/content-item/edit/${contentItem.id}`,
      options
    );
  }
}
