import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card, CardMedia, CardContent, CardActions,
    Typography, Button, Box, Chip
} from '@mui/material';
import { Property } from '../types';

interface PropertyCardProps {
    property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                }
            }}
        >
            <CardMedia
                component="img"
                height="200"
                image={property.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={property.title}
            />

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom noWrap>
                    {property.title}
                </Typography>

                <Typography
                    variant="subtitle1"
                    color="primary"
                    fontWeight="bold"
                    gutterBottom
                >
                    ${property.price.toLocaleString()}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                >
                    {property.location}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Typography variant="body2">
                        {property.bedrooms} beds
                    </Typography>
                    <Typography variant="body2">
                        {property.bathrooms} baths
                    </Typography>
                    <Typography variant="body2">
                        {property.area} sq ft
                    </Typography>
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                    }}
                >
                    {property.description}
                </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
                <Button
                    component={Link}
                    to={`/properties/${property.id}`}
                    variant="contained"
                    size="small"
                >
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
};

export default PropertyCard; 