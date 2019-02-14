module.exports = {
  out: './typedoc/',
  readme: 'none',
  includes: './src',
  exclude: ['**/*.test.ts', '**/node_modules/**/*'],
  mode: 'files',
  excludeExternals: true,
  excludeNotExported: true,
  ignoreCompilerErrors: true,
  excludePrivate: false
}
