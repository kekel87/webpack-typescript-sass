const path = require("path");
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const DashboardPlugin = require("webpack-dashboard/plugin");

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3008;
const METADATA = webpackMerge(commonConfig({env : ENV}).metadata, {
    host : HOST,
    port : PORT,
    ENV : ENV
});


//const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
    return webpackMerge(commonConfig({env : ENV}), {

        /**
         * Developer tool to enhance debugging
         *
         * See: http://webpack.github.io/docs/configuration.html#devtool
         * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
         * 
         *  AC : devtool : 'cheap-module-source-map',
         */
        devtool : 'source-map',

        /**
         * Options affecting the output of the compilation.
         *
         * See: http://webpack.github.io/docs/configuration.html#output
         */
        output : {

            /**
             * The output directory as absolute path (required).
             *
             * See: http://webpack.github.io/docs/configuration.html#output-path
             */
            path: path.resolve("./dist"),

            /**
             * Specifies the name of each output file on disk.
             * IMPORTANT: You must not specify an absolute path here!
             *
             * See: http://webpack.github.io/docs/configuration.html#output-filename
             */
            filename : '[name].bundle.js',

            /**
             * The filename of the SourceMaps for the JavaScript files.
             * They are inside the output.path directory.
             *
             * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
             */
            sourceMapFilename : '[name].bundle.map',

            /** The filename of non-entry chunks as relative path
             * inside the output.path directory.
             *
             * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
             */
            //chunkFilename : '[name].[hash].chunk.js',

            devtoolModuleFilenameTemplate: function (info) {
                return "file:///" + info.absoluteResourcePath;
            }
        },

        module : {

            rules : [

                /*
                 * css loader support for *.css files (styles directory only)
                 * Loads external css styles into the DOM, supports HMR
                 *
                 */
                {
                    test : /\.css?$/,
                    use : ['style-loader', 'css-loader'],
                    include : [path.resolve('src', 'styles')]
                },

                /*
                 * sass loader support for *.scss files (styles directory only)
                 * Loads external sass styles into the DOM, supports HMR
                 */
                {
                    test : /\.scss?$/,
                    use : ['style-loader', 'css-loader', 'sass-loader'],
                    include : [path.resolve('src', 'styles')]
                },
            ]

        },

        plugins : [

            /**
             * Plugin: DefinePlugin
             * Description: Define free variables.
             * Useful for having development builds with debug logging or adding global constants.
             *
             * Environment helpers
             *
             * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
             */
            // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
            new DefinePlugin({
                'ENV' : JSON.stringify(METADATA.ENV),
                'process.env' : {
                    'ENV' : JSON.stringify(METADATA.ENV),
                    'NODE_ENV' : JSON.stringify(METADATA.ENV),
                }
            }),

            /**
             * Plugin LoaderOptionsPlugin (experimental)
             *
             * See: https://gist.github.com/sokra/27b24881210b56bbaff7
             */
            new LoaderOptionsPlugin({
                debug : true,
                options : {
                    emitErrors: true,
                    failOnHint: true
                }
            }),
            

            new DashboardPlugin(),
            new HotModuleReplacementPlugin()
        ],

        /**
         * Webpack Development Server configuration
         * Description: The webpack-dev-server is a little node.js Express server.
         * The server emits information about the compilation state to the client,
         * which reacts to those events.
         *
         * See: https://webpack.github.io/docs/webpack-dev-server.html
         */
        devServer : {
            contentBase: path.join(__dirname, "dist/"),
            port : METADATA.port,
            host : METADATA.host,
            hot : true,
            compress: true,
            watchOptions : {
                // aggregateTimeout : 300,
                // poll : 1000
            }
        },

        /*
         * Include polyfills or mocks for various node stuff
         * Description: Node configuration
         *
         * See: https://webpack.github.io/docs/configuration.html#node
         */
        // node : {
        //     global : true,
        //     crypto : 'empty',
        //     process : true,
        //     module : false,
        //     clearImmediate : false,
        //     setImmediate : false
        // }

    });
};
