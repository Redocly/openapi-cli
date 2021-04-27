// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`E2E turn-on-all-rules 1`] = `

validating /openapi.yaml...
[1] openapi.yaml:1:1 at #/

Servers must be present.

 1 | openapi: 3.0.0
   | ^^^^^^^^^^^^^^
 2 | info:
   | ^^^^^
 … | < 15 more lines >
18 |           description: example description
   |           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Error was generated by the no-empty-servers rule.


[2] openapi.yaml:3:3 at #/info

Info object should contain \`description\` field.

1 | openapi: 3.0.0
2 | info:
3 |   title: Example OpenAPI 3 definition.
  |   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 |   version: 1.0.0
  |   ^^^^^^^^^^^^^^
5 |
6 | paths:

Error was generated by the info-description rule.


[3] openapi.yaml:2:1 at #/info/contact

Info object should contain \`contact\` field.

1 | openapi: 3.0.0
2 | info:
  | ^^^^
3 |   title: Example OpenAPI 3 definition.
4 |   version: 1.0.0

Error was generated by the info-contact rule.


[4] openapi.yaml:3:3 at #/info

Info object should contain \`license\` field.

1 | openapi: 3.0.0
2 | info:
3 |   title: Example OpenAPI 3 definition.
  |   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
4 |   version: 1.0.0
  |   ^^^^^^^^^^^^^^
5 |
6 | paths:

Error was generated by the info-license rule.


[5] openapi.yaml:9:7 at #/paths/~1ping~1{id}~1{test}/get

Operation object should contain \`operationId\` field.

 7 | '/ping/{id}/{test}':
 8 |   get:
 9 |     parameters:
   |     ^^^^^^^^^^^
10 |       - in: path
   |       ^^^^^^^^^^
 … |       < 7 more lines >
18 |         description: example description
   |         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Error was generated by the operation-operationId rule.


[6] openapi.yaml:9:7 at #/paths/~1ping~1{id}~1{test}/get

Operation object should contain \`summary\` field.

 7 | '/ping/{id}/{test}':
 8 |   get:
 9 |     parameters:
   |     ^^^^^^^^^^^
10 |       - in: path
   |       ^^^^^^^^^^
 … |       < 7 more lines >
18 |         description: example description
   |         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Error was generated by the operation-summary rule.


[7] openapi.yaml:9:7 at #/paths/~1ping~1{id}~1{test}/get

Operation object should contain \`description\` field.

 7 | '/ping/{id}/{test}':
 8 |   get:
 9 |     parameters:
   |     ^^^^^^^^^^^
10 |       - in: path
   |       ^^^^^^^^^^
 … |       < 7 more lines >
18 |         description: example description
   |         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Error was generated by the operation-description rule.


[8] openapi.yaml:11:17 at #/paths/~1ping~1{id}~1{test}/get/parameters/0/name

Path parameter \`test_id\` is not used in the path \`/ping/{id}/{test}\`.

 9 | parameters:
10 |   - in: path
11 |     name: test_id
   |           ^^^^^^^
12 |     description: User id
13 |     required: true

Error was generated by the path-parameters-defined rule.


[9] openapi.yaml:9:7 at #/paths/~1ping~1{id}~1{test}/get/parameters

The operation does not define the path parameter \`{id}\` expected by path \`/ping/{id}/{test}\`.

 7 | '/ping/{id}/{test}':
 8 |   get:
 9 |     parameters:
   |     ^^^^^^^^^^
10 |       - in: path
11 |         name: test_id

Error was generated by the path-parameters-defined rule.


[10] openapi.yaml:9:7 at #/paths/~1ping~1{id}~1{test}/get/parameters

The operation does not define the path parameter \`{test}\` expected by path \`/ping/{id}/{test}\`.

 7 | '/ping/{id}/{test}':
 8 |   get:
 9 |     parameters:
   |     ^^^^^^^^^^
10 |       - in: path
11 |         name: test_id

Error was generated by the path-parameters-defined rule.


/openapi.yaml: validated in <test>ms

❌ Validation failed with 10 errors.
run with \`--generate-ignore-file\` to add all problems to ignore file.


`;
