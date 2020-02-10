# M4JsApiNode Examples
M4JsapiNode.js Examples

## Mocking File System Node module
This project contains some examples of unit testing with [Jest](https://jestjs.io/) framework and Typescript that ensure the correct functionality of a class that uses the [fs node module](https://www.npmjs.com/package/file-system).

Mock mock specific module functions:
- readFile
- readFileSync
- writeFileSync

The purpose of these examples is to show:
- How we can falsify the writing and reading files.
- Avoid contamination of the test context.
- Avoid having physical files for tests.
- Be able to alter the content of the files programmatically.
- Spy on functionality.
- Mock functions.

### Install
npm install

### Execute examples
- npm run logon
- npm run loadMetadatada
- npm run executeRequest
