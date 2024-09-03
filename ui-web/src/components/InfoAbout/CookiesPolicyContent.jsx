// MUI
import { Typography, Grid } from '@mui/material';

const TermsOfUseContent = () => {
	return (
		<Grid item xs={12}>
			<Typography
				component="div"
				sx={{ fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '24px' }}
			>
				<p>
					<strong>
						<span style={{ color: '#404040' }}>COOKIES DISCLAIMER</span>
					</strong>
				</p>

				<p dir="ltr">
					<strong>We Care About Your Privacy</strong>
				</p>
				<p dir="ltr">
					By using our site, you agree to our third-party partners&rsquo; use of cookies to enhance
					your user experience and analyze site performance and traffic on our website. Please visit
					our{' '}
					<a style={{ color: '#404040' }} href="/privacy-policy">
						Privacy Policy
					</a>{' '}
					for more information about our cookies.
				</p>
			</Typography>
		</Grid>
	);
};

export default TermsOfUseContent;
