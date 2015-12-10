var webpack = require('webpack');

module.exports = {
	context: __dirname + '/public/js',

	entry: [
	  './App.js'
	],

	output: {
		filename: '/public/js/bundle.js',
		path: __dirname
	},

	module: {
		loaders: [
			{
				test:/\.js.?/,
				loaders: [
					'jsx-loader?insertPragma=React.DOM&harmony'
				]
			}
		]
	},

    node: {
	child_process: "empty",
	fs: "empty"
    },

	resolve: {
	    alias: {
		'is-array': require.resolve('webpack/node_modules/node-libs-browser/node_modules/buffer/node_modules/isarray'),
		'ieee754': require.resolve('webpack/node_modules/node-libs-browser/node_modules/buffer/node_modules/ieee754'),
		'base64-js': require.resolve('webpack/node_modules/node-libs-browser/node_modules/buffer/node_modules/base64-js'),
		'inherits': require.resolve('webpack/node_modules/node-libs-browser/node_modules/stream-browserify')
	    },
	    modulesDirectories: ['components','utility','../node_modules']
	},

	devtool: 'source-map'
}
