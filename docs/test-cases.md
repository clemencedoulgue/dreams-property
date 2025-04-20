# Test Case Documentation

## Manual Test Cases

### TC-001: Property Listing Display Test

**Description:** Verify that all property listings display correctly on the home page.

**Prerequisites:**
- Server running on port 5004
- Client running on port 3030
- At least 3 properties in mock data

**Test Steps:**
1. Navigate to http://localhost:3030
2. Wait for the page to load completely
3. Verify that property cards are visible
4. Verify each card has an image, title, price, and location
5. Verify that the total count of cards matches the expected number of properties

**Expected Results:**
- Property cards are displayed in a responsive grid layout
- Each card shows the property image, title, price, and location
- The total number of cards matches the number of properties in the mock data

**Actual Results:** ✅ Pass
- All properties displayed correctly with images and details
- Layout is responsive and adjusts to screen size

---

### TC-002: Property Detail Navigation Test

**Description:** Verify that clicking on a property card redirects to the property details page.

**Prerequisites:**
- Server running on port 5004
- Client running on port 3030
- At least 1 property in mock data

**Test Steps:**
1. Navigate to http://localhost:3030
2. Wait for the page to load completely
3. Click on the first property card
4. Verify redirect to the property details page
5. Verify that property details (title, description, amenities, etc.) are displayed

**Expected Results:**
- User is redirected to a URL like /properties/1
- Property details page displays comprehensive information about the selected property
- Back button is available to return to the listing page

**Actual Results:** ✅ Pass
- Successfully redirected to property details page
- All property information displayed correctly
- Back button works as expected

---

### TC-003: Add Property Form Validation Test

**Description:** Verify that the add property form validates required fields.

**Prerequisites:**
- Server running on port 5004
- Client running on port 3030

**Test Steps:**
1. Navigate to http://localhost:3030/#/add-property
2. Wait for the form to load
3. Leave all fields empty
4. Click the "Add Property" submit button
5. Verify that validation errors are displayed for required fields

**Expected Results:**
- Form submission is prevented
- Validation messages appear for required fields
- Focus is set to the first field with an error

**Actual Results:** ✅ Pass
- Form prevented submission with validation errors
- Error messages displayed for required fields

---

### TC-004: API Response Test

**Description:** Verify that the API endpoints return the expected data format and status codes.

**Prerequisites:**
- Server running on port 5004
- Postman or similar API testing tool installed

**Test Steps:**
1. Open Postman
2. Create a new GET request to http://localhost:5004/api/properties
3. Send the request
4. Verify the response status code and data format
5. Create a new GET request to http://localhost:5004/api/properties/1
6. Send the request
7. Verify the response status code and data format

**Expected Results:**
- GET /api/properties returns 200 OK with an array of property objects
- GET /api/properties/1 returns 200 OK with a single property object
- Both responses include the expected property fields

**Actual Results:** ✅ Pass
- Both endpoints return correct data in expected format
- Status codes are correct (200 OK)

---

### TC-005: Image Loading Test

**Description:** Verify that property images load quickly and correctly.

**Prerequisites:**
- Server running on port 5004
- Client running on port 3030
- Browser with developer tools enabled

**Test Steps:**
1. Navigate to http://localhost:3030
2. Open browser developer tools (F12)
3. Go to the Network tab
4. Reload the page
5. Filter for image resources
6. Verify that images are loaded
7. Check the load time and size of images

**Expected Results:**
- All property images load successfully
- SVG images load quickly (under 100ms)
- No broken image links

**Actual Results:** ✅ Pass
- All SVG images loaded successfully
- Images loaded in under 50ms
- No broken links detected

---

## Failed Test Cases (With Solutions)

### TC-006: Image URL Validation Issue

**Description:** Test the API's validation of relative image paths.

**Prerequisites:**
- Server running on port 5004
- Postman or similar API testing tool installed

**Test Steps:**
1. Open Postman
2. Create a new POST request to http://localhost:5004/api/properties
3. Set Content-Type header to application/json
4. Set request body to:
   ```json
   {
     "title": "Test Property",
     "description": "This is a test property with a minimum of 10 characters.",
     "price": 500000,
     "location": "Test Location",
     "bedrooms": 3,
     "bathrooms": 2,
     "area": 2000,
     "imageUrl": "/images/test.jpg",
     "amenities": ["Test Amenity 1", "Test Amenity 2"],
     "contactEmail": "test@example.com",
     "contactPhone": "123-456-7890"
   }
   ```
5. Send the request
6. Verify the response status code and error message

**Expected Results:**
- Property should be created successfully with status 201

**Actual Results:** ❌ Fail
- Received 400 Bad Request
- Error message: `"imageUrl" must be a valid uri`

**Solution:**
- Modified the Joi validation schema in server/src/controllers/propertyController.js
- Changed `imageUrl: Joi.string().uri().allow('')` to `imageUrl: Joi.string().allow('')`
- Retested and confirmed fixed

---

### TC-007: Port Conflict Issue

**Description:** Test the application's ability to handle port conflicts during startup.

**Prerequisites:**
- Another application running on port 3000 (the default React port)
- Server running on port 5004

**Test Steps:**
1. Start the client application without specifying a custom port
2. Observe the startup behavior

**Expected Results:**
- Application should start on an alternative port or provide a clear error message

**Actual Results:** ❌ Fail
- Initial test: Application failed to start with a port conflict error
- Port conflict not gracefully handled

**Solution:**
- Updated client/.env to set PORT=3030
- Added custom script in package.json: "start:custom": "set PORT=3030 && react-scripts start"
- Configured fallback ports in server/src/index.js
- Retested and confirmed the application now starts on the alternative port 