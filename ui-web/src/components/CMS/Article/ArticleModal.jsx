import React, { useState, useEffect } from 'react';
// api
import api from '../../../api/axios';
// MUI
import {
	Grid,
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
	Typography,
	IconButton,
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
// components
import EditorTinyMCE from '../../../components/TinyMCE/EditorTinyMCE';
// modal
import ImageModal from './ImageModal';

const ArticleModal = ({ articleId, open, setOpen, setArticles }) => {
	const theme = useTheme();

	const [article, setArticle] = useState({
		dateTag: null,
		tags: [],
		description: '',
		regions: [],
		countries: [],
		otherCategories: [],
		subHeader: '',
		header: '',
		supportingText: '',
		source: '',
	});
	// dropdowns
	const [regions, setRegions] = useState([]);
	const [countries, setCountries] = useState([]);
	const [otherCategories, setOtherCategories] = useState([]);
	const [authors, setAuthors] = useState([]);
	// tinymce
	const [showEditor, setShowEditor] = useState(false);
	// modal
	const [openImage, setOpenImage] = useState(false);

	const getArticle = async () => {
		const { data } = await api.get(`/articles/${articleId}`);

		setArticle({
			...data,
			dateTag: data.dateTag ? dayjs(data.dateTag) : null,
			regions: data.categories?.filter((item) => item.type === 'region') || [],
			countries: data.categories?.filter((item) => item.type === 'country') || [],
			otherCategories: data.categories?.filter((item) => item.type === 'other') || [],
			// images: [],
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

	console.log('ARTICLE:', article);

	const handleChange = (eventOrValue, fieldName = null) => {
		if (fieldName) {
			setArticle((prev) => {
				if (fieldName === 'authors') {
					return {
						...prev,
						authors: [...prev.authors, eventOrValue],
					};
				}
				return {
					...prev,
					[fieldName]: eventOrValue,
				};
			});
		} else if (eventOrValue.target) {
			const { name, value } = eventOrValue.target;
			setArticle((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	console.log('handleChange:', article);

	const handleShowEditor = () => {
		setShowEditor(!showEditor);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log('handleSubmit:', article);

		try {
			const { data } = await api.put(`/articles/${articleId}`, article);
			setArticle((prev) => ({ ...prev, data }));

			setArticles((prev) => {
				const index = prev.findIndex((item) => item._id === articleId);
				prev[index] = data;
				return [...prev];
			});
			alert('Article updated successfully');
			setOpen(false);
		} catch (error) {
			console.error('Error creating article:', error);
			alert('Error creating article', error);
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
			>
				<DialogTitle>Add article</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Box
								sx={{
									width: 'calc(150px * 16 / 9)',
									height: '150px',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									marginBottom: 2,
									backgroundColor: 'lightgray',
								}}
							>
								<img
									alt="Article"
									src={`${article?.images?.[0]?.url}?timestamp=${new Date().getTime()}`}
									style={{
										height: '150px',
										aspectRatio: '16/9',
										objectFit: 'cover',
										cursor: 'pointer',
									}}
									onClick={() => setOpenImage(true)}
								/>
							</Box>
						</Grid>

						<Grid item xs={12}>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DateTimePicker
										label="Date tag"
										value={article.dateTag}
										ampm={false}
										onChange={(newValue) => handleChange(newValue, 'dateTag')}
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
								margin="dense"
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
								margin="dense"
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
								margin="dense"
								options={regions}
								getOptionLabel={(option) => option.name}
								value={article.regions}
								onChange={(event, newValue) => handleChange(newValue, 'regions')}
								renderInput={(params) => (
									<TextField {...params} label="Region" variant="outlined" fullWidth />
								)}
								multiple
							/>
						</Grid>

						<Grid item xs={4}>
							<Autocomplete
								margin="dense"
								options={countries}
								getOptionLabel={(option) => option.name}
								value={article.countries}
								onChange={(event, newValue) => handleChange(newValue, 'countries')}
								renderInput={(params) => (
									<TextField {...params} label="Countries" variant="outlined" fullWidth />
								)}
								multiple
								// disabled={article.regions.length === 0}
							/>
						</Grid>

						<Grid item xs={4}>
							<Autocomplete
								margin="dense"
								options={otherCategories}
								getOptionLabel={(option) => option.name}
								value={article.otherCategories}
								onChange={(event, newValue) => handleChange(newValue, 'otherCategories')}
								renderInput={(params) => (
									<TextField {...params} label="Other" variant="outlined" fullWidth />
								)}
								multiple
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								margin="dense"
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
								margin="dense"
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
								margin="dense"
								label="Supporting Text"
								name="supportingText"
								value={article.supportingText}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								margin="dense"
								label="Source"
								name="source"
								value={article.source}
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
							{showEditor && (
								<EditorTinyMCE
									value={article.content}
									onChange={(newValue) => handleChange(newValue, 'content')}
								/>
							)}
						</Grid>

						<Grid item xs={4}>
							<Autocomplete
								options={authors}
								getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
								// value={null}
								clearOnBlur
								inputValue=""
								onChange={(event, newValue) => handleChange(newValue, 'authors')}
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
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit" onClick={handleSubmit}>
						Update
					</Button>
				</DialogActions>
			</Dialog>

			{/* add article images */}
			<ImageModal
				articleId={articleId}
				open={openImage}
				setOpen={setOpenImage}
				croppedImage={article?.images?.[0]?.url}
				originalImage={article?.images?.[0]?.urlOriginal}
				article={article}
				setArticle={setArticle}
			/>
		</>
	);
};

export default ArticleModal;
