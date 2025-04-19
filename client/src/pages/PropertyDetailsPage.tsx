import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Grid,
    Paper,
    Chip,
    Divider,
    Button,
    CircularProgress,
    Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { mockProperties } from '../mockData';
import { propertyApi } from '../utils/api';
import { Property } from '../types';

const PropertyDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [useLocalData, setUseLocalData] = useState(false);

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const data = await propertyApi.getPropertyById(Number(id));
                setProperty(data);
            } catch (err) {
                console.error(`Failed to fetch property ${id}:`, err);
                setError('Failed to load property details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyDetails();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !property) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h6" color="error">
                    {error || 'Property not found'}
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate('/')}
                    sx={{ mt: 2 }}
                >
                    Back to listings
                </Button>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4, mb: 8 }}>
            <Button
                variant="outlined"
                onClick={() => navigate('/')}
                sx={{ mb: 4 }}
            >
                Back to listings
            </Button>

            <Paper elevation={3} sx={{ overflow: 'hidden' }}>
                {property.imageUrl && (
                    <Box
                        sx={{
                            height: 400,
                            backgroundImage: `url(${property.imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                )}

                <Box sx={{ p: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        {property.title}
                    </Typography>

                    <Typography
                        variant="h5"
                        color="primary"
                        gutterBottom
                        sx={{ fontWeight: 'bold' }}
                    >
                        ${property.price.toLocaleString()}
                    </Typography>

                    <Typography variant="subtitle1" sx={{ mb: 3 }}>
                        {property.location}
                    </Typography>

                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="text.secondary">
                                Bedrooms
                            </Typography>
                            <Typography variant="h6">
                                {property.bedrooms}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="text.secondary">
                                Bathrooms
                            </Typography>
                            <Typography variant="h6">
                                {property.bathrooms}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="text.secondary">
                                Area
                            </Typography>
                            <Typography variant="h6">
                                {property.area} sq ft
                            </Typography>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom>
                        Description
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {property.description}
                    </Typography>

                    {property.amenities && property.amenities.length > 0 && (
                        <>
                            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                                Amenities
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                                {Array.isArray(property.amenities) ? (
                                    property.amenities.map((amenity, index) => (
                                        <Chip key={index} label={amenity} />
                                    ))
                                ) : (
                                    <Typography>{property.amenities}</Typography>
                                )}
                            </Box>
                        </>
                    )}

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" gutterBottom>
                        Contact Information
                    </Typography>
                    <Typography variant="body1">
                        Email: {property.contactEmail}
                    </Typography>
                    {property.contactPhone && (
                        <Typography variant="body1">
                            Phone: {property.contactPhone}
                        </Typography>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default PropertyDetailsPage; 