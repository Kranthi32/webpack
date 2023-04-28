const path = require('path');
var webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');

const styleFiles = glob.sync('./Client/Style/User Style/*.css');


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
        filename: 'app.js',
        clean: true
    },
    // mode: 'development',
    target: 'node',
    
    externals: [nodeExternals()],
    //devtool : 'inline-source-map',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './Server/logs/access.log', to: 'Server/logs' },
                { from: './Server/logs/server.log', to: 'Server/logs' }
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
    devtool: 'inline-source-map', //generate source maps for debugging
    entry: {
        'modules/Login/Login': './Client/modules/Login/Login.js',
        'modules/Login/LoginService': './Client/modules/Login/LoginService.js',
        'modules/ApiConfiguration/Application_Link_Setting': './Client/modules/ApiConfiguration/Application_Link_Setting.js',
        'modules/ApiConfiguration/ConsumeInterface': './Client/modules/ApiConfiguration/ConsumeInterface.js',
        'modules/AssociateMapping/AssociateDetails': './Client/modules/AssociateMapping/AssociateDetails.js',
        'modules/Comments/Comments': './Client/modules/Comments/Comments.js',
        'modules/Comments/DynamicComments': './Client/modules/Comments/DynamicComments.js',
        'modules/Common/Config': './Client/modules/Common/Config.js',
        'modules/Common/CommonService': './Client/modules/Common/CommonService.js',
        'modules/CustomReports/ReportGeneration': './Client/modules/CustomReports/ReportGeneration.js',
        
        'modules/Dashboard/Dashboard': './Client/modules/Dashboard/Dashboard.js',

        'modules/DynamicFormMasters/CheckListMaster': './Client/modules/DynamicFormMasters/CheckListMaster.js',
        'modules/DynamicFormMasters/DefaultPage': './Client/modules/DynamicFormMasters/DefaultPage.js',
        'modules/DynamicFormMasters/FormMaster': './Client/modules/DynamicFormMasters/FormMaster.js',
        'modules/DynamicFormMasters/PageMaster': './Client/modules/DynamicFormMasters/PageMaster.js',
        'modules/DynamicFormMasters/PartiallyPageMaster': './Client/modules/DynamicFormMasters/PartiallyPageMaster.js',
        'modules/DynamicFormMasters/ReactiveInput': './Client/modules/DynamicFormMasters/ReactiveInput.js',
        'modules/DynamicPage/DynamicPage': './Client/modules/DynamicPage/DynamicPage.js',
        'modules/DynamicPage/DynamicPageSupport': './Client/modules/DynamicPage/DynamicPageSupport.js',
        'modules/DynamicPage/DynamicReactivebased': './Client/modules/DynamicPage/DynamicReactivebased.js',
        'modules/DynamicWorkFlow/DynamicWorkFlow': './Client/modules/DynamicWorkFlow/DynamicWorkFlow.js',
        'modules/DynamicWorkflowMater/ConfigureWorkFlow': './Client/modules/DynamicWorkflowMater/ConfigureWorkFlow.js',
        'modules/DynamicWorkflowMater/WorkFlowStageCreation': './Client/modules/DynamicWorkflowMater/WorkFlowStageCreation.js',
        'modules/GlobalFilters/GlobalFilterMaster': './Client/modules/GlobalFilters/GlobalFilterMaster.js',
        'modules/GlobalFilters/SearchMaster': './Client/modules/GlobalFilters/SearchMaster.js',

        'modules/Masters/HolidayMaintenance': './Client/modules/Masters/HolidayMaintenance.js',
        'modules/Masters/ManageMapping': './Client/modules/Masters/ManageMapping.js',
        'modules/Masters/MasterDetails': './Client/modules/Masters/MasterDetails.js',
        'modules/Masters/MasterTypeMaintenance': './Client/modules/Masters/MasterTypeMaintenance.js',

        'modules/Notifications/ConfigureNotification': './Client/modules/Notifications/ConfigureNotification.js',
        'modules/Notifications/ConfigureSignature': './Client/modules/Notifications/ConfigureSignature.js',
        'modules/Notifications/Notifications': './Client/modules/Notifications/Notifications.js',
        'modules/Password/PasswordSetting': './Client/modules/Password/PasswordSetting.js',
        'modules/Settings/Layout': './Client/modules/Settings/Layout.js',
        'modules/Uploads/UploadMaster': './Client/modules/Uploads/UploadMaster.js',

         'modules/Utilities/Common': './Client/modules/Utilities/Common.js',

        
        
        'modules/Utilities/Dependency': './Client/modules/Utilities/Dependency.js',
        'modules/Utilities/Event': './Client/modules/Utilities/Event.js',
        'modules/Utilities/Filter': './Client/modules/Utilities/Filter.js',
        'modules/Utilities/Global': './Client/modules/Utilities/Global.js',
        'modules/Utilities/Worker': './Client/modules/Utilities/Worker.js',
        'modules/Utilities/Utility': './Client/modules/Utilities/Utility.js',
        'modules/Utilities/TenantMapping': './Client/modules/Utilities/TenantMapping.js',
        'modules/Utilities/Common_internalSourcing': './Client/modules/Utilities/Common_internalSourcing.js',
        'modules/Customize/PartMatrix': './Client/modules/Customize/PartMatrix.js',

        

        
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
            // "window.$": "jquery",
            //'select2': 'select2',
            //dataTable: 'datatables.net',
            //'multiselect': 'bootstrap-multiselect',
            //daterangepicker: 'daterangepicker',
           // pqGrid: 'pqgrid'
        }),

        new HtmlWebpackPlugin({
            template: './Client/modules/APIConfiguration/Application_Link_Setting.html',
            filename: 'modules/APIConfiguration/Application_Link_Setting.html',
            inject : false


        }),
        new HtmlWebpackPlugin({
            template: './Client/modules/APIConfiguration/ConsumeInterface.html',
            filename: 'modules/APIConfiguration/ConsumeInterface.html',
            inject : false

        }),

        new HtmlWebpackPlugin({
            template: './Client/modules/AssociateMapping/AssociateDetails.html',
            filename: 'modules/AssociateMapping/AssociateDetails.html',
            inject : false

        }),

        new HtmlWebpackPlugin({
            template: './Client/modules/Comments/Comments.html',
            filename: 'modules/Comments/Comments.html',
            inject : false

        }),

        new HtmlWebpackPlugin({
            template: './Client/modules/CustomReports/ReportGeneration.html',
            filename: 'modules/CustomReports/ReportGeneration.html',
            inject : false

        }),

        new HtmlWebpackPlugin({
            template: './Client/modules/Dashboard/Dashboard.html',
            filename: 'modules/Dashboard/Dashboard.html',
            inject : false

        }),

        new HtmlWebpackPlugin({
            template: './Client/modules/DynamicFormMasters/CheckListMaster.html',
            filename: 'modules/DynamicFormMasters/CheckListMaster.html',
            inject : false

        }),
        new HtmlWebpackPlugin({
            template: './Client/modules/DynamicFormMasters/DefaultPage.html',
            filename: 'modules/DynamicFormMasters/DefaultPage.html',
            inject : false

        }),
        new HtmlWebpackPlugin({
            template: './Client/modules/DynamicFormMasters/FormMaster.html',
            filename: 'modules/DynamicFormMasters/FormMaster.html',
            inject : false

        }),
        new HtmlWebpackPlugin({
            template: './Client/modules/DynamicFormMasters/PageMaster.html',
            filename: 'modules/DynamicFormMasters/PageMaster.html',
            inject : false

        }),
        new HtmlWebpackPlugin({
            template: './Client/modules/DynamicFormMasters/PartiallyPageMaster.html',
            filename: 'modules/DynamicFormMasters/PartiallyPageMaster.html',
            inject : false

        }),
        new HtmlWebpackPlugin({
            template: './Client/modules/DynamicFormMasters/ReactiveInput.html',
            filename: 'modules/DynamicFormMasters/ReactiveInput.html',
            inject : false

        }),

        new HtmlWebpackPlugin({
            template: './Client/modules/DynamicPage/DynamicPage.html',
            filename: 'modules/DynamicPage/DynamicPage.html',
            inject : false

        }),

        new HtmlWebpackPlugin({
            template: './Client/modules/DynamicWorkFlow/DynamicWorkFlow.html',
            filename: 'modules/DynamicWorkFlow/DynamicWorkFlow.html',
            inject : false

        }),

        new HtmlWebpackPlugin({
            template: './Client/modules/DynamicWorkflowMater/ConfigureWorkFlow.html',
            filename: 'modules/DynamicWorkflowMater/ConfigureWorkFlow.html',
            inject : false

        }),
        new HtmlWebpackPlugin({
            template: './Client/modules/DynamicWorkflowMater/WorkFlowStageCreation.html',
            filename: 'modules/DynamicWorkflowMater/WorkFlowStageCreation.html',
            inject : false

        }),


        new HtmlWebpackPlugin({
            template: './Client/modules/GlobalFilters/GlobalFilterMaster.html',
            filename: 'modules/GlobalFilters/GlobalFilterMaster.html',
            inject : false

        }),
        new HtmlWebpackPlugin({
            template: './Client/modules/GlobalFilters/SearchMaster.html',
            filename: 'modules/GlobalFilters/SearchMaster.html',
            inject : false

        }),

        new HtmlWebpackPlugin({
            template: './Client/modules/Login/Login.html',
            filename: 'modules/Login/Login.html',
            inject : false

        }),


        new HtmlWebpackPlugin({
            template: './Client/modules/Masters/ManageMapping.html',
            filename: 'modules/Masters/ManageMapping.html',
            inject : false

        }),
        new HtmlWebpackPlugin({
            template: './Client/modules/Masters/HolidayMaintenance.html',
            filename: 'modules/Masters/HolidayMaintenance.html',

        }),
        new HtmlWebpackPlugin({
            template: './Client/modules/Masters/MasterDetails.html',
            filename: 'modules/Masters/MasterDetails.html',
            inject : false

        }),
        new HtmlWebpackPlugin({
            template: './Client/modules/Masters/MasterTypeMaintenance.html',
            filename: 'modules/Masters/MasterTypeMaintenance.html',
            inject : false

        }),


        new HtmlWebpackPlugin({
            template: './Client/modules/Notifications/ConfigureNotification.html',
            filename: 'modules/Notifications/ConfigureNotification.html',
            inject : false

        }),
        new HtmlWebpackPlugin({
            template: './Client/modules/Notifications/ConfigureSignature.html',
            filename: 'modules/Notifications/ConfigureSignature.html',
            inject : false

        }),
        new HtmlWebpackPlugin({
            template: './Client/modules/Notifications/Notifications.html',
            filename: 'modules/Notifications/Notifications.html',
            inject : false

        }),

        new HtmlWebpackPlugin({
            template: './Client/modules/Password/PasswordSetting.html',
            filename: 'modules/Password/PasswordSetting.html',
            inject : false

        }),

        new HtmlWebpackPlugin({
            template: './Client/modules/Settings/Layout.html',
            filename: 'modules/Settings/Layout.html',
            inject : false

        }),


        new HtmlWebpackPlugin({
            template: './Client/modules/Uploads/UploadMaster.html',
            filename: 'modules/Uploads/UploadMaster.html',
            inject : false

        }),

        new HtmlWebpackPlugin({
            template: './Client/modules/Utilities/TenantMapping.html',
            filename: 'modules/Utilities/TenantMapping.html',
            inject : false
        }),

        new HtmlWebpackPlugin({
            template: './Client/modules/error404.html',
            filename: 'modules/error404.html',
            inject : false

        }),
        new MiniCssExtractPlugin({ 
            filename: "[name].css",
            linkType: false, 
            chunkFilename: './Client/Style/User Style/[id].css',
            //outputPath: 'Style/User Style/' // This is the path where the CSS files will be saved
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './Client/Plugins', to: 'Plugins' },
                { from: './Client/StaticFiles', to: 'StaticFiles' },
                { from: './Client/Style/User Style/fonts', to: 'Style/User Style/fonts' },
                { from: './Client/Style/User Style/iconmoon.css', to: 'Style/User Style' },
                { from: './Client/Style/User Style/custom-new.css', to: 'Style/User Style' },
                { from: './Client/Style/User Style/Custom-cr.css', to: 'Style/User Style' },
                { from: './Client/Style/User Style/custom-pqgrid.css', to: 'Style/User Style' },
                { from: './Client/Style/User Style/password.css', to: 'Style/User Style' },

            ]
        })
    ],
    // you can define aliases to make it easier to import modules or files from specific directories in your project. 
    //This is especially useful if you have a large project with many nested directories, as it can simplify the process of importing files.
    resolve: {
        alias: {
            //'multiselect': 'bootstrap-multiselect/dist/js/bootstrap-multiselect',
           // '@src': path.resolve(__dirname, './Client/')
        },
        extensions: ['.js', '.json', '.wasm'],
        // fallback: {
        //     stream: require.resolve('stream-browserify')
        //   }
    },

}

module.exports = [clientConfig, serverConfig, customConfig];
