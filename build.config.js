const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/allusion.ts',
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
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    new webpack.DefinePlugin({
          'APP_ENV': 'production',
    })
  ],
  output: {
    path: path.resolve(__dirname, 'lib'),
    library:"allusionjs",
    filename: '[name].js',
    libraryTarget:"commonjs2"
  }
};
