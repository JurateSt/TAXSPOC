import { useNavigate } from 'react-router-dom';
// MUI
import { Grid, Typography } from '@mui/material';

const MainArticleHeader = ({ article }) => {
	const navigate = useNavigate();
	console.log('MainArticlePhoto article:', article);
	const { _id: id } = article || {};
	const url = `/articles/${id}`;

	const handleClick = () => {
		navigate(url);
	};
	return (
		<Grid item xs={12} onClick={handleClick}>
			<a href={url} style={{ textDecoration: 'none', color: 'inherit' }}>
				<Typography
					variant="h5"
					sx={{
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						fontWeight: 'fontWeightBold',
						'&:hover': {
							textDecoration: 'underline',
						},
					}}
				>
					{article?.header}
				</Typography>
			</a>
		</Grid>
	);
};

export default MainArticleHeader;
