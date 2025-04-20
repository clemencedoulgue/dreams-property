import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { propertyApi } from '../utils/api';

const AddPropertyPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        location: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        description: '',
        imageUrl: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.title || formData.title.length < 3) {
            newErrors.title = 'Title must be at least 3 characters';
        }
        if (!formData.price || Number(formData.price) <= 0) {
            newErrors.price = 'Price must be a positive number';
        }
        if (!formData.location || formData.location.length < 3) {
            newErrors.location = 'Location must be at least 3 characters';
        }
        if (!formData.bedrooms || Number(formData.bedrooms) < 0) {
            newErrors.bedrooms = 'Bedrooms must be zero or more';
        }
        if (!formData.bathrooms || Number(formData.bathrooms) < 0) {
            newErrors.bathrooms = 'Bathrooms must be zero or more';
        }
        if (!formData.area || Number(formData.area) < 0) {
            newErrors.area = 'Area must be zero or more';
        }
        if (!formData.description || formData.description.length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
        }
        // imageUrl is optional, no validation
        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setIsSubmitting(true);

        try {
            const payload = {
                title: formData.title,
                price: Number(formData.price),
                location: formData.location,
                bedrooms: Number(formData.bedrooms),
                bathrooms: Number(formData.bathrooms),
                area: Number(formData.area),
                description: formData.description,
                imageUrl: formData.imageUrl,
                amenities: [], // amenities not in form, can be added later
                contactEmail: 'contact@dreamsproperty.com', // static for now
                contactPhone: '+1 (555) 123-4567', // static for now
            };
            await propertyApi.createProperty(payload);
            alert('Property added successfully');
            navigate('/');
        } catch (error) {
            setSubmitError('Failed to add property. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Property</h1>

            <div className="bg-white rounded-lg shadow-lg p-6">
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                            Property Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.title ? 'border-red-500' : ''
                            }`}
                            placeholder="Enter property title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.price ? 'border-red-500' : ''
                            }`}
                            placeholder="Enter price in USD"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.location ? 'border-red-500' : ''
                            }`}
                            placeholder="Enter property location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label htmlFor="bedrooms" className="block text-gray-700 font-medium mb-2">
                                Bedrooms
                            </label>
                            <input
                                type="number"
                                id="bedrooms"
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.bedrooms ? 'border-red-500' : ''
                                }`}
                                min="0"
                                value={formData.bedrooms}
                                onChange={handleChange}
                                required
                            />
                            {errors.bedrooms && <p className="text-red-500 text-sm mt-1">{errors.bedrooms}</p>}
                        </div>
                        <div>
                            <label htmlFor="bathrooms" className="block text-gray-700 font-medium mb-2">
                                Bathrooms
                            </label>
                            <input
                                type="number"
                                id="bathrooms"
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.bathrooms ? 'border-red-500' : ''
                                }`}
                                min="0"
                                step="0.5"
                                value={formData.bathrooms}
                                onChange={handleChange}
                                required
                            />
                            {errors.bathrooms && <p className="text-red-500 text-sm mt-1">{errors.bathrooms}</p>}
                        </div>
                        <div>
                            <label htmlFor="area" className="block text-gray-700 font-medium mb-2">
                                Area (sq ft)
                            </label>
                            <input
                                type="number"
                                id="area"
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.area ? 'border-red-500' : ''
                                }`}
                                min="0"
                                value={formData.area}
                                onChange={handleChange}
                                required
                            />
                            {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows={4}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.description ? 'border-red-500' : ''
                            }`}
                            placeholder="Enter property description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="imageUrl" className="block text-gray-700 font-medium mb-2">
                            Image URL
                        </label>
                        <input
                            type="text"
                            id="imageUrl"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter image URL"
                            value={formData.imageUrl}
                            onChange={handleChange}
                        />
                    </div>

                    {submitError && <p className="text-red-500 mb-4">{submitError}</p>}

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 
                ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </span>
                            ) : 'Add Property'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPropertyPage;
