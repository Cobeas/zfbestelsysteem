/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    async redirects() {
        return [
            {
                source: '/',
                destination: '/auth/instellingen',
                permanent: true
            }
        ]
    }
};

export default nextConfig;
