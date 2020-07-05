//
// Wallaby config reads tsconfig.json and jest.config.js out of the box
//
'use strict'

module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.ts?(x)',
      'src/**/*.js?(x)',
      'src/**/*.json',
      '!src/**/*.test.ts?(x)',
      'package.json',
      'tsconfig.json',
      'jest.*.js',
    ],
    tests: ['__tests__/*-test.ts?(x)'],
    env: {type: 'node', runner: 'node'},
    testFramework: 'jest',
    // like ts-jest need to hoist jest.mock() so use babel after ts to js
    // https://github.com/wallabyjs/public/issues/1375
    preprocessors: {
      '**/*.js?(x)': file =>
        require('babel-core').transform(file.content, {
          sourceMap: true,
          filename: file.path,
          compact: false,
          babelrc: true,
        }),
    },
    debug: true,
    reportConsoleErrorAsError: true,
    lowCoverageThreshold: 80,
  }
}
// module.exports = function(wallaby) {
//     var path = require('path');
//     process.env.NODE_PATH += path.delimiter + path.join(__dirname, 'node_modules');
//     require('module').Module._initPaths();

//     return {
//         files: ['jest.setup.js', 'src/**/*.(ts|tsx)', '!__tests__/**/*'],

//         tests: ['src/**/*.test.ts?(x)', '__tests__/**/*.tsx', '__tests__/*.tsx'],

//         env: {
//             type: 'node'
//         },

//         compilers: {
//             '**/*.js?(x)': wallaby.compilers.babel()
//         },

//         setup: wallaby => {
//             const jestConfig = require('./package.json').jest;
//             Object.keys(jestConfig.transform || {}).forEach(
//                 k => ~k.indexOf('^.+\\.(js|jsx') && void delete jestConfig.transform[k]
//             );
//             delete jestConfig.testEnvironment;
//             wallaby.testFramework.configure(jestConfig);
//         },

//         testFramework: 'jest'
//     };
// };

//   module.exports = function (wallaby) {
//     return {
//       files: [
//         'src/**/*.(ts|tsx)'
//       ],

//       tests: [
//         '__tests__/*-test.tsx'
//       ]
//       // for node.js tests you need to set env property as well
//       // https://wallabyjs.com/docs/integration/node.html
//     };
//   };
