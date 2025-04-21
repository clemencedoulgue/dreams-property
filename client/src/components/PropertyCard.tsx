import React, { useEffect } from 'react';
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
    // Debug logging
    useEffect(() => {
        console.log('PropertyCard - Rendering property:', {
            id: property.id,
            title: property.title,
            imageUrl: property.imageUrl || 'No image URL provided'
        });
    }, [property]);

    // Ensure we have valid data for rendering
    const safeProperty = {
        ...property,
        imageUrl: property.imageUrl || '', // Provide empty string as fallback
        title: property.title || 'Property',
        location: property.location || 'Location not specified',
        price: property.price || 0
    };

    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
            onClick={onClick}
        >
            <div className="h-48 overflow-hidden">
                <ImageWithFallback
                    src={safeProperty.imageUrl}
                    alt={safeProperty.title}
                    className="w-full h-full object-cover"
                    fallbackSrc="/images/placeholder.svg"
                />
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{safeProperty.title}</h3>
                <p className="text-gray-600 mb-2">{safeProperty.location}</p>
                <p className="text-gray-700 font-bold">${safeProperty.price.toLocaleString()}</p>
                <div className="flex items-center mt-2 text-gray-500 text-sm">
                    <span className="mr-3">{safeProperty.bedrooms} beds</span>
                    <span className="mr-3">{safeProperty.bathrooms} baths</span>
                    <span>{safeProperty.area} sqft</span>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard; 