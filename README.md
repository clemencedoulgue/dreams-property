# Dreams Property Listings

A full-stack property listings application allowing users to view, search, and add property listings.

## 🌟 Features

- Browse property listings with images, prices, and basic details
- View detailed information about individual properties
- Add new properties via a validated form
- RESTful API with proper validation
- Responsive design that works on desktop and mobile

## 🛠️ Tech Stack

### Frontend
- React (Create React App)
- TypeScript
- Tailwind CSS
- Material UI components
- React Router for navigation

### Backend
- Node.js
- Express.js
- Joi for validation
- RESTful API architecture

### Database
- MySQL (configured but running in demo mode with in-memory data)

## 📋 Installation and Setup

### Prerequisites
- Node.js (v16.x or later)
- npm (v7 or later)
- Git

### Clone the Repository
```bash
git clone https://github.com/clemencedoulgue/dreams-property.git
cd dreams-property
```

### Environment Setup

#### Backend (.env file in server directory)
```
PORT=5004
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=dreams_property
```

#### Frontend (.env file in client directory)
```
REACT_APP_API_URL=http://localhost:5004/api
PORT=3030
```

### Installation Steps

1. Install dependencies for the root project, client, and server:
```bash
npm run install-all
```

2. Start the development servers:
```bash
npm start
```

This will start both the backend server (default port 5004) and the frontend development server (default port 3030).

## 🚀 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/properties | Get all properties |
| GET | /api/properties/:id | Get a specific property by ID |
| POST | /api/properties | Create a new property |
| PUT | /api/properties/:id | Update an existing property |
| DELETE | /api/properties/:id | Delete a property |

### Sample Property Object
```json
{
  "title": "Modern Downtown Apartment",
  "description": "A beautiful modern apartment in the heart of downtown with stunning city views.",
  "price": 710000,
  "location": "Downtown, City Center",
  "bedrooms": 2,
  "bathrooms": 2,
  "area": 1200,
  "imageUrl": "/images/apartment1.jpg.svg",
  "amenities": ["Parking", "Gym", "Swimming Pool", "Security"],
  "contactEmail": "contact@dreamsproperty.com",
  "contactPhone": "+1 (555) 123-4567"
}
```

## 🧪 Testing

### Manual Test Cases

1. **Property Listing Display Test**
   - Navigate to the home page
   - Verify that property listings appear with images, titles, prices, and location
   - Expected: All properties display correctly with their details

2. **Property Detail Navigation Test**
   - Click on a property card
   - Verify that you are redirected to the property details page
   - Expected: Property details page shows complete information about the selected property

3. **Add Property Form Validation Test**
   - Navigate to the "Add Property" page
   - Submit the form without filling required fields
   - Expected: Form shows validation errors and prevents submission

4. **API Response Test**
   - Send a GET request to /api/properties
   - Expected: Receive a JSON array of property objects with status 200

5. **Image Loading Test**
   - Navigate to the home page
   - Inspect network activity
   - Expected: SVG images load quickly and correctly

### Failed Test Cases (With Solutions)

1. **Image URL Validation Issue**
   - Problem: When submitting a property with a relative image path, the API returned a validation error: `"imageUrl" must be a valid uri`
   - Solution: Modified the Joi validation schema to accept relative paths by changing `Joi.string().uri().allow('')` to `Joi.string().allow('')`

2. **Port Conflict Issue**
   - Problem: Default port 3000 was already in use, causing server startup failures
   - Solution: Implemented dynamic port selection with fallback options and configured PORT in environment variables

## 📱 Deployment

### Frontend Deployment (Netlify)
1. Configure netlify.toml file (already included)
2. Connect repository to Netlify
3. Set environment variables in Netlify dashboard
4. Live URL: https://dreams-property-client.netlify.app

### Backend Deployment (Render)
1. Configure render.yaml file (already included)
2. Connect repository to Render
3. Set environment variables in Render dashboard
4. Live URL: https://dreams-property-server.onrender.com

## 🔍 Future Improvements

1. Implement user authentication and property favoriting
2. Add advanced search and filtering functionality
3. Integrate with a real database system
4. Add image upload functionality
5. Implement unit and integration tests

## 📄 License
MIT