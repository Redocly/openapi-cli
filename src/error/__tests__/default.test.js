import yaml from "js-yaml";
import fs from "fs";

import createError, { messageLevels, fromError } from "../default";

const createCtx = () => ({
  document: yaml.safeLoad(
    fs.readFileSync("./definitions/syntetic/syntetic-1.yaml", "utf-8")
  ),
  filePath: "./definitions/syntetic/syntetic-1.yaml",
  path: [],
  cache: {},
  visited: [],
  definitionStack: [],
  pathStack: [],
  source: fs.readFileSync("./definitions/syntetic/syntetic-1.yaml", "utf-8"),
  enableCodeframe: true
});

describe("createError", () => {
  test("", () => {
    const ctx = {
      ...createCtx(),
      path: ["paths", "user", "get", "responses"]
    };
    expect(
      createError("This is a test error", {}, ctx, {
        severity: messageLevels.ERROR
      })
    ).toMatchInlineSnapshot(`
      Object {
        "codeFrame": "[90m14|       - $ref: '#/components/parameters/example'[39m
      [90m15|     get:[39m
      [90m16|       [4m[31mresponses:[90m[24m[39m
      [90m17|[39m[31m [4m[31m        '200':[31m[24m[39m
      [90m18|[39m[31m [4m[31m          description: example description[31m[24m[39m
      [90m19|[39m[31m [4m[31m          content:[31m[24m[39m
      [90m20|[39m[31m [4m[31m            application/json:[31m[24m[39m
      [90m21|[39m[31m [4m[31m              schema:[31m[24m[39m
      [90m22|[39m[31m [4m[31m                type: object[31m[24m[39m
      [90m23|   project:[39m
      [90m24|     get:[39m",
        "enableCodeframe": true,
        "file": "definitions/syntetic/syntetic-1.yaml",
        "fromRule": undefined,
        "location": Object {
          "endCol": 28,
          "endIndex": 425,
          "endLine": 22,
          "startCol": 7,
          "startIndex": 257,
          "startLine": 16,
        },
        "message": "This is a test error",
        "path": Array [
          "paths",
          "user",
          "get",
          "responses",
        ],
        "pathStack": Array [],
        "possibleAlternate": undefined,
        "severity": 4,
        "target": undefined,
        "value": Object {},
      }
    `);
  });

  test("", () => {
    const ctx = {
      ...createCtx(),
      path: [],
      enableCodeframe: false
    };
    expect(
      createError("This is a test error", {}, ctx, {
        severity: messageLevels.ERROR,
        target: "key",
        possibleAlternate: "example",
        fromRule: "testing"
      })
    ).toMatchInlineSnapshot(`
      Object {
        "codeFrame": null,
        "enableCodeframe": false,
        "file": "definitions/syntetic/syntetic-1.yaml",
        "fromRule": "testing",
        "location": Object {
          "endCol": 14,
          "endIndex": 14,
          "endLine": 1,
          "startCol": 0,
          "startIndex": 0,
          "startLine": 1,
        },
        "message": "This is a test error",
        "path": Array [],
        "pathStack": Array [],
        "possibleAlternate": "example",
        "severity": 4,
        "target": "key",
        "value": Object {},
      }
    `);
  });
});

describe("fromError", () => {
  test("", () => {
    const ctx = {
      ...createCtx(),
      path: ["paths", "user", "get", "responses"],
      pathStack: [
        {
          file: createCtx().filePath,
          path: ["paths", "user", "get", "responses"]
        }
      ]
    };
    const baseError = createError("This is a test error", {}, ctx, {
      severity: messageLevels.ERROR
    });
    ctx.path = ["paths", "project", "get", "responses"];
    expect(fromError(baseError, ctx)).toMatchInlineSnapshot(`
      Object {
        "AST": null,
        "cache": Object {},
        "codeFrame": "[90m14|       - $ref: '#/components/parameters/example'[39m
      [90m15|     get:[39m
      [90m16|       [4m[31mresponses:[90m[24m[39m
      [90m17|[39m[31m [4m[31m        '200':[31m[24m[39m
      [90m18|[39m[31m [4m[31m          description: example description[31m[24m[39m
      [90m19|[39m[31m [4m[31m          content:[31m[24m[39m
      [90m20|[39m[31m [4m[31m            application/json:[31m[24m[39m
      [90m21|[39m[31m [4m[31m              schema:[31m[24m[39m
      [90m22|[39m[31m [4m[31m                type: object[31m[24m[39m
      [90m23|   project:[39m
      [90m24|     get:[39m",
        "definitionStack": Array [],
        "document": null,
        "enableCodeframe": true,
        "file": "definitions/syntetic/syntetic-1.yaml",
        "filePath": "./definitions/syntetic/syntetic-1.yaml",
        "fromRule": undefined,
        "location": Object {
          "endCol": 28,
          "endIndex": 425,
          "endLine": 22,
          "startCol": 7,
          "startIndex": 257,
          "startLine": 16,
        },
        "message": "This is a test error",
        "path": Array [
          "paths",
          "user",
          "get",
          "responses",
        ],
        "pathStack": Array [
          Object {
            "file": "definitions/syntetic/syntetic-1.yaml",
            "path": Array [
              "paths",
              "user",
              "get",
              "responses",
            ],
            "startLine": 16,
          },
        ],
        "possibleAlternate": undefined,
        "severity": 4,
        "source": null,
        "target": undefined,
        "value": Object {},
        "visited": Array [],
      }
    `);
  });
});
