import axios from 'axios';
//import process from 'process'; // Add this line

const backendUrl = 'http://localhost:3333'; //process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
	baseURL: `${backendUrl}/api`,
	responseType: 'json',
	//timeout: 1000,
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	},
});

export default api;
