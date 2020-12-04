const path = require('path');

module.exports = {
    entry: {
        index: './Scripts/index.ts'
    },
    mode: "development",
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'wwwroot/js'),
    },
};