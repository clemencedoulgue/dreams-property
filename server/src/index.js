require('dotenv').config();
const express = require('express');
const cors = require('cors');
const propertyRoutes = require('./routes/properties');
const db = require('./config/database');
const http = require('http');

const app = express();
const startPort = process.env.PORT || 5000;
let port = startPort;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/properties', propertyRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Dreams Property API is running');
});

// Function to try starting the server on different ports
function startServer(initialPort, maxAttempts = 5) {
    let currentPort = initialPort;
    let attempts = 0;

    function tryPort() {
        const server = http.createServer(app);

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE' && attempts < maxAttempts) {
                console.log(`Port ${currentPort} is in use, trying ${currentPort + 1}`);
                attempts++;
                currentPort++;
                server.close();
                tryPort();
            } else {
                console.error(`Failed to start server after ${attempts} attempts:`, err);
            }
        });

        server.listen(currentPort, () => {
            console.log(`Server running on port ${currentPort}`);
            // Save the port to a file so the client can use it
            console.log(`API is available at http://localhost:${currentPort}/api`);
        });
    }

    tryPort();
}

// Start the server
startServer(port); 