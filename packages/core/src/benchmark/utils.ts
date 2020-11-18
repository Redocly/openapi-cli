import * as yaml from 'js-yaml';
import { Document, Source } from '../resolve';
import { Oas3RuleSet } from '../lint';
import { RuleConfig, LintConfig, Plugin } from '../config/config';

export function parseYamlToDocument(body: string, absoluteRef: string = ''): Document {
  return {
    source: new Source(absoluteRef, body),
    parsed: yaml.safeLoad(body, { filename: absoluteRef }),
  };
}

export function makeConfigForRuleset(rules: Oas3RuleSet, plugin?: Partial<Plugin>) {
  const rulesConf: Record<string, RuleConfig> = {};
  const ruleId = 'test';
  Object.keys(rules).forEach((name) => {
    rulesConf[`${ruleId}/${name}`] = 'error';
  });

  return new LintConfig({
    plugins: [
      {
        ...plugin,
        id: ruleId,
        rules: { oas3: rules },
      },
    ],
    extends: [],
    rules: rulesConf,
  });
}
