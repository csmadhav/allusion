const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app.ts',
	devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
	devServer: {
    contentBase: './dist',
    before: function(app, server) {
      app.post('/track', function(req, res) {
        res.json({"status":"success"});
      });
    }
	},
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    new webpack.DefinePlugin({
          'APP_ENV': process.env.NODE_ENV || 'development',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/resources/sample-websites/portfolio/index.html',
      inject:'body'
    }),
    new CopyWebpackPlugin([
        {from:'src/resources/sample-websites/portfolio/img', to:'./img'},
        {from:'src/resources/sample-websites/portfolio/scripts', to:'./scripts'},
        {from:'src/resources/sample-websites/portfolio/styles', to:'./styles'} 
    ])
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};