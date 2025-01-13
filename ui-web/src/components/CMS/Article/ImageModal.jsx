import React, { useState } from 'react';
// api
import api from '../../../api/axios';
// MUI
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Box,
	Avatar,
	IconButton,
	Button,
	Input,
	Grid,
	TextField,
} from '@mui/material';
import { styled } from '@mui/system';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloseIcon from '@mui/icons-material/Close';

// modal
import EditImageModal from './EditImageModal';
import { se } from 'date-fns/locale';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

const ImageModal = ({
	articleId,
	article,
	setArticle,
	open,
	setOpen,
	croppedImage,
	originalImage,
}) => {
	// original image
	const [image, setImage] = useState(null);
	// image preview for cropping
	const [imageToCrop, setImageToCrop] = useState(null);
	//modal
	const [openEdit, setOpenEdit] = useState(false);
	// form state
	const [isSaved, setIsSaved] = useState(true);

	const handleClose = () => {
		if (isSaved) {
			setOpen(false);
		} else {
			if (window.confirm('Are you sure you want to close without saving?')) {
				setOpen(false);
				setIsSaved(true);
			}
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setArticle((prev) => ({
			...prev,
			images: prev.images.map((item, index) => (index === 0 ? { ...item, [name]: value } : item)),
		}));
		setIsSaved(false);
	};
	const handleSubmit = async () => {
		const { data } = await api.put(`/articles/${articleId}`, article);
		setArticle((prev) => ({ ...prev, images: data.images }));
		setIsSaved(true);
		setOpen(false);
		alert('Image saved successfully');
	};

	const handleAddImage = (event) => {
		const { files } = event.target;
		const reader = new FileReader();
		reader.onload = () => {
			setImageToCrop(reader.result);
		};
		reader.readAsDataURL(files[0]);
		setImage(files[0]);
		setOpenEdit(true);
	};

	const handleDeleteImage = async () => {
		if (!window.confirm('Are you sure you want to delete the image and all it`s properties?')) {
			return;
		}
		try {
			const { data } = await api.put(`/articles/${articleId}`, {
				action: 'delete-image',
			});
			setArticle((prev) => ({ ...prev, images: data.images }));
			alert('Image deleted successfully');
			setOpen(false);
		} catch (error) {
			console.error('Error deleting the image:', error);
			alert('Failed to delete the image');
		}
	};

	return (
		<>
			<Dialog
				open={open}
				onClose={(event, reason) => {
					if (reason === 'backdropClick') {
						return;
					}
					handleClose();
				}}
				fullWidth={true}
				maxWidth="md"
			>
				<DialogTitle>Add Image</DialogTitle>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={(theme) => ({
						position: 'absolute',
						right: 8,
						top: 8,
						color: theme.palette.grey[500],
					})}
				>
					<CloseIcon />
				</IconButton>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Box
								sx={{
									width: '100%',
									backgroundColor: 'primary.grey200',
									aspectRatio: '16/9',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<img
									alt={article?.header}
									src={`${croppedImage}?timestamp=${new Date().getTime()}`}
									style={{
										width: '100%',
										height: '100%',
										aspectRatio: '16/9',
										objectFit: 'cover',
									}}
									title="Click to edit the image"
								/>
							</Box>
						</Grid>
						<Grid container item xs={6}>
							<Grid item xs={12}>
								<TextField
									margin="dense"
									label="Image Caption"
									name="caption"
									value={article?.images?.[0]?.caption}
									onChange={handleChange}
									variant="outlined"
									multiline
									rows={4}
									fullWidth
									size="small"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									margin="dense"
									label="Image ALT Text"
									name="alt"
									value={article?.images?.[0]?.alt}
									onChange={handleChange}
									variant="outlined"
									multiline
									rows={4}
									fullWidth
									size="small"
								/>
							</Grid>
						</Grid>

						<Grid item xs={12}>
							<TextField
								margin="dense"
								label="Original Image Source"
								name="linkOriginal"
								value={article?.images?.[0]?.linkOriginal}
								onChange={handleChange}
								variant="outlined"
								multiline
								rows={2}
								fullWidth
								size="small"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								margin="dense"
								label="Caption HTML Text"
								name="captionHtml"
								value={article?.images?.[0]?.captionHtml}
								onChange={handleChange}
								multiline
								rows={2}
								variant="outlined"
								fullWidth
								size="small"
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Grid container>
						<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
							<Button
								component="label"
								// role={undefined}
								// variant="contained"
								tabIndex={-1}
								startIcon={<CloudUploadOutlinedIcon />}
							>
								Upload Image
								<VisuallyHiddenInput type="file" onChange={handleAddImage} />
							</Button>
							<Button onClick={handleDeleteImage} color="error">
								Delete Photo
							</Button>
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
					{/* <Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							gap: 8,
							width: '100%',
						}}
					>
						<Button
							component="label"
							// role={undefined}
							// variant="contained"
							tabIndex={-1}
							startIcon={<CloudUploadOutlinedIcon />}
						>
							Upload Image
							<VisuallyHiddenInput type="file" onChange={handleAddImage} multiple />
						</Button>
						<Button onClick={handleDeleteImage}>Delete Photo</Button>
					</Box> */}
				</DialogActions>
			</Dialog>

			<EditImageModal
				open={openEdit}
				setOpen={setOpenEdit}
				imageToCrop={imageToCrop}
				image={image}
				articleId={articleId}
				article={article}
				setArticle={setArticle}
			/>
		</>
	);
};

export default ImageModal;
