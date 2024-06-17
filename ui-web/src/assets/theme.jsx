import { createTheme } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import '@fontsource/indie-flower';
import { blueGrey } from '@mui/material/colors';
import { grey } from '@mui/material/colors';

const theme = createTheme({
	typography: {
		fontFamily: 'Roboto, sans-serif',
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
		// h1: {
		// 	fontFamily: 'Indie Flower, cursive',
		// },
	},
	palette: {
		background: {
			default: '#f5f5f5',
			// paper: blueGrey[50],
		},
		primary: {
			main: '#1c2e3c',
			midnightBlue900: '#1c2e3c',
			midnightBlue800: '#2d4354',
			midnightBlue700: '#3c5569',
			midnightBlue600: '#4b6980',
			midnightBlue500: '#577791',
			midnightBlue400: '#708ba2',
			midnightBlue300: '#88a0b5',
			midnightBlue200: '#A8BBCC',
			midnightBlue100: '#c6d7e4',
			midnightBlue50: '#E6EFFA',
			// NOT MUI
			midnightBlue25: '#F5F9FD',
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
					props: { variant: 'navigationText' },
					style: {
						// fontFamily: 'Roboto, sans-serif',
						fontSize: 16,
						fontWeight: 500,
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
