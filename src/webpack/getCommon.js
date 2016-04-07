import path from 'path';
import autoprefixer from 'autoprefixer';
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1'
];

export default {
  getResolveLoader: function () {
    return {
      root: path.join(__dirname, '../../node_modules')
    };
  },

  getLoaders() {
    return [
      { test: /\.txt/, loader: 'file-loader?name=[name]-[hash].[ext]' },
      { test: /\.gif/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
      { test: /\.jpg/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
      { test: /\.png/, loader: 'url-loader?limit=10000&mimetype=image/png' },
      { test: /\.svg/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      { test: /\.eot/, loader: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject' },
      { test: /\.woff2/, loader: 'url-loader?limit=100000&mimetype=application/font-woff2' },
      { test: /\.woff/, loader: 'url-loader?limit=100000&mimetype=application/font-woff' },
      { test: /\.ttf/, loader: 'url-loader?limit=100000&mimetype=application/font-ttf' }
    ];
  },

  getCssLoaders(isDevelopment) {
    let cssLoaders = {
      css: '',
      less: '!less-loader?sourceMap',
      scss: '!sass-loader?sourceMap',
      sass: '!sass-loader?indentedSyntax',
      styl: '!stylus-loader'
    };

    return Object.keys(cssLoaders).map(ext => {
      let prefix = 'css-loader?sourceMap!postcss-loader';
      let extLoaders = prefix + cssLoaders[ext];
      let loader = isDevelopment ?
        'style-loader!' + extLoaders
        : ExtractTextPlugin.extract('style-loader', extLoaders);
      return {
        loader: loader,
        test: new RegExp('\\.(' + ext + ')$')
      };
    });
  },

  getPostcssConfig() {
    return [autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })];
  }
};
