/**
 * Manual Test Cases for Dreams Property API
 * This document outlines test cases for the API
 */

// Test Case 1: Get All Properties
// Expected Result: Returns a JSON array of all properties
// Steps:
// 1. Send a GET request to /api/properties
// 2. Verify response status code is 200
// 3. Verify response body is an array of properties

// Test Case 2: Get Property by ID
// Expected Result: Returns a single property object with the matching ID
// Steps:
// 1. Send a GET request to /api/properties/1
// 2. Verify response status code is 200
// 3. Verify response body contains correct property details for ID 1

// Test Case 3: Create a New Property
// Expected Result: Creates a new property and returns it with an assigned ID
// Steps:
// 1. Send a POST request to /api/properties with valid property data
// 2. Verify response status code is 201
// 3. Verify response body contains the created property with a new ID

// Test Case 4: Update a Property
// Expected Result: Updates an existing property and returns the updated object
// Steps:
// 1. Send a PUT request to /api/properties/1 with modified property data
// 2. Verify response status code is 200
// 3. Verify response body contains the updated property details

// Test Case 5: Delete a Property
// Expected Result: Deletes a property and returns success message
// Steps:
// 1. Send a DELETE request to /api/properties/1
// 2. Verify response status code is 200
// 3. Verify response body contains success message
// 4. Send a GET request to /api/properties/1 to verify it's been deleted (should get 404)

// FAILED TEST CASES:

// Test Case 6: Create Property with Invalid Data (EXPECTED TO FAIL)
// Expected Result: Returns a validation error
// Steps:
// 1. Send a POST request to /api/properties with invalid property data (e.g., missing required fields, negative price)
// 2. Verify response status code is 400
// 3. Verify response body contains validation error message

// Test Case 7: Get Non-existent Property (EXPECTED TO FAIL)
// Expected Result: Returns a 404 error
// Steps:
// 1. Send a GET request to /api/properties/999 (assuming ID 999 doesn't exist)
// 2. Verify response status code is 404
// 3. Verify response body contains "Property not found" message

/**
 * Example test execution with curl:
 * 
 * Test Case 1:
 * curl http://localhost:5006/api/properties
 * 
 * Test Case 2:
 * curl http://localhost:5006/api/properties/1
 * 
 * Test Case 3:
 * curl -X POST -H "Content-Type: application/json" -d '{
 *   "title": "Test Property", 
 *   "description": "This is a test property",
 *   "price": 300000,
 *   "location": "Test Location",
 *   "bedrooms": 3,
 *   "bathrooms": 2,
 *   "area": 1500,
 *   "amenities": ["Test Amenity"],
 *   "contactEmail": "test@example.com"
 * }' http://localhost:5006/api/properties
 * 
 * Test Case 4:
 * curl -X PUT -H "Content-Type: application/json" -d '{
 *   "title": "Updated Test Property", 
 *   "description": "This is an updated test property",
 *   "price": 350000,
 *   "location": "Updated Test Location",
 *   "bedrooms": 3,
 *   "bathrooms": 2,
 *   "area": 1500,
 *   "amenities": ["Test Amenity", "New Amenity"],
 *   "contactEmail": "test@example.com"
 * }' http://localhost:5006/api/properties/1
 * 
 * Test Case 5:
 * curl -X DELETE http://localhost:5006/api/properties/1
 * 
 * Test Case 6 (EXPECTED TO FAIL):
 * curl -X POST -H "Content-Type: application/json" -d '{
 *   "title": "A", 
 *   "description": "Short",
 *   "price": -100,
 *   "contactEmail": "invalid-email"
 * }' http://localhost:5006/api/properties
 * 
 * Test Case 7 (EXPECTED TO FAIL):
 * curl http://localhost:5006/api/properties/999
 */ 