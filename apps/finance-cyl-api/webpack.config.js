const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
// Resolve TS path aliases from tsconfig in webpack
// Uses tsconfig-paths-webpack-plugin to map `paths` -> webpack resolution
let TsconfigPathsPlugin;
try {
  TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
} catch {
  // If the plugin is not installed, we still export a valid webpack config.
  // The user should install `tsconfig-paths-webpack-plugin` to enable TS path alias
  TsconfigPathsPlugin = null;
}

const resolveConfig = {
  extensions: ['.ts', '.tsx', '.js', '.json'],
};

if (TsconfigPathsPlugin) {
  resolveConfig.plugins = [
    new TsconfigPathsPlugin({
      configFile: join(__dirname, 'tsconfig.app.json'),
    }),
  ];
}

module.exports = {
  output: {
    path: join(__dirname, 'dist'),
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  resolve: resolveConfig,
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/server.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/infra/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      sourceMaps: true,
    }),
  ],
};
