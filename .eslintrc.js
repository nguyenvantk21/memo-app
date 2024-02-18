module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['vue', 'node', 'prettier'],
  rules: {
    'node/no-unsupported-features/es-syntax': [
      'error',
      { ignores: ['modules'] },
    ],
  },
}
