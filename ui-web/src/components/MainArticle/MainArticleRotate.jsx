// MUI
import { Grid, Button, IconButton } from '@mui/material';
// MUI Icons
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';

const MainArticleRotate = () => {
	return (
		<Grid
			item
			xs={12}
			sm={12}
			md={12}
			lg={12}
			xl={12}
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '8px',
			}}
		>
			<IconButton>
				<RadioButtonCheckedOutlinedIcon fontSize="small" />
			</IconButton>
			<IconButton>
				<RadioButtonUncheckedOutlinedIcon fontSize="small" />
			</IconButton>
			<IconButton>
				<RadioButtonUncheckedOutlinedIcon fontSize="small" />
			</IconButton>
			<IconButton>
				<RadioButtonUncheckedOutlinedIcon fontSize="small" />
			</IconButton>
			<IconButton>
				<RadioButtonUncheckedOutlinedIcon fontSize="small" />
			</IconButton>
		</Grid>
	);
};

export default MainArticleRotate;
