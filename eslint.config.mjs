import prettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {},
    rules: {
      'no-unused-vars': 'warn', // Warns about unused variables
      'no-console': 'warn', // Warns about console.log usage
      eqeqeq: 'error', // Enforces strict equality (=== instead of ==)
      curly: 'error', // Requires curly braces for if/else
      semi: ['error', 'always'],
      quotes: ['error', 'double'], // Enforces double quotes
      indent: ['error', 2], // Enforces 2-space indentation
    },
  },
  prettier,
];
