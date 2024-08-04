/** @type {import('next').NextConfig} */
const nextConfig = {
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
