const db = require('../config/database');

class Property {
    // Get all properties
    static async getAll() {
        try {
            const [rows] = await db.query(`
        SELECT 
          id, 
          title, 
          description, 
          price, 
          location, 
          bedrooms, 
          bathrooms, 
          area, 
          image_url as imageUrl, 
          amenities, 
          contact_email as contactEmail, 
          contact_phone as contactPhone, 
          created_at as createdAt 
        FROM properties
        ORDER BY created_at DESC
      `);

            // Parse amenities from comma-separated string to array
            return rows.map(row => ({
                ...row,
                amenities: row.amenities ? row.amenities.split(',') : []
            }));
        } catch (error) {
            console.error('Error fetching properties:', error);
            throw error;
        }
    }

    // Get a property by ID
    static async getById(id) {
        try {
            const [rows] = await db.query(
                `SELECT 
          id, 
          title, 
          description, 
          price, 
          location, 
          bedrooms, 
          bathrooms, 
          area, 
          image_url as imageUrl, 
          amenities, 
          contact_email as contactEmail, 
          contact_phone as contactPhone, 
          created_at as createdAt 
        FROM properties 
        WHERE id = ?`,
                [id]
            );

            if (rows.length === 0) return null;

            // Parse amenities from comma-separated string to array
            const property = rows[0];
            property.amenities = property.amenities ? property.amenities.split(',') : [];

            return property;
        } catch (error) {
            console.error('Error fetching property by id:', error);
            throw error;
        }
    }

    // Create a new property
    static async create(propertyData) {
        try {
            // Convert amenities array to comma-separated string if it's an array
            const amenitiesString = Array.isArray(propertyData.amenities)
                ? propertyData.amenities.join(',')
                : propertyData.amenities;

            const [result] = await db.query(
                `INSERT INTO properties (
          title, 
          description, 
          price, 
          location, 
          bedrooms, 
          bathrooms, 
          area, 
          image_url, 
          amenities, 
          contact_email, 
          contact_phone
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    propertyData.title,
                    propertyData.description,
                    propertyData.price,
                    propertyData.location,
                    propertyData.bedrooms,
                    propertyData.bathrooms,
                    propertyData.area,
                    propertyData.imageUrl,
                    amenitiesString,
                    propertyData.contactEmail,
                    propertyData.contactPhone
                ]
            );

            const id = result.insertId;
            return { id, ...propertyData };
        } catch (error) {
            console.error('Error creating property:', error);
            throw error;
        }
    }

    // Update a property
    static async update(id, propertyData) {
        try {
            // Convert amenities array to comma-separated string if it's an array
            const amenitiesString = Array.isArray(propertyData.amenities)
                ? propertyData.amenities.join(',')
                : propertyData.amenities;

            const [result] = await db.query(
                `UPDATE properties SET 
          title = ?, 
          description = ?, 
          price = ?, 
          location = ?, 
          bedrooms = ?, 
          bathrooms = ?, 
          area = ?, 
          image_url = ?, 
          amenities = ?, 
          contact_email = ?, 
          contact_phone = ?
        WHERE id = ?`,
                [
                    propertyData.title,
                    propertyData.description,
                    propertyData.price,
                    propertyData.location,
                    propertyData.bedrooms,
                    propertyData.bathrooms,
                    propertyData.area,
                    propertyData.imageUrl,
                    amenitiesString,
                    propertyData.contactEmail,
                    propertyData.contactPhone,
                    id
                ]
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating property:', error);
            throw error;
        }
    }

    // Delete a property
    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM properties WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error deleting property:', error);
            throw error;
        }
    }
}

module.exports = Property;

