module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@modules': './src/modules',
          '@shared': './src/shared',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
