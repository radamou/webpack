const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    //entry: './src/index.js',
    entry: {
        app: './src/index.js',
        print: './src/print.js',
        another: './src/another-module.js'
    },
    plugins: [
        new CleanWebpackPlugin(), //dist dir clean up plugin
        new HtmlWebpackPlugin({
            title: '1.Getting Started, 2.asset management, 3.Output Management',
        }),
   ],
    output: {
        //filename: 'bundle.js',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    optimization: {
        splitChunks: { //remove common used dependencies in another chunk file
            chunks: 'all',
        },
   },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader', //see github repos for more details
                        options: {
                            bypassOnDebug: true,
                            disable: true,
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        },
                    },
                ]
            },
            {

                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(csv|tsv)$/,
                 use: [
                   'csv-loader',
                 ],
           },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader',
                ],

            },
        ]
    }
};