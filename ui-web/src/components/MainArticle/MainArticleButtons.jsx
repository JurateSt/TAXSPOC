import { useNavigate } from 'react-router-dom';
// MUI
import { Grid, Button } from '@mui/material';

const MainArticleButtons = ({ article }) => {
	const navigate = useNavigate();

	const id = article?._id;

	const handleClick = () => {
		navigate(`/articles/${id}`);
	};
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
				onClick={handleClick}
			>
				Read The Story
			</Button>
		</Grid>
	);
};

export default MainArticleButtons;
