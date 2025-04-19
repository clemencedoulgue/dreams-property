import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, InputAdornment, Container, Box, CircularProgress, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropertyCard from '../components/PropertyCard';
import { mockProperties } from '../mockData';
import { propertyApi } from '../utils/api';
import { Property } from '../types';

const HomePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [useLocalData, setUseLocalData] = useState(false);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                const data = await propertyApi.getAllProperties();
                setProperties(data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch properties from API', err);
                setError('Failed to load properties from server. Using local data instead.');
                setProperties(mockProperties);
                setUseLocalData(true);
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const filteredProperties = properties.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container>
            <Box className="mb-8">
                <Typography variant="h4" component="h1" className="mb-6 font-bold">
                    Find Your Dream Property
                </Typography>

                {useLocalData && (
                    <Alert severity="info" className="mb-4">
                        Currently displaying demo data. Connect to the backend to see real data.
                    </Alert>
                )}

                {error && !useLocalData && (
                    <Alert severity="error" className="mb-4">
                        {error}
                    </Alert>
                )}

                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by property name or location"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    className="mb-6"
                />
            </Box>

            {loading ? (
                <Box className="flex justify-center my-12">
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={4}>
                    {filteredProperties.length > 0 ? (
                        filteredProperties.map((property) => (
                            <Grid item xs={12} sm={6} md={4} key={property.id} className="mb-4">
                                <PropertyCard property={property} />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Typography variant="h6" className="text-center my-8 text-gray-500">
                                No properties match your search criteria.
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            )}
        </Container>
    );
};

export default HomePage; 