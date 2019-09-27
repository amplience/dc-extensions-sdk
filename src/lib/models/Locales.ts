/**
 * Locales - The locales that are available to the Content Item that is being edited. Default is the locale set as default on the hub.
 */
export interface LocalesModel {
  default: Array<string>;
  available: Array<LocalModel>;
}
export interface LocalModel {
  locale: string;
  language: string;
  country: string;
  index: number;
  selected: boolean;
}
