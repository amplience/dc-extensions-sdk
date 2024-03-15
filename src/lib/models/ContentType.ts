export interface Visualization {
  label: string;
  templatedUri: string;
  default: boolean;
}

export interface ContentTypeCard {
  templatedUri: string;
}

export interface ContentTypeIcon {
  size: number;
  url: string;
}

export interface ContentTypeModel {
  id: string;
  label: string;
  status: string;
  contentTypeUri: string;
  cards: ContentTypeCard[];
  icons: ContentTypeIcon[];
  visualizations: Visualization[];
}
