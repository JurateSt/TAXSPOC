import React, { useState } from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Box,
	IconButton,
	Button,
	Slider,
	Grid,
	TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Cropper from 'react-easy-crop';
// api
import api from '../../../api/axios';
// helpers
import cropImage from '../../../utils/cropImage';
import { ar } from 'date-fns/locale';

const EditImageModal = ({ open, setOpen, image, imageToCrop, articleId, article, setArticle }) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [rotation, setRotation] = useState(0);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

	const onCropComplete = (croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log('NAME:', name, 'VALUE:', value, article);
		setArticle((prev) => ({ ...prev, images: [{ ...prev.images[0], [name]: value }] }));
	};

	console.log('ARTICLE', article);

	const handleSaveCroppedImage = async () => {
		try {
			const croppedImageBlob = await cropImage(imageToCrop, croppedAreaPixels, rotation);
			let randomSix = Math.floor(100000 + Math.random() * 900000);
			const croppedFile = new File([croppedImageBlob], `${articleId}-${randomSix}.jpg`, {
				type: 'image/jpeg',
			});
			randomSix = Math.floor(100000 + Math.random() * 900000);
			const originalFile = new File([image], `${articleId}-${randomSix}.jpg`, {
				type: 'image/jpeg',
			});

			const formData = new FormData();
			formData.append('croppedImage', croppedFile);
			formData.append('originalImage', originalFile);
			formData.append('alt', article?.images[0]?.alt);
			formData.append('caption', article?.images[0]?.caption);
			formData.append('caption_html', article?.images[0]?.caption_html);
			formData.append('link_original', article?.images[0]?.link_original);
			formData.append('action', 'update-image');

			const { data } = await api.put(`/articles/${articleId}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			console.log('CLOSE MODAL', article, data);
			setArticle((prev) => ({ images: data.images, ...prev }));
			setOpen(false);
		} catch (error) {
			console.error('Error saving the cropped image:', error);
			alert('Failed to save the image');
		}
	};

	return (
		<Dialog open={open} onClose={() => setOpen(false)} fullWidth={true} maxWidth="md">
			<DialogTitle>Image</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={() => setOpen(false)}
				sx={(theme) => ({
					position: 'absolute',
					right: 8,
					top: 8,
					color: theme.palette.grey[500],
				})}
			>
				<CloseIcon />
			</IconButton>
			<DialogContent
				sx={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{/* <DialogContentText>Fill the required fields to add a new author.</DialogContentText> */}
				<Grid container spacing={2}>
					<Grid item xs={8}>
						<Box
							sx={{
								position: 'relative',
								width: '100%',
								height: '300px',
								// border: '1px solid red',
							}}
						>
							<Cropper
								image={imageToCrop}
								crop={crop}
								zoom={zoom}
								rotation={rotation}
								aspect={16 / 9}
								cropShape="rect"
								showGrid={true}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropComplete={onCropComplete}
							/>
						</Box>
					</Grid>
					<Grid item xs={4}>
						<Box>
							Zoom:
							<Slider
								value={zoom}
								min={1}
								max={10}
								step={0.5}
								shiftStep={0.5}
								marks
								aria-labelledby="Zoom"
								onChange={(e, zoom) => setZoom(zoom)}
							/>
						</Box>
						<Box mt={2}>
							Rotate:
							<Slider
								value={rotation}
								min={0}
								max={360}
								step={1}
								aria-labelledby="Zoom"
								onChange={(e, rotation) => setRotation(rotation)}
							/>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<TextField
							margin="dense"
							label="Alternative description"
							name="alt"
							// value={article.supportingText}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							margin="dense"
							label="Image credits"
							name="caption"
							// value={article.supportingText}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							margin="dense"
							label="Image credits HTML"
							name="caption_html"
							// value={article.supportingText}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							margin="dense"
							label="Original image source"
							name="link_original"
							// value={article.supportingText}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 8,
						width: '100%',
					}}
				>
					<Button onClick={handleSaveCroppedImage}>Save Photo</Button>
				</Box>
			</DialogActions>
		</Dialog>
	);
};

export default EditImageModal;
