import { OpenAPIExampleMap } from './OpenAPIExample';
// eslint-disable-next-line import/no-cycle
import { OpenAPIMediaTypeObject } from './OpenAPIMediaObject';
import OpenAPISchemaObject from './OpenAPISchema';

export const OpenAPIHeader = {
  name: 'OpenAPIHeader',
  allowedFields: [
    'description',
    'required',
    'deprecated',
    'allowEmptyValue',
    'explode',
    'allowReserved',
    'example',
    'examples',
  ],
  properties: {
    schema: OpenAPISchemaObject,
    content: OpenAPIMediaTypeObject,
    examples: OpenAPIExampleMap,
  },
};

export const OpenAPIHeaderMap = {
  properties(node) {
    const props = {};
    Object.keys(node).forEach((k) => {
      props[k] = OpenAPIHeader;
    });
    return props;
  },
};
