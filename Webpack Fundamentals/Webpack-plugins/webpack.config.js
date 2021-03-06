var path = require('path');
var webpack = require('webpack');

var TimestampWebpackPlugin = require('timestamp-webpack-plugin');

module.exports = {
	context: path.resolve('js'),
	entry: ["./utils", "./app"],
	output: {
		path: path.resolve('build/js/'),
		publicPath: '/public/assets/js/',
		filename: "bundle.js"
	},
	devServer: {
		contentBase: 'public'
	},

	plugins: [
		//plugin pro poskytnuti globalnich variables
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),

		//rekne kdy jsme naposledy spustily webpack
		new TimestampWebpackPlugin({
			path: __dirname,
			filename: 'timestamp.json'
		}),

		//prida banner (komentar na zacatku javascriptu) do bundle.js
		new webpack.BannerPlugin("**********\nGenerated by webpack\n***************\n")
	],

	module: {
		loaders: [
			{
				test: /\.es6$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	},

	resolve: {
		extensions: ['', '.js', '.es6']
	}
}