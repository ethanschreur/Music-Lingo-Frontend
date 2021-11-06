module.exports = {
    images: {
        domains: ['i.ytimg.com'],
    },
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/home',
                destination: '/',
                permanent: true,
            },
        ]
    },
}
