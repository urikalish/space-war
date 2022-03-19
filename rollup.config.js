import pkg from './package.json';

export default {
	input: 'out-tsc/src/main.js',
	output: {
		dir: 'dist',
		entryFileNames: pkg.main,
		format: 'es',
	},
	plugins: [],
};
