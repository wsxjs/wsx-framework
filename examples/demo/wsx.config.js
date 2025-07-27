/** @type {import('@wsx-framework/core').WSXConfig} */
const config = {
    // Development settings
    dev: {
        port: 3000,
        host: "localhost",
        open: true,
    },

    // Build settings
    build: {
        minify: true,
        sourcemap: true,
    },

    // Environment variables
    env: {
        CUSTOM_KEY: "demo-value",
    },

    // Custom redirects
    async redirects() {
        return [
            {
                source: "/old-about",
                destination: "/about",
                permanent: true,
            },
        ];
    },

    // Custom rewrites
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "/api/:path*",
            },
        ];
    },
};

export default config;
