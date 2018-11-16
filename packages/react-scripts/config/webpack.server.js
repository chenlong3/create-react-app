const paths = require('./paths')
const nodeExternals = require('webpack-node-externals')

const unit = require('./unit')

const alias = unit.getAlias(paths.appSrc)

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
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
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