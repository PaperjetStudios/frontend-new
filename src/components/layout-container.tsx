import React from 'react';
import Box from '@mui/material/Box';

type Props = {
	children: React.ReactNode;
};

export const LayoutContainer: React.FC<Props> = ({ children }) => {
	return (
		<Box
			className='site-cont'
			sx={{
				px: {
					xs: 2,
					sm: 5,
					md: 6,
					lg: 8,
					xl: 4,
				},
				width: '100%',
				maxWidth: 1400,
				m: 'auto',
			}}>
			{children}
		</Box>
	);
};

export default LayoutContainer;
