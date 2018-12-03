const project = require('./config');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    site:'./js/site.js',
    credil: './scss/credil-style.scss',
    critical: './scss/critical.scss'
  },
  output: {
    filename: '[name].js',
    publicPath: project.compiler_public_path,
    chunkFilename: '[name].js',
    path: project.paths.dist()
  },
  devtool: project.compiler_devtool,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|dist|js)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', { modules: false }],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: 'css-loader', options: { importLoaders: 1, minimize: false }},
          'postcss-loader',
          {loader: 'sass-loader', options: {precision: 2}}
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        include: [
          project.paths.base() +  "/images"
        ],
        use: [
          {loader: 'file-loader',
            options: {
              hashType:'sha512',
              digestType: 'hex',
              name: '[name]-[hash].[ext]', ////[hash].[ext]
              outputPath: 'images/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 80
              },
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)$/,
        include: [
          project.paths.base() +  "/fonts"
        ],
        use: [
          {loader: 'file-loader',
            options: {
              hashType:'sha512',
              digestType: 'hex',
              name: '[name]-[hash].[ext]', //[hash].[ext]
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([project.paths.dist(), 'svg'], {
      root:project.paths.base(),
      verbose: false
    }),
    new StyleLintPlugin({
      configFile : "stylelint-dev.json",
      sintax : 'scss',
      files : 'scss/**/*.scss',
    }),
    new MiniCssExtractPlugin({
        filename:'[name].css'
    }),
    new WebpackAssetsManifest()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
      }
    }
  }
};
