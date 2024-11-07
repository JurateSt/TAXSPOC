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
// modal
import EditImageModal from './EditImageModal';

const ImageModal = ({ authorId, open, setOpen, croppedImage, originalImage }) => {
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
		console.log('handleAddImage:', files[0]);
	};

	const handleEditImage = (event) => {
		setImageToCrop(originalImage);
		// reader.readAsDataURL(files[0]);
		setImage(originalImage);
		setOpenEdit(true);
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
							src={croppedImage}
							sx={{ width: 150, height: 150 }}
							// onClick={handleOpenAvatar}
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
						{/* <Button onClick={''}>Add Photo</Button> */}
						<Input type="file" name="image" onChange={handleAddImage} />
						<Button onClick={handleEditImage}>Edit Photo</Button>
						<Button onClick={''}>Delete Photo</Button>
					</Box>
				</DialogActions>
			</Dialog>

			<EditImageModal
				open={openEdit}
				setOpen={setOpenEdit}
				imageToCrop={imageToCrop}
				image={image}
				authorId={authorId}
			/>
		</>
	);
};

export default ImageModal;
