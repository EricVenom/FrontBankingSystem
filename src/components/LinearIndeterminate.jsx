import * as React from 'react';
import Box from '@mui/material/Box';

import CircularProgress from '@mui/material/CircularProgress';

export default function LinearIndeterminate() {
    return (
        <Box
            component="section"
            sx={{ p: 2, width: '100%', height: '100%' }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor='rgb(50,50,50,.5)'
            position='absolute'
            left='0'
            top='0'
        >
            <CircularProgress />
        </Box>
    );
}