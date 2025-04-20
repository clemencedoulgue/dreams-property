const Property = require('../models/property');
const Joi = require('joi');

// Mock data in case database is not available
const mockProperties = [
    {
        id: 1,
        title: 'Modern Downtown Apartment',
        description: 'A beautiful modern apartment in the heart of downtown with stunning city views.',
        price: 350000,
        location: 'Downtown, City Center',
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
        amenities: ['Parking', 'Gym', 'Swimming Pool', 'Security'],
        contactEmail: 'contact@dreamsproperty.com',
        contactPhone: '+1 (555) 123-4567',
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        title: 'Suburban Family Home',
        description: 'Spacious family home in a quiet suburban neighborhood.',
        price: 550000,
        location: 'Oakridge Suburb',
        bedrooms: 4,
        bathrooms: 3,
        area: 2500,
        imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
        amenities: ['Garden', 'Garage', 'Fireplace', 'Central Heating/AC'],
        contactEmail: 'contact@dreamsproperty.com',
        contactPhone: '+1 (555) 123-4567',
        createdAt: new Date().toISOString()
    }
];

// Validation schema for properties
const propertySchema = Joi.object({
    title: Joi.string().required().min(3).max(255),
    description: Joi.string().required().min(10),
    price: Joi.number().required().positive(),
    location: Joi.string().required().min(3).max(255),
    bedrooms: Joi.number().integer().min(0),
    bathrooms: Joi.number().min(0),
    area: Joi.number().integer().min(0),
    imageUrl: Joi.string().uri().allow(''),
    amenities: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string())
    ),
    contactEmail: Joi.string().email().required(),
    contactPhone: Joi.string().allow('')
});

// Check if database is available or use mock data
let useDatabase = false; // Set to false by default to ensure demo mode works
try {
    // Simple test
    if (!Property) {
        useDatabase = false;
        console.log('Using mock data instead of database');
    }
} catch (error) {
    useDatabase = false;
    console.log('DB Error detected, using mock data:', error.message);
}

// Get all properties
const getAllProperties = async (req, res) => {
    try {
        let properties;
        if (useDatabase) {
            properties = await Property.getAll();
        } else {
            properties = mockProperties;
        }
        res.json(properties);
    } catch (error) {
        console.error('Error in getAllProperties controller:', error);
        res.status(500).json({ message: 'Server error retrieving properties' });
    }
};

// Get property by ID
const getPropertyById = async (req, res) => {
    try {
        const id = req.params.id;
        let property;

        if (useDatabase) {
            property = await Property.getById(id);
        } else {
            property = mockProperties.find(p => p.id === Number(id));
        }

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.json(property);
    } catch (error) {
        console.error('Error in getPropertyById controller:', error);
        res.status(500).json({ message: 'Server error retrieving property' });
    }
};

// Create a new property
const createProperty = async (req, res) => {
    try {
        // Validate request body
        const { error, value } = propertySchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let newProperty;
        if (useDatabase) {
            // Create property in database
            newProperty = await Property.create(value);
        } else {
            // Create property in memory
            newProperty = {
                id: mockProperties.length ? Math.max(...mockProperties.map(p => p.id)) + 1 : 1,
                ...value,
                createdAt: new Date().toISOString()
            };
            mockProperties.push(newProperty);
        }

        res.status(201).json(newProperty);
    } catch (error) {
        console.error('Error in createProperty controller:', error);
        res.status(500).json({ message: 'Server error creating property' });
    }
};

// Update property
const updateProperty = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if property exists
        let existingProperty;
        if (useDatabase) {
            existingProperty = await Property.getById(id);
        } else {
            existingProperty = mockProperties.find(p => p.id === Number(id));
        }

        if (!existingProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Validate request body
        const { error, value } = propertySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let updatedProperty;
        if (useDatabase) {
            // Update property in database
            await Property.update(id, value);
            updatedProperty = await Property.getById(id);
        } else {
            // Update property in memory
            const index = mockProperties.findIndex(p => p.id === Number(id));
            updatedProperty = {
                ...mockProperties[index],
                ...value,
                id: Number(id)
            };
            mockProperties[index] = updatedProperty;
        }

        res.json(updatedProperty);
    } catch (error) {
        console.error('Error in updateProperty controller:', error);
        res.status(500).json({ message: 'Server error updating property' });
    }
};

// Delete property
const deleteProperty = async (req, res) => {
    try {
        const id = req.params.id;

        let existingProperty;
        if (useDatabase) {
            existingProperty = await Property.getById(id);
        } else {
            existingProperty = mockProperties.find(p => p.id === Number(id));
        }

        if (!existingProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        if (useDatabase) {
            // Delete from database
            await Property.delete(id);
        } else {
            // Delete from memory
            const index = mockProperties.findIndex(p => p.id === Number(id));
            if (index !== -1) {
                mockProperties.splice(index, 1);
            }
        }

        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error('Error in deleteProperty controller:', error);
        res.status(500).json({ message: 'Server error deleting property' });
    }
};

module.exports = {
    getAllProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty
}; 