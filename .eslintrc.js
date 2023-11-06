module.exports = {
  root: true,
  extends: ['plugin:tailwindcss/recommended', 'next/core-web-vitals'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      parser: '@typescript-eslint/parser',
    },
  ],
  plugins: ['perfectionist'],
  rules: {
    'perfectionist/sort-imports': [
      'error',
      {
        'type': 'natural',
        'order': 'asc',
        'groups': [
          'type',
          'react',
          'nanostores',
          ['builtin', 'external'],
          'internal-type',
          'internal',
          ['parent-type', 'sibling-type', 'index-type'],
          ['parent', 'sibling', 'index'],
          'side-effect',
          'style',
          'object',
          'unknown'
        ],
        'custom-groups': {
          'value': {
            'react': ['react', 'react-*'],
            'nanostores': '@nanostores/**'
          },
          'type': {
            'react': 'react'
          }
        },
        'newlines-between': 'always',
        'internal-pattern': [
          '@/components/**',
          '@/stores/**',
          '@/pages/**',
          '@/lib/**'
        ]
      }
    ],
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
  }
};