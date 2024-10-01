import CopyWebpackPlugin from "copy-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.plugins = [
            ...config.plugins,
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: "node_modules/tiktoken/tiktoken_bg.wasm", // Adjusted path for npm
                        to: "tiktoken_bg.wasm",
                        toType: "file",
                    },
                ],
            }),
        ];
        return config;
    },
};

export default nextConfig;
