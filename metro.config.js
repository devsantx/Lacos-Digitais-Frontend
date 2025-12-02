const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  url: require.resolve("url/"),
  buffer: require.resolve("buffer/"),
  events: require.resolve("events/"),
};

config.resolver.sourceExts = ["ts", "tsx", "js", "jsx", "json"];

module.exports = config;
