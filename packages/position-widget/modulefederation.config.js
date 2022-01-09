const deps = require('./package.json').dependencies;

module.exports = {
	name: 'position_widget',
	exposes: {
		'./Position': './src/components/Position/Position.tsx',
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
		'dayjs': {
			eager: true,
			singleton: true,
			requiredVersion: deps['dayjs'],
		},
	},
};
