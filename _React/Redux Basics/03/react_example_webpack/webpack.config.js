var path = require('path');

module.exports = {
  entry: './public/js/index.js', // primary JS entry point
  output: { // save the bundle here
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js/build')
  },
  module: {
    loaders: [
      {
	test: /\.js$/, //transform all .js files
	exclude: /(node_modules)/, // except for node_modules
	loader: 'babel-loader', // apply the babel-loader to compile the files
	query: {
	  presets: ['react', 'es2015'] // load the react, es2015 babel settings
	}
      }
    ]

  }
};


