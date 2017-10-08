let path = require("path");
let webpack = require("webpack");

module.exports = {
    entry: [
        "babel-polyfill",
        "./src/index.js",
    ],

    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "index.js",
        library: "getLink",
        libraryTarget: "umd",
    },

    context: __dirname,
    target: "web",

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /(node_modules|bower_components)/,
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production"),
            },
        }),

        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false,
            },

            output: {
                comments: false,
                semicolons: true,
            },
        }),
    ],
};
