import { useNavigate } from 'react-router-dom';
// MUI
import { Grid, Link } from '@mui/material';

const ArticleButtons = ({ article }) => {
	const navigate = useNavigate();
	const { _id: id } = article;

	const handleClick = () => {
		console.log('Read More', id);
		navigate(`/articles/${id}`);
	};

	return (
		<Grid item xs={12}>
			<Link onClick={handleClick} sx={{ cursor: 'pointer' }}>
				Read More
			</Link>
		</Grid>
	);
};

export default ArticleButtons;
