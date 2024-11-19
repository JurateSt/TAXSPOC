import React, { useState } from 'react';
// MUI
import {
	Box,
	Typography,
	Grid,
	IconButton,
	Tooltip,
	Snackbar,
	SnackbarContent,
} from '@mui/material';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

const ReadArticleShare = ({ article }) => {
	const [tooltipTitle, setTooltipTitle] = useState('Copy article');
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const handleClick = () => {
		navigator.clipboard.writeText(window.location.href);
		setSnackbarOpen(true);
		// setTooltipTitle('Article copied!');
		// setTimeout(() => {
		// 	setTooltipTitle('Copy article');
		// }, 5000);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	return (
		<Grid
			container
			alignItems="center"
			justifyContent="space-between"
			sx={{
				marginTop: 2,
				marginBottom: 1,
			}}
		>
			{/* Left Section - Authors */}
			<Grid item xs={11}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 1,
					}}
				>
					<Typography>
						By{' '}
						<span style={{ fontWeight: 700 }}>
							{article?.authors
								?.map((author) => `${author.firstName} ${author.lastName}`)
								.join(', ')}
						</span>
					</Typography>
				</Box>
			</Grid>

			{/* Right Section - Share Button */}
			<Grid item xs={1}>
				<Box sx={{ textAlign: 'right' }}>
					<Tooltip title={'Copy article link'}>
						<IconButton
							onClick={handleClick}
							sx={{
								border: '1px solid gray',
								borderRadius: '6px',
							}}
						>
							<ShareOutlinedIcon />
						</IconButton>
					</Tooltip>
				</Box>
			</Grid>

			{/* Snackbar */}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<SnackbarContent
					sx={{
						backgroundColor: 'background.default',
						color: 'primary.darkText',
					}}
					message={<Typography>Article link copied!</Typography>}
				/>
			</Snackbar>
		</Grid>
		// <Grid item xs={12}>
		// 	<Box>
		// 		<Tooltip title={'Copy article link'}>
		// 			<IconButton onClick={handleClick}>
		// 				<ShareOutlinedIcon />
		// 			</IconButton>
		// 		</Tooltip>

		// 		<Snackbar
		// 			open={snackbarOpen}
		// 			autoHideDuration={3000}
		// 			onClose={handleClose}
		// 			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
		// 		>
		// 			<SnackbarContent
		// 				sx={{
		// 					backgroundColor: 'background.default',
		// 					color: 'primary.darkText',
		// 				}}
		// 				message={<Typography>Article link copied!</Typography>}
		// 			/>
		// 		</Snackbar>
		// 	</Box>
		// </Grid>
	);
};

export default ReadArticleShare;
