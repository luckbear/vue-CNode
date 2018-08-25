const merge = require('webpack-merge')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')
const cleanPlugin = require('clean-webpack-plugin')
const OptimizeCssAssetsplugin = require('optimize-css-assets-webpack-plugin')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const os = require('os')

const webpack = require('webpack')


const base = require('./webpack.config.base')

module.exports = merge(base, {
    mode: 'production',
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].[chunkhash].js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [{
            test: /\.(css|less)$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader, // 这个 loader 放在最后一个执行，将编译好的 css 独立
                },
                require.resolve('css-loader'),
                {
                    loader: require.resolve('postcss-loader'),
                    options: {
                        ident: 'postcss',
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
        }, ],
    },

    plugins: [
        new htmlPlugin({
            filename: 'index.html',
            template: './index.html',
            // chunks:['app','mainfest','vender']
        }),

        //清除旧的打包文件
        new cleanPlugin(['dist'], {
            exclude: []
        }),

        //独立css文件
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
        })

    ],

    optimization: {
        runtimeChunk: {
            name: 'manifest', //运行时文件
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                },
            },
        },
        //压缩代码
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: os.cpus().length,
                uglifyOptions: {
                    ecma: 5,
                    mangle: true
                },
                sourceMap: false
            }),
            //提取分离css
            new OptimizeCssAssetsplugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: cssnano,
                cssProcessorOptions: {
                    reduceIdents: false, // 禁止将 keyframes 自动更名
                    mergeIdents: false, // 禁止自动合并 keyframes
                    discardUnused: false, // 禁止移除掉未使用的 keyframes
                    autoprefixer: false, // 禁止默认删除掉一些前缀，以减少兼容性的问题
                    zindex: false, // 禁止自动转换 z-index
                    map: false,
                },
            }),
        ],
    },
})