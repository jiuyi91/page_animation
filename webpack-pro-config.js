/**
 * yizq 20200629
 */

var webpack = require('webpack');
module.exports = {
    entry: {
        index: './src/page_animation.js'
    },
    output: {
        path: __dirname + '/dist/js',
        filename: 'page_animation.min.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: {
                except: ['$page_animation', 'module', 'exports']
            }
        })
    ],
}
