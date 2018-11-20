const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const reactNoUiSlider = path.resolve('../src');

const vendor = ['react', 'react-dom'];

const NODE_ENV = process.env.NODE_ENV || 'development';

const isDebug = process.argv[1].indexOf('webpack-dev-server') !== -1;

module.exports = {
  devtool: NODE_ENV === 'development' ? 'source-map' : '',

  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    open: true,
    compress: true,
    port: 3004,
  },

  entry: {
    vendor,
    index: './src/index.js',
  },

  output: {
    path: path.join(__dirname, '/build'),
    publicPath: isDebug ? '/' : '/react-nouislider/',
    filename: isDebug ? '[name].js' : 'static/js/[name].[chunkhash:8].js',
  },

  resolve: {
    alias: {
      'nouislider-react': reactNoUiSlider,
    },
  },

  cache: isDebug,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
              ],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(gif|png|svg|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/assets/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
