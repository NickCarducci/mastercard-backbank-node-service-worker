import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.mjs',
  output: {
    exports: 'named',
    format: 'es',
    file: 'dist/index.mjs'
  },
  plugins: [
    commonjs(),
    nodeResolve({ browser: true })
  ],
}