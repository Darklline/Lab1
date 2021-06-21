const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv');

module.exports = {
    mode: 'development',
    entry: './lab4/src/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './lab4/dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    devtool: 'inline-source-map',
    plugins: [
        new CopyPlugin([
            {
                from: './lab4/src/*.html',
                to: '',
                flatten: true,
            },
        ]),
        new DefinePlugin({
            'process.env': JSON.stringify(dotenv.config().parsed),
        }),
    ],
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    {
                        loader: 'style-loader',
                        // options: {
                        //   // injectType: "singletonStyleTag"
                        //   // injectType: "linkTag"
                        // }
                    },
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ],
    },
};
