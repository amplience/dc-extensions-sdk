export type ObjectMap<T = Object, K = any> = T & {
  [key: string]: K;
};

export type ContentItemModel<T = {}> = {
  id: string;
  label: string;
  version: number;
  locale?: string;
  body: Body<T>;
  deliveryId: string;
};

export type Body<T> = ObjectMap<T & { _meta: ContentMeta }>;

interface ContentMeta {
  name: string;
  schema: string;
  deliveryKey?: string;
}
