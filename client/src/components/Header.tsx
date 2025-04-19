import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';

const Header: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" className="text-white flex items-center">
                        <HomeIcon sx={{ mr: 1 }} />
                        Dreams Property
                    </Link>
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/add-property">
                        Add Property
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header; 