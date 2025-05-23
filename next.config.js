/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ["./src"],
  },
  images: {
    domains: ["picsum.photos"],
  },
};

module.exports = nextConfig;
