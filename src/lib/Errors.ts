export enum ERRORS_INIT {
  CONTEXT = 'Failed to fetch context for UI Extension',
  CONNTECTION_TIMEOUT = 'Failed to establish connection to DC Application'
}

export enum ERRORS_CONTENT_ITEM {
  NO_IDS = 'Please provide content type ids'
}

export enum ERRORS_FRAME {
  SET_HEIGHT_NUMBER = 'setHeight() only accepts an optional number argument'
}

export enum FORM {
  NO_MODEL = 'Unable to retrieve form model as form context does not have an active model.'
}
