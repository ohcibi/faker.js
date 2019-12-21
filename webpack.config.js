const path = require('path');

module.exports = (mode) => {
  if (!mode) {
    mode = 'development';
  }

  const isProduction = mode === 'production';

  return {
    mode,
    entry: "./src/faker.ts",
    devtool: !isProduction ? 'hidden-source-map' : '',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "faker.js",
      library: 'Faker',
      libraryTarget: 'umd'
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".json"],
      modules: ['node_modules', path.resolve(__dirname, 'src')]
    },
    module: {
      rules: [
        { test: /\.tsx?$/, use: ["ts-loader"], exclude: /node_modules/ }
      ]
    }
  };
};
