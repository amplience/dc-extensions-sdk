export interface ContentItemModel {
  id: string;
  label: string;
  body: {
    _meta: ContentMeta;
    [key: string]: any;
  };
  deliveryId?: string;
}
interface ContentMeta {
  name: string;
  schema: string;
  deliveryId?: string;
}
