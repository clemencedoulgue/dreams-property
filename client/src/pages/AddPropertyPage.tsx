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

const AddPropertyPage: React.FC = () => {
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
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
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Required fields
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Email is required';

        // Price validation
        if (!formData.price.trim()) {
            newErrors.price = 'Price is required';
        } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            newErrors.price = 'Price must be a positive number';
        }

        // Numeric validations
        if (formData.bedrooms && (isNaN(Number(formData.bedrooms)) || Number(formData.bedrooms) < 0)) {
            newErrors.bedrooms = 'Bedrooms must be a non-negative number';
        }

        if (formData.bathrooms && (isNaN(Number(formData.bathrooms)) || Number(formData.bathrooms) < 0)) {
            newErrors.bathrooms = 'Bathrooms must be a non-negative number';
        }

        if (formData.area && (isNaN(Number(formData.area)) || Number(formData.area) <= 0)) {
            newErrors.area = 'Area must be a positive number';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.contactEmail && !emailRegex.test(formData.contactEmail)) {
            newErrors.contactEmail = 'Invalid email format';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            setSubmitting(true);
            setSubmitError(null);

            try {
                // Prepare the data for API
                const propertyData = {
                    title: formData.title,
                    description: formData.description,
                    price: Number(formData.price),
                    location: formData.location,
                    bedrooms: formData.bedrooms ? Number(formData.bedrooms) : 0,
                    bathrooms: formData.bathrooms ? Number(formData.bathrooms) : 0,
                    area: formData.area ? Number(formData.area) : 0,
                    imageUrl: formData.imageUrl,
                    amenities: formData.amenities.split(',').map(item => item.trim()).filter(Boolean),
                    contactEmail: formData.contactEmail,
                    contactPhone: formData.contactPhone
                };

                // Submit to API
                await propertyApi.createProperty(propertyData);

                setFormSubmitted(true);
                setSubmitting(false);

                // Redirect after successful submission
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } catch (error) {
                console.error('Error submitting property:', error);
                setSubmitError('Failed to submit property. Please try again later.');
                setSubmitting(false);
            }
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

                {formSubmitted && (
                    <Alert severity="success" className="mb-4">
                        Property submitted successfully! Redirecting to home page...
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
                                disabled={submitting}
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
                                disabled={submitting}
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
                                disabled={submitting}
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
                                disabled={submitting}
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
                                disabled={submitting}
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
                                disabled={submitting}
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
                                disabled={submitting}
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
                                disabled={submitting}
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
                                disabled={submitting}
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
                                disabled={submitting}
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
                                disabled={submitting}
                            />
                        </Grid>

                        <Grid item xs={12} className="mt-4">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                                disabled={submitting}
                            >
                                {submitting ? <CircularProgress size={24} color="inherit" /> : 'Submit Property'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default AddPropertyPage; 