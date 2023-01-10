module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'global-require': 'off',
    'no-useless-return': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'import/no-import-module-exports': 'off',
    'prefer-const': 'off',
  },
};
