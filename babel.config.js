module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  }
}

module.exports = {
  plugins: [
    ['module-resolver', {
      root: [
        './src',
      ],
      "alias": {
        "~": "./src",
      }
    }],
    'react-native-reanimated/plugin'
  ],
  presets: ['babel-preset-expo', '@babel/preset-react'],
}