var path = require('path');

module.exports = {
	context: path.resolve('js'),
	entry: "./app",
	output: {
		path: path.resolve('build/'),
		publicPath: '/public/assets/',
		filename: "bundle.js"
	},
	devServer: {
		contentBase: 'public'
	},

	module: {
		loaders: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				loader: "style-loader!css-loader"
			},
			{
				test: /\.(png|jpg)$/, 
				exclude: /node_modules/,
				loader: 'url-loader?limit=10000' //?pridavame parametr 100000 = 100kb - vse pod touto velikosti bude inline a prevedeno do Base64 a bude v bundle.js
			}
		]
	},

	resolve: {
		extensions: ['', '.js', '.es6']
	}
}