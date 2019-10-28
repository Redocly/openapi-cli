import fs from "fs";

import traverse from "../traverse";
import { validateFromFile } from "../validate";

describe("Traverse files", () => {
  test("syntetic/syntetic-1.yaml", () => {
    expect(
      validateFromFile("./definitions/syntetic/syntetic-1.yaml", {
        rulesRedefine: "./definitions/rulesRedefine.js",
        typeExtension: "./definitions/typeExtension.js"
      })
    ).toMatchInlineSnapshot(`Array []`);
  });

  test("syntetic/syntetic-1.yaml", () => {
    expect(
      validateFromFile("./definitions/openapi-directory/rebilly-full.yaml", {})
    ).toMatchInlineSnapshot(`Array []`);
  });

  test("syntetic/syntetic-1.yaml", () => {
    expect(
      validateFromFile("./definitions/syntetic/to_bundle/main.yaml", {})
    ).toMatchInlineSnapshot(`Array []`);
  });

  test("syntetic/syntetic-1.yaml", () => {
    expect(validateFromFile("./definitions/syntetic/syntetic-1.yaml", {}))
      .toMatchInlineSnapshot(`
      Array [
        Object {
          "codeFrame": "[90m54|       schema:[39m
      [90m55|         type: string[39m
      [90m56| [4m[31mblabla[90m[24m: 313[39m
      [90m57| customerSupport:[39m
      [90m58|   id: 12[39m",
          "enableCodeframe": true,
          "file": "definitions/syntetic/syntetic-1.yaml",
          "fromRule": "oas3-schema/no-extra-fields",
          "location": Object {
            "endCol": 7,
            "endIndex": 1129,
            "endLine": 56,
            "startCol": 1,
            "startIndex": 1123,
            "startLine": 56,
          },
          "message": "The field 'blabla' is not allowed here. Use \\"x-\\" prefix to override this behavior.",
          "path": Array [
            "blabla",
          ],
          "pathStack": Array [],
          "possibleAlternate": null,
          "severity": 4,
          "target": "key",
          "value": Object {
            "blabla": 313,
            "components": Object {
              "parameters": Object {
                "example": Object {
                  "allOf": Array [
                    Object {
                      "in": "querya",
                      "name": "bla",
                      "required": false,
                      "schema": Object {
                        "type": "stringa",
                      },
                    },
                    Object {
                      "description": "Concrete example",
                    },
                  ],
                },
                "genericExample": Object {
                  "in": "query",
                  "name": "example",
                  "required": true,
                  "schema": Object {
                    "type": "string",
                  },
                },
              },
            },
            "customerSupport": Object {
              "contact": Object {
                "email": "ivan@redoc.ly",
                "name": "Ivan Goncharov",
              },
              "id": 12,
            },
            "defaultParameterSchema": Object {
              "type": "string",
            },
            "info": Object {
              "contact": Object {
                "email": "ivan@redoc.ly",
                "name": "Ivan Goncharov",
              },
              "license": Object {
                "name": "example",
                "url": "example.org",
              },
              "title": "Example OpenAPI 3 definition. Valid.",
              "version": 1,
            },
            "openapi": "3.0.2",
            "paths": Object {
              "project": Object {
                "get": Object {
                  "description": "Get project",
                  "operationId": "projectGet",
                  "responses": Object {
                    "200": Object {
                      "content": Object {
                        "application/json": Object {
                          "schema": Object {
                            "type": "object",
                          },
                        },
                      },
                      "description": "example description",
                    },
                  },
                },
              },
              "user": Object {
                "get": Object {
                  "description": "Get user",
                  "operationId": "userGet",
                  "responses": Object {
                    "200": Object {
                      "content": Object {
                        "application/json": Object {
                          "schema": Object {
                            "type": "object",
                          },
                        },
                      },
                      "description": "example description",
                    },
                  },
                },
                "parameters": Array [
                  Object {
                    "$ref": "#/components/parameters/example",
                  },
                ],
              },
            },
            "servers": Array [
              Object {
                "url": "http://example.org",
              },
            ],
          },
        },
        Object {
          "codeFrame": "[90m55|         type: string[39m
      [90m56| blabla: 313[39m
      [90m57| [4m[31mcustomerSupport[90m[24m:[39m
      [90m58|   id: 12[39m
      [90m59|   contact:[39m",
          "enableCodeframe": true,
          "file": "definitions/syntetic/syntetic-1.yaml",
          "fromRule": "oas3-schema/no-extra-fields",
          "location": Object {
            "endCol": 16,
            "endIndex": 1150,
            "endLine": 57,
            "startCol": 1,
            "startIndex": 1135,
            "startLine": 57,
          },
          "message": "The field 'customerSupport' is not allowed here. Use \\"x-\\" prefix to override this behavior.",
          "path": Array [
            "customerSupport",
          ],
          "pathStack": Array [],
          "possibleAlternate": null,
          "severity": 4,
          "target": "key",
          "value": Object {
            "blabla": 313,
            "components": Object {
              "parameters": Object {
                "example": Object {
                  "allOf": Array [
                    Object {
                      "in": "querya",
                      "name": "bla",
                      "required": false,
                      "schema": Object {
                        "type": "stringa",
                      },
                    },
                    Object {
                      "description": "Concrete example",
                    },
                  ],
                },
                "genericExample": Object {
                  "in": "query",
                  "name": "example",
                  "required": true,
                  "schema": Object {
                    "type": "string",
                  },
                },
              },
            },
            "customerSupport": Object {
              "contact": Object {
                "email": "ivan@redoc.ly",
                "name": "Ivan Goncharov",
              },
              "id": 12,
            },
            "defaultParameterSchema": Object {
              "type": "string",
            },
            "info": Object {
              "contact": Object {
                "email": "ivan@redoc.ly",
                "name": "Ivan Goncharov",
              },
              "license": Object {
                "name": "example",
                "url": "example.org",
              },
              "title": "Example OpenAPI 3 definition. Valid.",
              "version": 1,
            },
            "openapi": "3.0.2",
            "paths": Object {
              "project": Object {
                "get": Object {
                  "description": "Get project",
                  "operationId": "projectGet",
                  "responses": Object {
                    "200": Object {
                      "content": Object {
                        "application/json": Object {
                          "schema": Object {
                            "type": "object",
                          },
                        },
                      },
                      "description": "example description",
                    },
                  },
                },
              },
              "user": Object {
                "get": Object {
                  "description": "Get user",
                  "operationId": "userGet",
                  "responses": Object {
                    "200": Object {
                      "content": Object {
                        "application/json": Object {
                          "schema": Object {
                            "type": "object",
                          },
                        },
                      },
                      "description": "example description",
                    },
                  },
                },
                "parameters": Array [
                  Object {
                    "$ref": "#/components/parameters/example",
                  },
                ],
              },
            },
            "servers": Array [
              Object {
                "url": "http://example.org",
              },
            ],
          },
        },
        Object {
          "codeFrame": "[90m60|     name: Ivan Goncharov[39m
      [90m61|     email: ivan@redoc.ly[39m
      [90m62| [4m[31mdefaultParameterSchema[90m[24m:[39m
      [90m63|[39m[31m   type: string[39m",
          "enableCodeframe": true,
          "file": "definitions/syntetic/syntetic-1.yaml",
          "fromRule": "oas3-schema/no-extra-fields",
          "location": Object {
            "endCol": 23,
            "endIndex": 1244,
            "endLine": 62,
            "startCol": 1,
            "startIndex": 1222,
            "startLine": 62,
          },
          "message": "The field 'defaultParameterSchema' is not allowed here. Use \\"x-\\" prefix to override this behavior.",
          "path": Array [
            "defaultParameterSchema",
          ],
          "pathStack": Array [],
          "possibleAlternate": null,
          "severity": 4,
          "target": "key",
          "value": Object {
            "blabla": 313,
            "components": Object {
              "parameters": Object {
                "example": Object {
                  "allOf": Array [
                    Object {
                      "in": "querya",
                      "name": "bla",
                      "required": false,
                      "schema": Object {
                        "type": "stringa",
                      },
                    },
                    Object {
                      "description": "Concrete example",
                    },
                  ],
                },
                "genericExample": Object {
                  "in": "query",
                  "name": "example",
                  "required": true,
                  "schema": Object {
                    "type": "string",
                  },
                },
              },
            },
            "customerSupport": Object {
              "contact": Object {
                "email": "ivan@redoc.ly",
                "name": "Ivan Goncharov",
              },
              "id": 12,
            },
            "defaultParameterSchema": Object {
              "type": "string",
            },
            "info": Object {
              "contact": Object {
                "email": "ivan@redoc.ly",
                "name": "Ivan Goncharov",
              },
              "license": Object {
                "name": "example",
                "url": "example.org",
              },
              "title": "Example OpenAPI 3 definition. Valid.",
              "version": 1,
            },
            "openapi": "3.0.2",
            "paths": Object {
              "project": Object {
                "get": Object {
                  "description": "Get project",
                  "operationId": "projectGet",
                  "responses": Object {
                    "200": Object {
                      "content": Object {
                        "application/json": Object {
                          "schema": Object {
                            "type": "object",
                          },
                        },
                      },
                      "description": "example description",
                    },
                  },
                },
              },
              "user": Object {
                "get": Object {
                  "description": "Get user",
                  "operationId": "userGet",
                  "responses": Object {
                    "200": Object {
                      "content": Object {
                        "application/json": Object {
                          "schema": Object {
                            "type": "object",
                          },
                        },
                      },
                      "description": "example description",
                    },
                  },
                },
                "parameters": Array [
                  Object {
                    "$ref": "#/components/parameters/example",
                  },
                ],
              },
            },
            "servers": Array [
              Object {
                "url": "http://example.org",
              },
            ],
          },
        },
        Object {
          "codeFrame": "[90m41|   parameters:[39m
      [90m42|     example:[39m
      [90m43|       [4m[31mallOf[90m[24m:[39m
      [90m44|         - name: bla[39m
      [90m45|           in: querya[39m",
          "enableCodeframe": true,
          "file": "definitions/syntetic/syntetic-1.yaml",
          "fromRule": "oas3-schema/no-extra-fields",
          "location": Object {
            "endCol": 12,
            "endIndex": 858,
            "endLine": 43,
            "startCol": 7,
            "startIndex": 853,
            "startLine": 43,
          },
          "message": "The field 'allOf' is not allowed here. Use \\"x-\\" prefix to override this behavior.",
          "path": Array [
            "components",
            "parameters",
            "example",
            "allOf",
          ],
          "pathStack": Array [
            Object {
              "file": "definitions/syntetic/syntetic-1.yaml",
              "path": Array [
                "paths",
                "user",
                "parameters",
                0,
              ],
              "startLine": 18,
            },
          ],
          "possibleAlternate": null,
          "severity": 4,
          "target": "key",
          "value": Object {
            "allOf": Array [
              Object {
                "in": "querya",
                "name": "bla",
                "required": false,
                "schema": Object {
                  "type": "stringa",
                },
              },
              Object {
                "description": "Concrete example",
              },
            ],
          },
        },
        Object {
          "codeFrame": "[90m40| components:[39m
      [90m41|   parameters:[39m
      [90m42|     [4m[31mexample[90m[24m:[39m
      [90m43|       allOf:[39m
      [90m44|         - name: bla[39m",
          "enableCodeframe": true,
          "file": "definitions/syntetic/syntetic-1.yaml",
          "fromRule": "oas3-schema/parameter",
          "location": Object {
            "endCol": 12,
            "endIndex": 845,
            "endLine": 42,
            "startCol": 5,
            "startIndex": 838,
            "startLine": 42,
          },
          "message": "The field 'name' must be present on this level.",
          "path": Array [
            "components",
            "parameters",
            "example",
            "name",
          ],
          "pathStack": Array [
            Object {
              "file": "definitions/syntetic/syntetic-1.yaml",
              "path": Array [
                "paths",
                "user",
                "parameters",
                0,
              ],
              "startLine": 18,
            },
          ],
          "possibleAlternate": undefined,
          "severity": 4,
          "target": "key",
          "value": Object {
            "allOf": Array [
              Object {
                "in": "querya",
                "name": "bla",
                "required": false,
                "schema": Object {
                  "type": "stringa",
                },
              },
              Object {
                "description": "Concrete example",
              },
            ],
          },
        },
        Object {
          "codeFrame": "[90m40| components:[39m
      [90m41|   parameters:[39m
      [90m42|     [4m[31mexample[90m[24m:[39m
      [90m43|       allOf:[39m
      [90m44|         - name: bla[39m",
          "enableCodeframe": true,
          "file": "definitions/syntetic/syntetic-1.yaml",
          "fromRule": "oas3-schema/parameter",
          "location": Object {
            "endCol": 12,
            "endIndex": 845,
            "endLine": 42,
            "startCol": 5,
            "startIndex": 838,
            "startLine": 42,
          },
          "message": "The field 'in' must be present on this level.",
          "path": Array [
            "components",
            "parameters",
            "example",
            "in",
          ],
          "pathStack": Array [
            Object {
              "file": "definitions/syntetic/syntetic-1.yaml",
              "path": Array [
                "paths",
                "user",
                "parameters",
                0,
              ],
              "startLine": 18,
            },
          ],
          "possibleAlternate": undefined,
          "severity": 4,
          "target": "key",
          "value": Object {
            "allOf": Array [
              Object {
                "in": "querya",
                "name": "bla",
                "required": false,
                "schema": Object {
                  "type": "stringa",
                },
              },
              Object {
                "description": "Concrete example",
              },
            ],
          },
        },
        Object {
          "codeFrame": "[90m41|   parameters:[39m
      [90m42|     example:[39m
      [90m43|       [4m[31mallOf[90m[24m:[39m
      [90m44|         - name: bla[39m
      [90m45|           in: querya[39m",
          "enableCodeframe": true,
          "file": "definitions/syntetic/syntetic-1.yaml",
          "fromRule": "oas3-schema/no-extra-fields",
          "location": Object {
            "endCol": 12,
            "endIndex": 858,
            "endLine": 43,
            "startCol": 7,
            "startIndex": 853,
            "startLine": 43,
          },
          "message": "The field 'allOf' is not allowed here. Use \\"x-\\" prefix to override this behavior.",
          "path": Array [
            "components",
            "parameters",
            "example",
            "allOf",
          ],
          "pathStack": Array [],
          "possibleAlternate": null,
          "severity": 4,
          "target": "key",
          "value": Object {
            "allOf": Array [
              Object {
                "in": "querya",
                "name": "bla",
                "required": false,
                "schema": Object {
                  "type": "stringa",
                },
              },
              Object {
                "description": "Concrete example",
              },
            ],
          },
        },
        Object {
          "codeFrame": "[90m40| components:[39m
      [90m41|   parameters:[39m
      [90m42|     [4m[31mexample[90m[24m:[39m
      [90m43|       allOf:[39m
      [90m44|         - name: bla[39m",
          "enableCodeframe": true,
          "file": "definitions/syntetic/syntetic-1.yaml",
          "fromRule": "oas3-schema/parameter",
          "location": Object {
            "endCol": 12,
            "endIndex": 845,
            "endLine": 42,
            "startCol": 5,
            "startIndex": 838,
            "startLine": 42,
          },
          "message": "The field 'name' must be present on this level.",
          "path": Array [
            "components",
            "parameters",
            "example",
            "name",
          ],
          "pathStack": Array [],
          "possibleAlternate": undefined,
          "severity": 4,
          "target": "key",
          "value": Object {
            "allOf": Array [
              Object {
                "in": "querya",
                "name": "bla",
                "required": false,
                "schema": Object {
                  "type": "stringa",
                },
              },
              Object {
                "description": "Concrete example",
              },
            ],
          },
        },
        Object {
          "codeFrame": "[90m40| components:[39m
      [90m41|   parameters:[39m
      [90m42|     [4m[31mexample[90m[24m:[39m
      [90m43|       allOf:[39m
      [90m44|         - name: bla[39m",
          "enableCodeframe": true,
          "file": "definitions/syntetic/syntetic-1.yaml",
          "fromRule": "oas3-schema/parameter",
          "location": Object {
            "endCol": 12,
            "endIndex": 845,
            "endLine": 42,
            "startCol": 5,
            "startIndex": 838,
            "startLine": 42,
          },
          "message": "The field 'in' must be present on this level.",
          "path": Array [
            "components",
            "parameters",
            "example",
            "in",
          ],
          "pathStack": Array [],
          "possibleAlternate": undefined,
          "severity": 4,
          "target": "key",
          "value": Object {
            "allOf": Array [
              Object {
                "in": "querya",
                "name": "bla",
                "required": false,
                "schema": Object {
                  "type": "stringa",
                },
              },
              Object {
                "description": "Concrete example",
              },
            ],
          },
        },
      ]
    `);
  });
});
