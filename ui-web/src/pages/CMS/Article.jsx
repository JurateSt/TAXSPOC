import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
// api
import api from '../../api/axios';
// MUI
import {
	Container,
	Grid,
	Box,
	Typography,
	TextField,
	Autocomplete,
	Button,
	IconButton,
	Switch,
	FormControlLabel,
	Stack,
	Divider,
} from '@mui/material';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
// components
import Bar from '../../components/CMS/Bar';
import EditorTinyMCE from '../../components/TinyMCE/EditorTinyMCE';
import ImageModal from '../../components/CMS/Article/ImageModal';

const Article = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	// const { setArticles } = location.state || {};

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
		// source: '',
	});
	const [originalArticle, setOriginalArticle] = useState(null);
	// dropdowns
	const [regions, setRegions] = useState([]);
	const [countries, setCountries] = useState([]);
	const [otherCategories, setOtherCategories] = useState([]);
	const [authors, setAuthors] = useState([]);
	// tinymce
	const [showEditor, setShowEditor] = useState(false);
	// modal
	const [openImage, setOpenImage] = useState(false);
	// needs to be saved
	const [isSaved, setIsSaved] = useState(true);

	const getArticle = async () => {
		const { data } = await api.get(`/cms/auth/articles/${id}`);

		const mapArticle = {
			...data,
			dateTag: data.dateTag ? dayjs(data.dateTag) : null,
			regions: data.categories?.filter((item) => item.type === 'region') || [],
			countries: data.categories?.filter((item) => item.type === 'country') || [],
			otherCategories: data.categories?.filter((item) => item.type === 'other') || [],
			// images: [],
		};

		setArticle(mapArticle);
		setOriginalArticle(mapArticle);
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
		if (id) {
			getArticle();
			getRegions();
			getCountries();
			getOtherCategories();
			getAuthors();
		}
	}, [id]);

	// actions
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
		setIsSaved(false);
	};

	const handleShowEditor = () => {
		setShowEditor(!showEditor);
	};

	const handleSubmit = async () => {
		try {
			const { data: data } = await api.put(`/cms/auth/articles/${id}`, article);
			setArticle((prev) => ({ ...prev, data }));
			setIsSaved(true);
			alert('Article updated successfully');
			// window.location.reload();
			// setOpen(false);
		} catch (error) {
			console.error('Error updating article:', error);
			alert('Error updating article', error);
		}
	};
	const handleSubmitStatus = async (event) => {
		const { checked } = event.target;
		const status = checked ? 'Published' : 'Draft';
		const infoText = checked
			? 'Are you sure you want to change the article status to "PUBLISHED"?\n\nThis article will be published and will appear PUBLICLY on the website.'
			: 'Are you sure you want to change the article status to "DRAFT"?\n\nYou are REMOVING from this article from appearing publicly on the website. It will still be available in CMS for edit.';

		if (!window.confirm(infoText)) {
			return;
		}

		try {
			const { data } = await api.put(`/cms/auth/articles/${id}`, {
				status,
			});
			setArticle((prev) => ({ ...prev, status: data.status }));
			setIsSaved(true);
			// window.location.reload();
		} catch (error) {
			console.error('Error updating article:', error);
			alert('Error updating article', error);
		}
	};
	const handleClose = () => {
		if (isSaved) {
			// setOpen(false);
			navigate(`/cms/auth/articles`);
			setIsSaved(true);
		} else {
			if (
				confirm(
					'Are you sure you want to close without saving?\n\n("OK" will cancel the changes and close the editor)\n("Cancel" will close this dialog and go back to the editor)'
				)
			) {
				setArticle(originalArticle);
				navigate(`/cms/auth/articles`);
				// setOpen(false);
				setIsSaved(true);
			}
		}
	};

	const handlePreview = () => {
		const previewUrl = `/cms/auth/articles/preview/${article.slug}`;
		window.open(previewUrl, '_blank');
	};

	return (
		<>
			<Bar />
			<Container sx={{ mt: 2, mb: 2 }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h5">Edit article</Typography>
						{/* <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
							<FormControlLabel control={<Switch defaultChecked color="success" />} label="Draft" />
						</Grid> */}
					</Grid>
					{/* <Grid container item md={2}></Grid> */}
					<Grid container item xs={12} sm={12} md={8} lg={8} xl={8}>
						<Grid item xs={12}>
							<Box
								sx={{
									// width: 'calc(150px * 16 / 9)',
									// height: '150px',
									width: '100%',
									height: '100%',
									aspectRatio: '16/9',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									// marginBottom: 4,
									backgroundColor: 'primary.grey200',
									// marginBottom: 2,
									// cursor: 'pointer',
								}}
							>
								{article?.images?.[0]?.url ? (
									<figure style={{ width: '100%', height: '100%', margin: 0 }}>
										<img
											alt={article?.images?.[0]?.caption}
											src={`${article?.images?.[0]?.url}?timestamp=${new Date().getTime()}`}
											style={{
												width: '100%',
												height: '100%',
												aspectRatio: '16/9',
												objectFit: 'cover',
												cursor: 'pointer',
											}}
											onClick={() => setOpenImage(true)}
										/>
										<figcaption style={{ fontSize: '10px', marginTop: '-6px' }}>
											<Typography
												component="span"
												variant="caption"
												sx={{ fontStyle: 'italic', color: 'primary.deepOrange500' }}
											>
												|
											</Typography>{' '}
											{article?.images?.[0]?.caption}
										</figcaption>
									</figure>
								) : (
									// <Tooltip title="Add the article image">
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											cursor: 'pointer',
										}}
									>
										<ImageSearchIcon
											width="64px"
											height="64px"
											sx={{ width: '64px', height: '64px' }}
											onClick={() => setOpenImage(true)}
										/>
										<span>
											<strong>Add image</strong>
										</span>
									</Box>
									// </Tooltip>
								)}
							</Box>
						</Grid>

						<Grid item xs={12} sx={{ mt: 4 }}>
							<Button variant="contained" type="submit" onClick={() => setOpenImage(true)}>
								Edit photo and details
							</Button>
						</Grid>

						<Grid item xs={12} sx={{ mt: 4 }}>
							<Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
								<Typography
									sx={{
										fontWeight: article.status === 'Draft' ? 'bold' : 'normal',
									}}
								>
									DRAFT
								</Typography>
								<Switch
									checked={article.status === 'Published'}
									color="success"
									onChange={handleSubmitStatus}
								/>
								<Typography
									sx={{
										fontWeight: article.status === 'Published' ? 'bold' : 'normal',
									}}
								>
									PUBLISHED
								</Typography>
							</Stack>
						</Grid>

						<Grid item xs={12}>
							<Box
								sx={{
									border: '1px solid',
									borderColor: 'grey.400',
									// borderRadius: '4px',
									paddingTop: 1,
									padding: 2,
									marginTop: 2,
									backgroundColor: 'grey.200',
								}}
							>
								<Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
									DATES
								</Typography>

								<Grid container spacing={2}>
									<Grid item xs={4}>
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<DateTimePicker
												label="Date tag"
												value={article.dateTag}
												ampm={false}
												onChange={(newValue) => handleChange(newValue, 'dateTag')}
												renderInput={(params) => <TextField {...params} name="dateTag" fullWidth />}
											/>
										</LocalizationProvider>
									</Grid>
									<Grid item xs={8}>
										<Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
											<span>
												Will be saved as a UTC time:{' '}
												{article.dateTag
													? dayjs(article.dateTag).utc().format('MM/DD/YYYY HH:mm:ss [UTC]')
													: 'No date selected'}
											</span>
										</Box>
									</Grid>
								</Grid>
							</Box>
						</Grid>

						<Grid item xs={12}>
							<Box
								sx={{
									border: '1px solid',
									borderColor: 'grey.400',
									// borderRadius: '4px',
									paddingTop: 1,
									padding: 2,
									marginTop: 2,
									backgroundColor: 'grey.200',
								}}
							>
								<Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
									META ITEMS
								</Typography>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											margin="dense"
											label="Meta Title (coming soon)"
											name="metaTitle"
											value={article.header}
											onChange={handleChange}
											variant="outlined"
											fullWidth
											size="small"
											disabled
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											margin="dense"
											label="Meta Description (max 160 characters)"
											name="description"
											value={article.description}
											onChange={handleChange}
											variant="outlined"
											fullWidth
											size="small"
											multiline
											rows={4}
											// focused
											InputProps={{
												sx: {
													backgroundColor: 'white', // Force input to stay white
												},
											}}
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											margin="dense"
											label="Meta Keywords"
											name="tags"
											value={article.tags}
											onChange={handleChange}
											variant="outlined"
											fullWidth
											size="small"
											multiline
											rows={4}
											// focused
										/>
									</Grid>
								</Grid>
							</Box>
						</Grid>

						<Grid item xs={12}>
							<Box
								sx={{
									border: '1px solid',
									borderColor: 'grey.400',
									borderRadius: '4px',
									paddingTop: 1,
									padding: 2,
									marginTop: 2,
									backgroundColor: 'primary.grey200',
								}}
							>
								<Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
									AUTHORS
								</Typography>
								<Grid container spacing={2}>
									<Grid item xs={4}>
										<Autocomplete
											options={authors}
											getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
											value={null}
											clearOnBlur
											inputValue=""
											onChange={(event, newValue) => handleChange(newValue, 'authors')}
											renderInput={(params) => (
												<TextField {...params} label="Author" variant="outlined" fullWidth />
											)}
											size="small"
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
														marginBottom: 1,
														backgroundColor: 'white',
														pl: 1,
														pr: 1,
													}}
												>
													{item?.firstName} {item?.lastName}{' '}
													<Divider orientation="vertical" flexItem /> {item?.email}{' '}
													<Divider orientation="vertical" flexItem /> {item?.role}{' '}
													<Divider orientation="vertical" flexItem />
													<IconButton
														onClick={() => {
															setArticle((prev) => ({
																...prev,
																authors: prev.authors.filter((author) => author._id !== item._id),
															}));
															setIsSaved(false);
														}}
													>
														<DeleteOutlineOutlinedIcon />
													</IconButton>
												</Box>
											))}
										</Grid>
									)}
								</Grid>
							</Box>
						</Grid>

						<Grid item xs={12}>
							<Box
								sx={{
									border: '1px solid',
									borderColor: 'grey.400',
									borderRadius: '4px',
									paddingTop: 1,
									padding: 2,
									marginTop: 2,
									backgroundColor: 'primary.grey200',
								}}
							>
								<Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
									CATEGORIES
								</Typography>
								<Grid container spacing={2}>
									<Grid item xs={6}>
										<Autocomplete
											margin="dense"
											options={regions}
											getOptionLabel={(option) => option.name}
											value={article.regions}
											onChange={(event, newValue) => handleChange(newValue, 'regions')}
											renderInput={(params) => (
												<TextField
													{...params}
													label="Region"
													// variant="outlined"
													fullWidth
													InputLabelProps={{
														sx: {
															color: 'grey.500',
														},
													}}
												/>
											)}
											multiple
											size="small"
										/>
									</Grid>

									<Grid item xs={6}>
										<Autocomplete
											margin="dense"
											options={otherCategories}
											getOptionLabel={(option) => option.name}
											value={article.otherCategories}
											onChange={(event, newValue) => handleChange(newValue, 'otherCategories')}
											renderInput={(params) => (
												<TextField
													{...params}
													label="Other"
													variant="outlined"
													fullWidth
													InputLabelProps={{
														sx: {
															color: 'grey.500',
														},
													}}
												/>
											)}
											multiple
											size="small"
										/>
									</Grid>

									<Grid item xs={6}>
										<Autocomplete
											margin="dense"
											options={countries}
											getOptionLabel={(option) => option.name}
											value={article.countries}
											onChange={(event, newValue) => handleChange(newValue, 'countries')}
											renderInput={(params) => (
												<TextField
													{...params}
													label="Countries"
													variant="outlined"
													fullWidth
													InputLabelProps={{
														sx: {
															color: 'grey.500',
														},
													}}
												/>
											)}
											multiple
											size="small"
										/>
									</Grid>
									<Grid item xs={6}>
										<Autocomplete
											margin="dense"
											options={countries}
											getOptionLabel={(option) => option.name}
											// value={article.countries}
											onChange={(event, newValue) => handleChange(newValue, 'countries')}
											renderInput={(params) => (
												<TextField
													{...params}
													label="Personalities (coming soon)"
													variant="outlined"
													fullWidth
													InputLabelProps={{
														sx: {
															color: 'grey.500',
														},
													}}
												/>
											)}
											multiple
											size="small"
											disabled
										/>
									</Grid>
								</Grid>
							</Box>
						</Grid>

						<Grid item xs={12}>
							<Box
								sx={{
									border: '1px solid',
									borderColor: 'grey.400',
									borderRadius: '4px',
									paddingTop: 1,
									padding: 2,
									marginTop: 2,
									backgroundColor: 'primary.grey200',
								}}
							>
								<Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
									MAIN CATEGORIES (previously old Subheader) (coming soon)
								</Typography>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											margin="dense"
											label="SubHeader"
											name="subHeader"
											value={article.subHeader}
											onChange={handleChange}
											variant="outlined"
											fullWidth
											size="small"
										/>
									</Grid>
								</Grid>
							</Box>
						</Grid>

						<Grid item xs={12}>
							<Box
								sx={{
									border: '1px solid',
									borderColor: 'grey.400',
									borderRadius: '4px',
									paddingTop: 1,
									padding: 2,
									marginTop: 2,
									backgroundColor: 'primary.grey200',
								}}
							>
								<Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
									TITLES
								</Typography>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											margin="dense"
											label="Title"
											name="header"
											value={article.header}
											onChange={handleChange}
											variant="outlined"
											fullWidth
											size="small"
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											margin="dense"
											label="Subtitle"
											name="supportingText"
											value={article.supportingText}
											onChange={handleChange}
											variant="outlined"
											fullWidth
											size="small"
										/>
									</Grid>
								</Grid>
							</Box>
						</Grid>

						<Grid item xs={12}>
							<Box
								sx={{
									border: '1px solid',
									borderColor: 'grey.400',
									borderRadius: '4px',
									paddingTop: 1,
									padding: 2,
									marginTop: 2,
									backgroundColor: 'primary.grey200',
								}}
							>
								<Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
									ARTICLE BODY
								</Typography>
								<Grid container spacing={2}>
									<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
										<Button onClick={handleShowEditor}>
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
								</Grid>
							</Box>
						</Grid>

						{/* <Grid item xs={12}>
							<TextField
								margin="dense"
								label="Source"
								name="source"
								value={article.source}
								onChange={handleChange}
								variant="outlined"
								fullWidth
								size="small"
							/>
						</Grid> */}
					</Grid>

					{/* <Grid container item md={2}></Grid> */}

					{/* Actions */}
					<Grid container item xs={12}>
						<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
							<Button
								onClick={handlePreview}
								// disabled={!isSaved || !article.dateTag || !article.header || !article.subHeader}
							>
								Preview Article
							</Button>
							<Button onClick={handleClose}>Close</Button>
							<Button
								variant="contained"
								color={!isSaved ? 'success' : 'primary'}
								type="submit"
								onClick={handleSubmit}
							>
								Save
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Container>

			{/* add article images */}
			<ImageModal
				articleId={id}
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

export default Article;
