/**
 * @type {import('next').NextConfig}
 */

const path = require('path')

const config = {
  reactStrictMode: true,
sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        port: '',
        pathname: '/',
      },
    ],
    domains: ['media.mayoral.com','assets.mayoral.com']
  },
};

module.exports = config;