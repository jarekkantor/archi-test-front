module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  // required to lint *.vue files
  plugins: [
    'vue',
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-unused-vars': 0,
    'no-trailing-spaces': 1,
    'vue/script-indent': [ 'error', 2, { 'baseIndent': 0 } ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'comma-spacing': [ 'error', { 'before': false, 'after': true } ],
    'space-in-parens': [ 'error', 'never' ],
    'quotes': [ 'error', 'single', { 'allowTemplateLiterals': true, 'avoidEscape': true } ],
    'semi': [ 'error', 'always' ],
    'no-multiple-empty-lines': [ 'error', { 'max': 2, 'maxEOF': 1 } ],
    'yoda': [ 2, 'never' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'keyword-spacing': [ 'error', { 'before': true, 'after': true } ],
    'arrow-spacing': [ 'error', { 'before': true, 'after': true } ],
    'key-spacing': [ 2, { 'beforeColon': false, 'afterColon': true } ],
  },
};
