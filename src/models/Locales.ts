/**
 * Locales - The locales that are available to the Content Item that is being edited. Default is the locale set as default on the hub.
 */
export interface LocalesModel {
  default: string;
  list: Array<string>;
}
