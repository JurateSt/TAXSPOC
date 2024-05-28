// MUI
import { Grid, Button } from '@mui/material';

const MainArticlePhoto = ({ article }) => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL;
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
			}}
		>
			{/* <img
				src="/images/italy_plastic_tax.webp"
				style={{ height: '210px', width: '100%', objectFit: 'cover' }}
				alt="Main Article"
			/> */}
			<img
				src={`${backendUrl}/${article?.images[0]?.url}`}
				style={{ width: '100%', height: '100%', objectFit: 'cover' }}
				alt="Main Article"
			/>
		</Grid>
	);
};

export default MainArticlePhoto;
