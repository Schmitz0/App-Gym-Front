import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import style from './Loading.module.css';

const primaryColor = '#0d0d6b';

const Loading = () => {
	return (
		<Box className={style.loadingContainer}>
			<CircularProgress
				sx={{
					color: primaryColor,
					minWidth: '100px',
					minHeight: '100px',
				}}
			/>
		</Box>
	);
};

export default Loading;
