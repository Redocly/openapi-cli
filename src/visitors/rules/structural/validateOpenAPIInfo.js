class ValidateOpenAPIInfo {
  static get rule() {
    return 'oas3-schema/info';
  }

  get validators() {
    return {
      title(node, ctx) {
        return !node || !node.title ? ctx.createError(ctx.messageHelpers.missingRequiredField('title'), 'key') : null;
      },
      version(node, ctx) {
        return !node || !node.version ? ctx.createError(ctx.messageHelpers.missingRequiredField('version'), 'key') : null;
      },
      description() {
        return null;
      },
      termsOfService() {
        return null;
      },
    };
  }

  OpenAPIInfo() {
    return {
      onEnter: (node, definition, ctx) => ctx.validateFields(
        this.config, this.rule, this.validators,
      ),
    };
  }
}

module.exports = ValidateOpenAPIInfo;
