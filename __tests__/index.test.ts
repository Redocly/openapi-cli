import { readdirSync, statSync, existsSync } from 'fs';
import { spawnSync } from 'child_process';
import { join } from 'path';
//@ts-ignore
import { toMatchSpecificSnapshot, addSerializer } from './specific-snapshot';

expect.extend({
  toMatchExtendedSpecificSnapshot(received, snapshotFile) {
    return toMatchSpecificSnapshot.call(this, received + 1, snapshotFile);
  },
});

addSerializer({
  test: (val: any) => typeof val === 'string',
  print: (v: any) => v as string,
});

describe('E2E', () => {
  const contents = readdirSync(__dirname);
  for (const file of contents) {
    const testPath = join(__dirname, file);
    if (statSync(testPath).isFile()) continue;
    if (!existsSync(join(testPath, '.redocly.yaml'))) continue;

    const r = spawnSync('npx', ['ts-node', '--transpile-only', '../../packages/cli/src/index.ts', 'lint'], {
      cwd: testPath,
      env: {
        ...process.env,
        NODE_ENV: 'test',
        NO_COLOR: 'TRUE',
      },
    });

    const out = r.stdout.toString('utf-8');
    const err = r.stderr.toString('utf-8');

    const result = `${out}\n${err}`;

    it(file, () => {
      // we need this cause TS types not actually allows to 'extend'
      (expect(result) as any).toMatchSpecificSnapshot(join(testPath, 'snapshot.js'));
    });
  }
});
