import { useNavigate } from 'react-router-dom';
// MUI
import { Grid, Typography } from '@mui/material';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
const MainArticleHeader = ({ article }) => {
	const navigate = useNavigate();
	const { slug } = article || {};
	const url = `/articles/${slug}`;

	// console.log('MainArticlePhoto article:', article);

	// const handleClick = () => {
	// 	navigate(url);
	// };
	return (
		<Grid item xs={12}>
			<a
				href={`${VITE_BASE_URL}${url}`}
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
