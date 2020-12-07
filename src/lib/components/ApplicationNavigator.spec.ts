import { APPLICATION_NAVIGATOR } from '../constants/Errors';
import { ApplicationNavigator } from './ApplicationNavigator';

describe('ApplicationNavigator', () => {
  it('should error if locationHref does not contain a hash bang (#!)', () => {
    expect(() =>
      new ApplicationNavigator('http://example.com/', window).openContentLibrary()
    ).toThrowError(APPLICATION_NAVIGATOR.MUST_INCLUDE_HASH_BANG);
  });

  describe('window has a parent window ref', () => {
    let mockWindow: Window;
    let applicationNavigation: ApplicationNavigator;

    beforeEach(() => {
      mockWindow = ({ parent: { location: { href: undefined } } } as unknown) as Window;
      applicationNavigation = new ApplicationNavigator(
        'https://example.com/#!/HUB_NAME/dashboard',
        mockWindow
      );
    });

    describe('openEventsCalendar()', () => {
      const expectedUrl = 'https://example.com/#!/HUB_NAME/planning/events/calendar';

      it('should return navigate to the requested route ', () => {
        expect(applicationNavigation.openEventsCalendar()).toBeUndefined();
        expect(mockWindow.parent.location.href).toEqual(expectedUrl);
      });

      it('should open return the href', () => {
        expect(applicationNavigation.openEventsCalendar({ returnHref: true })).toEqual(expectedUrl);
        expect(mockWindow.parent.location.href).toBeUndefined();
      });
    });

    describe('openEventsTimeline()', () => {
      const expectedUrl = 'https://example.com/#!/HUB_NAME/planning/events/timeline';

      it('should return navigate to the requested route ', () => {
        expect(applicationNavigation.openEventsTimeline()).toBeUndefined();
        expect(mockWindow.parent.location.href).toEqual(expectedUrl);
      });

      it('should open return the href', () => {
        expect(applicationNavigation.openEventsTimeline({ returnHref: true })).toEqual(expectedUrl);
        expect(mockWindow.parent.location.href).toBeUndefined();
      });
    });

    describe('openEventsList()', () => {
      const expectedUrl = 'https://example.com/#!/HUB_NAME/planning/events/list';

      it('should return navigate to the requested route ', () => {
        expect(applicationNavigation.openEventsList()).toBeUndefined();
        expect(mockWindow.parent.location.href).toEqual(expectedUrl);
      });

      it('should open return the href', () => {
        expect(applicationNavigation.openEventsList({ returnHref: true })).toEqual(expectedUrl);
        expect(mockWindow.parent.location.href).toBeUndefined();
      });
    });

    describe('openEvent()', () => {
      const expectedUrl = 'https://example.com/#!/HUB_NAME/planning/event/EVENT_ID';
      const eventId = 'EVENT_ID';

      it('should return navigate to the requested route ', () => {
        expect(applicationNavigation.openEvent(eventId)).toBeUndefined();
        expect(mockWindow.parent.location.href).toEqual(expectedUrl);
      });

      it('should open return the href', () => {
        expect(applicationNavigation.openEvent(eventId, { returnHref: true })).toEqual(expectedUrl);
        expect(mockWindow.parent.location.href).toBeUndefined();
      });
    });

    describe('openEdition()', () => {
      const expectedUrl = 'https://example.com/#!/HUB_NAME/planning/edition/EVENT_ID/EDITION_ID/';
      const edition = {
        id: 'EDITION_ID',
        eventId: 'EVENT_ID',
      };

      it('should return navigate to the requested route ', () => {
        expect(applicationNavigation.openEdition(edition)).toBeUndefined();
        expect(mockWindow.parent.location.href).toEqual(expectedUrl);
      });

      it('should open return the href', () => {
        expect(applicationNavigation.openEdition(edition, { returnHref: true })).toEqual(
          expectedUrl
        );
        expect(mockWindow.parent.location.href).toBeUndefined();
      });
    });
    describe('openContentLibrary()', () => {
      const expectedUrl = 'https://example.com/#!/HUB_NAME/authoring/content-items';

      it('should return navigate to the requested route ', () => {
        expect(applicationNavigation.openContentLibrary()).toBeUndefined();
        expect(mockWindow.parent.location.href).toEqual(expectedUrl);
      });

      it('should open return the href', () => {
        expect(applicationNavigation.openContentLibrary({ returnHref: true })).toEqual(expectedUrl);
        expect(mockWindow.parent.location.href).toBeUndefined();
      });
    });

    describe('openContentItem()', () => {
      const expectedUrl =
        'https://example.com/#!/HUB_NAME/authoring/content-item/edit/CONTENT_ITEM_ID';
      const contentItem = { id: 'CONTENT_ITEM_ID' };

      it('should return navigate to the requested route ', () => {
        expect(applicationNavigation.openContentItem(contentItem)).toBeUndefined();
        expect(mockWindow.parent.location.href).toEqual(expectedUrl);
      });

      it('should open return the href', () => {
        expect(applicationNavigation.openContentItem(contentItem, { returnHref: true })).toEqual(
          expectedUrl
        );
        expect(mockWindow.parent.location.href).toBeUndefined();
      });
    });
  });
});
