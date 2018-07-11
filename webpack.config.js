const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: [/node_modules/] },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'resolve-url-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ]
  },
  resolve: {
    modules: ['node_modules'],
    // Resolve import extension to .js if it is missing.
    extensions: ['.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, './src/app/index.html'), }),
    new CopyWebpackPlugin([{ from: path.resolve(__dirname, 'src/assets'), to: path.resolve(__dirname, 'dist/assets')}])
  ]
};
