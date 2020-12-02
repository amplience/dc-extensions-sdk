# Migration Guides

Below are instructions for migrating from one version of dc-extension-sdk to another.

## `1.x.x` to `2.x.x`

### Specifying extension types

We have introduced improved control over the extension types you are initialising. Previously you would inialise the extension using:

```typescript
const sdk = await init<FieldModel, Parameters>();
```

In version `2.x.x` you can now pass an additional extension type:

```typescript
const sdk = await init<ContentFieldExtension<FieldModel, Parameters>>();
```
