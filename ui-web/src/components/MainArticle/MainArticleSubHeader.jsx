// MUI
import { Typography, Grid } from '@mui/material';
// moment
import moment from 'moment';

const MainArticleSubHeader = ({ article }) => {
	return (
		<Grid item xs={12}>
			<Typography
				// noWrap
				sx={{
					fontWeight: '400',
					fontSize: '12px',
					lineHeight: '18px',
					// color: 'primary.darkText',
				}}
			>
				{article?.subHeader}
			</Typography>
		</Grid>
	);
};

export default MainArticleSubHeader;
