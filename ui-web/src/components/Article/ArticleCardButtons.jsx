import { useNavigate } from 'react-router-dom';
// MUI
import { Grid, Link } from '@mui/material';

const ArticleCardButtons = ({ article }) => {
	const navigate = useNavigate();
	const { _id: id } = article;
	const url = `/articles/${id}`;

	const handleClick = () => {
		navigate(url);
	};

	return (
		<Grid item xs={12}>
			<a href={url} style={{ textDecoration: 'none', color: 'inherit' }}>
				<Link>Read More</Link>
			</a>
		</Grid>
	);
};

export default ArticleCardButtons;
