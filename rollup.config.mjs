import pkg from './package.json' assert {type: "json"};
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
  external: ['chartist'],
  input: pkg.main,
  output: [
    {
      file: pkg.publishConfig.main,
      format: 'cjs',
      globals: {
        chartist: 'Chartist'
      },
      sourcemap: true
    },
    {
      file: pkg.publishConfig.module,
      format: 'es',
      globals: {
        chartist: 'Chartist'
      },
      sourcemap: true
    },
    {
      file: pkg.unpkg,
      format: 'umd',
      name: 'ChartistPluginTooltip',
      globals: {
        chartist: 'Chartist'
      },
      sourcemap: true
    }
  ],
  plugins: [typescript(), terser()]
};
