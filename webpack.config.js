const path = require('path');
const MiniCssExtract = require('mini-css-extract-plugin');
import webpack from 'webpack';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test'});
} else if(process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development'});
}

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
            CssExtract,
            new webpack.DefinePlugin({
                'process.env.FB_API_KEY': JSON.stringify(process.env.FB_API_KEY),
                'process.env.FB_DB_URL': JSON.stringify(process.env.FB_DB_URL),
                'process.env.FB_AUTH_DOMAIN': JSON.stringify(process.env.FB_AUTH_DOMAIN),
                'process.env.FB_PROJECT_ID': JSON.stringify(process.env.FB_PROJECT_ID),
                'process.env.FB_STORAGE_BUCKET': JSON.stringify(process.env.FB_STORAGE_BUCKET),
                'process.env.FB_MESSAGING_SENDER_ID': JSON.stringify(process.env.FB_MESSAGING_SENDER_ID),
                'process.env.FB_APP_ID': JSON.stringify(process.env.FB_APP_ID)
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map', //cheap-module-eval-source-map
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    }
}