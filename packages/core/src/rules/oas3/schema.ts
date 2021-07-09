import type { Oas3Rule } from '../../visitors';
import { NormalizedNodeType, ScalarSchema } from '../../types';
import { oasTypeOf, matchesJsonSchemaType, getSuggest } from '../utils';

function isNamedType(
  t: NormalizedNodeType | ScalarSchema | null | undefined,
): t is NormalizedNodeType {
  return typeof t?.name === 'string';
}

export const Oas3Schema: Oas3Rule = () => {
  return {
    any(node: any, { report, type, location, key }) {
      const nodeType = oasTypeOf(node);
      if (type.items) {
        if (nodeType !== 'array') {
          report({
            message: `Expected type '${type.name} (array)' but got '${nodeType}'`,
          });
        }
        return;
      } else if (nodeType !== 'object') {
        report({
          message: `Expected type '${type.name} (object)' but got '${nodeType}'`,
        });
        return;
      }

      const required =
        typeof type.required === 'function' ? type.required(node, key) : type.required;
      for (let propName of required || []) {
        if (!(node as object).hasOwnProperty(propName)) {
          report({
            message: `The field '${propName}' must be present on this level.`,
            location: [{ reportOnKey: true }],
          });
        }
      }

      for (const propName of Object.keys(node)) {
        const propLocation = location.append([propName]);
        const propValue = node[propName];
        const propType =
          type.properties[propName] === undefined
            ? type.additionalProperties?.(propValue, propName)
            : type.properties[propName];
        const propSchema =
          typeof propType === 'function' ? propType(propValue, propName) : propType;

        const propValueType = oasTypeOf(propValue);

        if (isNamedType(propSchema)) {
          continue; // do nothing for named schema
        }

        if (propSchema === undefined) {
          if (propName.startsWith('x-')) continue;
          report({
            message: `Property \`${propName}\` is not expected here`,
            suggest: getSuggest(propName, Object.keys(type.properties)),
            location: [{ ...propLocation, reportOnKey: true }],
          });
          continue;
        }

        if (propSchema === null) {
          continue; // just defined, no validation
        }

        if (propSchema.enum) {
          if (!propSchema.enum.includes(propValue)) {
            report({
              location: propLocation,
              message: `'${propName}' can be one of following only: ${propSchema.enum
                .map((i) => `"${i}"`)
                .join(', ')}`,
              suggest: getSuggest(propValue, propSchema.enum),
            });
          }
        } else if (propSchema.type && !matchesJsonSchemaType(propValue, propSchema.type)) {
          report({
            message: `Expected type '${propSchema.type}' but got '${propValueType}'`,
            location: propLocation,
          });
        } else if (propValueType === 'array' && propSchema.items?.type) {
          const itemsType = propSchema.items?.type;
          for (let i = 0; i < propValue.length; i++) {
            const item = propValue[i];
            if (!matchesJsonSchemaType(item, itemsType)) {
              report({
                message: `Expected type '${itemsType}' but got '${oasTypeOf(item)}'`,
                location: propLocation.append([i]),
              });
            }
          }
        }
        if(propSchema.constraints) {
          const { maxLength, minLength, minValue, maxValue } = propSchema.constraints;
          if (maxLength !== undefined && node[propName].length > maxLength) {
            report({
              message: `The length of the ${propName} field must be less or equal to ${maxLength}`,
              location: location.append([propName]),
            })
          }

          if (minLength !== undefined && node[propName].length < minLength) {
            report({
              message: `The length of the ${propName} field must be greater than or equal to ${minLength}`,
              location: location.append([propName]),
            })
          }

          if (maxValue !== undefined && maxValue < node[propName]) {
            report({
              message: `The value of the ${propName} field must be less than or equal to ${maxValue}`,
              location: location.append([propName]),
            })
          }

          if (minValue !== undefined && minValue > node[propName]) {
            report({
              message: `The value of the ${propName} field must be greater than or equal to ${minValue}`,
              location: location.append([propName]),
            })
          }
        }
      }
    },
  };
};
