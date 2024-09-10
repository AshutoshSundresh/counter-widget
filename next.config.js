const nextConfig = {
  basePath: "/counter-widget",
  output: "export",
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/AshutoshSundresh/**',
      },
    ],
  },
}