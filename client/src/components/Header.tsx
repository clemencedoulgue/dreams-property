import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const Header: React.FC = () => {
    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
                        Dreams Property
                    </Typography>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/add-property">
                        Add Property
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header; 