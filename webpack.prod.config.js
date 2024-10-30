const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.tsx",
    mode: "production",
    output: {
        filename: 'bundle.min.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            template: path.join(__dirname, "public", "index.html"),
            favicon: path.join(__dirname, "public", "favicon.ico"),
        }),
        new MiniCssExtractPlugin(),
        new Dotenv(),
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        fallback: {
            timers: require.resolve("timers-browserify"),
            https: require.resolve("https-browserify"),
            stream: require.resolve("stream-browserify"),
            http: require.resolve("stream-http"),
            'process/browser': require.resolve("process/browser"),
            buffer: require.resolve("buffer"),
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                include: /\.module\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName:'[name]__[local]--[hash:base64:5]',
                            },
                            importLoaders: 1
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.s?css$/,
                exclude: /\.module\.s?css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
            terserOptions: {
                compress: {
                drop_console: true,
            },
                mangle: true,
            },
            }),
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                defaultVendors: false,
            },
        }
    }
}