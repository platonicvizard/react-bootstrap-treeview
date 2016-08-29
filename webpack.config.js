
var webpack = require('webpack');
var path = require('path');

module.exports = {
      context: __dirname,
    devtool:  "absolute-resource-path",
    entry: [
        'babel-polyfill',
        "./app.jsx"
    ],
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["react-hot", "babel-loader?stage=0"] },
            { test: /\.css$/, loader: "style!css" },
            { test: /\.less$/, exclude: /\.useable\.less$/, loader: 'style!css!less' },
            { test: /\.useable\.less$/, loader: 'style/useable!less' },
            { test: /\.scss$/, loader: 'style!css!sass' },
            { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
            { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=10000' }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.css'],
        modulesDirectories: ['node_modules'],
        resolve: { root: [__dirname + path.sep + 'src'] }
    }
};