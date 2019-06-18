module.exports = {
  root: true,

  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    useJSXTextNode: true,
    jsx: true,
  },

  env: {
    browser: true
  },

  extends: ['eslint:recommended', 'plugin:vue/recommended', 'plugin:import/warnings'],

  // required to lint *.vue files
  plugins: ['vue'],

  globals: {
    ga: true, // Google Analytics
    cordova: true,
    __statics: true,
    process: true
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'indent': 'off',
      },
    },
    {
      files: ['*.ts', '*.vue', '*.tsx'],
      rules: {
        'indent': 'off',
        'new-cap': 'off',
        'no-undef': 'off',
        'no-undefined': 'off',
        'no-unused-vars': 'off',
        'no-dupe-class-members': 'off',
        'no-magic-numbers': 'off',
      },
    },
    {
      files: ['*.vue'],
      rules: {
        'max-len': 'off',
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        'import/no-duplicates': 'off',
        'typescript/interface-name-prefix': 'off',
        'typescript/no-namespace': 'off',
        'no-magic-numbers': 'off',
      },
    },
    {
      files: [
        '*.spec.js',
        '*.spec.ts',
        '*.test.ts',
        '*.test.js',
      ],
      rules: {
        'no-magic-numbers': 'off',
        'max-nested-callbacks': 'off',
        'no-undef': 'off',
      },
    },
  ],

  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow paren-less arrow functions
    'arrow-parens': 'off',
    'one-var': 'off',

    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'prefer-promise-reject-errors': 'off',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],

    // allow console.log during development only
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
