const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.

  config.plugins[config.plugins.length - 1].config.navigateFallbackBlacklist = [
    ...config.plugins[config.plugins.length - 1].config.navigateFallbackBlacklist,
    /login|consent|admin|forgot_password/, // oauth pages
  ]

  return config;
};
