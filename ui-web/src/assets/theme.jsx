import { createTheme } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import '@fontsource/indie-flower';
import { blueGrey } from '@mui/material/colors';
import { grey } from '@mui/material/colors';
import { deepOrange } from '@mui/material/colors';

const theme = createTheme({
	typography: {
		fontFamily: 'Roboto, sans-serif',
		// fontFamily: '"Helvetica Neue", Arial, sans-serif',
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
		allVariants: {
			color: '#404040',
		},
		// h1: {
		// 	fontFamily: 'Indie Flower, cursive',
		// },
	},
	palette: {
		background: {
			// default: '#f5f5f5',
			default: '#ffffff',
			// paper: blueGrey[50],
		},
		primary: {
			// main: '#1c2e3c',
			// midnightBlue900: '#1c2e3c',
			// midnightBlue800: '#2d4354',
			// midnightBlue700: '#3c5569',
			// midnightBlue600: '#4b6980',
			// midnightBlue500: '#577791',
			// midnightBlue400: '#708ba2',
			// midnightBlue300: '#88a0b5',
			// midnightBlue200: '#A8BBCC',
			// midnightBlue100: '#c6d7e4',
			// midnightBlue50: '#E6EFFA',
			// // NOT MUI
			// midnightBlue25: '#F5F9FD',
			main: '#404040',
			//'#ffffff',
			lightText: '#ffffff',
			text: '#404040',
			darkText: '#404040',
			// highlight: '#1ABC9C',
			divider: '#DDDDDD', // grey 200-300

			deepOrange400: '#FF7043',
			deepOrange500: '#FF5722',
			grey200: grey[200],
			grey300: grey[300],
		},
		complementary: {
			main: '#3c2a1c',
			mainArticleButton: '#81BFC3',
			mainArticleButtonHover: '#6DA1A6',
		},
	},
	components: {
		MuiTypography: {
			variants: [
				{
					props: { variant: 'logoText' },
					style: {
						color: '#FF5722',
						fontSize: 12,
						fontStyle: 'normal',
						fontWeight: 900,
						lineHeight: '20px',
						letterSpacing: '2.5px',
					},
				},
				{
					props: { variant: 'navigationText' },
					style: {
						// fontFamily: 'Roboto, sans-serif',
						fontSize: 14,
						lineHeight: '20px',
						fontWeight: 500,
					},
				},
				{
					props: { variant: 'bottomNavigationText' },
					style: {
						fontSize: 14,
					},
				},
			],
		},
		MuiMenu: {
			styleOverrides: {
				paper: ({ theme, ownerState }) => ({
					backgroundColor: theme.palette.primary.midnightBlue200,
				}),
			},
		},
	},
});

export default theme;
