import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';

// The banner to add to the top of each file
// Pulls details from the package.json file
let banner = `/*! ${pkg.name} v${pkg.version} | ${
	pkg.description
} | Copyright ${new Date().getFullYear()} | ${pkg.license} license */`;

// The formats to output
// Full list here: https://rollupjs.org/guide/en/#outputformat
let formats = ['iife', 'es', 'cjs'];

// The files to compile with rollup.js,
// and the settings to use for them
export default formats.map(function (format) {
	return {
		input: './src/js/accordion.js',
		output: {
			file: `./public/accordion.hs.${format}.js`,
			format: format,
			name: 'AccordionHS',
			banner: banner,
			exports: 'auto',
			plugins: [terser()],
		},
	};
});
