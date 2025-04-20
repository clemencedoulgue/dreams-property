import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPropertyPage: React.FC = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            // Navigate back to homepage after "successful" submission
            navigate('/');
            alert('Property added successfully (demo mode)');
        }, 1500);
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Property</h1>

            <div className="bg-white rounded-lg shadow-lg p-6">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                            Property Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter property title"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter price in USD"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter property location"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label htmlFor="bedrooms" className="block text-gray-700 font-medium mb-2">
                                Bedrooms
                            </label>
                            <input
                                type="number"
                                id="bedrooms"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="bathrooms" className="block text-gray-700 font-medium mb-2">
                                Bathrooms
                            </label>
                            <input
                                type="number"
                                id="bathrooms"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0"
                                step="0.5"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="area" className="block text-gray-700 font-medium mb-2">
                                Area (sq ft)
                            </label>
                            <input
                                type="number"
                                id="area"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows={4}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter property description"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                            Image URL
                        </label>
                        <input
                            type="text"
                            id="image"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter image URL"
                        />
                    </div>

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