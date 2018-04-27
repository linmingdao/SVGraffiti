const path = require('path');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var entries = require('./entries');
var htmlWebpackPlugins = require('./htmlWebpackPlugins');

module.exports = {
    devtool: "source-map",
    entry: entries,
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].[hash].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            test: /\.html$/,
            loader: "html-loader"
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'sass-loader'],
            })
        }, {
            test: /\.svg$/,
            use: ['svg-url-loader']
        }, {
            test: require.resolve('snapsvg/dist/snap.svg.js'),
            use: 'imports-loader?this=>window,fix=>module.exports=0'
        }]
    },
    resolve: {
        alias: {
            snapsvg: 'snapsvg/dist/snap.svg.js',
        },
    },
    plugins: [
        new ExtractTextPlugin({
            filename: `style/[name].[contenthash:8].css`
        }),
        ...htmlWebpackPlugins
    ]
};