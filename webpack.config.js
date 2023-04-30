const path = require('path');
var webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');


const customConfig = {
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
    },
}

const serverConfig = {
    entry: './app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        // publicpath: '/',
        filename: 'app.js',
        clean: true
    },
     mode: 'development',
    target: 'node',
   
    externals: [nodeExternals()],
    //devtool : 'inline-source-map', //generate source maps for debugging
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './input.txt', to: 'input.txt' },
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
        ]
    },

};

const clientConfig = {
    mode: 'development',
    //devtool: 'inline-source-map', //generate source maps for debugging
    entry: {
        'modules/Login/Login': './Client/modules/Login/Login.js',
        'modules/Home/Home': './Client/modules/Home/Home.js',
        
    },




    output: {
        path: path.resolve(__dirname, 'dist', 'Client'),
        filename: '[name].js',
        clean: true
    },
    
    externals: {
        jquery: 'jQuery',
        'jquery-datetimepicker': 'datetimepicker'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|Client\/Plugins | .\/Client\/Plugins)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },

            {
                test: /\.css$/i,
                exclude: /(node_modules| .\/node_modules )/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            // {
            //     test: /\.(jpe?g|png|gif|svg)$/, type: 'asset/resource',
            // },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash].[ext]',
                            outputPath: 'style/User Style/fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|jpg|JPG|gif|ico)$/i,
                exclude: /(node_modules| .\/node_modules )/,
                use: [
                    {
                        loader: 'file-loader',

                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "fonts/",
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "svg-url-loader",
                        options: {
                            limit: 10000,
                        },
                    },
                ],
            }



        ],


    },
    plugins: [
        //cleans the output directory before every build. 
        new CleanWebpackPlugin,
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery'",
          
        }),

        new HtmlWebpackPlugin({
            template: './Client/modules/Login/Login.html',
            filename: 'modules/Login/Login.html',
            inject : false
        }),

        new HtmlWebpackPlugin({
            template: './Client/modules/Home/Home.html',
            filename: 'modules/Home/Home.html',
            inject : false
        }),
        
        new MiniCssExtractPlugin({ 
            filename: "Style/[name].css",
            linkType: false, 
            chunkFilename: 'Style/[id].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './Client/Plugins', to: 'Plugins' },
                { from: './Client/Styles', to: 'Styles' },
                

            ]
        })
    ],
    
    resolve: {
        alias: {
            //'multiselect': 'bootstrap-multiselect/dist/js/bootstrap-multiselect',
        },
       
    },

}

module.exports = [clientConfig, serverConfig, customConfig];