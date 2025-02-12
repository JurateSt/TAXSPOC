/** @type {import('tailwindcss').Config} */
export default {
	corePlugins: {
		preflight: false, // disables Tailwind's reset
	},
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#404040',
			},
		},
	},
	plugins: [],
};
