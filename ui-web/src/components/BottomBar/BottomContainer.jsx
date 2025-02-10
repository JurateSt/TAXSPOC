// React
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// MUI
import { Container, Box, Grid, AppBar, Typography, Icon, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
// Logo
import LogoMain from '../../assets/LogoMain.svg';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const BottomContainer = () => {
	const navigate = useNavigate();
	const handleLogoClick = () => {
		window.scrollTo(0, 0);
		navigate('/');
	};
	return (
		<Container
			maxWidth={false}
			sx={{
				// backgroundColor: 'primary.main',
				// color: 'background.default',
				// height: '300px',
				borderTop: '1px solid',
				borderTopColor: 'primary.divider',
				color: 'primary.darkText',
				marginTop: '32px',
			}}
		>
			<Container
			// sx={{
			// 	border: '1px solid red',
			// }}
			>
				<Grid
					container
					// sx={{
					// 	border: '1px solid red',
					// }}
				>
					<Grid container item sx={{ padding: '24px 0' }}>
						<Grid item xs={6}>
							{/* <Link to="/" onClick={handleLogoClick}> */}
							<a href={VITE_BASE_URL}>
								<img
									src={LogoMain}
									alt="TaxSpoc Logo"
									style={{ height: '42px', width: 'auto', maxWidth: '100%' }}
								/>
							</a>
							{/* </Link> */}
						</Grid>
						<Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
							<Box sx={{ textAlign: 'center' }}>
								<Typography>Follow Us:</Typography>
								<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
									<IconButton target="_blank" href="https://www.linkedin.com/company/taxspoc">
										<LinkedInIcon />
									</IconButton>
									<IconButton target="_blank" href="https://x.com/taxspoc">
										<XIcon fontSize="small" />
									</IconButton>
								</Box>
							</Box>
						</Grid>
					</Grid>

					<Grid item xs={12} sx={{ padding: '4px 0' }}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								gap: '24px',
								flexWrap: 'wrap',
							}}
						>
							{/* <Link
								to="/about-us"
								// target="_blank"
								// rel="noopener noreferrer"
								style={{ color: 'inherit' }}
							> */}
							<a href={VITE_BASE_URL + '/about'} style={{ color: 'inherit' }}>
								<Typography variant="bottomNavigationText">About us</Typography>
							</a>
							{/* </Link> */}
							{/* <Link to="/contact-us" rel="noopener noreferrer" style={{ color: 'inherit' }}> */}
							<a href={VITE_BASE_URL + '/contact'} style={{ color: 'inherit' }}>
								<Typography variant="bottomNavigationText">Contact us</Typography>
							</a>
							{/* </Link> */}
							{/* <Link to="/terms-of-use" rel="noopener noreferrer" style={{ color: 'inherit' }}> */}
							<a href={VITE_BASE_URL + '/terms-of-use'} style={{ color: 'inherit' }}>
								<Typography variant="bottomNavigationText">Terms of use</Typography>
							</a>
							{/* </Link> */}
							{/* <Link to="/cookies-policy" rel="noopener noreferrer" style={{ color: 'inherit' }}> */}
							<a href={VITE_BASE_URL + '/cookies-policy'} style={{ color: 'inherit' }}>
								<Typography variant="bottomNavigationText">Cookie Disclaimer</Typography>
							</a>
							{/* </Link> */}
							<a href={VITE_BASE_URL + '/privacy-policy'} style={{ color: 'inherit' }}>
								{/* <Link to="/privacy-policy" rel="noopener noreferrer" style={{ color: 'inherit' }}> */}
								<Typography variant="bottomNavigationText">Privacy Policy</Typography>
							</a>
							{/* </Link> */}
							{/* <Link to="/advertise-with-us" rel="noopener noreferrer" style={{ color: 'inherit' }}>
								<Typography variant="bottomNavigationText">Advertise with us</Typography>
							</Link> */}
						</Box>
					</Grid>

					<Grid item xs={12} sx={{ padding: '4px 0 24px' }}>
						<Typography sx={{ fontSize: '12px' }}>
							Taxspoc, UAB 2024. The Taxspoc is not responsible for the content of external sites.
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</Container>
	);
};

export default BottomContainer;
