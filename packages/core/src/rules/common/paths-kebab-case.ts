import { Oas3Rule, Oas2Rule } from '../../visitors';
import { UserContext } from '../../walk';

export const PathsKebabCase: Oas3Rule | Oas2Rule = () => {
  return {
    PathItem(_path: object, { report, key }: UserContext) {
      const segments = (key as string).substr(1).split('/');
      if (!segments.every((segment) => /^{.+}$/.test(segment) || /^[a-z0-9-.]+$/.test(segment))) {
        report({
          message: `\`${key}\` should be in kebab-case.`,
          location: { reportOnKey: true },
        });
      }
    },
  };
};
