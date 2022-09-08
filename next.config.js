/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    modularizeImports:{
      '@dimjs/utils': {
        transform: '@dimjs/utils/cjs/{{kebabCase member}}',
        preventFullImport: true,
        skipDefaultConversion:true
      },
      '@mui/material': {
        transform: '@mui/material/{{member}}',
        preventFullImport: true,
        skipDefaultConversion:true
      },
      '@mui/icons-material': {
        transform: '@mui/icons-material/{{member}}',
        preventFullImport: true,
        skipDefaultConversion:true
      },
    }
  }
}

module.exports = nextConfig
