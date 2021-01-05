// module.exports = {
//   entry: './client/index.js',
//   mode: 'development',
//   output: {
//     path: __dirname,
//     filename: './public/bundle.js',
//   },
//   devtool: 'source-map',
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//       },
//     ],
//   },
// };

module.exports = {
  entry: '/client/index.js',
  mode: 'development',
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};