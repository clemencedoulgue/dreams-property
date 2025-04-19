export interface Property {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    imageUrl?: string;
    amenities: string[];
    contactEmail: string;
    contactPhone: string;
    createdAt: string;
} 