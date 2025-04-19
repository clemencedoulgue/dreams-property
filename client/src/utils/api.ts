import axios from 'axios';
import { Property } from '../types';

// Base API URL - change this to your production backend URL when deploying
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// API functions for properties
export const propertyApi = {
    // Get all properties
    getAllProperties: async (): Promise<Property[]> => {
        try {
            const response = await api.get('/properties');
            return response.data;
        } catch (error) {
            console.error('Error fetching properties:', error);
            throw error;
        }
    },

    // Get property by ID
    getPropertyById: async (id: number): Promise<Property> => {
        try {
            const response = await api.get(`/properties/${id}`);
            return response.data;
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