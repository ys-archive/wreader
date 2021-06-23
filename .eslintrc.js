module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'eslint:recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'import', 'jsx-a11y', 'react-hooks'],
  rules: {
    'no-unused-vars': 'warn',
    'no-undef': 'off',
    'no-console': 'off',
    'max-len': 0,
    'func-names': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-filename-extension': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'linebreak-style': 'off',
    'arrow-parens': 'off',
    'import/no-unresolved': [1, { ignore: ['#'] }],
    'import/extensions': 1,
    'no-use-before-define': 'off',
    'react/forbid-prop-types': 0,
    camelcase: 0,
    'react/jsx-props-no-spreading': 0,
    'import/prefer-default-export': 0,
    'implicit-arrow-linebreak': 0,
    'global-require': 0,
  },
};
