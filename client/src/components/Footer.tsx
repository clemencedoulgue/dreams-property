import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer: React.FC = () => {
    return (
        <Box component="footer" className="bg-gray-100 py-6 mt-auto">
            <div className="container mx-auto px-4">
                <Typography variant="body2" color="textSecondary" align="center">
                    {'© '}
                    <Link color="inherit" href="/">
                        Dreams Property
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </div>
        </Box>
    );
};

export default Footer; 