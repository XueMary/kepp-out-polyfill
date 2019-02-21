import buble from 'rollup-plugin-buble';
import {uglify} from 'rollup-plugin-uglify';
export default {
    input: 'test/src/keep-out-polyfill.js', // Path relative to package.json
    output: {
        name: 'index',
        exports: 'named',
    },
    plugins: [
        buble({
            exclude: 'node_modules/**',
        }), // Transpile to ES5
        uglify()
    ],
};