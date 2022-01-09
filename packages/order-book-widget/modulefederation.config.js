const deps = require('./package.json').dependencies;

module.exports = {
	name: 'order_book_widget',
	exposes: {
		'./OrderBook': './src/components/OrderBook/OrderBook.tsx',
	},
	filename: 'remoteEntry.js',
	shared: {
		...deps,
		react: {
			eager: true,
			singleton: true,
			requiredVersion: deps['react'],
		},
		'react-dom': {
			eager: true,
			singleton: true,
			requiredVersion: deps['react-dom'],
		},
	},
};
