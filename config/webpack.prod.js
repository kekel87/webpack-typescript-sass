const path = require("path");
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
//const OptimizeJsPlugin = require('optimize-js-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/**
 * Activation ou non de BundleAnalyzerPlugin
 */
//const ANALYZE = helpers.hasProcessFlag('analyze');

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const ANALYZE = process.env.ANALYZE === true;
const METADATA = webpackMerge(commonConfig({
    env : ENV
}).metadata, {
    host : HOST,
    port : PORT,
    ENV : ENV,
    HMR : false
});

module.exports = function (env) {
    return webpackMerge(commonConfig({
        env : ENV
    }), {

        /**
         * Developer tool to enhance debugging
         *
         * See: http://webpack.github.io/docs/configuration.html#devtool
         * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
         */
        devtool : 'hidden-source-map', //'source-map',

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
            filename : '[name].[chunkhash].bundle.js',

            /**
             * The filename of the SourceMaps for the JavaScript files.
             * They are inside the output.path directory.
             *
             * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
             */
            sourceMapFilename : '[name].[chunkhash].bundle.map',

            /**
             * The filename of non-entry chunks as relative path
             * inside the output.path directory.
             *
             * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
             */
            chunkFilename : '[name].[chunkhash].chunk.js'

        },

        module : {

            rules : [
                /*
                 * css loader support for *.css files (styles directory only)
                 * Loads external css styles into the DOM, supports HMR
                 *
                 */
                {
                    test : /\.css$/,
                    use : [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: { 
                                minimize: true
                            }
                        }
                    ],
                    //include : [helpers.root('src', 'styles')]
                },

                /*
                 * sass loader support for *.scss files (styles directory only)
                 * Loads external sass styles into the DOM, supports HMR
                 *
                 */
                {
                    test : /\.scss$/,
                    use : [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: { 
                                minimize: true
                            }
                        },
                        'sass-loader'
                    ],
                    //include : [helpers.root('src', 'styles')]
                },
            ]

        },

        /**
         * Add additional plugins to the compiler.
         *
         * See: http://webpack.github.io/docs/configuration.html#plugins
         */
        plugins : [

            /**
             * Webpack plugin to optimize a JavaScript file for faster initial load
             * by wrapping eagerly-invoked functions.
             *
             * See: https://github.com/vigneshshanmugam/optimize-js-plugin
             */
            // new OptimizeJsPlugin({
            //     sourceMap : false
            // }),

            /**
             * Plugin: DefinePlugin
             * Description: Define free variables.
             * Useful for having development builds with debug logging or adding global constants.
             *
             * Environment helpers
             *
             * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
             */
            // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
            new DefinePlugin({
                'ENV' : JSON.stringify(METADATA.ENV),
                'process.env' : {
                    'ENV' : JSON.stringify(METADATA.ENV),
                    'NODE_ENV' : JSON.stringify(METADATA.ENV)
                }
            }),

            /**
             * Plugin: UglifyJsPlugin
             * Description: Minimize all JavaScript output of chunks.
             * Loaders are switched into minimizing mode.
             *
             * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
             *
             */
            new UglifyJsPlugin({
                compress: { warnings: false },
                output: { comments: false },
                sourceMap: true
            }),

            /**
             * Plugin: CompressionPlugin
             * Description: Prepares compressed versions of assets to serve
             * them with Content-Encoding
             *
             * See: https://github.com/webpack/compression-webpack-plugin
             */
            //  install compression-webpack-plugin
            // new CompressionPlugin({
            //   regExp: /\.css$|\.html$|\.js$|\.map$/,
            //   threshold: 2 * 1024
            // })

            /**
             * Plugin LoaderOptionsPlugin (experimental)
             *
             * See: https://gist.github.com/sokra/27b24881210b56bbaff7
             */
            new LoaderOptionsPlugin({
                minimize : true,
                debug : false,
                options : {
                    emitErrors: true,
                    failOnHint: true
                }
            }),

            /**
             * Plugin: BundleAnalyzerPlugin
             * Description: Webpack plugin and CLI utility that represents
             * bundle content as convenient interactive zoomable treemap
             *
             * See: https://github.com/th0r/webpack-bundle-analyzer
             */
            // new BundleAnalyzerPlugin({
            //     // Can be `server`, `static` or `disabled`.
            //     // In `server` mode analyzer will start HTTP server to show bundle report.
            //     // In `static` mode single HTML file with bundle report will be generated.
            //     // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
            //     analyzerMode : ANALYZE ? 'static' : 'disabled',
            //     // analyzerMode : 'server',
            //     //analyzerHost : '127.0.0.1',
            //     //analyzerPort : 8888,
            //     reportFilename : 'report.html',
            //     defaultSizes : 'parsed',
            //     openAnalyzer : true,
            //     generateStatsFile : false,
            //     statsFilename : 'stats.json',
            //     statsOptions : null,
            //     logLevel : 'info'
            // })
        ],

        /*
         * Include polyfills or mocks for various node stuff
         * Description: Node configuration
         *
         * See: https://webpack.github.io/docs/configuration.html#node
         */
        node : {
            global : true,
            crypto : 'empty',
            process : false,
            module : false,
            clearImmediate : false,
            setImmediate : false
        }

    });
}
