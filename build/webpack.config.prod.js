const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const os = require('os')
const webpack = require('webpack')
const htmlPlugin = require('html-webpack-plugin')

const base = require('./webpack.config.base')

module.exports = merge(base, {
    mode: 'production',
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[chunkhash].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        runtimeChunk: {
            name: 'mianfest',//运行时文件
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vender',
                    chunks: 'all'
                },
            },
        },
        //压缩代码
        minimize: [
            new UglifyJsPlugin({
                cache: true,
                parallel: os.cpus().length,
                uglifyOption: {
                    ecma: 5,
                    mangle: true
                },
                sourceMap: false
            })
        ],
    }
})