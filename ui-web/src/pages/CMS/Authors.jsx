import React, { useState, useEffect } from 'react';
import Cropper from 'react-easy-crop';
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
	Input,
	Box,
} from '@mui/material';
// libraries
import moment from 'moment';
// api
import api from '../../api/axios';
// components
import Bar from '../../components/CMS/Bar';
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

	const [imageSrc, setImageSrc] = useState(null); // To store the image preview for cropping
	const [crop, setCrop] = useState({ x: 0, y: 0 }); // Initial crop values
	const [zoom, setZoom] = useState(1); // Zoom value
	const [croppedArea, setCroppedArea] = useState(null); // To capture the cropped area

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
		const { name, value, files } = event.target;
		console.log('handleChange:', name, value, files);
		let newValue = value;
		if (name === 'image') {
			newValue = files[0];
		}
		setFormData((prevState) => ({
			...prevState,
			[name]: newValue,
		}));

		if (name === 'image') {
			const reader = new FileReader();
			reader.onload = () => {
				setImageSrc(reader.result);
			};
			reader.readAsDataURL(files[0]);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const form = new FormData();
		Object.keys(formData).forEach((key) => form.append(key, formData[key]));

		// for (let [key, value] of formData.entries()) {
		// 	console.log('FormData', key, value);
		// }

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
			<Bar />
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
								<TableCell>Image</TableCell>
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
									<TableCell>
										<Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
											<Box
												sx={{
													display: 'flex',
													// alignItems: 'center',
													// flexDirection: 'row',
													// gap: '8px',
												}}
											>
												<img src={item.image?.url} alt="article" style={{ width: '200px' }} />
											</Box>
										</Box>
									</TableCell>
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
					<DialogContentText>Fill the required fields to add a new author.</DialogContentText>
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
					{/* <Grid item xs={12}> */}
					<Input type="file" name="image" onChange={handleChange} />
					{/* </Grid> */}
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

			{imageSrc && (
				<Box>
					<Cropper
						image={imageSrc}
						crop={crop}
						zoom={zoom}
						aspect={4 / 3} // You can change the aspect ratio if needed
						onCropChange={setCrop}
						onZoomChange={setZoom}
						onCropComplete={(croppedArea, croppedAreaPixels) => {
							setCroppedArea(croppedAreaPixels); // Store the cropped area
						}}
					/>
					<Box mt={2}>
						<TextField
							label="Zoom"
							type="range"
							value={zoom}
							min="1"
							max="3"
							step="0.1"
							onChange={(e) => setZoom(e.target.value)} // Allow user to zoom the image
						/>
					</Box>
				</Box>
			)}
		</>
	);
};

export default Authors;
