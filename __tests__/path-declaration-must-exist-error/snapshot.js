// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`E2E path-declaration-must-exist-error 1`] = `

No configurations were defined in extends -- using built in recommended configuration by default.

validating /openapi.yaml...
[1] openapi.yaml:14:3 at #/paths/~1api~1user~1{}~1profie

Path parameter declarations must be non-empty. \`{}\` is invalid.

12 |
13 | paths:
14 |   '/api/user/{}/profie':
   |   ^^^^^^^^^^^^^^^^^^^^^
15 |     get:
16 |       operationId: getUserProfile

Error was generated by the path-declaration-must-exist rule.


/openapi.yaml: validated in <test>ms

❌ Validation failed with 1 error.
run with \`--generate-ignore-file\` to add all problems to ignore file.


`;
