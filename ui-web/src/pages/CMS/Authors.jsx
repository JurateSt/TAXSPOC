import React, { useState, useEffect } from 'react';
// MUI
import {
	Button,
	Container,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableSortLabel,
	TableBody,
	Paper,
	IconButton,
	Box,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// libraries
import moment from 'moment';
// api
import api from '../../api/axios';
// components
import Bar from '../../components/CMS/Bar';
import AuthorModal from '../../components/CMS/Author/AuthorModal';

const Authors = () => {
	const [open, setOpen] = useState(false);
	const [authorId, setAuthorId] = useState(null);

	const [authors, setAuthors] = useState([]);

	// sorting
	const [order, setOrder] = useState('desc');
	const [orderBy, setOrderBy] = useState('dateTag');

	const getAuthors = async () => {
		const { data } = await api.get('/authors');

		setAuthors(data);
	};

	useEffect(() => {
		getAuthors();
	}, []);

	const handleAddAuthor = async (event) => {
		event.preventDefault();
		const initialData = {
			firstName: '',
			lastName: '',
			email: '',
			role: '',
			company: '',
			phone: '',
			linkedin: '',
			description: '',
			image: {},
		};

		try {
			const { data } = await api.post('/authors', initialData);
			setAuthorId(data._id);
			setAuthors((prev) => [data, ...prev]);
		} catch (error) {
			console.error('Error creating author:', error);
			alert('Error creating author', error);
		} finally {
			setOpen(true);
		}
	};

	const handleEdit = (id) => {
		setAuthorId(id);
		setOpen(true);
	};

	const handleDelete = async (id) => {
		if (!window.confirm('Are you sure you want to delete the author?')) {
			return;
		}
		try {
			await api.delete(`/authors/${id}`);
			setAuthors((prev) => prev.filter((item) => item._id !== id));
		} catch (error) {
			console.error('Error deleting the author:', error);
			alert('Error deleting the author', error);
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
								<TableCell></TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{authors?.map((item) => (
								<TableRow key={item._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component="th" scope="row">
										{moment(item.createdAt).format('YYYY-MM-DD HH:mm')}
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
												}}
											>
												<img
													src={`${item?.image?.url}?timestamp=${new Date().getTime()}`}
													alt="article"
													style={{ width: '100px' }}
												/>
											</Box>
										</Box>
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
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>

			{/* Author content */}
			<AuthorModal authorId={authorId} open={open} setOpen={setOpen} setAuthors={setAuthors} />
		</>
	);
};

export default Authors;
