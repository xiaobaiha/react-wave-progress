const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production', 
  
  entry: {
    index: './src/index.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'core'),
    libraryTarget: 'commonjs2'
  },

  resolve: {
    extensions: ['.js']
  },

  module: {
    rules: [
      { 
        test: /\.jsx?$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
        query: {
            presets: ['@babel/preset-env', '@babel/preset-react']
        } 
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['core'])
  ],
}
