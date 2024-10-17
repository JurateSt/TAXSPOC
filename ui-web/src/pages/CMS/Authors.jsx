import React, { useState, useEffect } from 'react';
// MUI
import {
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableSortLabel,
	TableBody,
	Paper,
	IconButton,
} from '@mui/material';
// libraries
import moment from 'moment';
// api
import api from '../../api/axios';
// components
import MainBar from '../../components/CMS/MainBar';
const Authors = () => {
	const [open, setOpen] = useState(false);
	const [authors, setAuthors] = useState([]);

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		role: '',
		company: '',
		phone: '',
		linkedin: '',
		description: '',
	});

	// sorting
	const [order, setOrder] = useState('desc');
	const [orderBy, setOrderBy] = useState('dateTag');

	const getAuthors = async () => {
		const { data } = await api.get('/authors');

		setAuthors(data);
	};

	console.log('Authors:', authors);

	useEffect(() => {
		getAuthors();
	}, []);

	const handleAddAuthor = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const form = new FormData();
		Object.keys(formData).forEach((key) => form.append(key, formData[key]));

		try {
			// Post form data to API endpoint
			const { data } = await api.post('/authors', form, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			alert('Author created');
			console.log('Author created:', data);
			setAuthors((prevState) => [...prevState, data]);
		} catch (error) {
			console.error('Error creating author:', error);
			alert('Error creating author', error);
		} finally {
			handleClose();
		}
	};

	const handleRequestSort = () => {
		const newOrder = order === 'asc' ? 'desc' : 'asc';

		const sortedAuthors = [...authors].sort((a, b) => {
			const comparison = new Date(a.createdAt) - new Date(b.createdAt);
			return newOrder === 'asc' ? comparison : -comparison;
		});

		setAuthors(sortedAuthors);
		setOrder(newOrder);
		setOrderBy('dateTag');
	};

	return (
		<>
			<MainBar />
			<Container sx={{ mt: 2 }}>
				<Button variant="contained" onClick={handleAddAuthor}>
					Add author
				</Button>

				<TableContainer component={Paper} sx={{ mt: 4 }}>
					<Table size="small" sx={{ tableLayout: 'fixed' }}>
						<TableHead>
							<TableRow>
								<TableCell>
									<TableSortLabel active={true} direction={order} onClick={handleRequestSort}>
										Created
									</TableSortLabel>
								</TableCell>
								<TableCell>First Name</TableCell>
								<TableCell>Last Name</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Role</TableCell>
								<TableCell>Company</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{authors.map((item) => (
								<TableRow key={item._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component="th" scope="row">
										{moment(item.createdAt).format('YYYY-MM-DD')}
									</TableCell>
									<TableCell>{item.firstName}</TableCell>
									<TableCell>{item.lastName}</TableCell>
									<TableCell>{item.email}</TableCell>
									<TableCell>{item.role}</TableCell>
									<TableCell>{item.company}</TableCell>
									{/* <TableCell>
										{item.categories
											.filter((item) => item.type === 'region')
											.map((item) => item.name)
											.join(', ')}
									</TableCell>
									<TableCell>
										{item.categories
											.filter((item) => item.type === 'country')
											.map((item) => item.name)
											.join(', ')}
									</TableCell>
									<TableCell>
										{item.categories
											.filter((item) => item.type === 'other')
											.map((item) => item.name)
											.join(', ')}
									</TableCell>
									<TableCell>
										<IconButton onClick={() => handleEdit(item._id)}>
											<EditOutlinedIcon />
										</IconButton>
									</TableCell>
									<TableCell>
										<IconButton onClick={() => handleDelete(item._id)}>
											<DeleteOutlineOutlinedIcon />
										</IconButton>
									</TableCell>*/}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>

			<Dialog
				open={open}
				// onClose={handleClose}
				PaperProps={{
					component: 'form',
					// onSubmit: (event) => {
					// 	event.preventDefault();
					// 	const formData = new FormData(event.currentTarget);
					// 	const formJson = Object.fromEntries(formData.entries());
					// 	const email = formJson.email;
					// 	console.log(email);
					// 	handleClose();
					// },
				}}
			>
				<DialogTitle>Add author</DialogTitle>
				<DialogContent>
					<DialogContentText>Fill all the fields to add a new author.</DialogContentText>
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
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default Authors;
