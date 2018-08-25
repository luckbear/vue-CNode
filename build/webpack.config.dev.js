const merge = require('webpack-merge')
const webpack = require('webpack')
const htmlPlugin = require('html-webpack-plugin')

const base = require('./webpack.config.base')


module.exports = merge(base, {
    mode: 'development',
    module: {
        rules: [{
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    devServer: {
        port: 8090,
        hot: true,
        open: true,
        contentBase: './',
    },
    plugins: [
        new htmlPlugin({
            template: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
})