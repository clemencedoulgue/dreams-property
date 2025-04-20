import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card, CardMedia, CardContent, CardActions,
    Typography, Button, Box, Chip
} from '@mui/material';
import { Property } from '../types';
import ImageWithFallback from './ImageWithFallback';

interface PropertyCardProps {
    property: Property;
    onClick?: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
            onClick={onClick}
        >
            <div className="h-48 overflow-hidden">
                <ImageWithFallback
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    fallbackSrc="/images/placeholder.svg"
                />
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{property.title}</h3>
                <p className="text-gray-600 mb-2">{property.location}</p>
                <p className="text-gray-700 font-bold">${property.price.toLocaleString()}</p>
                <div className="flex items-center mt-2 text-gray-500 text-sm">
                    <span className="mr-3">{property.bedrooms} beds</span>
                    <span className="mr-3">{property.bathrooms} baths</span>
                    <span>{property.area} sqft</span>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard; 