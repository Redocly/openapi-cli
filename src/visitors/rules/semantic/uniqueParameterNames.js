import OpenAPIOperation from '../../../types/OAS3/OpenAPIOperation';
import OpenAPIPath from '../../../types/OAS3/OpenAPIPath';

class UniqueParameterNames {
  static get rule() {
    return 'unique-parameter-names';
  }

  constructor(config) {
    this.config = config;
    this.currentOperationParameters = [];
    this.currentPathParameters = [];
  }

  OpenAPIComponents() {
    return {
      onExit: () => {
        this.currentOperationParameters = [];
        this.currentPathParameters = [];
      },
    };
  }

  OpenAPIOperation() {
    return {
      onExit: () => {
        this.currentOperationParameters = [];
      },
    };
  }

  OpenAPIPath() {
    return {
      onExit: () => {
        this.currentPathParameters = [];
      },
    };
  }

  OpenAPIParameter() {
    return {
      onEnter: (node, _, ctx) => {
        let error;

        let paramsList = [];

        if (ctx.definitionStack.includes(OpenAPIOperation)) {
          paramsList = this.currentOperationParameters;
        } else if (ctx.definitionStack.includes(OpenAPIPath)) {
          paramsList = this.currentPathParameters;
        } else {
          return [];
        }

        if (node.name && paramsList.includes(node.name)) {
          ctx.path.push('name');
          error = ctx.createError('Duplicate parameters are not allowed. This name is already used on this level.', 'value');
          ctx.path.pop();
        }
        if (node.name) {
          paramsList.push(node.name);
        }
        return error ? [error] : [];
      },
    };
  }
}

module.exports = UniqueParameterNames;
