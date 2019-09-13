export interface ContentItemBody {
  _meta: ContentItemMeta;
  [key: string]: any;
}

export interface ContentItemMeta {
  name: string;
  schema: string;
}
