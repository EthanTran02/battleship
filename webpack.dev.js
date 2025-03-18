const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map', // Add source maps for debugging
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
      watch: true,
    },
    hot: true,
    liveReload: true,
  },
});
