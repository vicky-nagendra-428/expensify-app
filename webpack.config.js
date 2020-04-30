const path = require('path');
const MiniCssExtract = require('mini-css-extract-plugin');

module.exports = (env) => {

    const CssExtract = new MiniCssExtract({
        filename: 'style.css'
    });
    const isProduction = env === 'production'
    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: '/node_modules'
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtract.loader,
                    'css-loader',
                    'sass-loader'
                ],
            }
        ]
        },
        plugins: [
            CssExtract
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map', //cheap-module-eval-source-map
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    }
}