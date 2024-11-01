import { useNavigate } from 'react-router-dom';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
const MainArticlePhoto = ({ article }) => {
	const navigate = useNavigate();
	const { slug } = article || {};
	const url = `/articles/${slug}`;

	// const handleClick = () => {
	// 	navigate(url);
	// };
	return (
		<a href={`${VITE_BASE_URL}${url}`} style={{ textDecoration: 'none', color: 'inherit' }}>
			<img
				src={article?.images?.[0]?.url}
				style={{
					width: '100%',
					height: '100%',
					aspectRatio: '16/9',
					objectFit: 'cover',
				}}
				alt="Main Article"
				loading="lazy"
				// onClick={handleClick}
			/>
		</a>
	);
};

export default MainArticlePhoto;
