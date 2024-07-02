import { useNavigate } from 'react-router-dom';
// MUI
import { Grid, Typography } from '@mui/material';

const MainArticleHeader = ({ article }) => {
	const navigate = useNavigate();
	console.log('MainArticlePhoto article:', article);
	const { _id: id } = article || {};

	const handleClick = () => {
		navigate(`/articles/${id}`);
	};
	return (
		<Grid item xs={12} sx={{ cursor: 'pointer' }} onClick={handleClick}>
			<Typography
				variant="h5"
				sx={{
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					display: '-webkit-box',
					WebkitLineClamp: 2,
					WebkitBoxOrient: 'vertical',
					fontWeight: 'fontWeightBold',
				}}
			>
				{article?.header}
			</Typography>
		</Grid>
	);
};

export default MainArticleHeader;
