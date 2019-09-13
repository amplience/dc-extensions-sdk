import { ClientConnection } from 'message.io';
import { CONTENT_LINK } from './Events';
export interface ContentItemLink {
  _meta: Meta;
  id: string;
  contentType: string;
}
interface Meta {
  schema: string;
}
export class ContentLink {
  constructor(private connection: ClientConnection) {}
  get(schemas: Array<string>): Promise<ContentItemLink> {
    return this.connection.request(CONTENT_LINK.CONTENT_GET, schemas);
  }
}
