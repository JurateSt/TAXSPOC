import { useNavigate } from 'react-router-dom';
// MUI
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';

const ArticleCardHeader = ({ article }) => {
	const navigate = useNavigate();
	const { slug } = article;
	const url = `/articles/${slug}`;
	const handleClick = () => {
		navigate(url);
	};
	return (
		<Grid item xs={12}>
			<a href={url} style={{ textDecoration: 'none', color: 'inherit' }}>
				<Typography
					sx={{
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						display: '-webkit-box',
						WebkitLineClamp: 2,
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

export default ArticleCardHeader;
