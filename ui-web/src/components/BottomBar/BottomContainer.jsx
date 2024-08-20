// React
import { useNavigate, Link } from 'react-router-dom';
// MUI
import { Container, Box, Grid, AppBar, Typography, Icon, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
// Logo
import LogoBottom from '../../assets/LogoBottom.png';
import LogoBottomLarger from '../../assets/Logo-bottom-larger-10x.png';
import LogoMain from '../../assets/LogoMain.svg';

const BottomContainer = () => {
	const handleLogoClick = () => {
		window.scrollTo(0, 0);
		navigate('/home');
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
							<Link to="/home" onClick={handleLogoClick}>
								<img
									src={LogoMain}
									alt="TaxSpoc Logo"
									style={{ height: '42px', width: 'auto', maxWidth: '100%' }}
								/>
							</Link>
						</Grid>
						<Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
							<Box sx={{ textAlign: 'center' }}>
								<Typography>Follow Us:</Typography>
								<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
									<IconButton>
										<LinkedInIcon />
									</IconButton>
									<IconButton>
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
							<Link
								to="/about-us"
								// target="_blank"
								// rel="noopener noreferrer"
								style={{ color: 'inherit' }}
							>
								<Typography variant="bottomNavigationText">About us</Typography>
							</Link>
							<Link to="/contact-us" rel="noopener noreferrer" style={{ color: 'inherit' }}>
								<Typography variant="bottomNavigationText">Contact us</Typography>
							</Link>
							<Link to="/termes-of-use" rel="noopener noreferrer" style={{ color: 'inherit' }}>
								<Typography variant="bottomNavigationText">Terms of use</Typography>
							</Link>
							<Link to="/cookies-policy" rel="noopener noreferrer" style={{ color: 'inherit' }}>
								<Typography variant="bottomNavigationText">Cookies policy</Typography>
							</Link>
							<Link to="/privacy-policy" rel="noopener noreferrer" style={{ color: 'inherit' }}>
								<Typography variant="bottomNavigationText">Privacy Policy</Typography>
							</Link>
							{/* <Link to="/advertise-with-us" rel="noopener noreferrer" style={{ color: 'inherit' }}>
								<Typography variant="bottomNavigationText">Advertise with us</Typography>
							</Link> */}
						</Box>
					</Grid>

					<Grid item xs={12} sx={{ padding: '4px 0 24px' }}>
						<Typography sx={{ fontSize: '12px' }}>
							Copyright © Taxspoc, UAB 2024. All rights reserved. The Taxspoc is not responsible
							for the content of external sites. The material on this site may not be reproduced,
							distributed, transmitted, cached or otherwise used, except with the prior written
							permission of Taxspoc.
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</Container>
	);
};

export default BottomContainer;
