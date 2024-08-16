// React
import { useNavigate, useLocation } from 'react-router-dom';
// MUI
import { Typography, Grid, Box, Button, Chip } from '@mui/material';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

const ReadArticleCategories = ({ article }) => {
	const navigate = useNavigate();

	const onClick = (category) => {
		const params = new URLSearchParams({
			type: category.type,
			category: category.name,
		});
		window.scrollTo(0, 0);
		// navigate(`/category/articles?${params.toString()}`);
		navigate(`/articles/category?${params}`);
	};
	return (
		<>
			<Grid
				item
				xs={12}
				sx={
					{
						// border: '1px solid green',
					}
				}
			>
				<Typography
					sx={{
						margin: '32px 0 16px 0',
						fontSize: '24px',
						fontStyle: 'normal',
						fontWeight: 400,
						lineHeight: '28px',
					}}
				>
					Topics
				</Typography>
			</Grid>
			<Grid
				item
				xs={12}
				sx={{
					display: 'flex',
					alignItems: 'flex-start',
					// justifyContent: 'space-between',
					gap: '12px',
					flexWrap: 'wrap',
				}}
			>
				{article?.categories?.map((item, index) => (
					<Chip
						sx={{
							borderRadius: 0,
							// backgroundColor: 'primary.deepOrange300',
							color: 'primary.darkText',
						}}
						key={index}
						label={item?.name}
						onClick={() => onClick(item)}
					/>
				))}
			</Grid>
		</>
	);
};

export default ReadArticleCategories;
