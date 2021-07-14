module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-env', '@babel/preset-react'],
    plugins: [
      [
        'babel-plugin-root-import',
        {
          paths: [
            { rootPathSuffix: './src/', rootPathPrefix: '#' },
            { rootPathSuffix: './assets/', rootPathPrefix: '!' },
            { rootPathSuffix: './node_modules/', rootPathPrefix: '&' },
          ],
        },
      ],
      ['module:react-native-dotenv'],
    ],
  };
};
