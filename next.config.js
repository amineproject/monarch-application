/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "localhost",
                pathname: "**",
                port: "3000",
                protocol: "http"
            },
            {
                hostname: "monarch-application.s3.eu-west-3.amazonaws.com",
                pathname: "",
                port:"",
                protocol: "https"
            }
        ],
        domains: ['monarch-application.s3.eu-west-3.amazonaws.com'],
    }
}

module.exports = nextConfig
