import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box component="footer" sx={{ py: 3, bgcolor: 'primary.main', color: 'white', mt: 'auto' }}>
            <Container>
                <Typography variant="body2" align="center">
                    © {new Date().getFullYear()} Dreams Property. All rights reserved.
                </Typography>
                <Typography variant="body2" align="center">
                    <Link color="inherit" href="#" sx={{ mx: 1 }}>
                        Privacy Policy
                    </Link>
                    |
                    <Link color="inherit" href="#" sx={{ mx: 1 }}>
                        Terms of Service
                    </Link>
                    |
                    <Link color="inherit" href="#" sx={{ mx: 1 }}>
                        Contact Us
                    </Link>
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer; 