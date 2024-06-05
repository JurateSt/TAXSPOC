import moment from 'moment';
// MUI
import { Typography, Box } from '@mui/material';

const ReadArticleHeader = ({ article }) => {
	return (
		<Box
			name="Header_and_Subheader"
			sx={{
				display: 'flex',
				padding: '16px 32px 4px 32px',
				flexDirection: 'column',
				alignItems: 'flex-start',
				gap: '24px',
				alignSelf: 'stretch',
				// backgroundColor: 'rgba(0, 128, 0, 0.5)', // Set the background color to green with 50% transparency
			}}
		>
			<Box
				name="Subheader_and_Date"
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'flex-start',
					alignSelf: 'stretch',
					// backgroundColor: 'yellow',
				}}
			>
				<Typography>{article?.subHeader}</Typography>
				<Typography>{moment(article?.dateTag).format('MMMM DD, YYYY')}</Typography>
			</Box>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'flex-start',
					gap: '10px',
					alignSelf: 'stretch',
				}}
			>
				<Typography variant="h3">{article?.header}</Typography>
			</Box>
		</Box>
	);
};

export default ReadArticleHeader;
