/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 's3.amazonaws.com',
            port: '',
            pathname: '/my-bucket/**',
          },
          {
              protocol: 'https',
              hostname: 'st.depositphotos.com',
              port: '',
              pathname: '/**',
            },
        ],
      },
};

export default nextConfig;




