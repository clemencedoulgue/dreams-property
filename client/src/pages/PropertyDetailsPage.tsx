import React, { useEffect, useState } from 'react';
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
import ImageWithFallback from '../components/ImageWithFallback';

const PropertyDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [useLocalData, setUseLocalData] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            if (!id) return;

            try {
                setLoading(true);
                console.log(`PropertyDetailsPage - Fetching property with ID: ${id}`);
                const data = await propertyApi.getPropertyById(Number(id));
                console.log('PropertyDetailsPage - Received property data:', data);
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

    const handleBack = () => {
        navigate(-1);
    };

    // Ensure we have safe property data with fallbacks for undefined values
    const safeProperty = property ? {
        ...property,
        imageUrl: property.imageUrl || '',
        title: property.title || 'Property Details',
        description: property.description || 'No description available',
        location: property.location || 'Location not specified',
        amenities: property.amenities || []
    } : null;

    // Log the safe property data before rendering
    useEffect(() => {
        if (safeProperty) {
            console.log('PropertyDetailsPage - Using safe property data:', {
                title: safeProperty.title,
                imageUrl: safeProperty.imageUrl || 'Using fallback image'
            });
        }
    }, [safeProperty]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading property details...</p>
                </div>
            </div>
        );
    }

    if (error || !safeProperty) {
        return (
            <div className="text-center p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Property Not Found</h2>
                <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
                <button
                    onClick={handleBack}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                    Back to Properties
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <button
                onClick={handleBack}
                className="flex items-center text-blue-500 hover:text-blue-700 mb-6"
            >
                <span>← Back to listings</span>
            </button>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-96 overflow-hidden">
                    <ImageWithFallback
                        src={safeProperty.imageUrl}
                        alt={safeProperty.title}
                        className="w-full h-full object-cover"
                        fallbackSrc="/images/placeholder.svg"
                    />
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{safeProperty.title}</h1>
                            <p className="text-gray-600 text-lg">{safeProperty.location}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-blue-600">
                                ${safeProperty.price.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-700">
                        <div className="flex items-center">
                            <span className="font-semibold">{safeProperty.bedrooms}</span>
                            <span className="ml-1">beds</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold">{safeProperty.bathrooms}</span>
                            <span className="ml-1">baths</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold">{safeProperty.area}</span>
                            <span className="ml-1">sq ft</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Description</h2>
                        <p className="text-gray-700 leading-relaxed">{safeProperty.description}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Amenities</h2>
                        <div className="flex flex-wrap gap-2">
                            {safeProperty.amenities.map((amenity, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                >
                                    {amenity}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Contact</h2>
                        <p className="text-gray-700 mb-1">
                            <span className="font-medium">Email:</span> {safeProperty.contactEmail}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Phone:</span> {safeProperty.contactPhone}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailsPage; 