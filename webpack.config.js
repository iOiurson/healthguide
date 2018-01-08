const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const cssExtractor = new ExtractTextPlugin("style.css");
const indexHtmlExtractor = new ExtractTextPlugin("index.html");

const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: [
        './index.js',
        './style.scss',
        './index.html'
    ],
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: buildPath,
        watchContentBase: true
    },
    plugins: [
        cssExtractor,
        indexHtmlExtractor,
        new CleanWebpackPlugin(buildPath)
    ],
    module: {
        rules: [
            {
                test: path.join(__dirname, "src", "index.html"),
                use: indexHtmlExtractor.extract([
                {
                    loader: "html-loader",
                    options: {
                        interpolate: true,
                        attrs: ["img:src"]
                    }
                }])
            },
            {
                test: path.join(__dirname, "src", "style.scss"),
                use: cssExtractor.extract({
                    use: [
                        "css-loader",
                        "sass-loader"
                    ]
                })
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }]
            }
        ]
    }
};