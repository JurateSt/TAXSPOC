import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// MUI
import {
	Button,
	Container,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableSortLabel,
	TableBody,
	Paper,
	IconButton,
	Box,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// libraries
import moment from 'moment';
// api
import api from '../../api/axios';
// components
import Bar from '../../components/CMS/Bar';
import ArticleModal from '../../components/CMS/Article/ArticleModal';

const Articles = () => {
	const navigate = useNavigate();

	const [open, setOpen] = useState(false);
	const [articleId, setArticleId] = useState(null);
	const [articles, setArticles] = useState([]);

	// sorting
	const [order, setOrder] = useState('desc');
	const [orderBy, setOrderBy] = useState('dateTag');

	const getArticles = async () => {
		const { data } = await api.get('/cms/auth/articles');

		setArticles(data);
	};

	useEffect(() => {
		getArticles();
	}, []);
	console.log('ARTICLES:', articles);

	const handleAddArticle = async (event) => {
		event.preventDefault();
		const initialData = {
			dateTag: null,
			status: 'Draft',
			tags: [],
			regions: [],
			countries: [],
			otherCategories: [],
			subHeader: '',
			header: '',
			supportingText: '',
			content: '',
			// source: '',
			images: [],
			authors: [],
			description: '',
		};

		try {
			const { data } = await api.post('/cms/auth/articles', initialData);
			setArticleId(data._id);
			console.log('Article created:', data);
			setArticles((prev) => [data, ...prev]);
			navigate(`/cms/auth/articles/${data._id}`);
		} catch (error) {
			console.error('Error creating article:', error);
			alert('Error creating article', error);
		}
		// finally {
		// 	navigate(`/cms/auth/articles/${articleId}`);
		// 	// setOpen(true);
		// }
	};

	const handleEdit = (id) => {
		setArticleId(id);
		navigate(`/cms/auth/articles/${id}`);
		// setOpen(true);
	};

	const handleDelete = async (id) => {
		if (!window.confirm('Are you sure you want to delete the article?')) {
			return;
		}
		try {
			await api.delete(`/cms/auth/articles/${id}`);
			setArticles((prev) => prev.filter((item) => item._id !== id));
		} catch (error) {
			console.error('Error deleting the artricle:', error);
			alert('Error deleting the artricle', error);
		}
	};

	const handleRequestSort = () => {
		const newOrder = order === 'asc' ? 'desc' : 'asc';

		const sortedArticles = [...articles].sort((a, b) => {
			const comparison = new Date(a.createdAt) - new Date(b.createdAt);
			return newOrder === 'asc' ? comparison : -comparison;
		});

		setArticles(sortedArticles);
		setOrder(newOrder);
		setOrderBy('dateTag');
	};

	return (
		<>
			<Bar />
			<Container sx={{ mt: 2 }}>
				<Button variant="contained" onClick={handleAddArticle}>
					Add article
				</Button>

				<TableContainer component={Paper} sx={{ mt: 4 }}>
					<Table size="small" sx={{ tableLayout: 'fixed' }}>
						<TableHead>
							<TableRow>
								<TableCell>
									<TableSortLabel active={true} direction={order} onClick={handleRequestSort}>
										Created
									</TableSortLabel>
								</TableCell>
								<TableCell>Date Tag</TableCell>
								<TableCell width={'20%'}>Header</TableCell>
								<TableCell>Region</TableCell>
								<TableCell>Country</TableCell>
								<TableCell width={'15%'}>Other</TableCell>
								<TableCell width={'5%'}>Author</TableCell>
								<TableCell width={'5%'}>Image</TableCell>
								<TableCell width={'8%'}>
									<TableSortLabel active={true} direction={order} onClick={handleRequestSort}>
										Status
									</TableSortLabel>
								</TableCell>
								<TableCell width={'3%'}></TableCell>
								<TableCell width={'5%'}></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{articles?.map((item) => (
								<TableRow key={item._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component="th" scope="row">
										{moment(item.createdAt).format('YYYY-MM-DD HH:mm')}
									</TableCell>
									<TableCell>{moment(item.dateTag).format('YYYY-MM-DD HH:mm')}</TableCell>
									<TableCell>{item.header}</TableCell>
									<TableCell>
										{item.categories
											.filter((item) => item.type === 'region')
											.map((item) => item.name)
											.join(', ')}
									</TableCell>
									<TableCell>
										{item.categories
											.filter((item) => item.type === 'country')
											.map((item) => item.name)
											.join(', ')}
									</TableCell>
									<TableCell>
										{item.categories
											.filter((item) => item.type === 'other')
											.map((item) => item.name)
											.join(', ')}
									</TableCell>
									<TableCell>{item.authors.length}</TableCell>
									<TableCell>{item.images.length}</TableCell>
									<TableCell>{item.status}</TableCell>
									{/* <TableCell>
										<Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
											<Box
												sx={{
													display: 'flex',
												}}
											>
												<img
													src={`${item?.image?.url}?timestamp=${new Date().getTime()}`}
													alt="article"
													style={{ width: '100px' }}
												/>
											</Box>
										</Box>
									</TableCell> */}
									<TableCell>
										<IconButton onClick={() => handleEdit(item._id)}>
											<EditOutlinedIcon />
										</IconButton>
									</TableCell>
									<TableCell>
										<IconButton onClick={() => handleDelete(item._id)}>
											<DeleteOutlineOutlinedIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>

			{/* Article content */}
			<ArticleModal articleId={articleId} open={open} setOpen={setOpen} setArticles={setArticles} />
		</>
	);
};

export default Articles;
