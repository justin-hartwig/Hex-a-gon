// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';

export default [
    {
        input: "./src/index.ts",
        output: {
            format: "iife",
            file: "./build/bundle.js"
        },
        plugins: [
            typescript({
                tsconfig: "./tsconfig.json",
                noEmitOnError: true
            })
        ],
    },
    {
        input: './styling/style.js',
        output: {
            file: 'output.js',
            format: 'esm'
        },
        plugins: [
            scss()
        ]
    }
];