# Dreams Property - Real Estate Listings Website

A full-stack property listings website built with React, Node.js, Express, and MySQL.

## Project Overview

Dreams Property is a web application that allows users to:

- Browse property listings
- View detailed information about properties
- Add new property listings
- Contact property agents

## Features

- Responsive UI using React, Material UI, and Tailwind CSS
- RESTful API with Node.js and Express
- MySQL database integration
- Form validation
- Search functionality
- Clean and modern UI design

## Tech Stack

### Frontend
- React (TypeScript)
- Material UI
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express
- MySQL
- Joi (validation)
- CORS

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MySQL

### Local Development

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/dreams-property.git
cd dreams-property
```

2. **Install all dependencies**

```bash
npm run install-all
```

3. **Set up the database**

Create a MySQL database named `dreams_property`. Then, you can import the sample data:

```bash
mysql -u YOUR_USERNAME -p < server/data.sql
```

Alternatively, the tables will be automatically created when the server starts, but they will be empty.

4. **Configure environment variables**

```bash
cd server
cp .env.example .env
```

Update the `.env` file with your database credentials.

5. **Start both the frontend and backend**

From the root directory:

```bash
npm start
```

This will start the backend on port 5000 and the frontend on port 3000.

6. **Access the application**

Open your browser and navigate to `http://localhost:3000`

## Testing

Test the API using the Postman collection in `server/postman_collection.json` or using the test instructions in `server/test.js`.

## Deployment

### Frontend Deployment (Vercel/Netlify)

1. Create an account on Vercel or Netlify
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `cd client && npm install && npm run build`
   - Output directory: `client/build`
   - Environment variables: Set up the backend API URL

### Backend Deployment (Render/Railway)

1. Create an account on Render or Railway
2. Connect your GitHub repository
3. Configure the service:
   - Build command: `cd server && npm install`
   - Start command: `cd server && npm start`
   - Environment variables: Set up all required environment variables from `.env.example`

## API Endpoints

- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create a new property
- `PUT /api/properties/:id` - Update property by ID
- `DELETE /api/properties/:id` - Delete property by ID

## Future Enhancements

- User authentication and authorization
- Image upload functionality
- Property reviews and ratings
- Advanced search filters
- Booking/inquiry system
- Admin dashboard
- Property favorites
- Payment integration for premium listings

## License

MIT

## Author

Your Name 