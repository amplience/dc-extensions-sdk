"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-floating-promises */
var message_event_channel_1 = require("message-event-channel");
var Events_1 = require("../constants/Events");
var MediaLink_1 = require("./MediaLink");
describe('ContentItem', function () {
    var connection;
    var media;
    beforeEach(function () {
        connection = new message_event_channel_1.ClientConnection();
        media = new MediaLink_1.MediaLink(connection);
    });
    it('should be able to request image media browser', function () {
        jest.spyOn(connection, 'request').mockResolvedValue({});
        media.getImage();
        expect(connection.request).toHaveBeenCalledWith(Events_1.MEDIA_LINK.IMAGE_GET, null, { timeout: false });
    });
    it('should be able to request video media browser', function () {
        jest.spyOn(connection, 'request').mockResolvedValue({});
        media.getVideo();
        expect(connection.request).toHaveBeenCalledWith(Events_1.MEDIA_LINK.VIDEO_GET, null, { timeout: false });
    });
    it('should be able to request video media browser an ask for multiple', function () {
        jest.spyOn(connection, 'request').mockResolvedValue({});
        media.getVideos();
        expect(connection.request).toHaveBeenCalledWith(Events_1.MEDIA_LINK.VIDEO_GET, { max: null }, { timeout: false });
    });
    it('should be able to request video media browser an ask for multiple if asked for max send number', function () {
        jest.spyOn(connection, 'request').mockResolvedValue({});
        media.getVideos({ max: 4 });
        expect(connection.request).toHaveBeenCalledWith(Events_1.MEDIA_LINK.VIDEO_GET, { max: 4 }, { timeout: false });
    });
    it('should be able to request image media browser an ask for multiple', function () {
        jest.spyOn(connection, 'request').mockResolvedValue({});
        media.getImages();
        expect(connection.request).toHaveBeenCalledWith(Events_1.MEDIA_LINK.IMAGE_GET, { max: null }, { timeout: false });
    });
    it('should be able to request image media browser an ask for multiple if passed max send number', function () {
        jest.spyOn(connection, 'request').mockResolvedValue({});
        media.getImages({ max: 5 });
        expect(connection.request).toHaveBeenCalledWith(Events_1.MEDIA_LINK.IMAGE_GET, { max: 5 }, { timeout: false });
    });
});
//# sourceMappingURL=MediaLink.spec.js.map