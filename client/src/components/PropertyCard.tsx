import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Property } from '../types';

interface PropertyCardProps {
    property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    return (
        <Card className="h-full hover:shadow-lg transition-shadow duration-300">
            <Link to={`/properties/${property.id}`}>
                <CardMedia
                    component="img"
                    height="140"
                    image={property.imageUrl || 'https://via.placeholder.com/300x200'}
                    alt={property.title}
                    className="h-48 object-cover"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className="font-bold">
                        {property.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="flex items-center mb-2">
                        <LocationOnIcon fontSize="small" className="mr-1" />
                        {property.location}
                    </Typography>
                    <Typography variant="h6" color="primary" className="font-bold">
                        ${property.price.toLocaleString()}
                    </Typography>
                    <div className="flex mt-2 text-sm text-gray-600">
                        <div className="mr-4">
                            <span className="font-medium">{property.bedrooms}</span> beds
                        </div>
                        <div className="mr-4">
                            <span className="font-medium">{property.bathrooms}</span> baths
                        </div>
                        <div>
                            <span className="font-medium">{property.area}</span> sqft
                        </div>
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
};

export default PropertyCard; 