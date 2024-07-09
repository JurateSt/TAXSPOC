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
					// backgroundColor: 'complementary.mainArticleButton',
					// '&:hover': {
					// 	backgroundColor: 'complementary.mainArticleButtonHover',
					// },
					// borderRadius: 0,
					backgroundColor: 'primary.deepOrange400',
					// on hover change opacity
					'&:hover': {
						backgroundColor: 'primary.deepOrange400',
						opacity: 0.8,
					},
					textTransform: 'none',
					color: 'primary.lightText',
					width: '100%',
					// height: '64px',
				}}
				onClick={handleClick}
			>
				Read The Story
			</Button>
		</Grid>
	);
};

export default MainArticleButtons;
