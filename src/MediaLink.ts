import { ClientConnection } from 'message.io';
import { MEDIA_LINK } from './Events';
export interface MediaImageLink {
  _meta: Meta;
  id: string;
  name: string;
  endpoint: string;
  defaultHost: string;
}
interface Meta {
  schema: string;
}
export interface MediaVideoLink {
  _meta: Meta;
}
export class MediaLink {
  constructor(private connection: ClientConnection) {}
  getImage(): Promise<MediaImageLink> {
    return this.connection.request(MEDIA_LINK.IMAGE_GET);
  }
  getVideo(): Promise<MediaVideoLink> {
    return this.connection.request(MEDIA_LINK.VIDEO_GET);
  }
}
