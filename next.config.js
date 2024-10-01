const nextConfig = {
    webpack: (config, { isServer }) => {
      config.experiments = {
        ...config.experiments,
        asyncWebAssembly: true,
      }
      return config
    },
  }
  
  module.exports = nextConfig