import { LOCATION_HREF } from '../constants/LocationHref';
import { APPLICATION_NAVIGATOR } from '../constants/Errors';
interface ContentItem {
  id?: string;
}

interface Event {
  id?: string;
}

interface Edition {
  id?: string;
  eventId?: string;
}

export interface OpenOptions {
  returnHref: boolean;
}

export class ApplicationNavigator {
  constructor(private readonly locationHref: string, private window: Window) {}

  openEventsCalendar(options: Partial<OpenOptions> = {}): undefined | string {
    return this.processHref(`${this.getBaseHref()}/planning/events/calendar`, options);
  }

  openEventsTimeline(options: Partial<OpenOptions> = {}): undefined | string {
    return this.processHref(`${this.getBaseHref()}/planning/events/timeline`, options);
  }

  openEventsList(options: Partial<OpenOptions> = {}): undefined | string {
    return this.processHref(`${this.getBaseHref()}/planning/events/list`, options);
  }

  openEvent(event: Event, options: Partial<OpenOptions> = {}): undefined | string {
    return this.processHref(`${this.getBaseHref()}/planning/event/${event.id}`, options);
  }

  openEdition(edition: Edition, options: Partial<OpenOptions> = {}): undefined | string {
    return this.processHref(
      `${this.getBaseHref()}/planning/edition/${edition.eventId}/${edition.id}/`,
      options
    );
  }

  openContentLibrary(options: Partial<OpenOptions> = {}): undefined | string {
    return this.processHref(`${this.getBaseHref()}/authoring/content-items`, options);
  }

  openContentItem(id: ContentItem, options: Partial<OpenOptions> = {}): undefined | string {
    return this.processHref(`${this.getBaseHref()}/authoring/content-item/edit/${id.id}`, options);
  }

  private processHref(href: string, options: Partial<OpenOptions>): string | undefined {
    if (options.returnHref) {
      return href;
    }
    this.window.parent.location.href = href;
  }

  private getBaseHref() {
    if (this.locationHref.indexOf(LOCATION_HREF.HASH_BANG) === -1) {
      throw new Error(APPLICATION_NAVIGATOR.MUST_INCLUDE_HASH_BANG);
    }

    const [baseUrl, hash] = this.locationHref.split(LOCATION_HREF.HASH_BANG);
    const hubName = hash.split('/')[1];
    return `${baseUrl}${LOCATION_HREF.HASH_BANG}/${hubName}`;
  }
}
