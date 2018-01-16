var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	// context: path.resolve('js'),
	entry: ["./js/app"],
	output: {
		path: path.resolve('build/'),
		publicPath: '/public/assets/', //uz neposilame do js folderu jako predtim
		filename: "bundle.js"
	},
	//rikame ze pouzijeme ExtractTextPlugin
	plugins: [
		new ExtractTextPlugin("styles.css")
	],
	devServer: {
		contentBase: 'public'
	},

	module: {
		loaders: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				//pouzivame ExtractTextPlugin - co nam tento loader preklada bude ulozeno v styles.css
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				//pouzivame ExtractTextPlugin - co nam tento loader preklada bude ulozeno v styles.css
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
			}
		]
	},

	resolve: {
		extensions: ['', '.js', '.es6']
	}
}