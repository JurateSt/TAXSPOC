// MUI
import { Grid } from '@mui/material';
// components
import SectionCategory from './SectionCategory';
import ArticleCard from '../Article/ArticleCard';

const Section = ({ category, articles }) => {
	return (
		<Grid
			container
			rowSpacing={1}
			sx={{
				borderBottom: '1px solid',
				borderColor: 'primary.divider',
				// border: '1px solid green',
				padding: '16px 0',
			}}
		>
			<SectionCategory category={category} />

			<Grid
				container
				item
				xs={12}
				// sx={{ border: '1px solid blue' }}
				columnSpacing={2}
				rowSpacing={2}
			>
				{articles?.map((item, index) => (
					<Grid container item xs={12} sm={6} md={3} lg={3} xl={3} key={index}>
						<ArticleCard key={index} article={item} />
					</Grid>
				))}
			</Grid>
		</Grid>
	);
};

export default Section;
