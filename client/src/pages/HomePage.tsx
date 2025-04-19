import React, { useState, useEffect } from 'react';
import { Typography, Grid, Container, Box, CircularProgress } from '@mui/material';
import { propertyApi } from '../utils/api';
import PropertyCard from '../components/PropertyCard';
import { Property } from '../types';

const HomePage: React.FC = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                const data = await propertyApi.getAllProperties();
                setProperties(data);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch properties:', err);
                setError('Failed to load properties. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Find Your Dream Property
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" paragraph>
                    Browse our selection of premium properties available for sale and rent
                </Typography>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <Grid container spacing={4} sx={{ mt: 2 }}>
                        {properties.length > 0 ? (
                            properties.map((property) => (
                                <Grid item key={property.id} xs={12} sm={6} md={4}>
                                    <PropertyCard property={property} />
                                </Grid>
                            ))
                        ) : (
                            <Grid item xs={12}>
                                <Typography align="center">No properties found.</Typography>
                            </Grid>
                        )}
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default HomePage; 