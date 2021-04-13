// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`E2E no-enum-type-mismatch-error 1`] = `

validating /openapi.yaml...
[1] openapi.yaml:21:21 at #/paths/~1ping/get/responses/200/content/application~1json/schema/enum/3

Enum value \`string\` must be of one type. Allowed types: \`integer,array\`.

19 |                 - [ 1, 2, 3, string]
20 |                 - 3
21 |                 - string
   |                   ^^^^^^
22 | /pong:
23 |   get:

Error was generated by the no-enum-type-mismatch rule.


[2] openapi.yaml:32:21 at #/paths/~1pong/get/responses/200/content/application~1json/schema/enum/1

All values of \`enum\` field must be of the same type as the \`type\` field: expected "integer" but received "string".

30 | enum:
31 |   - 1
32 |   - string
   |     ^^^^^^
33 |   - 13
34 |

Error was generated by the no-enum-type-mismatch rule.


/openapi.yaml: validated in <test>ms

❌ Validation failed with 2 errors.
run with \`--generate-ignore-file\` to add all problems to ignore file.


`;
