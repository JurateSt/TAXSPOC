import moment from 'moment';
// MUI
import { Typography, Grid } from '@mui/material';

const ReadArticleHeader = ({ article }) => {
	return (
		<Grid item xs={12}>
			{/* <Typography
				sx={{
					fontSize: ['24px', '24px', '40px'], // xs, sm, md
					lineHeight: ['32px', '32px', '48px'], // xs, sm, md
					fontStyle: 'normal',
					fontWeight: 600,
				}}
			>
				{article?.header}
			</Typography> */}
			<h1 className="text-[24px] sm:text-[24px] md:text-[40px] leading-[32px] sm:leading-[32px] md:leading-[48px] font-semibold m-0">
				{article?.header}
			</h1>
		</Grid>
	);
};

export default ReadArticleHeader;
