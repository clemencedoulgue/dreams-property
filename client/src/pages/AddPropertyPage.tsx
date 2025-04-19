import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    Grid,
    Paper,
    MenuItem,
    Divider,
    Alert,
    CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { propertyApi } from '../utils/api';

interface FormData {
    title: string;
    description: string;
    price: string;
    location: string;
    bedrooms: string;
    bathrooms: string;
    area: string;
    imageUrl: string;
    amenities: string;
    contactEmail: string;
    contactPhone: string;
}

interface FormErrors {
    [key: string]: string;
}

const initialFormState: FormData = {
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    imageUrl: '',
    amenities: '',
    contactEmail: '',
    contactPhone: ''
};

const AddPropertyPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>(initialFormState);
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        // Required fields
        if (!formData.title) {
            newErrors.title = 'Title is required';
            isValid = false;
        }

        if (!formData.description) {
            newErrors.description = 'Description is required';
            isValid = false;
        }

        if (!formData.price) {
            newErrors.price = 'Price is required';
            isValid = false;
        } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            newErrors.price = 'Price must be a positive number';
            isValid = false;
        }

        if (!formData.location) {
            newErrors.location = 'Location is required';
            isValid = false;
        }

        if (!formData.contactEmail) {
            newErrors.contactEmail = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
            newErrors.contactEmail = 'Email is invalid';
            isValid = false;
        }

        // Optional fields with validation
        if (formData.bedrooms && (isNaN(Number(formData.bedrooms)) || Number(formData.bedrooms) < 0)) {
            newErrors.bedrooms = 'Bedrooms must be a non-negative number';
            isValid = false;
        }

        if (formData.bathrooms && (isNaN(Number(formData.bathrooms)) || Number(formData.bathrooms) < 0)) {
            newErrors.bathrooms = 'Bathrooms must be a non-negative number';
            isValid = false;
        }

        if (formData.area && (isNaN(Number(formData.area)) || Number(formData.area) <= 0)) {
            newErrors.area = 'Area must be a positive number';
            isValid = false;
        }

        if (formData.imageUrl && !formData.imageUrl.startsWith('http')) {
            newErrors.imageUrl = 'Image URL must start with http:// or https://';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);

        if (!validateForm()) return;

        try {
            setLoading(true);

            // Convert form data to API format
            const propertyData = {
                title: formData.title,
                description: formData.description,
                price: Number(formData.price),
                location: formData.location,
                bedrooms: formData.bedrooms ? Number(formData.bedrooms) : undefined,
                bathrooms: formData.bathrooms ? Number(formData.bathrooms) : undefined,
                area: formData.area ? Number(formData.area) : undefined,
                imageUrl: formData.imageUrl || undefined,
                amenities: formData.amenities ? formData.amenities.split(',').map(item => item.trim()) : [],
                contactEmail: formData.contactEmail,
                contactPhone: formData.contactPhone || undefined
            };

            await propertyApi.createProperty(propertyData);

            setSubmitSuccess(true);

            // Reset form
            setFormData(initialFormState);

            // Redirect after a short delay
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (err) {
            console.error('Error creating property:', err);
            setSubmitError('Failed to create property. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-4">
            <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/')}
                className="mb-4"
            >
                Back to Listings
            </Button>

            <Paper className="p-6">
                <Typography variant="h4" component="h1" className="mb-6 font-bold">
                    Add New Property
                </Typography>

                {submitSuccess && (
                    <Alert severity="success" className="mb-4">
                        Property successfully added! Redirecting to home page...
                    </Alert>
                )}

                {submitError && (
                    <Alert severity="error" className="mb-4">
                        {submitError}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6" className="font-medium mb-2">
                                Property Information
                            </Typography>
                            <Divider className="mb-3" />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="title"
                                label="Property Title"
                                variant="outlined"
                                fullWidth
                                required
                                value={formData.title}
                                onChange={handleChange}
                                error={!!errors.title}
                                helperText={errors.title}
                                disabled={loading}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="location"
                                label="Location"
                                variant="outlined"
                                fullWidth
                                required
                                value={formData.location}
                                onChange={handleChange}
                                error={!!errors.location}
                                helperText={errors.location}
                                disabled={loading}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="description"
                                label="Description"
                                variant="outlined"
                                fullWidth
                                required
                                multiline
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                error={!!errors.description}
                                helperText={errors.description}
                                disabled={loading}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="price"
                                label="Price ($)"
                                variant="outlined"
                                fullWidth
                                required
                                type="number"
                                inputProps={{ min: 0 }}
                                value={formData.price}
                                onChange={handleChange}
                                error={!!errors.price}
                                helperText={errors.price}
                                disabled={loading}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="bedrooms"
                                label="Bedrooms"
                                variant="outlined"
                                fullWidth
                                type="number"
                                inputProps={{ min: 0 }}
                                value={formData.bedrooms}
                                onChange={handleChange}
                                error={!!errors.bedrooms}
                                helperText={errors.bedrooms}
                                disabled={loading}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="bathrooms"
                                label="Bathrooms"
                                variant="outlined"
                                fullWidth
                                type="number"
                                inputProps={{ min: 0, step: 0.5 }}
                                value={formData.bathrooms}
                                onChange={handleChange}
                                error={!!errors.bathrooms}
                                helperText={errors.bathrooms}
                                disabled={loading}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="area"
                                label="Area (sqft)"
                                variant="outlined"
                                fullWidth
                                type="number"
                                inputProps={{ min: 0 }}
                                value={formData.area}
                                onChange={handleChange}
                                error={!!errors.area}
                                helperText={errors.area}
                                disabled={loading}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="imageUrl"
                                label="Image URL"
                                variant="outlined"
                                fullWidth
                                value={formData.imageUrl}
                                onChange={handleChange}
                                error={!!errors.imageUrl}
                                helperText={errors.imageUrl}
                                disabled={loading}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="amenities"
                                label="Amenities (comma-separated)"
                                variant="outlined"
                                fullWidth
                                placeholder="e.g. Parking, Pool, Gym"
                                value={formData.amenities}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6" className="font-medium mt-2 mb-2">
                                Contact Information
                            </Typography>
                            <Divider className="mb-3" />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="contactEmail"
                                label="Contact Email"
                                variant="outlined"
                                fullWidth
                                required
                                type="email"
                                value={formData.contactEmail}
                                onChange={handleChange}
                                error={!!errors.contactEmail}
                                helperText={errors.contactEmail}
                                disabled={loading}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="contactPhone"
                                label="Contact Phone"
                                variant="outlined"
                                fullWidth
                                value={formData.contactPhone}
                                onChange={handleChange}
                                error={!!errors.contactPhone}
                                helperText={errors.contactPhone}
                                disabled={loading}
                            />
                        </Grid>

                        <Grid item xs={12} className="mt-4">
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate('/')}
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    disabled={loading}
                                    startIcon={loading ? <CircularProgress size={24} color="inherit" /> : null}
                                >
                                    {loading ? 'Submitting...' : 'Add Property'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default AddPropertyPage; 