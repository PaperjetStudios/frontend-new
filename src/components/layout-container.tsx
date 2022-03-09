import React from 'react';
import Box from '@mui/material/Box';

export const LayoutContainer = ({ children }) => {
	return (
		<Box
			className='full-thingy'
			sx={{
				maxWidth: 1600,
				m: 'auto',
			}}>
			{children}
		</Box>
	);
};

export default LayoutContainer;
