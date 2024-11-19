import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// MUI
import {
	Container,
	Grid,
	TextField,
	Typography,
	Button,
	Snackbar,
	Input,
	IconButton,
	Autocomplete,
	FormControl,
	FormHelperText,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableSortLabel,
	Paper,
	Tab,
	Box,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import moment from 'moment';
// api
import api from '../api/axios';
// auth
import { useAuth } from '../context/AuthContext';
// components
import Bar from '../components/CMS/Bar';
import EditorTinyMCE from '../components/TinyMCE/EditorTinyMCE';

const CreateArticleTinyMCE = () => {
	const { user } = useAuth();

	const navigate = useNavigate();

	const [articles, setArticles] = useState([]);
	const initialArticleValues = {
		dateTag: null,
		tags: [],
		regions: [],
		countries: [],
		otherCategories: [],
		subHeader: '',
		header: '',
		supportingText: '',
		content: '',
		source: '',
		images: [],
		authors: [],
		description: '',
	};
	const [article, setArticle] = useState(initialArticleValues);
	//authors
	const [authors, setAuthors] = useState([]);
	// categories
	const [regions, setRegions] = useState([]);
	const [countries, setCountries] = useState([]);
	const [regionCountries, setRegionCountries] = useState([]);
	const [otherCategories, setOtherCategories] = useState([]);

	// snackbar
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	// errors
	const [error, setError] = useState({ isError: false, message: '' });
	// images
	// const [selectedFile, setSelectedFile] = useState(null);
	// const hiddenFileInput = useRef(null);
	// sorting
	const [order, setOrder] = React.useState('desc');
	const [orderBy, setOrderBy] = React.useState('dateTag');
	// tinymce
	const [showEditor, setShowEditor] = useState(false);

	const getArticles = async () => {
		const { data } = await api.get('/articles');

		setArticles(data);
	};
	const getAuthors = async () => {
		const { data } = await api.get('/authors');
		setAuthors(data);
	};
	const getRegions = async () => {
		const { data } = await api.get('/regions');
		setRegions(data.sort((a, b) => a.name.localeCompare(b.name)));
	};
	const getCountries = async () => {
		try {
			const { data } = await api.get('/countries');
			setCountries(data.sort((a, b) => a.name.localeCompare(b.name)));
			setRegionCountries(data.sort((a, b) => a.name.localeCompare(b.name)));
		} catch (error) {
			console.error('getCountries error', error);
		}
	};

	const getOtherCategories = async () => {
		const { data } = await api.get('/other-categories');
		setOtherCategories(data.sort((a, b) => a.name.localeCompare(b.name)));
	};

	useEffect(() => {
		getArticles();
		getAuthors();
		getRegions();
		getCountries();
		getOtherCategories();
	}, []);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setArticle((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	const handleAuthorChange = (event, value) => {
		setArticle((prev) => {
			return { ...prev, authors: [...prev.authors, value] };
		});
	};

	const handleDateChange = (newDate) => {
		setArticle((prev) => ({
			...prev,
			dateTag: newDate,
		}));
	};
	const handleContentChange = (value) => {
		setArticle((prev) => ({
			...prev,
			content: value,
		}));
	};

	const handleFileChange = (event) => {
		setArticle((prev) => ({
			...prev,
			images: event.target.files,
		}));
	};

	const handleRegionChange = async (event, value) => {
		setArticle((prev) => ({
			...prev,
			regions: value,
		}));
	};

	const handleCountryChange = (event, value) => {
		setArticle((prev) => ({
			...prev,
			countries: value,
		}));
	};

	const handleOtherCategoryChange = (event, value) => {
		setArticle((prev) => ({
			...prev,
			otherCategories: value,
		}));
	};

	// actions
	const handleSubmit = async (event) => {
		event.preventDefault();
		// if (article.regions.length === 0 || article.countries.length === 0) {
		// 	setError({ isError: true, message: 'Field is required' });
		// 	return;
		// }

		if (article?.header?.length === 0) {
			setSnackbarMessage('Header field is required');
			setSnackbarOpen(true);
			// setError({ isError: true, message: 'Field is required' });
			return;
		}
		const formData = new FormData();

		formData.append('regions', JSON.stringify(article.regions));
		formData.append('countries', JSON.stringify(article.countries));
		formData.append('otherCategories', JSON.stringify(article.otherCategories));
		formData.append('authors', JSON.stringify(article.authors));

		Array.from(article.images).forEach((item) => {
			formData.append('images[]', item);
		});

		Object.keys(article).forEach((key) => {
			if (!['images', 'regions', 'countries', 'otherCategories', 'authors'].includes(key)) {
				const value = article[key] === null ? '' : article[key];
				formData.append(key, value);
			}
		});

		for (let [key, value] of formData.entries()) {
			console.log('FormData', key, value);
		}

		try {
			const { data } = await api.post('/articles', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			setArticle(initialArticleValues);
			setArticles([...articles, data]);
			setSnackbarMessage('Article successfully created!');
			setSnackbarOpen(true);
		} catch (error) {
			console.error('handleSubmitArticle error', error);
			setSnackbarMessage('Error creating article');
			setSnackbarOpen(true);
		}
	};

	const handleRequestSort = () => {
		const newOrder = order === 'asc' ? 'desc' : 'asc';

		const sortedArticles = [...articles].sort((a, b) => {
			const comparison = new Date(a.dateTag) - new Date(b.dateTag);
			return newOrder === 'asc' ? comparison : -comparison;
		});

		setArticles(sortedArticles);
		setOrder(newOrder);
		setOrderBy('dateTag');
	};

	const handleCancel = () => {
		setArticle(initialArticleValues);
	};

	const handleEdit = (id) => {
		navigate(`/cms/auth/create-article/${id}`);
		// window.open(`/auth/create-article/${id}`, '_blank');
	};

	const handleDelete = async (id) => {
		if (!window.confirm('Are you sure you want to delete this article?')) {
			return;
		}

		try {
			await api.delete(`/articles/${id}`);
			setArticles((prev) => prev.filter((item) => item._id !== id));

			setSnackbarMessage('Article successfully deleted!');
			setSnackbarOpen(true);
		} catch (error) {
			console.error('handleDelete error', error);
			setSnackbarMessage('Error deleting article');
			setSnackbarOpen(true);
		}
	};

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	const handleShowEditor = () => {
		setShowEditor(!showEditor);
	};

	return (
		<>
			<Bar />
			<Container>
				<Typography variant="h3" align="center">
					Create Article
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateTimePicker
									label="Date tag"
									value={article.dateTag}
									ampm={false}
									onChange={handleDateChange}
									renderInput={(params) => <TextField {...params} name="dateTag" />}
								/>
							</LocalizationProvider>
							<Box>
								Will be saved as a UTC time:{' '}
								{article.dateTag
									? dayjs(article.dateTag).utc().format('MM/DD/YYYY HH:mm:ss [UTC]')
									: 'No date selected'}
							</Box>
						</Box>
					</Grid>

					<Grid item xs={12}>
						<TextField
							label="Tags"
							name="tags"
							value={article.tags}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Meta description (max 160 characters)"
							name="description"
							value={article.description}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</Grid>

					<Grid item xs={4}>
						{/* <FormControl fullWidth error={error.isError}> */}
						<Autocomplete
							options={regions}
							getOptionLabel={(option) => option.name}
							value={article.regions}
							onChange={handleRegionChange}
							renderInput={(params) => (
								<TextField {...params} label="Region" variant="outlined" fullWidth />
							)}
							multiple
						/>
						{/* <FormHelperText>{error.message}</FormHelperText>
					</FormControl> */}
					</Grid>
					<Grid item xs={4}>
						{/* <FormControl fullWidth error={error.isError}> */}
						<Autocomplete
							options={regionCountries}
							getOptionLabel={(option) => option.name}
							value={article.countries}
							onChange={handleCountryChange}
							renderInput={(params) => (
								<TextField {...params} label="Countries" variant="outlined" fullWidth />
							)}
							multiple
							disabled={article.regions.length === 0}
						/>
						{/* <FormHelperText>{error.message}</FormHelperText>
					</FormControl> */}
					</Grid>
					<Grid item xs={4}>
						<Autocomplete
							options={otherCategories}
							getOptionLabel={(option) => option.name}
							value={article.otherCategories}
							onChange={handleOtherCategoryChange}
							renderInput={(params) => (
								<TextField {...params} label="Other" variant="outlined" fullWidth />
							)}
							multiple
						/>
					</Grid>
					<Grid item xs={12}>
						{/* <FormControl fullWidth error={error.isError}> */}
						<TextField
							label="SubHeader"
							name="subHeader"
							value={article.subHeader}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
						{/* </FormControl> */}
					</Grid>
					<Grid item xs={12}>
						{/* <FormControl error={error.isError}> */}
						<TextField
							label="Header"
							name="header"
							value={article.header}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
						{/* </FormControl> */}
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Supporting Text"
							name="supportingText"
							value={article.supportingText}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</Grid>

					<Grid item xs={6}>
						<Button variant="outlined" onClick={handleShowEditor}>
							{showEditor ? 'Hide TinyMCE editor' : 'Show TinyMCE editor'}
						</Button>
					</Grid>
					<Grid item xs={12}>
						{showEditor && <EditorTinyMCE value={article.content} onChange={handleContentChange} />}
					</Grid>
					<Grid item xs={4}>
						<Autocomplete
							options={authors}
							getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
							// value={null}
							clearOnBlur
							inputValue=""
							onChange={handleAuthorChange}
							renderInput={(params) => (
								<TextField {...params} label="Author" variant="outlined" fullWidth />
							)}
						/>
					</Grid>
					{article.authors?.length > 0 && (
						<Grid item xs={12}>
							{article.authors.map((item, index) => (
								<Box
									key={index}
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										marginBottom: '8px',
									}}
								>
									<Typography>
										{`${item?.firstName} ${item?.lastName} ${item?.email} ${item?.role}`}
									</Typography>
									<IconButton
										onClick={() => {
											setArticle((prev) => ({
												...prev,
												authors: prev.authors.filter((author) => author._id !== item._id),
											}));
										}}
									>
										<DeleteOutlineOutlinedIcon />
									</IconButton>
								</Box>
							))}
						</Grid>
					)}
					<Grid item xs={12}>
						<TextField
							label="Source"
							name="source"
							value={article.source}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</Grid>

					<Grid item xs={12}>
						<Input type="file" onChange={handleFileChange} inputProps={{ multiple: true }} />
						{/* <Button variant="contained" onClick={handleSubmit}>
						Upload Images
					</Button>
					<Input
						type="file"
						inputProps={{ multiple: true }}
						onChange={handleFileChange}
						style={{ display: 'none' }}
						ref={hiddenFileInput}
					/> */}
					</Grid>

					<Grid item xs={6}>
						<Button variant="contained" onClick={handleCancel}>
							Cancel
						</Button>
					</Grid>
					<Grid item container justifyContent="flex-end" xs={6}>
						<Button variant="contained" onClick={handleSubmit}>
							Save and Publish
						</Button>
					</Grid>
				</Grid>
				<Snackbar
					open={snackbarOpen}
					autoHideDuration={6000}
					onClose={handleCloseSnackbar}
					message={snackbarMessage}
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				/>

				<hr style={{ margin: '64px 0' }} />
				<Grid container spacing={2}>
					<Typography variant="h4">Articles</Typography>
					<TableContainer component={Paper}>
						<Table size="small" sx={{ tableLayout: 'fixed' }}>
							<TableHead>
								<TableRow>
									<TableCell sx={{ width: '15%' }}>
										<TableSortLabel active={true} direction={order} onClick={handleRequestSort}>
											Date Tag
										</TableSortLabel>
									</TableCell>
									<TableCell sx={{ width: '30%' }}>Header</TableCell>
									<TableCell sx={{ width: '10%' }}>Picture count</TableCell>
									<TableCell sx={{ width: '13%' }}>Region</TableCell>
									<TableCell sx={{ width: '13%' }}>Country</TableCell>
									<TableCell sx={{ width: '13%' }}>Other</TableCell>
									<TableCell sx={{ width: '3%' }}>Author</TableCell>
									<TableCell sx={{ width: '3%' }}></TableCell>
									<TableCell sx={{ width: '5%' }}></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{articles.map((item) => (
									<TableRow
										key={item._id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component="th" scope="row">
											{moment(item.dateTag).format('YYYY-MM-DD HH:mm:ss')}
										</TableCell>
										<TableCell>{item.header}</TableCell>
										<TableCell>{item.images.length}</TableCell>
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
					{/* {articles.map((item, index) => (
					<Grid container item key={item._id}>
						<Grid item xs={10}>
							<div>{moment(item.dateTag).format('YYYY-MM-DD')}</div>
							<strong>{item.header}</strong>

							<hr style={{ margin: '8px 0' }} />
						</Grid>
						<Grid item xs={2}>
							<IconButton onClick={() => handleEdit(item._id)}>
								<EditOutlinedIcon />
							</IconButton>

							<IconButton onClick={() => handleDelete(item._id)}>
								<DeleteOutlineOutlinedIcon />
							</IconButton>
						</Grid>
					</Grid>
				))} */}
				</Grid>
			</Container>
		</>
	);
};

export default CreateArticleTinyMCE;
