module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // The 'plugins' array holds all your plugins.
    plugins: [
      // Plugin 1: 'module-resolver' is configured as an array.
      // The first element is the plugin name, the second is its options object.
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@styles': './src/styles',
            '@assets': './src/assets',
            '@utils': './src/utils',
            '@services': './src/services',
            '@interfaces': './src/interfaces',
            '@constants': './src/constants',
          },
        },
      ],

      // Plugin 2: 'react-native-reanimated/plugin' is just a string
      // because it doesn't need an options object.
      // CRITICAL: This plugin MUST be listed LAST.
      'react-native-reanimated/plugin',
    ],
  };
};