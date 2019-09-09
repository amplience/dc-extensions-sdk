export interface ContentItemBodyObject {
  _meta: ContentItemMeta,
  [key: string]: any
}

export interface ContentItemMeta {
  name: string,
  schema: string
}


export class ContentItemBody {
  constructor(public body: ContentItemBodyObject) {
  }
  toJSON() {
    return JSON.parse(JSON.stringify(this.body));
  }
}

