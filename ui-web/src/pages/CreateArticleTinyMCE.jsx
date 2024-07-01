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
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import moment from 'moment';
// TinyMCE
import { Editor } from '@tinymce/tinymce-react';
// api
import api from '../api/axios';
// components
import EditorTinyMCE from '../components/TinyMCE/EditorTinyMCE';

const CreateArticleTinyMCE = () => {
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
	};
	const [article, setArticle] = useState(initialArticleValues);
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

	const getArticles = async () => {
		const { data } = await api.get('/articles');

		setArticles(data);
	};
	const getRegions = async () => {
		const { data } = await api.get('/regions');
		setRegions(data);
	};
	const getCountries = async () => {
		try {
			const { data } = await api.get('/countries');
			setCountries(data);
			setRegionCountries(data);
		} catch (error) {
			console.error('getCountries error', error);
		}
	};

	const getOtherCategories = async () => {
		const { data } = await api.get('/other-categories');
		setOtherCategories(data);
	};

	useEffect(() => {
		getArticles();
		getRegions();
		getCountries();
		getOtherCategories();
	}, []);

	const handleChange = (event) => {
		const { name, value } = event.target;
		console.log('handleChange', name, value);
		setArticle((prev) => ({
			...prev,
			[name]: value,
		}));
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
		// console.log('handleRegionChange', value);
		// if (value) {
		// 	setArticle((prev) => ({
		// 		...prev,
		// 		regions: value,
		// 		countries: [],
		// 	}));
		// 	const regionIds = value.map((item) => item._id);
		// 	const { data } = await api.get(`/countries?regions=${regionIds.join(',')}`);
		// 	setRegionCountries(data);
		// } else {
		// 	setArticle((prev) => ({
		// 		...prev,
		// 		regions: [],
		// 		countries: [],
		// 	}));

		// 	setRegionCountries(countries);
		// }
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
		if (article.regions.length === 0 || article.countries.length === 0) {
			setError({ isError: true, message: 'Field is required' });
			return;
		}
		const formData = new FormData();
		// console.log('HANDLE SUBMIT REGION', article);

		formData.append('regions', JSON.stringify(article.regions));
		formData.append('countries', JSON.stringify(article.countries));
		formData.append('otherCategories', JSON.stringify(article.otherCategories));

		Array.from(article.images).forEach((item) => {
			formData.append('images[]', item);
		});

		Object.keys(article).forEach((key) => {
			if (!['images', 'regions', 'countries', 'otherCategories'].includes(key)) {
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

	const handleCancel = () => {
		console.log('handleCancel');
		setArticle(initialArticleValues);
	};

	const handleEdit = (id) => {
		navigate(`/auth/create-article/${id}`);
		// window.open(`/auth/create-article/${id}`, '_blank');
	};

	const handleDelete = async (id) => {
		if (!window.confirm('Are you sure you want to delete this article?')) {
			return;
		}
		console.log('handleDelete', id);
		try {
			await api.delete(`/articles/${id}`);
			//const newArticles = articles.filter((item) => item._id !== id);
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

	return (
		<Container>
			<Typography variant="h3" align="center">
				Create Article
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							label="Date tag"
							value={article.dateTag}
							onChange={handleDateChange}
							renderInput={(params) => <TextField {...params} name="dateTag" />}
						/>
					</LocalizationProvider>
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

				<Grid item xs={4}>
					{/* <TextField
						label="Categories"
						name="categories"
						value={article.categories}
						onChange={handleChange}
						variant="outlined"
						fullWidth
					/> */}

					{/* <FormControl fullWidth error={error.isError}> */}
					<Autocomplete
						options={regions}
						getOptionLabel={(option) => option.name}
						value={article.regions}
						onChange={handleRegionChange}
						renderInput={(params) => (
							<TextField {...params} label="Region" variant="outlined" fullWidth required />
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
							<TextField {...params} label="Countries" variant="outlined" fullWidth required />
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
							<TextField {...params} label="Other" variant="outlined" fullWidth required />
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
				<Grid item xs={12}>
					<EditorTinyMCE value={article.content} onChange={handleContentChange} />
					{/* <Editor
						apiKey="rk2aip84g35omv0hc2cscaxth7rtdo001kbuxl6ndao4f68b"
						init={{
							plugins:
								'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
							toolbar:
								'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | checklist numlist bullist indent outdent | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight  | emoticons charmap | removeformat',
							tinycomments_mode: 'embedded',
							tinycomments_author: 'Author name',
							mergetags_list: [
								{ value: 'First.Name', title: 'First Name' },
								{ value: 'Email', title: 'Email' },
							],
							ai_request: (request, respondWith) =>
								respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
						}}
						// initialValue="Welcome to TinyMCE!"
						onEditorChange={handleContentChange}
					/> */}
				</Grid>
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
				{articles.map((item, index) => (
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
				))}
			</Grid>
		</Container>
	);
};

export default CreateArticleTinyMCE;
