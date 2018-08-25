const webpack = require('webpack')
const path = require('path')
const vue_loader = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')



module.exports = {
    module: {
        rules: [{
                test: /\.(png|jpg|gif)$/,
                use: 'url-loader?limit=227'
            },
            {
                test: /\.(ttf|woff|svg|woff2|eot)$/,
                use: 'url-loader'
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },
    plugins: [
        new vue_loader(),

    ]
}