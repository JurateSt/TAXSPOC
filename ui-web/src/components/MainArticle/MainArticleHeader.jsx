import { useNavigate } from 'react-router-dom';
// MUI
import { Grid, Typography } from '@mui/material';

const MainArticleHeader = ({ article }) => {
	const navigate = useNavigate();
	const { _id: id } = article || {};
	const url = `/articles/${id}`;

	// console.log('MainArticlePhoto article:', article);

	const handleClick = () => {
		navigate(url);
	};
	return (
		<Grid item xs={12} onClick={handleClick}>
			<a
				href={url}
				style={{
					textDecoration: 'none',
					// color: 'inherit'
				}}
			>
				<Typography
					sx={{
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						display: '-webkit-box',
						WebkitLineClamp: 3,
						WebkitBoxOrient: 'vertical',
						fontSize: '18px',
						fontWeight: '700',
						lineHeight: '26px',
						color: 'primary.darkText',
						// on hover underline
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
