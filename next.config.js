/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['openai']
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('openai')
    }
    return config
  }
}

module.exports = nextConfig