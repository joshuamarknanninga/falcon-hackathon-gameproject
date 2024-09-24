const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',  // Your main React entry point
    output: {
        path: path.resolve(__dirname, 'dist'),  // Output to dist folder
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,  // Transpile JavaScript and JSX files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,  // Process CSS files
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'  // Use a template HTML file
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};
