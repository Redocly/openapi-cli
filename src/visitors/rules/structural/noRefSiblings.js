import { MAPPING_DATA_KEY } from '../../../types/OAS3/OpenAPIDiscriminator';

class NoRefSiblings {
  static get rule() {
    return 'no-$ref-siblings';
  }

  any() {
    return {
      onEnter: (node, definition, ctx, unresolvedNode) => {
        const errors = [];

        if (!unresolvedNode || typeof unresolvedNode !== 'object') return errors;

        const nodeKeys = Object.keys(unresolvedNode);
        if (nodeKeys.indexOf('$ref') === -1) return errors;

        if (nodeKeys.length > 1) {
          const tempPath = {
            path: ctx.path,
            filePath: ctx.filePath,
            source: ctx.source,
          };

          const prevPathItem = ctx.pathStack[ctx.pathStack.length - 1];

          ctx.path = prevPathItem.path;
          ctx.filePath = prevPathItem.file;
          ctx.source = prevPathItem.source;

          for (let i = 0; i < nodeKeys.length; i++) {
            if (nodeKeys[i] !== '$ref' && nodeKeys[i] !== MAPPING_DATA_KEY) {
              ctx.path.push(nodeKeys[i]);
              const e = ctx.createError(
                'No siblings are allowed inside object with $ref property.',
                'key',
              );
              errors.push(e);
              ctx.path.pop();
            }
          }

          ctx.source = tempPath.source;
          ctx.path = tempPath.path;
          ctx.filePath = tempPath.filePath;
        }

        return errors;
      },
    };
  }
}

module.exports = NoRefSiblings;
