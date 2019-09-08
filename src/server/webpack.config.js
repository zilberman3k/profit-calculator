const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv !== 'development';
const Dotenv = require('dotenv-webpack');
// Common plugins
let plugins = [
    new Dotenv(),
    new webpack.NamedModulesPlugin()
];
if (!isProduction) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
}
const entry = [
        'babel-polyfill',
        path.resolve(path.join(__dirname, './cloud-server.js'))
    ];

module.exports = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'inline-source-map',
    externals: [
        nodeExternals()
    ],
    name: 'server',
    plugins: plugins,
    target: 'node',
    entry: entry,
    output: {
        publicPath: '../../functions',
        path: path.resolve(__dirname, '../../functions/cloud-server'),
        //  path: path.resolve(__dirname, '../../dist'),
        filename: 'cloud-server.js', // 'server.js'
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
        modules: [
            path.resolve(__dirname, 'node_modules')
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                options: {
                    babelrc: false
                }
            }
        ],
    },
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    }
};