import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

import Button from '@mui/material/Button';
const Title = () => {
	  const navigate = useNavigate();

	  const handleClick = () => {
		navigate('/home');
	  }

	  return (
	<Button variant="contained" onClick={handleClick}>Let's start</Button>
  );
};

export default Title;
