// MUI
import { Typography, Grid } from '@mui/material';
// moment
import moment from 'moment';

const InfoAboutSubHeader = () => {
	return (
		<Grid container item xs={12}>
			<Grid item xs={6}>
				<Typography
					sx={{ fontSize: '14px', fontStyle: 'normal', fontEeight: 300, lineHeight: '20px' }}
				>
					About Us | Our Values | Our Mission Statement
				</Typography>
			</Grid>
			{/* <Grid item xs={6} sx={{ textAlign: 'right' }}>
				<Typography
					sx={{ fontSize: '14px', fontStyle: 'normal', fontEeight: 300, lineHeight: '20px' }}
				>
					{moment(article?.dateTag).format('MMMM DD, YYYY')}
				</Typography>
			</Grid> */}
		</Grid>
	);
};

export default InfoAboutSubHeader;
