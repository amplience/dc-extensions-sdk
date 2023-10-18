# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# [2.2.0](https://github.com/amplience/dc-extensions-sdk/compare/v2.1.0...v2.2.0) (2022-10-26)

### Features

- Update users component so that it fetches org users as well as auth users ([ad5ef8e](https://github.com/amplience/dc-extensions-sdk/commit/ad5ef8ed6428c87cddc9a1623bd36231c207d73a))

# [1.2.0](https://github.com/amplience/dc-extensions-sdk/compare/v1.1.0...v1.2.0) (2020-11-17)

### Bug Fixes

- **refactor:** removed unneeded response wrapper ([ffba1f4](https://github.com/amplience/dc-extensions-sdk/commit/ffba1f467792a5543381e62dd292542da453d25a))

### Features

- **http-client:** added http client too extensions sdk ([fa43c62](https://github.com/amplience/dc-extensions-sdk/commit/fa43c628c1c04960b9d9023bd664349a9bd0edba))

# [1.1.0](https://github.com/amplience/dc-extensions-sdk/compare/v1.0.3...v1.1.0) (2020-05-07)

### Bug Fixes

- **multiselect:** set to null if non passed ([2068d3b](https://github.com/amplience/dc-extensions-sdk/commit/2068d3bd94d6129112c0112a39a1174cf7645424))
- **tests:** added params to test timeout, fixed flaky test ([96fe997](https://github.com/amplience/dc-extensions-sdk/commit/96fe997769ebaec44995eb464ca10d8b02713fb3))

### Features

- **multi-select:** added multiselect to media content link & refs ([ae16cd1](https://github.com/amplience/dc-extensions-sdk/commit/ae16cd122790852ac535cd2bbe03b544f5dd3c9a))
- **timeouts:** no more timeouts (by default) ([01abdb7](https://github.com/amplience/dc-extensions-sdk/commit/01abdb72b9a1b961a20058f27d912cc58a3f4af1))

## [2.3.0](https://www.github.com/amplience/dc-extensions-sdk/compare/v2.2.1...v2.3.0) (2023-10-13)


### Features

* **assets:** Allow getting of asset by ID ([#93](https://www.github.com/amplience/dc-extensions-sdk/issues/93)) ([f7020d2](https://www.github.com/amplience/dc-extensions-sdk/commit/f7020d284d93eed2868518e1bdab851c25431173))

### [2.2.1](https://www.github.com/amplience/dc-extensions-sdk/compare/v2.2.0...v2.2.1) (2023-09-29)


### Features

* CMP-10458 Added method to graphQL client for mutations ([#92](https://www.github.com/amplience/dc-extensions-sdk/issues/92)) ([9b51283](https://www.github.com/amplience/dc-extensions-sdk/commit/9b51283fa36da7cc519b6fef36f444c97fe038e9))
* CMP-10470 Added onFormValueChange method ([#91](https://www.github.com/amplience/dc-extensions-sdk/issues/91)) ([49a58b8](https://www.github.com/amplience/dc-extensions-sdk/commit/49a58b89026adb2821f03a9b2e237e89e391c03b))
* remove Amplience DC header logo from README ([9ab0925](https://www.github.com/amplience/dc-extensions-sdk/commit/9ab092566b71876531f57d5f39b15a22ae151914))
* remove DC header asset ([72d3454](https://www.github.com/amplience/dc-extensions-sdk/commit/72d345404b6f618002e135b65ef47833e30f5f7d))


### Miscellaneous Chores

* release 2.2.1 ([c350061](https://www.github.com/amplience/dc-extensions-sdk/commit/c350061562b3a068ffec8462ae893186bee110fa))

## [2.2.0](https://www.github.com/amplience/dc-extensions-sdk/compare/v2.1.0...v2.2.0) (2022-10-26)


### Features

* support org users ([#72](https://www.github.com/amplience/dc-extensions-sdk/issues/72)) ([ad5ef8e](https://www.github.com/amplience/dc-extensions-sdk/commit/ad5ef8ed6428c87cddc9a1623bd36231c207d73a))
* Update changelog to reflect latest release ([#74](https://www.github.com/amplience/dc-extensions-sdk/issues/74)) ([021495c](https://www.github.com/amplience/dc-extensions-sdk/commit/021495c6dad22f5d06f04cc312a2ae95ebc35aee))

## [2.1.0](https://www.github.com/amplience/dc-extensions-sdk/compare/v2.0.0...v2.1.0) (2022-04-06)

### Features

- **content editor:** updates content editor extensions ([#63](https://www.github.com/amplience/dc-extensions-sdk/issues/63)) ([9d337b1](https://www.github.com/amplience/dc-extensions-sdk/commit/9d337b1d4bfacad55ccb3d9a6b7210560d9c55f7))

### Reverts

- "chore: upgraded to husky 5.x" ([ccaf151](https://www.github.com/amplience/dc-extensions-sdk/commit/ccaf1512cc8e1a1693cf30efa43414280688465d))

## [2.0.0](https://www.github.com/amplience/dc-extensions-sdk/compare/v1.2.0...v2.0.0) (2021-02-15)

### ⚠ BREAKING CHANGES

- certain classes are no longer exposed - see MIGRATION.md for more info

### Features

- certain classes are no longer exposed - see MIGRATION.md for more info ([c9e876a](https://www.github.com/amplience/dc-extensions-sdk/commit/c9e876a6faa662414770874ca463ae175d5d166b))
- **context:** making category mandatory for content field ([#33](https://www.github.com/amplience/dc-extensions-sdk/issues/33)) ([444ef54](https://www.github.com/amplience/dc-extensions-sdk/commit/444ef54f3866d7214b26ced0f3a0ba441f9ae24a))
- dashboard extension ([#29](https://www.github.com/amplience/dc-extensions-sdk/issues/29)) ([0ced0c2](https://www.github.com/amplience/dc-extensions-sdk/commit/0ced0c23c37b17c64ee16c9304f8292200a2e661))
- **dashboard:** application navigator ([#31](https://www.github.com/amplience/dc-extensions-sdk/issues/31)) ([a3e4d5d](https://www.github.com/amplience/dc-extensions-sdk/commit/a3e4d5d1a7d5159e155e7a81d763217c10c40936))
- **users client:** adds a new class for listing users ([#34](https://www.github.com/amplience/dc-extensions-sdk/issues/34)) ([3a4b577](https://www.github.com/amplience/dc-extensions-sdk/commit/3a4b577e5aa49b6d2a5e898d9763ae32e63ebb7b))

### Bug Fixes

- migrate from adis.ws to amplience.net ([912724d](https://www.github.com/amplience/dc-extensions-sdk/commit/912724dc197b68881387711283f61e6a102d1c65))

## [1.0.3](https://github.com/amplience/dc-extensions-sdk/compare/v1.0.2...v1.0.3) (2020-02-12)

### Bug Fixes

- **docs:** updating logo ([21daaed](https://github.com/amplience/dc-extensions-sdk/commit/21daaedff1ef3461697b8421f6757469bf993fb3))
- timeout upped again to account for slow cpu's ([51bc8f4](https://github.com/amplience/dc-extensions-sdk/commit/51bc8f44e0f372e916543ba1c54aa8d6ebf90a12))
- upped timeout limit ([72f2fd8](https://github.com/amplience/dc-extensions-sdk/commit/72f2fd81ce9966f207728707d08ca91d56ad0cb1))

## [1.0.1](https://github.com/amplience/dc-extensions-sdk/compare/v1.0.0...v1.0.1) (2019-11-07)

### Bug Fixes

- **license:** setting correct licence and code of conduct email ([20c9eae](https://github.com/amplience/dc-extensions-sdk/commit/20c9eaef6376390bd255ba7af1349a85d74917b9))

# [1.0.0](https://github.com/amplience/dc-extensions-sdk/compare/0.1.1...v1.0.0) (2019-11-06)

### Bug Fixes

- added new field 'form' for handling read only changes. ([261bbd8](https://github.com/amplience/dc-extensions-sdk/commit/261bbd82ce54df240e6de2aedfe69c83e96639fa))
- added new message io version to sdk for testing ([ad9fa0a](https://github.com/amplience/dc-extensions-sdk/commit/ad9fa0a703fe0c03ceb41a87132168cfb669a8dd))
- added up to date message io ([d4562da](https://github.com/amplience/dc-extensions-sdk/commit/d4562da1945f51828dbe048bb44c74e840fc6a1c))
- changed any to object ([c025c28](https://github.com/amplience/dc-extensions-sdk/commit/c025c289940b12669b8bab524b7ac6584a9f1d3f))
- changed any to object because it ruins types if passing any into object map and it should always be an object anyway ([bcbd19f](https://github.com/amplience/dc-extensions-sdk/commit/bcbd19fbdef6089b40de8480d160943fb13c068d))
- changed type names ([d82c563](https://github.com/amplience/dc-extensions-sdk/commit/d82c5630883a6b6ccf80a9cc933cee79bb3bce75))
- changed type to return just content for getValue ([2d1d0cf](https://github.com/amplience/dc-extensions-sdk/commit/2d1d0cf92981433d2196653f6a5079570564d28c))
- CMP-5895 => on fetching the content item set the id. ([af09848](https://github.com/amplience/dc-extensions-sdk/commit/af098489fc776d5076ae220ff17abd07d377ec05))
- CMP-5904 => added readOnly to sdk ([d50df66](https://github.com/amplience/dc-extensions-sdk/commit/d50df66bf2f1e99755b7129a575d0a0abed57ca7))
- CMP-5908 => match context object ([b2a0e15](https://github.com/amplience/dc-extensions-sdk/commit/b2a0e156d012c4515c8b5275c917b5b8e5e6f359))
- CMP-5986 => added URL polyfill for ie11 ([625734f](https://github.com/amplience/dc-extensions-sdk/commit/625734fd99b43ee1f2c63a8885ade43913202fea))
- CMP-5989 => added tests ([5426483](https://github.com/amplience/dc-extensions-sdk/commit/5426483b690622647f295e9bea61bef990c6b696))
- don't need this if using readyState ([825cd56](https://github.com/amplience/dc-extensions-sdk/commit/825cd564108fbaff8a8b196e2c4fefef4ee01279))
- expose ids on schema interface ([dab1989](https://github.com/amplience/dc-extensions-sdk/commit/dab19891d1ae0289c286757067d8a60288117eef))
- fixed build issue ([dbbc7e6](https://github.com/amplience/dc-extensions-sdk/commit/dbbc7e624b6edb7aefd086dbd5da86e809954e21))
- getting types to surface. ([40228aa](https://github.com/amplience/dc-extensions-sdk/commit/40228aa32bb4dc63a042c35740133ac96101f435))
- if already loaded resolve immediately ([1ad7d3b](https://github.com/amplience/dc-extensions-sdk/commit/1ad7d3b7b169a3c117eaa9394de5e35b41af75a1))
- improved generic types ([84e3132](https://github.com/amplience/dc-extensions-sdk/commit/84e313282d6a96158dbed1a321c5b0b8703cdff0))
- lock ([d7bebe7](https://github.com/amplience/dc-extensions-sdk/commit/d7bebe7e276bad209956efdc817cadb1c2091348))
- made event names consistent ([c7ffc4f](https://github.com/amplience/dc-extensions-sdk/commit/c7ffc4f8bca7f11fdbd068179c3d27aa0f10b065))
- made the function generic as i was only supplying field props not the whole model. ([112a4c9](https://github.com/amplience/dc-extensions-sdk/commit/112a4c9c7444d2bd426bb3d1a11c5a1bef35e4df))
- message io test ([b92d0a2](https://github.com/amplience/dc-extensions-sdk/commit/b92d0a26d1b8b700925e0a58a4ddf8cb80efc8f8))
- remove url-polyfill ([ef7c318](https://github.com/amplience/dc-extensions-sdk/commit/ef7c31850259576a00047d6897529ee88df98b6d))
- removed timeout on context and removed update height on call of startAutoResizer. ([05764fe](https://github.com/amplience/dc-extensions-sdk/commit/05764fe0143c03b9ecfb273549bb3e0f098f0a6f))
- removing opinionated generic default ([663634d](https://github.com/amplience/dc-extensions-sdk/commit/663634d81a690a3e904808cff5640afd31f88cb1))
- returned this so can chain if wanted and called function straight away with current value ([9f2f174](https://github.com/amplience/dc-extensions-sdk/commit/9f2f1745974e5a56c721fef495dea4cbe44556f1))
- reverted some changes, issue was in sdk-tester. ([c63623b](https://github.com/amplience/dc-extensions-sdk/commit/c63623bb33cf0ee90de7ebc828f77fa315a360a7))
- stopped calling function on add ([780afcd](https://github.com/amplience/dc-extensions-sdk/commit/780afcd713aa9b7928846ff27c8b1320b98227bf))
- styling ([193beb2](https://github.com/amplience/dc-extensions-sdk/commit/193beb2d80b7b41849b1629493e0b1d45f99bd13))
- trying to get types to work ([e351f38](https://github.com/amplience/dc-extensions-sdk/commit/e351f38cf13acd864910fe6f534279f8412d1c61))
- typo ([edd74e9](https://github.com/amplience/dc-extensions-sdk/commit/edd74e969f2175bfcbb08c33a6fc32063f84854d))
- url isnt required. ([eb7bbb7](https://github.com/amplience/dc-extensions-sdk/commit/eb7bbb7ed4a813fb0c05b23d0220fcc7b482d30d))
- wording ([c66953b](https://github.com/amplience/dc-extensions-sdk/commit/c66953b264c09bf71ef5587cbcf132f30ef119d1))

### Reverts

- Revert "bump to latest cmjs" ([e10df32](https://github.com/amplience/dc-extensions-sdk/commit/e10df32dead1b03a0a2f62bc7d2cf2d5db456316))

## [0.1.1](https://github.com/amplience/dc-extensions-sdk/compare/0.1.0...0.1.1) (2019-09-18)

# [0.1.0](https://github.com/amplience/dc-extensions-sdk/compare/699d7f524973a632794d1f17ee035bcd5c522760...0.1.0) (2019-09-18)

### Bug Fixes

- removing automatic include ([699d7f5](https://github.com/amplience/dc-extensions-sdk/commit/699d7f524973a632794d1f17ee035bcd5c522760))
