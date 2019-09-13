export interface ContentItemModel {
  id: string;
  label: string;
  body: {
    _meta: {
      name: string;
      schema: string;
    };
    [key: string]: any;
  };
  deliveryId: string;
}
