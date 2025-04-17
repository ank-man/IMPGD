/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Enable static exports for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/impgd' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/impgd/' : '',
}

module.exports = nextConfig 