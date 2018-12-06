const path = require('path');
// TODO: HtmlWebpackPlugin?

module.exports = function(_env, argv) {
  return {
    entry: {
      main: path.resolve(__dirname, './src/main.tsx'),
    },
    output: {
      path: path.resolve(__dirname, '../build/client'),
      filename: '[name].bundle.js',
    },
    devtool: argv.mode === 'development' ? 'inline-source-map': false,
    devServer: {
      index: '',
      proxy: [{
        context: () => true,
        target: 'http://localhost:3000',
      }],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
        {
          test: /\.css$/,
          loader: [
            { loader: 'style-loader' },
            { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
            { loader: 'postcss-loader' },
          ],
        },
      ],
    },
  };
};
