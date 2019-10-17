/* eslint-disable class-methods-use-this */
import AbstractVisitor from '../../utils/AbstractVisitor';
import createError from '../../../error';

class PathDeclarationsMustExist extends AbstractVisitor {
  static get ruleName() {
    return 'pathDeclarationsMustExist';
  }

  get rule() {
    return 'path-declarations-must-exist';
  }


  OpenAPIPath() {
    return {
      onEnter: (node, _, ctx) => (ctx.path[ctx.path.length - 1].indexOf('{}') === -1
        ? null
        : createError(
          'Path parameter declarations must be non-empty. {} is invalid.', node, ctx, {
            target: 'key', severity: this.config.level, fromRule: this.rule,
          },
        )),
    };
  }
}

module.exports = PathDeclarationsMustExist;
