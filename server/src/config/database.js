const mysql = require('mysql2/promise');

// Create a connection pool to MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'dreams_property',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection established successfully.');
        connection.release();
        return true;
    } catch (error) {
        console.error('Error connecting to database:', error.message);
        console.log('App will continue to run in demo mode.');
        return false;
    }
}

// Initialize database with tables if they don't exist
async function initDatabase() {
    try {
        const connection = await pool.getConnection();

        // Create properties table if it doesn't exist
        await connection.query(`
      CREATE TABLE IF NOT EXISTS properties (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        location VARCHAR(255) NOT NULL,
        bedrooms INT,
        bathrooms DECIMAL(3, 1),
        area INT,
        image_url VARCHAR(255),
        amenities TEXT,
        contact_email VARCHAR(255) NOT NULL,
        contact_phone VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        console.log('Database initialized successfully');
        connection.release();
        return true;
    } catch (error) {
        console.error('Error initializing database:', error.message);
        console.log('App will continue to run with in-memory data.');
        return false;
    }
}

// Set up database but don't fail if it's not available
async function setup() {
    try {
        await testConnection();
        await initDatabase();
    } catch (err) {
        console.error('Database setup encountered errors. Using fallback data:', err);
    }
}

// Call setup but don't wait for it to complete
setup();

module.exports = pool; 