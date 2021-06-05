import { build, BuildOptions } from 'esbuild'; // eslint-disable-line

const COMMON_OPTIONS: BuildOptions = {
  entryPoints: ['index.ts'],
  bundle: true,
  external: ['fs'],
  sourcemap: 'external',
  platform: 'node'
};

const OUTPUT_FORMATS = [
  {
    outfile: 'dist/index.mjs',
    format: 'esm',
  },

  {
    outfile: 'dist/index.cjs',
    format: 'cjs',
  },
];

async function run() {
  await Promise.all(
    OUTPUT_FORMATS.map(outputFormat => ({ ...outputFormat, ...COMMON_OPTIONS })).map(options =>
      build(options as BuildOptions),
    ),
  );
}

run();
