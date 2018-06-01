const path = require('path');
const APP_DIR = path.resolve(__dirname, 'ClientApp');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {
    entry: APP_DIR + '/Client.js',

    devServer: {
        contentBase: PUBLIC_DIR,
        port: 9000,
        open: true
    },

    output: {
        path: PUBLIC_DIR,
        filename: 'clientbundle.js'
    },

    //devtool: 'source-map',

};

//module.exports = config;

module.exports = merge(baseConfig, config);