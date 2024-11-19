import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI
import {
	Container,
	Box,
	Grid,
	TextField,
	Typography,
	Button,
	Snackbar,
	Input,
	IconButton,
	Autocomplete,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// Quill
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
// api
import api from '../api/axios';
// components
import EditorTinyMCE from '../components/TinyMCE/EditorTinyMCE';

const EditArticle = () => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const navigate = useNavigate();
	const location = useLocation();
	const { id } = useParams();
	const searchParams = new URLSearchParams(location.search);
	// const editor = searchParams.get('editor');

	const [articles, setArticles] = useState([]);
	const [article, setArticle] = useState({
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
	});

	// categories
	const [regions, setRegions] = useState([]);
	const [countries, setCountries] = useState([]);
	const [regionCountries, setRegionCountries] = useState([]);
	const [otherCategories, setOtherCategories] = useState([]);
	//authors
	const [authors, setAuthors] = useState([]);

	// snackbar
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	// tinymce
	const [showEditor, setShowEditor] = useState(false);

	const getArticle = async () => {
		const { data } = await api.get(`/cms/auth/articles/${id}`);
		data.dateTag = data.dateTag ? dayjs(data.dateTag) : null;
		data.regions = data.categories?.filter((item) => item.type === 'region');
		data.countries = data.categories?.filter((item) => item.type === 'country');
		data.otherCategories = data.categories?.filter((item) => item.type === 'other');
		console.log('getArticle', data);

		setArticle(data);
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
		getArticle();
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

	const handleFileChange = async (event) => {
		setArticle((prev) => ({
			...prev,
			images: [...prev.images, ...event.target.files],
		}));
	};

	const handleFileDetele = async (url) => {
		console.log('handleFileDetele', url);
		if (window.confirm('Are you sure you want to delete this file?') === false) return;
		const newImages = article.images.filter((item) => item.url !== url);
		setArticle((prev) => ({
			...prev,
			images: newImages,
		}));
		const { data } = await api.put(`/articles/${id}`, { action: 'deleteFile', url: url });
	};

	const handleRegionChange = async (event, value) => {
		console.log('handleRegionChange', value);
		setArticle((prev) => ({
			...prev,
			regions: value,
		}));
	};

	const handleCountryChange = (event, value) => {
		console.log('handleCountryChange', value);
		setArticle((prev) => ({
			...prev,
			countries: value,
		}));
	};

	const handleOtherCategoryChange = (event, value) => {
		console.log('handleOtherCategoryChange', value);
		setArticle((prev) => ({
			...prev,
			otherCategories: value,
		}));
	};

	// actions
	const handleSubmit = async (event) => {
		event.preventDefault();
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
			const { data } = await api.put(`/articles/${id}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			setSnackbarMessage('Article successfully updated!');
			setSnackbarOpen(true);
			// navigate(`/auth/create-article`);
		} catch (error) {
			console.error('handleSubmitArticle error', error);
			setSnackbarMessage('Error creating article');
			setSnackbarOpen(true);
		}
	};

	const handleCancel = () => {
		navigate(`/cms/auth/create-article`);
	};

	// const handleEdit = (article) => {
	// 	console.log('handleEdit', article);
	// 	navigate(`/auth/create-article/${article._id}`);
	// };

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	const handleNavigate = () => {
		navigate('/auth/create-article');
	};

	const handleShowEditor = () => {
		setShowEditor(!showEditor);
	};
	return (
		<Container>
			<Typography variant="h3" align="center">
				Edit Article
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
					<Autocomplete
						options={regions}
						getOptionLabel={(option) => option.name}
						value={article?.regions}
						onChange={handleRegionChange}
						renderInput={(params) => (
							<TextField {...params} label="Region" variant="outlined" fullWidth />
						)}
						multiple
					/>
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
					<Autocomplete
						options={regions}
						getOptionLabel={(option) => option.name}
						value={article?.regions}
						onChange={handleRegionChange}
						renderInput={(params) => (
							<TextField {...params} label="Region" variant="outlined" fullWidth />
						)}
						multiple
					/>
				</Grid>
				<Grid item xs={4}>
					<Autocomplete
						options={countries}
						getOptionLabel={(option) => option.name}
						value={article?.countries}
						onChange={handleCountryChange}
						renderInput={(params) => (
							<TextField {...params} label="Region" variant="outlined" fullWidth />
						)}
						multiple
					/>
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
					<TextField
						label="SubHeader"
						name="subHeader"
						value={article.subHeader}
						onChange={handleChange}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Header"
						name="header"
						value={article.header}
						onChange={handleChange}
						variant="outlined"
						fullWidth
					/>
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
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
						{article.images.map((item, index) => {
							console.log('images', item.url);
							return (
								<Box
									sx={{
										display: 'flex',
										// alignItems: 'center',
										// flexDirection: 'row',
										// gap: '8px',
									}}
								>
									<img key={index} src={item.url} alt="article" style={{ width: '600px' }} />
									<Box>
										<IconButton onClick={() => handleFileDetele(item.url)}>
											<DeleteOutlineOutlinedIcon />
										</IconButton>
									</Box>
								</Box>
							);
						})}
					</Box>
				</Grid>

				<Grid item xs={12}>
					<Input type="file" onChange={handleFileChange} inputProps={{ multiple: true }} />
				</Grid>

				<Grid item xs={6}>
					<Button variant="contained" onClick={handleCancel}>
						Cancel
					</Button>
				</Grid>
				<Grid item container justifyContent="flex-end" xs={6}>
					<Button variant="contained" onClick={handleSubmit}>
						Save and publish
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

			<hr style={{ margin: '20px 0' }} />
			<Grid container spacing={2}>
				{articles.map((item, index) => (
					<Grid container item key={item._id}>
						<Grid item xs={10}>
							<div>{item.dateTag}</div>
							<strong>{item.header}</strong>
							<div>Tags: {JSON.stringify(item.tags)}</div>
							<div>Categories: {JSON.stringify(item.categories)}</div>
							<hr style={{ margin: '8px 0' }} />
						</Grid>
						<Grid item xs={2}>
							<IconButton onClick={() => handleEdit(item)}>
								<EditOutlinedIcon />
							</IconButton>

							<IconButton>
								<DeleteOutlineOutlinedIcon />
							</IconButton>
						</Grid>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default EditArticle;
