// TODO: possibly not needed
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
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import moment from 'moment';
// Quill
import ReactQuill from 'react-quill';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

// api
import api from '../api/axios';

const CreateArticle = () => {
	const navigate = useNavigate();

	const [articles, setArticles] = useState([]);
	const [article, setArticle] = useState({
		dateTag: null,
		tags: '',
		categories: '',
		subHeader: '',
		header: '',
		content: '',
		source: '',
		images: [],
	});
	// Text Editor
	const editorRef = useRef(null);

	// snackbar
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	// images
	// const [selectedFile, setSelectedFile] = useState(null);
	// const hiddenFileInput = useRef(null);

	const getArticles = async () => {
		const { data } = await api.get('/articles');

		setArticles(data);
	};

	useEffect(() => {
		getArticles();
	}, []);

	useEffect(() => {
		if (!editorRef.current) return;

		if (editorRef.current.children.length === 0) {
			new Quill(editorRef.current, {
				theme: 'snow',
			});
		}
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

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData();
		// add images to formData
		console.log('handleSubmit', article.images);
		Array.from(article.images).forEach((item) => {
			formData.append('images[]', item);
		});

		Object.keys(article).forEach((key) => {
			if (key !== 'images') {
				const value = article[key] === null ? '' : article[key];
				console.log('FormData', key, value);
				formData.append(key, value);
			}
		});

		// for (let [key, value] of formData.entries()) {
		// 	console.log('FormData', key, value, value === 'null');
		// }

		try {
			const { data } = await api.post('/articles', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			setArticle({
				dateTag: null,
				tags: '',
				categories: '',
				subHeader: '',
				header: '',
				content: '',
				source: '',
				images: [],
			});
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
		setArticle({
			dateTag: null,
			tags: '',
			categories: '',
			subHeader: '',
			header: '',
			content: '',
			source: '',
			images: [],
		});
	};

	const handleEdit = (id) => {
		console.log('handleEdit', id);
		// navigate new tab
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

				<Grid item xs={12}>
					<TextField
						label="Categories"
						name="categories"
						value={article.categories}
						onChange={handleChange}
						variant="outlined"
						fullWidth
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
					{/* <ReactQuill
						theme="snow"
						modules={{
							toolbar: [
								['bold', 'italic', 'underline', 'strike'],
								[{ list: 'ordered' }, { list: 'bullet' }],
								['link', 'image', 'video'], // Additional features
								['clean'],
							],
						}}
						value={article.content}
						onChange={handleContentChange}
					/> */}
					<div ref={editorRef} style={{ height: '200px' }} />
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

export default CreateArticle;
