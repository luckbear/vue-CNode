const webpack = require('webpack')
const path = require('path')
const vue_loader = require('vue-loader/lib/plugin')
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer= require('autoprefixer')


module.exports = {


    module: {
        rules: [
            // {
            //     test: /\.less$/,
            //     use: ['style-loader', 'css-loader', 'less-loader']
            // },
            // {
            //     test: /\.scss$/,
            //     use: ['style-loader', 'css-loader', 'sass-loader']
            // },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // },
            {
                test: /\.(css|less)$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    require.resolve('css-loader'),
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            indent: 'postcss',
                            plugins: () => [
                                postcssFlexbugsFixes,
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9',
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                    require.resolve('less-loader'),
                ],
            },
            {
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