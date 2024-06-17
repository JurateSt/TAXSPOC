import { useNavigate } from 'react-router-dom';
// MUI
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';

const ArticleCardHeader = ({ article }) => {
	const navigate = useNavigate();
	const { _id: id } = article;
	const handleClick = () => {
		navigate(`/articles/${id}`);
	};
	return (
		<Grid item xs={12} sx={{ cursor: 'pointer' }} onClick={handleClick}>
			<Typography
				sx={{
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					display: '-webkit-box',
					WebkitLineClamp: 2,
					WebkitBoxOrient: 'vertical',
					fontWeight: 'bold',
					fontSize: '15px',
					// lineHeight: '1.2em',
				}}
			>
				{article?.header}
			</Typography>
		</Grid>
	);
};

export default ArticleCardHeader;
