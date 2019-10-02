/* eslint-disable no-case-declarations */
/* eslint-disable no-use-before-define */
import resolveNode from './resolver';
import { fromError } from './error/default';

function traverseChildren(resolvedNode, definition, ctx, visited) {
  let nodeChildren;
  const errors = [];
  switch (typeof definition.properties) {
    case 'function':
      nodeChildren = definition.properties(resolvedNode);
      const childrenNames = Object.keys(nodeChildren);
      const resolvedNodeKeys = Object.keys(resolvedNode);
      for (let i = 0; i < childrenNames.length; i += 1) {
        const child = childrenNames[i];
        let childResult = [];
        if (resolvedNodeKeys.includes(child)) {
          ctx.path.push(child);
          if (resolvedNode[child]) childResult = traverseNode(resolvedNode[child], nodeChildren[child], ctx, visited);
          if (childResult) errors.push(...childResult);
          ctx.path.pop();
        }
      }

      break;
    case 'object':
      const props = Object.keys(definition.properties);
      for (let i = 0; i < props.length; i += 1) {
        const p = props[i];
        let propResult = [];
        ctx.path.push(p);
        if (typeof definition.properties[p] === 'function') {
          if (resolvedNode[p]) propResult = traverseNode(resolvedNode[p], definition.properties[p](), ctx, visited);
        } else if (resolvedNode[p]) {
          propResult = traverseNode(resolvedNode[p], definition.properties[p], ctx, visited);
        }
        if (propResult) errors.push(...propResult);
        ctx.path.pop();
      }

      break;
    default:
        // do nothing
  }
  return errors;
}

function onNodeEnter(node, ctx) {
  let nextPath;
  let prevPath;
  let resolvedNode;
  let updatedSource;
  let prevSource;
  let filePath;
  let prevFilePath;
  ({
    // eslint-disable-next-line prefer-const
    node: resolvedNode, nextPath, updatedSource, filePath,
  } = resolveNode(node, ctx));

  if (nextPath) {
    ctx.pathStack.push({ path: ctx.path, file: ctx.filePath });
    prevPath = ctx.path;
    ctx.path = nextPath;
  }

  if (updatedSource) {
    ctx.AST = null;
    prevFilePath = ctx.filePath;
    ctx.filePath = filePath;
    prevSource = ctx.source;
    ctx.source = updatedSource;
  }

  return {
    resolvedNode,
    prevPath,
    prevFilePath,
    prevSource,
  };
}

function onNodeExit(nodeContext, ctx) {
  if (nodeContext.prevPath) {
    const fromStack = ctx.pathStack.pop();
    ctx.path = fromStack.path;
  }
  if (nodeContext.prevFilePath) {
    ctx.AST = null;
    ctx.source = nodeContext.prevSource;
    ctx.filePath = nodeContext.prevFilePath;
  }
}

const nestedIncludes = (c, s) => {
  const res = s.find((el) => el.filter((v, id) => c[id] === v).length === c.length) !== undefined;
  // console.log(c, s, res);
  return res;
};

function traverseNode(node, definition, ctx, visited = []) {
  if (!node || !definition) return [];

  const nodeContext = onNodeEnter(node, ctx);
  const isRecursive = nestedIncludes(ctx.path, visited);

  const errors = [];
  const currentPath = `${ctx.filePath}::${ctx.path.join('/')}`;

  const localVisited = Array.from(visited);
  localVisited.push(Array.from(ctx.path));

  const allowedMultipleEntries = ['OpenAPIParameter', 'OpenAPIOperation'];

  if (Array.isArray(nodeContext.resolvedNode)) {
    nodeContext.resolvedNode.forEach((nodeChild, i) => {
      ctx.path.push(i);
      const arrayResult = traverseNode(nodeChild, definition, ctx, localVisited);
      if (arrayResult) errors.push(...arrayResult);
      ctx.path.pop();
    });
    if (nodeContext.nextPath) ctx.path = nodeContext.prevPath;
  } else {
    runRuleOnRuleset(nodeContext, 'onEnter', ctx, definition, node, errors);

    if (!isRecursive && (!definition.isIdempotent || !ctx.visited.includes(currentPath))) {
      // console.log(`Will traverse ${currentPath}`);
      if (!ctx.visited.includes(currentPath)) ctx.visited.push(currentPath);

      const errorsChildren = traverseChildren(nodeContext.resolvedNode, definition, ctx, localVisited);
      errors.push(...errorsChildren);
    } else {
      const cachedResult = ctx.cache[currentPath] ? ctx.cache[currentPath].map((r) => fromError(r, ctx)) : [];

      ctx.result.push(...cachedResult);
      onNodeExit(nodeContext, ctx);
      return errors;
    }

    runRuleOnRuleset(nodeContext, 'onExit', ctx, definition, node, errors);

    ctx.cache[currentPath] = errors;
  }
  onNodeExit(nodeContext, ctx);
  return errors;
}

function runRuleOnRuleset(nodeContext, ruleName, ctx, definition, node, errors) {
  for (let i = 0; i < ctx.customRules.length; i += 1) {
    const errorsOnEnterForType = ctx.customRules[i][definition.name] && ctx.customRules[i][definition.name]()[ruleName]
      ? ctx.customRules[i][definition.name]()[ruleName](
        nodeContext.resolvedNode, definition, ctx, node,
      ) : [];

    const errorsOnEnterGeneric = ctx.customRules[i].any && ctx.customRules[i].any()[ruleName]
      ? ctx.customRules[i].any()[ruleName](nodeContext.resolvedNode, definition, ctx, node) : [];


    if (errorsOnEnterForType) {
      ctx.result.push(...errorsOnEnterForType);
      errors.push(...errorsOnEnterForType);
    }

    if (errorsOnEnterGeneric) {
      ctx.result.push(...errorsOnEnterGeneric);
      errors.push(...errorsOnEnterGeneric);
    }
  }
}

export default traverseNode;
