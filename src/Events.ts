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

export enum FIELD {
  MODEL_GET = 'field-model-get',
  MODEL_SET = 'field-model-set',
  MODEL_RESET = 'field-model-reset',
  MODEL_IS_VALID = 'field-model-is-valid',
  MODEL_VALIDATE = 'field-model-validate',
  SCHEMA_GET = 'field-schema-get',
}

export enum FRAME {
  HEIGHT_GET = 'height-get',
  HEIGHT_SET = 'height-set',
  AUTO_RESIZER_START = 'auto-resizer-start',
  AUTO_RESIZER_STOP = 'auto-resizer-stop'
}
