const nextConfig = {
  async rewrites() {
    return [
      { source: '/products/:id', destination: '/mainBoxes/:id' },
    ];
  },
  async redirects() {
    return [
      { source: '/mainBoxes/:id', destination: '/products/:id', permanent: false },
    ];
  },
};

export default nextConfig;
