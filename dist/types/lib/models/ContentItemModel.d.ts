export declare type ObjectMap<T = Object, K = any> = T & {
    [key: string]: K;
};
export declare type ContentItemModel<T = {}> = {
    id: string;
    label: string;
    version: number;
    locale?: string;
    body: Body<T>;
    deliveryId: string;
};
export declare type Body<T = {}> = ObjectMap<T & {
    _meta: ContentMeta;
}>;
interface ContentMeta {
    name: string;
    schema: string;
    deliveryKey?: string;
}
export {};
