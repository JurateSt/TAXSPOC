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
		<Grid item xs={12}>
			<Box
			// sx={{
			// 	display: 'flex',
			// 	// justifyContent: 'flex-end'
			// }}
			>
				<Tooltip title={'Copy article link'}>
					<IconButton onClick={handleClick}>
						<ShareOutlinedIcon />
					</IconButton>
				</Tooltip>

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
			</Box>
		</Grid>
	);
};

export default ReadArticleShare;
