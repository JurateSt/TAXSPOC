// MUI
import { Box, Card, CardContent, IconButton, List, ListItem, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const data = [
	{
		year: '2024',
		model: 'Clearance Model',
		countries1: ['Italy', 'Ghana', 'Philippines', 'Bolivia', 'Paraguay'],
		countries2: ['Saudi Arabia', 'Kenya'],
		position: 'above',
	},
	{
		year: '2024',
		model: 'Post-Audit Model',
		countries1: ['Denmark (Optional)'],
		position: 'below',
	},
	{
		year: '2024',
		model: 'Other Model',
		countries1: ['Dominican Republic', 'Israel', 'Romania', 'Mauritius'],
		countries2: ['Zambia', 'Malaysia', 'Botswana', 'Greece (B2G)'],
		position: 'above',
	},
	{
		year: '2024',
		model: 'Post-Audit Model',
		countries1: ['Denmark (Optional)'],
		position: 'below',
	},
	{ year: '2025', model: 'Clearance Model', countries1: ['Uruguay'], position: 'above' },
	{
		year: '2025',
		model: 'Post-Audit Model',
		countries1: ['Germany ***', 'Slovakia'],
		position: 'below',
	},
	{ year: '2025', model: 'Other Model', countries1: ['Spain - Biscaya'], position: 'above' },
	{
		year: '2026 January',
		model: 'Other Model',
		countries1: ['Belgium', 'Croatia'],
		position: 'below',
	},
	{ year: '2026 February', model: 'Clearance Model', countries1: ['Poland'], position: 'above' },
	{ year: '2026 July', model: 'Other Model', countries1: ['UAE'], position: 'below' },
	{ year: '2026 September', model: 'Post-Audit Model', countries1: ['Germany'], position: 'above' },
	{ year: '2028-203 ** January', model: 'VIDA Model', countries1: ['EU'], position: 'below' },
];

const HorizontalTimeline = () => {
	return (
		<>
			<Box sx={{ display: 'flex', overflowX: 'auto' }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						padding: 2,
					}}
				>
					{data.map((item, index) => (
						<Box
							key={index}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								width: 150,
								textAlign: 'center',
								position: 'relative',
								alignItems: 'center',
								// mx: 0.5,
							}}
						>
							<Card
								sx={{
									height: 180,
									// width: 150,
									mb: item.position === 'above' ? 36 : 0,
									mt: item.position === 'below' ? 36 : 0,
									zIndex: 1,
									// display: 'flex',
									// flexDirection: 'column',
								}}
							>
								<CardContent
								// sx={{ flexGrow: 1 }}
								>
									<Typography color="text.secondary" sx={{ fontSize: 12 }}>
										{item.year}
									</Typography>
									<Typography variant="h6" component="div" gutterBottom sx={{ fontSize: 14 }}>
										{item.model}
									</Typography>
									<Box sx={{ display: 'flex' }}>
										<Box sx={{ flex: 1 }}>
											{item.countries1.map((country, idx) => (
												<Typography key={idx} variant="body2" sx={{ textAlign: 'left' }}>
													{country}
												</Typography>
											))}
										</Box>
										{item?.countries2 && (
											<>
												<Box sx={{ width: '1px', bgcolor: 'text.secondary', mx: 1 }} />
												{/* Vertical line */}
												<Box sx={{ flex: 1 }}>
													{item.countries2.map((country, idx) => (
														<Typography key={idx} variant="body2" sx={{ textAlign: 'left' }}>
															{country}
														</Typography>
													))}
												</Box>
											</>
										)}
									</Box>
									{/* <List dense>
									{item.countries.map((country, idx) => (
										<ListItem key={idx} sx={{ padding: 0 }}>
											<Typography variant="body2">{country}</Typography>
										</ListItem>
									))}
								</List> */}
								</CardContent>
							</Card>

							{/* Vertical connector from card to dot */}
							{item.position === 'above' ? (
								<Box
									sx={{
										position: 'absolute',
										top: '0',
										bottom: '50%', // Extend from the card to the dot
										left: '50%',
										width: '2px',
										bgcolor: 'primary.main',
										zIndex: 0,
									}}
								/>
							) : (
								<Box
									sx={{
										position: 'absolute',
										top: '50%', // Start from the dot to the card
										bottom: '0',
										left: '50%',
										width: '2px',
										bgcolor: 'primary.main',
										zIndex: 0,
									}}
								/>
							)}

							<IconButton
								color="primary"
								sx={{
									position: 'absolute',
									top: '50%', // Center the icon vertically
									transform: 'translateY(-50%)', // Ensure it is exactly centered regardless of the card position
									zIndex: 2,
								}}
							>
								<CircleIcon fontSize="small" />
								{/* <Typography
							variant="caption"
							sx={{
								position: 'absolute',
								top: '100%',
								width: '100%',
								left: '50%',
								transform: 'translateX(-50%)',
							}}
						>
							{item.year}
						</Typography> */}
							</IconButton>
							{/* Connector line */}
							{index < data.length - 1 && (
								<Box
									sx={{
										position: 'absolute',
										top: '50%',
										left: '50%',
										width: '100%',
										height: 2,
										bgcolor: 'primary.main',
										zIndex: 0,
									}}
								/>
							)}
						</Box>
					))}
				</Box>
			</Box>

			<Box
				sx={{
					// display: 'flex',
					// justifyContent: 'center',
					// alignItems: 'center',
					padding: 2,
				}}
			>
				<Typography>** Explanation</Typography>
			</Box>
		</>
	);
};

export default HorizontalTimeline;
