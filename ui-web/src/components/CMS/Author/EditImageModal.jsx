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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Cropper from 'react-easy-crop';
// api
import api from '../../../api/axios';
// helpers
import cropImage from '../../../utils/cropImage';

const EditImageModal = ({ open, setOpen, image, imageToCrop, authorId, author, setAuthor }) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [rotation, setRotation] = useState(0);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

	const onCropComplete = (croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};

	const handleSaveCroppedImage = async () => {
		try {
			const croppedImageBlob = await cropImage(imageToCrop, croppedAreaPixels, rotation);
			const croppedFile = new File([croppedImageBlob], `${authorId}-cropped.jpg`, {
				type: 'image/jpeg',
			});
			const originalFile = new File([image], `${authorId}-original.jpg`, { type: 'image/jpeg' });

			const formData = new FormData();
			formData.append('croppedImage', croppedFile);
			formData.append('originalImage', originalFile);
			formData.append('action', 'update-image');

			const { data } = await api.put(`/authors/${authorId}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			setAuthor((prev) => ({ ...prev, ...data }));
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
				<Box sx={{ position: 'relative', width: '100%', height: '400px' }}>
					<Cropper
						image={imageToCrop}
						crop={crop}
						zoom={zoom}
						rotation={rotation}
						aspect={1}
						cropShape="round"
						showGrid={true}
						onCropChange={setCrop}
						onZoomChange={setZoom}
						onCropComplete={onCropComplete}
					/>
				</Box>
				<Box mt={2}>
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
					<Slider
						value={rotation}
						min={0}
						max={360}
						step={1}
						aria-labelledby="Zoom"
						onChange={(e, rotation) => setRotation(rotation)}
					/>
				</Box>
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
