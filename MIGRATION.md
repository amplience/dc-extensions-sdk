# Migration Guides

Below are instructions for migrating from one version of dc-extension-sdk to another.

## `1.x.x` to `2.x.x`

### Specifying extension types

We have introduced improved control over the extension types you are initialising. Previously you would initialise the extension using:

```typescript
const sdk = await init<FieldModel, Parameters>();
```

In version `2.x.x` you can now pass an additional extension type:

```typescript
const sdk = await init<ContentFieldExtension<FieldModel, Parameters>>();
```

### The SDK class is no longer exposed

The SDK class has been removed and the SDK properties have been moved to the ContentFieldExtension class.

Previous you could create a new instance of the `SDK` and invoke `init()` on it

```typescript
import { SDK } from 'dc-extensions-sdk';

const sdk = new SDK();
await sdk.init();
```

Please initialise the sdk using the exposed `init()` method

```typescript
import { init } from 'dc-extensions-sdk';

const sdk = await init<ContentFieldExtension<FieldModel, Parameters>>();
```
