import js from '@eslint/js'
import globals from 'globals'

export default [
  { ignores: ['dist', '.next'] },
  {
    ...js.configs.recommended,
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]
