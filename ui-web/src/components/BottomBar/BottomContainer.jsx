// MUI
import { Container, Box, Grid, AppBar, Typography, Link } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
// Logo
import LogoBottom from '../../assets/LogoBottom.png';
import LogoBottomLarger from '../../assets/Logo-bottom-larger-10x.png';
const BottomContainer = () => {
	//move to boottom of the page
	return (
		<Container
			maxWidth={false}
			sx={{
				backgroundColor: 'primary.main',
				color: 'background.default',
				// height: '300px',
				marginTop: '32px',
			}}
		>
			<Container
			// sx={{
			// 	border: '1px solid yellow',
			// }}
			>
				<Grid
					container
					// sx={{
					// 	border: '1px solid red',
					// }}
				>
					<Grid container item sx={{ padding: '48px 0' }}>
						<Grid item md={6} xs={12} sm={12}>
							<Box>
								<img
									src={LogoBottomLarger}
									alt="TaxSpoc Logo"
									style={{ maxWidth: '100%', height: '48px' }}
								/>
							</Box>
						</Grid>

						<Grid item md={6} xs={12} sm={12}>
							<Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'flex-start',
										gap: '10px',
									}}
								>
									<Typography>Follow Us:</Typography>
									<Box
										sx={{
											display: 'flex',
											padding: '4px 0px',
											flexDirection: 'row',
											justifyContent: 'center',
											alignItems: 'flex-start',
											gap: '10px',
											alignSelf: 'stretch',
										}}
									>
										<LinkedInIcon />
										<YouTubeIcon />
										<XIcon fontSize="small" />

										<FacebookIcon />
									</Box>
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
							}}
						>
							<Link
								href="https://www.example.com"
								target="_blank"
								rel="noopener noreferrer"
								color="inherit"
							>
								<Typography>About us</Typography>
							</Link>
							<Link
								href="https://www.example.com"
								target="_blank"
								rel="noopener noreferrer"
								color="inherit"
							>
								<Typography>Contact us</Typography>
							</Link>
							<Link
								href="https://www.example.com"
								target="_blank"
								rel="noopener noreferrer"
								color="inherit"
							>
								<Typography>Terme of use</Typography>
							</Link>
							<Link
								href="https://www.example.com"
								target="_blank"
								rel="noopener noreferrer"
								color="inherit"
							>
								<Typography>Cookies policy</Typography>
							</Link>
							<Link
								href="https://www.example.com"
								target="_blank"
								rel="noopener noreferrer"
								color="inherit"
							>
								<Typography>Privacy Policy</Typography>
							</Link>
							<Link
								href="https://www.example.com"
								target="_blank"
								rel="noopener noreferrer"
								color="inherit"
							>
								<Typography>Advertise with us</Typography>
							</Link>
						</Box>
					</Grid>

					<Grid item xs={12} sx={{ padding: '4px 0' }}>
						<Typography>
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
