var path = require('path');
const webpack = require('webpack');
var SRC_DIR = path.join(__dirname, '/src');
var DIST_DIR = path.join(__dirname, '/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  target: 'node',
  node: {
        __dirname: false,  
        __filename: false,  
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env", '@babel/preset-react']
        }
      }
    ]
  }
};
