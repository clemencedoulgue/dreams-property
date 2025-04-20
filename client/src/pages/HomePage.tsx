import React, { useState, useEffect } from 'react';
import { mockProperties } from '../mockData';
import PropertyCard from '../components/PropertyCard';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const [properties, setProperties] = useState(mockProperties);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate API call
        const timer = setTimeout(() => {
            setProperties(mockProperties);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handlePropertyClick = (id: number) => {
        navigate(`/properties/${id}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading properties...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Your Dream Home</h1>
                <p className="text-gray-600">Explore our selection of premium properties</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <PropertyCard
                        key={property.id}
                        property={property}
                        onClick={() => handlePropertyClick(property.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage; 