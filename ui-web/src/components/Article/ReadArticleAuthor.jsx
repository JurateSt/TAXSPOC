// React
import { useNavigate, useLocation } from 'react-router-dom';
// MUI
import { Typography, Grid, Box, Button, Chip, Avatar, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const ReadArticleAuthor = ({ article }) => {
	const navigate = useNavigate();

	const onClick = (category) => {
		const params = new URLSearchParams({
			type: category.type,
			category: category.name,
		});
		window.scrollTo(0, 0);
		// navigate(`/category/articles?${params.toString()}`);
		navigate(`/articles/category?${params}`);
	};

	return (
		<Box sx={{ marginTop: 4 }}>
			<Typography variant="h6" sx={{ marginBottom: 2 }}>
				About Authors:
			</Typography>
			{article?.authors?.map((author, index) => (
				<Box
					key={index}
					sx={{
						display: 'flex',
						alignItems: 'flex-start',
						padding: 2,
						backgroundColor: 'primary.grey200',
						marginBottom: 2,
					}}
				>
					{/* Avatar Section */}
					<Avatar
						src={author.image?.url}
						alt={`${author.firstName} ${author.lastName}`}
						sx={{
							width: 80,
							height: 80,
							marginRight: 2,
						}}
					/>
					{/* Author Details Section */}
					<Box sx={{ flex: 1 }}>
						<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
							{author.firstName} {author.lastName}
						</Typography>
						<Typography variant="body2" sx={{ color: 'gray', marginBottom: 1 }}>
							{author.role} | {author.company}
						</Typography>
						<Typography variant="body2" sx={{ marginBottom: 2 }}>
							{author.description}
						</Typography>
						{/* Social Links Section */}
						<Box sx={{ display: 'flex', gap: 1 }}>
							{author.email && (
								<IconButton
									component="a"
									href={`mailto:${author.email}`}
									aria-label="Email"
									sx={{
										border: '1px solid gray',
										borderRadius: '6px',
									}}
								>
									<EmailIcon />
								</IconButton>
							)}
							{author.linkedInUrl && (
								<IconButton
									component="a"
									href={author.linkedInUrl}
									aria-label="LinkedIn"
									sx={{
										border: '1px solid gray',
										borderRadius: '6px',
									}}
								>
									<LinkedInIcon />
								</IconButton>
							)}
						</Box>
					</Box>
				</Box>
			))}
		</Box>
	);
};

export default ReadArticleAuthor;
