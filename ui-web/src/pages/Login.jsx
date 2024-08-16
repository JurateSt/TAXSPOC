// MUI
import { Grid, Button } from '@mui/material';
// api
import api from '../api/axios';

const Login = () => {
	const handleClick = async () => {
		console.log('LOGIN');
		const { data } = await api.get('/cms/auth/google/redirect');
		console.log('Clicked!', data);
		window.location.href = data.url;
	};
	return (
		<Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
			<Button onClick={handleClick}>Login</Button>
		</Grid>
	);
};

export default Login;
