const webpack = require('webpack')
const path = require('path')
const htmlPlugin = require('html-webpack-plugin')
const vue_loader = require('vue-loader/lib/plugin')


module.exports = {
    // entry:,
    output:{
        filename:'[name].bundle.js',
        chunkFilename:'[chunkhash].bundle.js',
        path: path.resolve(__dirname,'dist')
    },

    module: {
        rules: [
            {
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
            { test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=227' },
            { test: /\.(ttf|woff|svg|woff2|eot)$/, use: 'url-loader' },
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },
    plugins: [
        new htmlPlugin({
            template: './index.html'
        }),
        new vue_loader(),
        new webpack.HotModuleReplacementPlugin()
    ]
}