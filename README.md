# dc-extensions-sdk

An SDK to aid in the making of UI Extensions for the Dynamic Content App

# Installation

Using npm:

``` sh
npm install dc-extensions-sdk --save
```

Using cdn:

``` html
<script src="https://unpkg.com/dc-extensions-sdk/dist/dc-extensions-sdk.umd.js"></script>
```
# Including

```ts
import { init, SDK } from 'dc-extensions-sdk';
const sdk:SDK = await init();
```

or

```js
const sdk = await require('dc-extensions-sdk').init();
```

or
``` html
<script src="https://unpkg.com/dc-extensions-sdk/dist/dc-extensions-sdk.umd.js"></script>
<script>
  const sdk = await dcExtensionsSdk.init();
</script>
```

or if you prefer `.then` syntax
```js
import { init, SDK } from 'dc-extensions-sdk';
init()
  .then(sdk)=>{
    console.log(sdk.locales) // output available locales
  }
```

# Usage
## Field

Fetching the field value
```js
const fieldValue = await sdk.field.getValue();
console.log(fieldValue); // output value;
```

Setting the field value
```js
await sdk.field.setValue("some value");
```

Resetting the field value
```js
await sdk.field.resetValue();
```

Fetching the field schema
```js
const schema = sdk.field.schema;
```

## Content Type

Get the Effective Schema for the Content Item you are editing
```js
const contentType = sdk.contentType;
```

## Content Item

Get the full model for the Content Item you are editing
```js
const contentType = await sdk.contentItem.getValue();
```

## Locales

```js
const sdk = await init();
console.log(sdk.locales);
```

```js
{
  "default":"en-GB",
  "available": ["en-GB","fr-FR"]
}
```

## Parameters

These allow your component to be configurable via your schema (instance params) or registry (installation params). 

```js
const sdk = await init();
console.log(sdk.params);
```

```js
{
  "instance":{},
  "installation":{}
}
```

## MediaLink

Use this to trigger an image or video browser.

```js
const sdk = await init();
const image = await sdk.mediaLink.getImage();
const video = await sdk.mediaLink.getVideo();
```

## ContentLink

Use this to trigger an content-item browser. Include a list of schemas to browse for.

```js
const sdk = await init();
const image = await sdk.contentLink.get(['http://my.schema/carousel.json']);
```

# Options
```js
{
  debug: false, // used to enable useful behind-the-scenes info
}
```