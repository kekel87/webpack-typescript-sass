const webpack = require("webpack");
const path = require("path");

/**
 * Webpack Plugins
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

/**
 * Webpack Constants
 */
const METADATA = {
    title : 'Webpack Typescript Sass Starter',
    baseUrl : '/'
};

module.exports = function (options) {
    isProd = options.env === 'production';
    return {
        entry: {
            app: './src/app/index.ts',
            vendor: './src/app/vendor.ts',
            polyfills: './src/app/polyfills.ts',
        },        
        resolve: {
            extensions: ['.ts', '.js', '.json', '.scss', '.css']
        },
        module: {
            rules: [
                /**
                 * Typescript loader support for .ts
                 *
                 * See: https://github.com/s-panferov/awesome-typescript-loader
                 */
                {
                    enforce: "pre",
                    test: /\.ts?$/,
                    exclude: ["node_modules", /\.(spec|e2e)\.ts$/],
                    use: [
                        {
                            loader : 'awesome-typescript-loader',
                            options : {
                                useCache : !isProd
                            }
                        },
                        "source-map-loader"
                    ]
                },
                /**
                 * Json loader support for *.json files.
                 *
                 * See: https://github.com/webpack/json-loader
                 */
                {
                    test : /\.json$/,
                    use : 'json-loader'
                },
                /**
                 * Html loader support for *.html
                 */
                {
                     test: /\.html$/,
                     loader: "html-loader"
                },
                /**
                 * File loader for supporting images, for example, in CSS files.
                 */
                {
                    test : /\.(jpg|png|gif|svg)$/,
                    use : 'file-loader?name=[name].[ext]&publicPath=assets/imgs/&outputPath=assets/imgs/'
                },
            ]
        },
        plugins: [
            new ModuleConcatenationPlugin(),

            /**
             * Plugin: CommonsChunkPlugin
             * Description: Shares common code between the pages.
             * It identifies common modules and put them into a commons chunk.
             *
             * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
             * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
             */
            new CommonsChunkPlugin({
                names: ['polyfills', 'vendor'],
                minChunks: Infinity
            }),

            /**
             * Plugin: CopyWebpackPlugin
             * Description: Copy files and directories in webpack.
             *
             * Copies project static assets.
             *
             * See: https://www.npmjs.com/package/copy-webpack-plugin
             */
            new CopyWebpackPlugin([
                {from : 'src/assets', to : 'assets'}
            ],
            {
                ignore: [
                    'datas/**/*.*'
                ]
            }
            ),

            /*
             * Plugin: ScriptExtHtmlWebpackPlugin
             * Description: Enhances html-webpack-plugin functionality
             * with different deployment options for your scripts including:
             *
             * See: https://github.com/numical/script-ext-html-webpack-plugin
             */
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute : 'defer'
            }),

            /*
            * Plugin: HtmlWebpackPlugin
            * Description: Simplifies creation of HTML files to serve your webpack bundles.
            * This is especially useful for webpack bundles that include a hash in the filename
            * which changes every compilation.
            *
            * See: https://github.com/ampedandwired/html-webpack-plugin
            */
            new HtmlWebpackPlugin({
                template : '!!ejs-loader!./src/index.html',
                title : METADATA.title,
                chunksSortMode : 'dependency',
                metadata : METADATA,
                inject : 'head'
            })
        ]
    }
};