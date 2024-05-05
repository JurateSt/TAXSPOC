// MUI
import { Grid, Button } from '@mui/material';

const MainArticleButtons = ({ article }) => {
	return (
		<Grid item xs={12}>
			<Button
				sx={{
					backgroundColor: 'complementary.mainArticleButton',
					'&:hover': {
						backgroundColor: 'complementary.mainArticleButtonHover',
					},
					textTransform: 'none',
					color: 'background.default',
					width: '100%',
				}}
			>
				Read The Story
			</Button>
		</Grid>
	);
};

export default MainArticleButtons;
