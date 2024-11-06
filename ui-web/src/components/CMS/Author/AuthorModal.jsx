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
import CloseIcon from '@mui/icons-material/Close';
const AuthorModal = ({ authorId, open, setOpen, handleOpenAvatar }) => {
	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		email: '',
		role: '',
		company: '',
		phone: '',
		linkedin: '',
		description: '',
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		console.log('handleChange:', name, value, authorId);

		setForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log('form:', form);
		// return;
		try {
			const { data } = await api.put(`/authors/${authorId}`, form);
			alert('Author Updated');
			console.log('Author Updated:', data);
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
		<Dialog
			open={open}
			onClose={(event, reason) => {
				if (reason !== 'backdropClick') {
					handleClose(event);
				}
			}}
			PaperProps={{
				component: 'form',
			}}
			fullWidth={true}
			maxWidth="lg"
		>
			<DialogTitle>Add author</DialogTitle>
			<DialogContent>
				<DialogContentText>Fill the required fields to add a new author.</DialogContentText>
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
						src=""
						sx={{ width: 150, height: 150, cursor: 'pointer' }}
						onClick={handleOpenAvatar}
					/>
				</Box>
				<TextField
					autoFocus
					margin="dense"
					id="firstName"
					name="firstName"
					label="First Name"
					type="text"
					fullWidth
					variant="outlined"
					onChange={handleChange}
					required
				/>
				<TextField
					autoFocus
					margin="dense"
					id="lastName"
					name="lastName"
					label="Last Name"
					type="text"
					fullWidth
					variant="outlined"
					onChange={handleChange}
				/>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					name="email"
					label="Email Address"
					type="email"
					fullWidth
					variant="outlined"
					onChange={handleChange}
				/>
				<TextField
					autoFocus
					margin="dense"
					id="role"
					name="role"
					label="Role"
					type="text"
					fullWidth
					variant="outlined"
					onChange={handleChange}
				/>
				<TextField
					autoFocus
					margin="dense"
					id="company"
					name="company"
					label="Company"
					type="text"
					fullWidth
					variant="outlined"
					onChange={handleChange}
				/>
				<TextField
					autoFocus
					margin="dense"
					id="phone"
					name="phone"
					label="Phone"
					type="text"
					fullWidth
					variant="outlined"
				/>
				<TextField
					autoFocus
					margin="dense"
					id="linkedInUrl"
					name="linkedInUrl"
					label="LinkedIn"
					type="text"
					fullWidth
					variant="outlined"
					onChange={handleChange}
				/>
				<TextField
					autoFocus
					margin="dense"
					id="twitterUrl"
					name="twitterUrl"
					label="Twitter"
					type="text"
					fullWidth
					variant="outlined"
					onChange={handleChange}
				/>
				<TextField
					autoFocus
					margin="dense"
					id="description"
					name="description"
					label="About author"
					multiline
					minRows={4}
					type="text"
					fullWidth
					variant="outlined"
					onChange={handleChange}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button type="submit" onClick={handleSubmit}>
					Update
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AuthorModal;
