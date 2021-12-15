const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCss = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')

const optimization = () =>{
   const config = [
      new MiniCss({
         filename:'[name].[contenthash].css',
      }),
   ]
   if(isDev){
      config.push(new HotModuleReplacementPlugin())
   }
   if(isProd){
      config.push(new CssMinimizerPlugin())
   }
   
   return config
}
const babelOptions = preset =>{
   const options = {
      'presets': [
         '@babel/preset-env',
      ]
   }
   if(preset){
      options['presets'].push(preset)
   }
   return options
}
let isDev = process.env.NODE_ENV  === 'development'
const isProd = !isDev

module.exports = {
   context: path.resolve(__dirname, 'src'),
   mode: 'development',
   entry: {
      main:['@babel/polyfill','./app.js',],
   },
   output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
   },
   resolve: {
      extensions: ['.js', '.json'],
      alias: {
         '@': path.resolve(__dirname, 'src'),
      }
   },
   optimization: {
      splitChunks: {
         chunks: 'all'
      },
      runtimeChunk: 'single'
   },
   devServer: {
      port: 3200
   },
   devtool: isDev ? 'source-map' : false,
   plugins: [
      ...optimization(),
      new HtmlWebpackPlugin({
         template: 'index.html',
         minify: {
            collapseWhitespace: isProd
         }
      }),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
         patterns: [
            { 
               from: path.resolve(__dirname,'src/favicon.ico'), 
               to :path.resolve(__dirname,'dist') 
            },
         ]
      })
   ],
   module: {
      rules:[
         {
            test: /\.css$/,
            use: [
               {
                  loader: MiniCss.loader,
               },'css-loader']
         },
         {
            test: /\.s[ac]ss$/,
            use: [
               {
                  loader: MiniCss.loader,
               },
               'css-loader',
               'sass-loader'
            ]
         },
         {
            test: /\.(png|jpg|svg|gif)$/,
            type: 'asset/resource',
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
         },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use:{
               loader:'babel-loader',
               options:babelOptions()
            }
         },
      ]
   }
}