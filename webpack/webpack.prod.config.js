const project = require('./config');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const WebpackAssetsManifest = require('webpack-assets-manifest');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    home:'./js/home.js',
    news:'./js/news.js',
    common: './scss/panda-style.scss',
    critical: './scss/critical.scss'
  },
  output: {
    filename: '[chunkhash].js',
    publicPath: project.compiler_public_path,
    chunkFilename: '[chunkhash].js',
    path: project.paths.dist(),
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
            cacheDirectory:true
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: 'css-loader', options: { importLoaders: 1, minimize: true }},
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
              name: '[hash].[ext]', ////[hash].[ext]
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
              name: '[hash].[ext]', //[hash].[ext]
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
      configFile : "stylelint-prod.json",
      sintax : 'css',
      files : 'dist/**/*.css',
    }),
    new MiniCssExtractPlugin({
      filename:'[name]-[contenthash].css'
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
    },
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        uglifyOptions: {
          output: {beautify: false},
          compress: {
            unused: true,
            dead_code: true,
            warnings: false
          },
          mangle: true
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};
