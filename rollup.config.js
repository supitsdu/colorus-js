import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import swc from '@rollup/plugin-swc'

export default {
  input: 'src/main.js',
  output: [
    {
      file: 'dist/main.js',
      format: 'es'
    },
    {
      file: 'dist/main.cjs',
      format: 'cjs'
    }
  ],
  plugins: [
    nodeResolve(), // resolve node_modules
    commonjs(),
    swc({
      swc: {
        minify: true
      }
    }) // transpile JavaScript code using SWC
  ]
}
