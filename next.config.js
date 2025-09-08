/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['openai'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('openai')
    }
    return config
  }
}

module.exports = nextConfig