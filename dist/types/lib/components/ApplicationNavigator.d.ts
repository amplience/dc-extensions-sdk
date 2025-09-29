import { Event } from '../models/Event';
import { Edition } from '../models/Edition';
import { OpenOptions } from '../constants/Navigation';
import { ContentItemModel } from '../models/ContentItemModel';
export declare class ApplicationNavigator {
    private navigationService;
    constructor(locationHref: string, window: Window);
    openEventsCalendar(options?: Partial<OpenOptions>): undefined | string;
    openEventsTimeline(options?: Partial<OpenOptions>): undefined | string;
    openEventsList(options?: Partial<OpenOptions>): undefined | string;
    openEvent(event: Event, options?: Partial<OpenOptions>): undefined | string;
    openEdition(edition: Edition, options?: Partial<OpenOptions>): undefined | string;
    openContentLibrary(options?: Partial<OpenOptions>): undefined | string;
    openContentItem(contentItem: Partial<ContentItemModel>, options?: Partial<OpenOptions>): undefined | string;
}
