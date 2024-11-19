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
} from '@mui/material';
// modal
import ImageModal from './ImageModal';

const AuthorModal = ({ authorId, open, setOpen, setAuthors }) => {
	const [form, setForm] = useState({});
	// modal
	const [openImage, setOpenImage] = useState(false);

	const getAuthor = async () => {
		const { data } = await api.get(`/authors/${authorId}`);

		setForm({
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

	useEffect(() => {
		if (authorId) getAuthor();
	}, [authorId]);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await api.put(`/authors/${authorId}`, form);
			setForm((prev) => ({ ...prev, data }));

			setAuthors((prev) => {
				const index = prev.findIndex((item) => item._id === authorId);
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
				fullWidth={true}
				maxWidth="lg"
			>
				<DialogTitle>Add author</DialogTitle>
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
							alt="Author"
							src={`${form?.image?.url}?timestamp=${new Date().getTime()}`}
							sx={{ width: 150, height: 150, cursor: 'pointer' }}
							onClick={() => setOpenImage(true)}
						/>
					</Box>
					<TextField
						margin="dense"
						id="firstName"
						name="firstName"
						label="First Name"
						type="text"
						value={form.firstName || ''}
						fullWidth
						variant="outlined"
						onChange={handleChange}
						required
					/>
					<TextField
						margin="dense"
						id="lastName"
						name="lastName"
						label="Last Name"
						type="text"
						value={form.lastName || ''}
						fullWidth
						variant="outlined"
						onChange={handleChange}
					/>
					<TextField
						margin="dense"
						id="name"
						name="email"
						label="Email Address"
						type="email"
						value={form.email || ''}
						fullWidth
						variant="outlined"
						onChange={handleChange}
					/>
					<TextField
						margin="dense"
						id="role"
						name="role"
						label="Role"
						type="text"
						value={form.role || ''}
						fullWidth
						variant="outlined"
						onChange={handleChange}
					/>
					<TextField
						margin="dense"
						id="company"
						name="company"
						label="Company"
						type="text"
						value={form.company || ''}
						fullWidth
						variant="outlined"
						onChange={handleChange}
					/>
					<TextField
						margin="dense"
						id="phone"
						name="phone"
						label="Phone"
						type="text"
						value={form.phone || ''}
						fullWidth
						variant="outlined"
						onChange={handleChange}
					/>
					<TextField
						margin="dense"
						id="linkedInUrl"
						name="linkedInUrl"
						label="LinkedIn"
						type="text"
						value={form.linkedInUrl || ''}
						fullWidth
						variant="outlined"
						onChange={handleChange}
					/>
					<TextField
						margin="dense"
						id="twitterUrl"
						name="twitterUrl"
						label="Twitter"
						type="text"
						value={form.twitterUrl || ''}
						fullWidth
						variant="outlined"
						onChange={handleChange}
					/>
					<TextField
						margin="dense"
						id="description"
						name="description"
						label="About author"
						value={form.description || ''}
						multiline
						minRows={4}
						type="text"
						fullWidth
						variant="outlined"
						onChange={handleChange}
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
			<ImageModal
				authorId={authorId}
				open={openImage}
				setOpen={setOpenImage}
				croppedImage={form.image}
				originalImage={form.image?.originalUrl}
				author={form}
				setAuthor={setForm}
			/>
		</>
	);
};

export default AuthorModal;
