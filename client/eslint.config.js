// import eslint's javascript rules
import js from '@eslint/js'
// import predefined global variables for browser environment
import globals from 'globals'
// import rules that help enforce correct usage of react hooks
import reactHooks from 'eslint-plugin-react-hooks'
// import plugin that helps with vite's react fast refresh feature
import reactRefresh from 'eslint-plugin-react-refresh'
// import helper functions for defining eslint config
import { defineConfig, globalIgnores } from 'eslint/config'

// export the eslint config for the client
export default defineConfig([
  // ignore the dist folder bc it contains complied files
  globalIgnores(['dist']),
  {
    // apply rules to javascript and jsx files
    files: ['**/*.{js,jsx}'],
    // extend recommended rule sets from eslint and plugins
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      // the javascript version used in project
      ecmaVersion: 2020,
      // define browser variables so eslint doesn't throw errors for things like window and document
      globals: globals.browser,
      parserOptions: {
        // allow modern javascript syntax
        ecmaVersion: 'latest',
        // allow jsx syntax in eslint parsing
        ecmaFeatures: { jsx: true },
        // allow use of import/export modules
        sourceType: 'module',
      },
    },
    rules: {
      // show error if variables are declared but never used
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
