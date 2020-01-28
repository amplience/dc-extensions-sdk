[![Amplience Dynamic Content](media/header.png)](https://amplience.com/dynamic-content)

# dc-extensions-sdk
[![Build Status](https://travis-ci.org/amplience/dc-extensions-sdk.svg?branch=master)](https://travis-ci.org/amplience/dc-extensions-sdk)
[![npm version](https://badge.fury.io/js/dc-extensions-sdk.svg)](https://badge.fury.io/js/dc-extensions-sdk)

An SDK that enables the creation of Extensions for Dynamic Content. Extensions are custom form controls that can be used in the content editing form in the Dynamic Content App.

- [How to use Extensions in Dynamic Content](https://docs.amplience.net/development/extensions.html)
- [SDK Documentation](https://amplience.github.io/dc-extensions-sdk/)

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
  // enable useful behind-the-scenes info
  debug: false,
  // the max time to wait for a connection to establish 
  connectionTimeout: 4500
};

async function initialize() {
  const sdk = await init(options);

  //..
}

initialize();
```

# Usage

## Field
### Fetching the field value
```js
const fieldValue = await sdk.field.getValue();

console.log(fieldValue);
```

### Setting the field value

*Note: The field model isn't updated when the form is in a read only state.*
```js
const sdk = await init();

await sdk.field.setValue('some value');
```

### Resetting the field value
This will reset to the previously saved state or `undefined` if the item hasn't been saved.
```js
const sdk = await init();

await sdk.field.resetValue();
```

### Retrieving the field schema
```js
const sdk = await init();

const schema = sdk.field.schema;
```

### Test if a model is valid
Will evaluate the supplied model against the schema. Returns a boolean.

```js
const sdk = await init();

const isValid = await sdk.field.isValid('some value');
```
### Test if a model is valid (with errors)
Will evaluate the supplied model against the schema. Will either return an array of errors or `undefined`.
```js
const sdk = await init();

const errors = await sdk.field.validate('some value');
```

## Content Item

Use to fetch the Content Item that is currently being edited.
```js
const sdk = await init();

const contentItem = await sdk.contentItem.getCurrent();
```
Example Content Item:
```json
{
  "id": "4801f662-de68-43d3-8864-52d2d9c10bf4",
  "deliveryId": "4801f662-de68-43d3-8864-52d2d9c10bf4",
  "locale": "en-GB",
  "body": {
    "_meta": {
      "name": "hello-world",
      "schema": "http://www.hello-world.com"
    },
    "helloWorld": "Test"
  },
  "label": "Hello World",
  "version": 8
}
```


## Frame

### Setting the height

This changes the height of the extension. It will measure the height of the application and change the container's height to fit. You can also force a height by specifying an integer value.

```js
const sdk = await init();

sdk.frame.setHeight(); // measures height
sdk.frame.setHeight(300); // override height
```

### Auto Resizing

While the application's height will be automatically set on load, your application's size might change over time. When this happens you can either trigger `sdk.frame.setHeight();` or use the Auto Resizer.

The Auto Resizer will listen for any change to the DOM as well as window resizing. When it is triggered it will automatically resize the container’s height to the size of the extension.

*NOTE: If your application dynamically loads images we suggest you attach a load event listener that will trigger `sdk.frame.setHeight();`*

```js
const sdk = await init();
// turn on the Auto Resizer
sdk.frame.startAutoResizer();

// turn off the Auto Resizer
sdk.frame.stopAutoResizer();
```

## Locales

The available locales for the Content Item.

```js
const sdk = await init();

const locales = sdk.locales;

console.log(locales);
```
Example:
```json
{
  "default": ["en-GB", "fr-FR"],
  "available": [
    {
      "locale": "en-GB",
      "language": "en",
      "country": "GB",
      "index": 0,
      "selected": true
    },
    {
      "locale": "fr-FR",
      "language": "fr",
      "country": "FR",
      "index": 1,
      "selected": false
    }
  ]
}
```

## Params

These allow your component to be configurable. They can be defined in the JSON Schema (instance) or defined in the registry (installation), or both.

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


## Media Link

Use this to trigger an image or video browser.

```js
const sdk = await init();

const image = await sdk.mediaLink.getImage();
const video = await sdk.mediaLink.getVideo();
```

## Content Link

Use this to trigger an content-item browser for including content-links. Include a list of schemas to browse for.

```js
const sdk = await init();

const contentLink = await sdk.contentLink.get(['http://my.schema/carousel.json']);
```

## Content Reference

Use this to trigger an content-item browser for including content references. Include a list of schemas to browse for.

```js
const sdk = await init();

const contentReference = await sdk.contentReference.get(['http://my.schema/carousel.json']);
```

## Form

### Model

Use this to fetch the in-progress form model. This can change while the extension is open. 

```js
const sdk = await init();

const formModel = await sdk.form.getValue();
```

### Read Only

In some contexts in the form content is not editable and we provide a boolean value that specifies if content should not be editable if you want to react to these changes we give you a function to do so.

*Note: The field model isn't updated when the form is in a read only state.*

```js
const input = document.querySelector('input');
const sdk = await init();

// the state is set on load of the form
console.log(sdk.form.readOnly);

sdk.form.onReadOnlyChange(readOnly => {
  if (readOnly) {
    input.setAttribute('disabled', true);
  } else {
    input.removeAttribute('disabled');
  }
});
```