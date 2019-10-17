module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'prettier',
    'prettier/react'
  ],
  env: {
    jest: true
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-param-reassign': ['error', { props: true }],
    'react/prop-types': ['error', { ignore: ['navigation'] }],
    'no-console': 'off',
    'no-prototype-builtins': 'off'
  },
  parser: 'babel-eslint'
};