const webpack = require("webpack");
const path = require("path");

/**
 * Webpack Plugins
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
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
        //context: path.resolve("./src"),
        entry: {
            app: './src/index.ts',
            vendor: './src/vendor.ts',
            polyfills: './src/polyfills.ts',
        },        
        resolve: {
            extensions: ['.ts', '.js', '.json']
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
                    test : /\.(jpg|png|gif)$/,
                    use : 'file-loader'
                },
            ]
        },
        plugins: [
            // ModuleConcatenationPlugin(),

            /**
             * Plugin: CommonsChunkPlugin
             * Description: Shares common code between the pages.
             * It identifies common modules and put them into a commons chunk.
             *
             * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
             * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
             */
            // new CommonsChunkPlugin({
            //     name : 'polyfills',
            //     filename: "polyfills.bundle.js",
            //     //chunks : ['polyfills'],
            //     minChunks: Infinity
            // }),
            // new CommonsChunkPlugin({
            //     name: "vendor",
            //     minChunks: Infinity,
            //     filename: "vendor.bundle.js",
            //     //minChunks : module => /node_modules(\\|\/)/.test(module.resource)
            // }),
            // Specify the correct order the scripts will be injected in
            // new CommonsChunkPlugin({
            //     name : ['polyfills', 'vendor'].reverse()
            // }),

            /**
             * Plugin: CopyWebpackPlugin
             * Description: Copy files and directories in webpack.
             *
             * Copies project static assets.
             *
             * See: https://www.npmjs.com/package/copy-webpack-plugin
             */
            // new CopyWebpackPlugin([
            //     {from : 'src/assets', to : 'assets'},
            //     {from : './node_modules/tinymce/skins', to : 'assets/libs/tinymce/skins'}
            // ], {
            //     ignore : [
            //         'humans.txt',
            //         'robots.txt'
            //     ]
            // }),

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

            new HtmlWebpackPlugin({
                template : './src/index.html',
                title : METADATA.title,
                chunksSortMode : 'dependency',
                metadata : METADATA,
                inject : 'head'
            }),

            /**
             * Plugin: HtmlElementsPlugin
             * Description: Generate html tags based on javascript maps.
             *
             * If a publicPath is set in the webpack output configuration, it will be automatically added to
             * href attributes, you can disable that by adding a "=href": false property.
             * You can also enable it to other attribute by settings "=attName": true.
             *
             * The configuration supplied is map between a location (key) and an element definition object (value)
             * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
             *
             * Example:
             *  Adding this plugin configuration
             *  new HtmlElementsPlugin({
             *    headTags: { ... }
             *  })
             *
             *  Means we can use it in the template like this:
             *  <%= webpackConfig.htmlElements.headTags %>
             *
             * Dependencies: HtmlWebpackPlugin
             */
            // new HtmlElementsPlugin({
            //     headTags : require('./head-config.common')
            // }),

            /**
             * Plugin: InlineManifestWebpackPlugin
             * Inline Webpack's manifest.js in index.html
             *
             * https://github.com/szrenwei/inline-manifest-webpack-plugin
             */
            // new InlineManifestWebpackPlugin(),
        ]
    }
};