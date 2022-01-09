const deps = require('./package.json').dependencies;

module.exports = {
	name: 'dashboard',
	remotes: {
		position_widget: 'position_widget@http://localhost:3001/remoteEntry.js',
		chart_widget: 'chart_widget@http://localhost:3002/remoteEntry.js',
		order_entry_widget: 'order_entry_widget@http://localhost:3003/remoteEntry.js',
		order_book_widget: 'order_book_widget@http://localhost:3004/remoteEntry.js',
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
