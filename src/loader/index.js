/* eslint-disable no-underscore-dangle */
import path from 'path';
import fs from 'fs';

function getObjByPathOrParent(json, JSONPath) {
  const get = (p, o) => p.reduce((xs, x) => ((xs && xs[x]) ? xs[x] : null), o);
  return get(JSONPath.split('.'), json);
}

function loadRuleset(config) {
  const ruleSet = [];
  const allRules = [];

  const configCopy = {
    ...config,
    rulesPath: config.rulesPath ? config.rulesPath : `${__dirname}/../visitors`,
  };
  let rulesDirectory = path.resolve(configCopy.rulesPath);
  if (!fs.existsSync(rulesDirectory)) {
    rulesDirectory = `${__dirname}/../visitors`;
  }
  const ruleSetDirContents = fs.readdirSync(rulesDirectory)
    .map((fName) => `${rulesDirectory}/${fName}`);
  const files = ruleSetDirContents.filter((fName) => fs.lstatSync(fName).isFile());

  const dirs = ruleSetDirContents
    .filter((fName) => !fs.lstatSync(fName).isFile() && fName.indexOf('utils') === -1);

  files.forEach((file) => {
    const Rule = require(file);
    let ruleConfig = getObjByPathOrParent(configCopy.rules, Rule.rule);
    const s = Rule.rule;
    if (!ruleConfig) {
      ruleConfig = getObjByPathOrParent(configCopy.rules, s);

      if (ruleConfig && typeof ruleConfig === 'object') {
        const allowed = ['level'];

        ruleConfig = Object.keys(ruleConfig)
          .filter((key) => allowed.includes(key))
          .reduce((obj, key) => {
            // eslint-disable-next-line no-param-reassign
            obj[key] = ruleConfig[key];
            return obj;
          }, {});
      }
    }

    if (configCopy && configCopy.rules) {
      const ruleInstance = new Rule(ruleConfig);
      if ((typeof ruleConfig === 'string' && ruleConfig !== 'off') || (typeof ruleConfig === 'object' && ruleConfig !== null)) {
        if (ruleConfig && typeof ruleConfig !== 'string' && !ruleConfig.level) {
          ruleConfig.level = 4;
        }
        if (!ruleInstance.config) {
          if (typeof ruleConfig === 'object') {
            ruleInstance.config = ruleConfig; // TODO: think if we are OK with changing internals of the config
          } else {
            ruleInstance.config = { level: ruleConfig };
          }
        }

        if ((typeof ruleConfig === 'string' && ruleConfig !== 'off') || !ruleConfig) {
          ruleInstance._config = { level: ruleConfig || 4 };
        }

        ruleSet.push(ruleInstance);
      }
      allRules.push(ruleInstance);
    } else {
      const ruleInstance = new Rule({});
      ruleSet.push(ruleInstance);
      allRules.push(ruleInstance);
    }
  });

  dirs.forEach((dir) => {
    const [nestedRules, allNestedRules] = loadRuleset({
      ...configCopy,
      rulesPath: dir,
    });
    ruleSet.push(...nestedRules);
    allRules.push(...allNestedRules);
  });

  return [ruleSet, allRules];
}

export function loadRulesetExtension(config) {
  const additionalRules = [];

  const configCopy = {
    ...config,
    rulesPath: config.rulesPath ? config.rulesPath : `${__dirname}/../visitors`,
  };

  config.rulesExtensions.forEach((Rule) => {
    let ruleConfig = getObjByPathOrParent(configCopy.rules, Rule.rule);
    const s = Rule.rule;
    if (!ruleConfig) {
      ruleConfig = getObjByPathOrParent(configCopy.rules, s);

      if (ruleConfig && typeof ruleConfig === 'object') {
        const allowed = ['level'];

        ruleConfig = Object.keys(ruleConfig)
          .filter((key) => allowed.includes(key))
          .reduce((obj, key) => {
            // eslint-disable-next-line no-param-reassign
            obj[key] = ruleConfig[key];
            return obj;
          }, {});
      }
    }

    if (configCopy && configCopy.rules) {
      if ((typeof ruleConfig === 'string' && ruleConfig !== 'off') || (typeof ruleConfig === 'object' && ruleConfig !== null) || !ruleConfig) {
        const ruleInstance = new Rule(ruleConfig);
        if (ruleConfig && typeof ruleConfig !== 'string' && !ruleConfig.level) {
          ruleConfig.level = 4;
        }
        if (!ruleInstance.config) {
          if (typeof ruleConfig === 'object') {
            ruleInstance.config = ruleConfig; // TODO: think if we are OK with changing internals of the config
          } else {
            ruleInstance.config = { level: ruleConfig };
          }
        }

        if ((typeof ruleConfig === 'string' && ruleConfig !== 'off') || !ruleConfig) {
          ruleInstance._config = { level: ruleConfig || 4 };
        }
        console.log(ruleInstance);
        additionalRules.push(ruleInstance);
      }
    } else {
      additionalRules.push(new Rule());
    }
  });
  return additionalRules;
}

export default loadRuleset;
