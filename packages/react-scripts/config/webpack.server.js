const paths = require('./paths')
const nodeExternals = require('webpack-node-externals')
const getCacheIdentifier = require('react-dev-utils/getCacheIdentifier');

const unit = require('./unit')

const alias = unit.getAlias(paths.appSrc)

const mdLoader = unit.getMdLoader()

module.exports = {
  mode: 'none',
  entry: paths.appServer,
  output: {
    libraryTarget: 'commonjs2',
    path: paths.appBuild,
    filename: 'server.js'
  },
  resolve: {
    alias: alias,
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
    // md 文件loader
      mdLoader,
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(css|scss|sass)$/,
        use: {
          loader: 'ignore-loader'
        }
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: {
          customize: require.resolve(
            'babel-preset-react-app/webpack-overrides'
          ),
          // @remove-on-eject-begin
          babelrc: false,
          configFile: false,
          presets: [require.resolve('babel-preset-react-app')],
          // Make sure we have a unique cache identifier, erring on the
          // side of caution.
          // We remove this when the user ejects because the default
          // is sane and uses Babel options. Instead of options, we use
          // the react-scripts and babel-preset-react-app versions.
          cacheIdentifier: getCacheIdentifier('development', [
            'babel-plugin-named-asset-import',
            'babel-preset-react-app',
            'react-dev-utils',
            'react-scripts',
          ]),
          // @remove-on-eject-end
          plugins: [
            [
              require.resolve('babel-plugin-named-asset-import'),
              {
                loaderMap: {
                  svg: {
                    ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
                  },
                },
              },
            ],
          ],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          // Don't waste time on Gzipping the cache
          cacheCompression: false,
        },
      }
    ]
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
}