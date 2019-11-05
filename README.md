# dc-extensions-sdk

An SDK to aid in the making of UI Extensions for the Dynamic Content App, extensions allow developers to create their own controls in Dynamic Content.

# Installation

Using npm:

```bash
npm install dc-extensions-sdk --save
```

Using yarn:

```bash
yarn add dc-extensions-sdk
```

Using cdn:

``` html
<script src="https://unpkg.com/dc-extensions-sdk/dist/dc-extensions-sdk.umd.js"></script>
```
# Including

```ts
import { init } from 'dc-extensions-sdk';

interface FieldModel {}

interface Parameters {
  instance: {};
  installation: {};
}

async function initialize() {
  // generics are optional and don't need to be provided
  // but provide nice autocompletion when using typescript
  const sdk = await init<FieldModel, Parameters>();

  //..
}

initialize();
```

or

```js
const dcExtensionsSdk = require('dc-extensions-sdk');

async function initialize() {
  const sdk = await dcExtensionsSdk.init();

  //..
}

initialize();
```

or
``` html
<script src="https://unpkg.com/dc-extensions-sdk/dist/dc-extensions-sdk.umd.js"></script>
<script>
  async function initialize() {
    const sdk = await dcExtensionsSdk.init();

    //...
  }

  initialize();
</script>
```

or if you prefer `.then` syntax

```js
import { init } from 'dc-extensions-sdk';

init().then(sdk => {
  // output available locales
  console.log(sdk.locales);
});
```

# Options

You can configure your extension with the options object passed into the init function.
```js
import { init } from 'dc-extensions-sdk';

const options = {
  // used to enable useful behind-the-scenes info
  debug: false,
  // if you want to manually attach the window object
  window: window,
  // if you want more control over timeouts
  connectionTimeout: 2000
};

async function initialize() {
  const sdk = await init(options);

  //..
}

initialize();
```

# Usage

## Field
Fetching the field value
```js
const fieldValue = await sdk.field.getValue();

console.log(fieldValue);
```

Setting the field value
```js
const sdk = await init();

await sdk.field.setValue('some value');
```

Resetting the field value to an empty state or a previously saved state
```js
const sdk = await init();

await sdk.field.resetValue();
```

Fetching the field schema
```js
const sdk = await init();

const schema = sdk.field.schema;
```

## Content Item

Get the full model for the Content Item you are editing
```js
const sdk = await init();

const contentType = await sdk.contentItem.getValue();
```


## Frame

You can set the height mannually using, this messages the parent window and sets the iframe height.
```js
const sdk = await init();

sdk.frame.setHeight(300);
```

(Recommended) If you want your extension to automaticlly resize its height to the size of the extension use the autoResizer function `startAutoResizer`
```js
const sdk = await init();

sdk.frame.startAutoResizer();


// To clean up use
sdk.frame.stopAutoResizer();
```

## Locales

```js
const sdk = await init();

const locales = sdk.locales;

console.log(locales);
```

```js
{
  default: ["en-GB", "fr-FR"],
  available: [
    {
      locale: "en-GB",
      language: "en",
      country: "GB",
      index: 0,
      selected: true
    },
    {
      locale: "fr-FR",
      language: "fr",
      country: "FR",
      index: 1,
      selected: false
    }
  ]
}
```

## Parameters

These allow your component to be configurable. Either defined in the JSON Schema (instance) or defined in the registry (installation).

```js
const sdk = await init();

console.log(sdk.params);
```

```js
{
  instance: {},
  installation: {}
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

Use this to trigger an content-item browser for including content-links. Include a list of schemas to browse for.

```js
const sdk = await init();

const contentLink = await sdk.contentLink.get(['http://my.schema/carousel.json']);
```

## ContentReference

Use this to trigger an content-item browser for including content references. Include a list of schemas to browse for.

```js
const sdk = await init();

const contentReference = await sdk.contentReference.get(['http://my.schema/carousel.json']);
```

## Read Only

In some contexts in the form content is not editable and we provide a boolean value that specifies if content should not be editable if you want to react to these changes we give you a function to do so.

We don't save content when it's in this state but it's good to give the user of the content some contextual feedback that it's in a readOnly state.

```js
const input = document.querySelector('input');
const sdk = await init();

// the state is set on load of the form
console.log(sdk.form.readOnly);

sdk.form.onReadOnlyChange(readOnly => {
  input.style.pointerEvents = readOnly ? 'none' : ''
});
```

## The entire model value

We provide the entire forms value and not just the field value. If you want to react to changes to the form model you can do that using this function and using the returned value to make changes.

```js
const sdk = await init();

const formModel = await sdk.form.getValue();
```