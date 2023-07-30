/** @type {import('next').NextConfig} */

//the default
//const nextConfig = {}


//from the tutorial
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
        domains: ["lh3.googleusercontent.com"]
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config;
    }
}


module.exports = nextConfig
