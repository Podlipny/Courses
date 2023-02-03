var path = require('path');


module.exports = {
	context: path.resolve('js'),
	entry: ["./app"],
	output: {
		path: path.resolve('build/js/'),
		publicPath: '/public/assets/js/',
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
				loader: "style-loader!css-loader!autoprefixer-loader"
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				loader: "style-loader!css-loader!autoprefixer-loader!less-loader"
			}
		]
	},

	resolve: {
		extensions: ['', '.js', '.es6']
	}
}