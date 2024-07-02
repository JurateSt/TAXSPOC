import { useNavigate } from 'react-router-dom';
// MUI
import { Grid, Button } from '@mui/material';

const MainArticlePhoto = ({ article }) => {
	const navigate = useNavigate();
	const { _id: id } = article || {};

	const handleClick = () => {
		navigate(`/articles/${id}`);
	};
	return (
		<Grid
			item
			xs={0}
			sm={6}
			md={8}
			lg={8}
			xl={8}
			sx={{
				// border: '1px solid green',
				backgroundColor: 'lightblue',
				height: '210px',
				cursor: 'pointer',
			}}
		>
			{/* <img
				src="/images/italy_plastic_tax.webp"
				style={{ height: '210px', width: '100%', objectFit: 'cover' }}
				alt="Main Article"
			/> */}
			<img
				src={article?.images[0]?.url}
				style={{ width: '100%', height: '100%', objectFit: 'cover' }}
				alt="Main Article"
				onClick={handleClick}
			/>
		</Grid>
	);
};

export default MainArticlePhoto;
