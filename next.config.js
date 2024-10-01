module.exports = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.wasm$/,
        type: 'asset/resource',
      });
      return config;
    },
  };
  