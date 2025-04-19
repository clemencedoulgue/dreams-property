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
    Card,
    CardContent,
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [useLocalData, setUseLocalData] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const data = await propertyApi.getPropertyById(Number(id));
                setProperty(data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch property from API', err);

                // Fall back to mock data
                const mockProperty = mockProperties.find(p => p.id === Number(id));
                if (mockProperty) {
                    setProperty(mockProperty);
                    setError('Failed to load from server. Using demo data instead.');
                    setUseLocalData(true);
                } else {
                    setError('Property not found');
                }
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    if (loading) {
        return (
            <Container className="py-8 flex justify-center">
                <CircularProgress />
            </Container>
        );
    }

    if (error && !property) {
        return (
            <Container className="py-8 text-center">
                <Alert severity="error" className="mb-4">
                    {error}
                </Alert>
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/')}
                >
                    Back to Home
                </Button>
            </Container>
        );
    }

    if (!property) {
        return (
            <Container className="py-8 text-center">
                <Typography variant="h5" className="mb-4">
                    Property not found
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/')}
                >
                    Back to Home
                </Button>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            {useLocalData && (
                <Alert severity="info" className="mb-4">
                    Currently displaying demo data. Connect to the backend to see real data.
                </Alert>
            )}

            <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/')}
                className="mb-4"
            >
                Back to Listings
            </Button>

            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <img
                        src={property.imageUrl || 'https://via.placeholder.com/800x500'}
                        alt={property.title}
                        className="w-full h-96 object-cover rounded-lg shadow-md mb-4"
                    />

                    <Typography variant="h4" component="h1" className="font-bold mt-4 mb-2">
                        {property.title}
                    </Typography>

                    <Typography variant="body1" className="flex items-center mb-4 text-gray-600">
                        <LocationOnIcon className="mr-1" />
                        {property.location}
                    </Typography>

                    <Typography variant="h5" color="primary" className="font-bold mb-6">
                        ${property.price.toLocaleString()}
                    </Typography>

                    <Box className="flex flex-wrap gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <HomeIcon className="mr-2 text-gray-600" />
                            <div>
                                <Typography variant="body2" color="textSecondary">Bedrooms</Typography>
                                <Typography variant="body1" className="font-medium">{property.bedrooms}</Typography>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <BathtubIcon className="mr-2 text-gray-600" />
                            <div>
                                <Typography variant="body2" color="textSecondary">Bathrooms</Typography>
                                <Typography variant="body1" className="font-medium">{property.bathrooms}</Typography>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <SquareFootIcon className="mr-2 text-gray-600" />
                            <div>
                                <Typography variant="body2" color="textSecondary">Area</Typography>
                                <Typography variant="body1" className="font-medium">{property.area} sqft</Typography>
                            </div>
                        </div>
                    </Box>

                    <Typography variant="h6" gutterBottom className="font-bold mt-6">
                        Description
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {property.description}
                    </Typography>

                    <Typography variant="h6" gutterBottom className="font-bold mt-6">
                        Amenities
                    </Typography>
                    <Box className="flex flex-wrap gap-2 mb-6">
                        {property.amenities.map((amenity, index) => (
                            <Chip key={index} label={amenity} className="mb-2" />
                        ))}
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card className="sticky top-4 shadow-md">
                        <CardContent>
                            <Typography variant="h6" gutterBottom className="font-bold">
                                Contact Information
                            </Typography>
                            <Divider className="mb-4" />

                            <Box className="flex items-start mb-3">
                                <EmailIcon className="mr-2 text-gray-600" />
                                <div>
                                    <Typography variant="body2" color="textSecondary">Email</Typography>
                                    <Typography variant="body1">{property.contactEmail}</Typography>
                                </div>
                            </Box>

                            <Box className="flex items-start mb-3">
                                <PhoneIcon className="mr-2 text-gray-600" />
                                <div>
                                    <Typography variant="body2" color="textSecondary">Phone</Typography>
                                    <Typography variant="body1">{property.contactPhone}</Typography>
                                </div>
                            </Box>

                            <Button variant="contained" fullWidth className="mt-4">
                                Contact Agent
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PropertyDetailsPage; 