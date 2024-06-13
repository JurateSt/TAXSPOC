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
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// Quill
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
// TinyMCE
import { Editor } from '@tinymce/tinymce-react';
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
	const editor = searchParams.get('editor');

	const [articles, setArticles] = useState([]);
	const [article, setArticle] = useState({
		dateTag: null,
		tags: [],
		categories: [],
		subHeader: '',
		header: '',
		supportingText: '',
		content: '',
		source: '',
		images: [],
	});

	// snackbar
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const getArticle = async () => {
		const { data } = await api.get(`/articles/${id}`);
		data.dateTag = data.dateTag ? dayjs(data.dateTag) : null;
		console.log('getArticle', data, editor);

		setArticle(data);
	};

	useEffect(() => {
		getArticle();
	}, []);

	const handleChange = (event) => {
		const { name, value } = event.target;

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

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData();
		// add images to formData
		Array.from(article.images).forEach((item) => {
			formData.append('images[]', item);
		});

		Object.keys(article).forEach((key) => {
			if (key !== 'images') {
				const value = article[key] === null ? '' : article[key];
				console.log('EDIT ARTICLE FormData', key, value);
				formData.append(key, value);
			}
		});

		// for (let [key, value] of formData.entries()) {
		// 	console.log('FormData', key, value, value === 'null');
		// }

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
		navigate(`/auth/create-article`);
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

	return (
		<Container>
			<Typography variant="h3" align="center">
				Edit Article
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
								'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | checklist numlist bullist indent outdent | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | emoticons charmap | removeformat',
							tinycomments_mode: 'embedded',
							tinycomments_author: 'Author name',
							mergetags_list: [
								{ value: 'First.Name', title: 'First Name' },
								{ value: 'Email', title: 'Email' },
							],
							ai_request: (request, respondWith) =>
								respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
						}}
						// initialValue={article.content}
						value={article.content}
						onEditorChange={handleContentChange}
					/> */}
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
