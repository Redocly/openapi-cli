import { validateFromFile } from '../index';

test('validate simple document', () => {
  expect(validateFromFile('./test/specs/openapi/simple.yaml'))
    .toMatchInlineSnapshot(`
    Array [
      Object {
        "codeFrame": "[4m[31mopenapi: 3.0.1
    info:
      taitle: 123
      license:
        name: Test license
      version: 0.0.1
    [39m[24m",
        "file": "/Users/knidarkness/work/redoc.ly/revalid/test/specs/openapi/simple.yaml",
        "location": Object {
          "endCol": 1,
          "endIndex": 86,
          "endLine": 7,
          "startCol": 0,
          "startIndex": 0,
          "startLine": 1,
        },
        "message": "paths must be present on this level",
        "path": "",
        "pathStack": Array [],
        "prettyPrint": [Function],
        "severity": "ERROR",
        "value": Object {
          "info": Object {
            "license": Object {
              "name": "Test license",
            },
            "taitle": 123,
            "version": "0.0.1",
          },
          "openapi": "3.0.1",
        },
      },
      Object {
        "codeFrame": "openapi: 3.0.1
    info:
      [4m[31mtaitle:[39m[24m 123
      license:
        name: Test license
     ",
        "file": "/Users/knidarkness/work/redoc.ly/revalid/test/specs/openapi/simple.yaml",
        "location": Object {
          "endCol": 9,
          "endIndex": 29,
          "endLine": 3,
          "startCol": 3,
          "startIndex": 23,
          "startLine": 3,
        },
        "message": "taitle is not allowed here. Use \\"x-\\" prefix to override this behavior",
        "path": "info/taitle",
        "pathStack": Array [],
        "prettyPrint": [Function],
        "severity": "ERROR",
        "value": Object {
          "license": Object {
            "name": "Test license",
          },
          "taitle": 123,
          "version": "0.0.1",
        },
      },
      Object {
        "codeFrame": "openapi: 3.0.1
    [4m[31minfo:[39m[24m
      taitle: 123
      license:
     ",
        "file": "/Users/knidarkness/work/redoc.ly/revalid/test/specs/openapi/simple.yaml",
        "location": Object {
          "endCol": 5,
          "endIndex": 19,
          "endLine": 2,
          "startCol": 1,
          "startIndex": 15,
          "startLine": 2,
        },
        "message": "title must be present on this level",
        "path": "info",
        "pathStack": Array [],
        "prettyPrint": [Function],
        "severity": "ERROR",
        "value": Object {
          "license": Object {
            "name": "Test license",
          },
          "taitle": 123,
          "version": "0.0.1",
        },
      },
    ]
  `);
});

test('Validate simple valid OpenAPI document', () => {
  expect(
    validateFromFile('./test/specs/openapi/test-2.yaml'),
  ).toMatchInlineSnapshot('Array []');
});

test('Validate from invalid file', () => {
  expect(() => {
    validateFromFile('./test/specs/openapi/test-invalid-1.yaml');
  }).toThrowErrorMatchingInlineSnapshot('"Can\'t load yaml file"');
});
