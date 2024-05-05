import React, { useState, useEffect, useRef } from 'react';
// MUI
import { Container, Grid, TextField, Typography, Button, Snackbar } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// Quill
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
// api
import api from '../api/axios';

const CreateArticle = () => {
	const [article, setArticle] = useState({
		dateTag: null,
		tags: '',
		categories: '',
		subHeader: '',
		header: '',
		content: '',
		source: '',
	});

	// snackbar
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

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

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = {
			...article,
			tags: article.tags.split(','),
			categories: article.categories.split(','),
		};
		console.log('handleSubmit', formData);
		try {
			await api.post('/articles', formData);
			setArticle({
				dateTag: null,
				tags: '',
				categories: '',
				subHeader: '',
				header: '',
				content: '',
				source: '',
			});
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
		});
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
					{/* <TextField
						label="Content"
						name="content"
						value={article.content}
						onChange={handleChange}
						variant="outlined"
						fullWidth
					/> */}
					<ReactQuill
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
					/>
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
		</Container>
	);
};

export default CreateArticle;
