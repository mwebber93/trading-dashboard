const deps = require('./package.json').dependencies;

module.exports = {
	name: 'chart_widget',
	exposes: {
		'./Chart': './src/components/Chart/Chart.tsx',
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
		dayjs: {
			eager: true,
			singleton: true,
			requiredVersion: deps['dayjs'],
		},
		'react-apexcharts': {
			eager: true,
			singleton: true,
			requiredVersion: deps['react-apexcharts'],
		},
	},
};
