const deps = require('./package.json').dependencies;

module.exports = {
	name: 'order_entry_widget',
	exposes: {
		'./OrderEntry': './src/components/OrderEntry/OrderEntry.tsx',
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
