var path = require('path');

var webpack = require('webpack');

module.exports = {
    stats: {
        colors: true,
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        publicPath: false
    },

    mode: 'production',
    entry: './src/js/kitchen-sink/js-bundle.dev.js',
    output: {
        filename: '../webpack-out/kitchen-sink/js-bundle.prod.js',
        path: path.resolve(__dirname)
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};
