const webpack = require('webpack');

module.exports = {
  // ваші інші налаштування Webpack
  plugins: [
    new webpack.DefinePlugin({
      'process.env.WEBHOOK_URL': JSON.stringify(process.env.WEBHOOK_URL)
    })
  ]
};
