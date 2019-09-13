export enum ERROR_CATEGORY {
  DATA = 'DATA'
}
export enum ERROR_SEVERITY {
  FATAL = 'FATAL'
}

export enum ERROR_TYPE {
  FATAL = 'DATA_VALIDATION_ERROR'
}

interface ErrorData {
  keyword: string;
  params: Params;
}

interface Schema {
  id: string;
  originalId: string;
  location: Location;
}

interface Params {
  type: string;
}

interface Location {
  pointer: string;
}

interface Data {
  location: Location;
}

export interface Error {
  errorCategory: ERROR_CATEGORY;
  errorData: ErrorData;
  errorSeverity: ERROR_SEVERITY;
  errorType: ERROR_TYPE;
  message: string;
  schema: Schema;
  data: Data;
}
