import React, { useState } from 'react';
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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// api
import api from '../../../api/axios';
// modal
import EditImageModal from './EditImageModal';

const ImageModal = ({
	authorId,
	author,
	setAuthor,
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

	const handleClose = () => {
		setOpen(false);
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

	// const handleEditImage = async (event) => {
	// 	// const response = await fetch(originalImage); // Fetch the image from the URL
	// 	// const blob = await response.blob(); // Convert it to a Blob

	// 	// const reader = new FileReader();
	// 	// reader.onload = () => {
	// 	// 	setImageToCrop(reader.result); // Use base64 Data URL for cropping
	// 	// };
	// 	// reader.readAsDataURL(blob);

	// 	// setImage(blob);
	// 	setImageToCrop(originalImage);
	// 	// // reader.readAsDataURL(files[0]);
	// 	// setImage(originalImage);
	// 	setOpenEdit(true);
	// };

	const handleDeleteImage = async () => {
		if (!window.confirm('Are you sure you want to delete the image?')) {
			return;
		}
		try {
			const { data } = await api.put(`/authors/${authorId}`, {
				action: 'delete-image',
			});
			setAuthor((prev) => ({ ...prev, data }));
			alert('Image deleted successfully');
			setOpen(false);
		} catch (error) {
			console.error('Error deleting the image:', error);
			alert('Failed to delete the image');
		}
	};

	return (
		<>
			<Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
				<DialogTitle>Photo</DialogTitle>
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
					<Box
						sx={{
							width: '100%',
							backgroundColor: 'lightgray',
							height: '200px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Avatar
							alt="Author image"
							src={`${author?.image?.url}?timestamp=${new Date().getTime()}`}
							sx={{ width: 150, height: 150 }}
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
						<Input type="file" name="image" onChange={handleAddImage} />
						{/* <Button onClick={handleEditImage}>Edit Photo</Button> */}
						<Button onClick={handleDeleteImage}>Delete Photo</Button>
					</Box>
				</DialogActions>
			</Dialog>

			<EditImageModal
				open={openEdit}
				setOpen={setOpenEdit}
				imageToCrop={imageToCrop}
				image={image}
				authorId={authorId}
				author={author}
				setAuthor={setAuthor}
			/>
		</>
	);
};

export default ImageModal;
