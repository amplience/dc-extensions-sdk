export enum CONTEXT {
  GET = 'context-get'
}

export enum CONTENT_ITEM {
  GET = 'content-item-get'
}

export enum MEDIA_LINK {
  IMAGE_GET = 'media-image-get',
  VIDEO_GET = 'media-video-get'
}

export enum CONTENT_LINK {
  CONTENT_GET = 'content-link-get'
}

export enum CONTENT_REFERENCE {
  CONTENT_REF_GET = 'content-reference-get'
}

export enum FIELD {
  MODEL_GET = 'field-model-get',
  MODEL_SET = 'field-model-set',
  MODEL_RESET = 'field-model-reset',
  MODEL_IS_VALID = 'field-model-is-valid',
  MODEL_VALIDATE = 'field-model-validate',
  SCHEMA_GET = 'field-schema-get'
}

export enum CONTENT_EDITOR_FORM {
  CONTENT_EDITOR_FORM_GET = 'content-editor-model-get',
  CONTENT_EDITOR_FORM_SET = 'content-editor-model-set',
  CONTENT_EDITOR_FORM_VALIDATE = 'content-editor-model-validate',
  CONTENT_EDITOR_FORM_IS_VALID = 'content-editor-model-is-valid',
  CONTENT_EDITOR_MODEL_CHANGE = 'content-editor-model-change'
}

export enum FORM {
  READ_ONLY = 'form-read-only-change',
  GET_FORM_MODEL = 'form-model-get'
}

export enum FRAME {
  HEIGHT_GET = 'height-get',
  HEIGHT_SET = 'height-set'
}
