import React, { useState, useEffect } from 'react';
// api
import api from '../../../api/axios';
// MUI
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Box,
	Avatar,
	Autocomplete,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
// components
import EditorTinyMCE from '../../../components/TinyMCE/EditorTinyMCE';
// modal
// import ImageModal from './ImageModal';

const ArticleModal = ({ articleId, open, setOpen, setArticles }) => {
	const theme = useTheme();

	const [article, setArticle] = useState({});
	// dropdowns
	const [regions, setRegions] = useState([]);
	const [countries, setCountries] = useState([]);
	const [otherCategories, setOtherCategories] = useState([]);
	const [authors, setAuthors] = useState([]);
	// tinymce
	const [showEditor, setShowEditor] = useState(false);
	// modal
	const [openImage, setOpenImage] = useState(false);

	const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));

	const getArticle = async () => {
		const { data } = await api.get(`/articles/${articleId}`);

		setArticle({
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			role: data.role,
			company: data.company,
			phone: data.phone,
			linkedin: data.linkedInUrl,
			twitter: data.twitterUrl,
			description: data.description,
			image: data?.image,
		});
	};

	const getRegions = async () => {
		const { data } = await api.get('/regions');
		setRegions(data.sort((a, b) => a.name.localeCompare(b.name)));
	};
	const getCountries = async () => {
		try {
			const { data } = await api.get('/countries');
			setCountries(data);
		} catch (error) {
			console.error('getCountries error', error);
		}
	};
	const getOtherCategories = async () => {
		const { data } = await api.get('/other-categories');
		setOtherCategories(data.sort((a, b) => a.name.localeCompare(b.name)));
	};
	const getAuthors = async () => {
		const { data } = await api.get('/authors');
		setAuthors(data);
	};

	useEffect(() => {
		if (articleId) {
			getArticle();
			getRegions();
			getCountries();
			getOtherCategories();
			getAuthors();
		}
	}, [articleId]);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setArticle((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleShowEditor = () => {
		setShowEditor(!showEditor);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await api.put(`/authors/${articleId}`, article);
			setArticle((prev) => ({ ...prev, data }));

			setArticles((prev) => {
				const index = prev.findIndex((item) => item._id === articleId);
				prev[index] = data;
				return [...prev];
			});
			setOpen(false);
		} catch (error) {
			console.error('Error creating author:', error);
			alert('Error creating author', error);
		}
	};
	const handleClose = (event) => {
		event.preventDefault();
		setOpen(false);
	};
	return (
		<>
			<Dialog
				open={open}
				PaperProps={{
					component: 'form',
				}}
				fullScreen={true}
				// fullWidth={true}
				// maxWidth="xl"
			>
				<DialogTitle>Add article</DialogTitle>
				<DialogContent>
					<Box
						sx={{
							width: '100%',
							backgroundColor: 'lightgray',
							height: '200px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							marginBottom: 2,
						}}
					>
						<Avatar
							alt="Article"
							src={`${article?.image?.url}?timestamp=${new Date().getTime()}`}
							sx={{ width: 150, height: 150, cursor: 'pointer' }}
							onClick={() => setOpenImage(true)}
						/>
					</Box>

					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DateTimePicker
								label="Date tag"
								value={article.dateTag}
								ampm={false}
								// onChange={handleDateChange}
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
					<TextField
						margin="dense"
						label="Tags"
						name="tags"
						value={article.tags}
						onChange={handleChange}
						variant="outlined"
						fullWidth
					/>
					<TextField
						margin="dense"
						label="Meta description (max 160 characters)"
						name="description"
						value={article.description}
						onChange={handleChange}
						variant="outlined"
						fullWidth
					/>
					<Autocomplete
						margin="dense"
						options={regions}
						getOptionLabel={(option) => option.name}
						value={article.regions}
						onChange={handleChange}
						renderInput={(params) => (
							<TextField {...params} label="Region" variant="outlined" fullWidth />
						)}
						multiple
					/>
					<Autocomplete
						margin="dense"
						options={countries}
						getOptionLabel={(option) => option.name}
						value={article.countries}
						onChange={handleChange}
						renderInput={(params) => (
							<TextField {...params} label="Countries" variant="outlined" fullWidth />
						)}
						multiple
						// disabled={article.regions.length === 0}
					/>
					<Autocomplete
						margin="dense"
						options={otherCategories}
						getOptionLabel={(option) => option.name}
						value={article.otherCategories}
						onChange={handleChange}
						renderInput={(params) => (
							<TextField {...params} label="Other" variant="outlined" fullWidth />
						)}
						multiple
					/>
					<TextField
						margin="dense"
						label="SubHeader"
						name="subHeader"
						value={article.subHeader}
						onChange={handleChange}
						variant="outlined"
						fullWidth
					/>
					<TextField
						margin="dense"
						label="Header"
						name="header"
						value={article.header}
						onChange={handleChange}
						variant="outlined"
						fullWidth
					/>
					<TextField
						margin="dense"
						label="Supporting Text"
						name="supportingText"
						value={article.supportingText}
						onChange={handleChange}
						variant="outlined"
						fullWidth
					/>

					<TextField
						margin="dense"
						label="Source"
						name="source"
						value={article.source}
						onChange={handleChange}
						variant="outlined"
						fullWidth
					/>
					<Button variant="outlined" onClick={handleShowEditor}>
						{showEditor ? 'Hide TinyMCE editor' : 'Show TinyMCE editor'}
					</Button>
					{showEditor && <EditorTinyMCE value={article.content} onChange={handleChange} />}

					<Autocomplete
						options={authors}
						getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
						// value={null}
						clearOnBlur
						inputValue=""
						onChange={handleChange}
						renderInput={(params) => (
							<TextField {...params} label="Author" variant="outlined" fullWidth />
						)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit" onClick={handleSubmit}>
						Update
					</Button>
				</DialogActions>
			</Dialog>

			{/* add author photo */}
			{/* <ImageModal
				authorId={authorId}
				open={openImage}
				setOpen={setOpenImage}
				croppedImage={form.image}
				originalImage={form.image?.originalUrl}
				author={form}
				setAuthor={setForm}
			/> */}
		</>
	);
};

export default ArticleModal;
