import axios from 'axios';
import { Property } from '../types';

// Base API URL - change this to your production backend URL when deploying
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5004/api';

console.log('API URL:', API_URL);

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds timeout
});

// Add response interceptor for error handling
api.interceptors.response.use(
    response => {
        console.log(`API Response from ${response.config.url}:`, {
            status: response.status,
            statusText: response.statusText,
            dataType: typeof response.data
        });
        return response;
    },
    error => {
        console.error('API Error:', {
            message: error.message,
            url: error.config?.url,
            method: error.config?.method
        });

        // Customize error message based on the error
        if (error.code === 'ECONNABORTED') {
            error.customMessage = 'Request timed out. Please try again.';
        } else if (!error.response) {
            error.customMessage = 'Network error. Please check your connection.';
        } else if (error.response.status >= 500) {
            error.customMessage = 'Server error. Please try again later.';
        }

        return Promise.reject(error);
    }
);

// Helper to validate and fix property data
const validatePropertyData = (property: Property): Property => {
    // Log for debugging
    console.log('Validating property data:', {
        id: property.id,
        hasImage: !!property.imageUrl,
        imageUrl: property.imageUrl
    });

    // Fix missing or invalid image URLs
    if (!property.imageUrl) {
        console.log(`Adding fallback image URL for property ${property.id}`);
        property.imageUrl = '/images/placeholder.svg';
    }

    return property;
};

// API functions for properties
export const propertyApi = {
    // Get all properties
    getAllProperties: async (): Promise<Property[]> => {
        try {
            console.log('Fetching all properties...');
            const response = await api.get('/properties');

            // Validate each property in the array
            const validatedProperties = response.data.map(validatePropertyData);
            console.log(`Received ${validatedProperties.length} properties`);

            return validatedProperties;
        } catch (error) {
            console.error('Error fetching properties:', error);
            throw error;
        }
    },

    // Get property by ID
    getPropertyById: async (id: number): Promise<Property> => {
        try {
            console.log(`Fetching property ${id}...`);
            const response = await api.get(`/properties/${id}`);

            // Validate and fix the property data
            const validatedProperty = validatePropertyData(response.data);
            console.log(`Property ${id} data validated:`, {
                title: validatedProperty.title,
                hasImage: !!validatedProperty.imageUrl
            });

            return validatedProperty;
        } catch (error) {
            console.error(`Error fetching property ${id}:`, error);
            throw error;
        }
    },

    // Create a new property
    createProperty: async (propertyData: Omit<Property, 'id' | 'createdAt'>): Promise<Property> => {
        try {
            const response = await api.post('/properties', propertyData);
            return response.data;
        } catch (error) {
            console.error('Error creating property:', error);
            throw error;
        }
    },

    // Update property
    updateProperty: async (id: number, propertyData: Partial<Property>): Promise<Property> => {
        try {
            const response = await api.put(`/properties/${id}`, propertyData);
            return response.data;
        } catch (error) {
            console.error(`Error updating property ${id}:`, error);
            throw error;
        }
    },

    // Delete property
    deleteProperty: async (id: number): Promise<void> => {
        try {
            await api.delete(`/properties/${id}`);
        } catch (error) {
            console.error(`Error deleting property ${id}:`, error);
            throw error;
        }
    },
}; 