-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS dreams_property;

-- Use the database
USE dreams_property;

-- Create properties table if it doesn't exist
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
);

-- Insert sample data
INSERT INTO properties (
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
) VALUES 
(
  'Modern  Apartment',
  'A beautiful modern apartment in the heart of downtown with stunning city views. Features include hardwood floors, stainless steel appliances, and a private balcony.',
  350000.00,
  'Acrra, City Center',
  2,
  2.0,
  1200,
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
  'Parking,Gym,Swimming Pool,Security',
  'maame@dreamsproperty.com',
  '+1 (555) 123-4567'
),
(
  'Dreams Home',
  'Spacious family home in a quiet suburban neighborhood. Perfect for raising a family with a large backyard, modern kitchen, and close to excellent schools.',
  550000.00,
  'Oakridge Suburb',
  4,
  3.0,
  2500,
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
  'Garden,Garage,Fireplace,Central Heating/AC',
  'contact@dreamsproperty.com',
  '+1 (555) 123-4567'
),
(
  'Luxury Beach Villa',
  'Breathtaking beach villa with direct access to the shoreline. Featuring panoramic ocean views, a private pool, and high-end finishes throughout.',
  1200000.00,
  'Coastal Heights',
  5,
  4.5,
  3800,
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
  'Private Pool,Beach Access,Home Theater,Wine Cellar,Smart Home',
  'luxury@dreamsproperty.com',
  '+1 (555) 987-6543'
),
(
  'Urban Loft Studio',
  'Trendy loft studio in the artistic district. High ceilings, exposed brick, and modern finishes make this property perfect for young professionals.',
  275000.00,
  'Arts District',
  1,
  1.0,
  850,
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
  'Rooftop Terrace,Bike Storage,Communal Workspace',
  'urban@dreamsproperty.com',
  '+1 (555) 456-7890'
),
(
  'Mountain View Cabin',
  'Cozy cabin retreat with breathtaking mountain views. Perfect for those seeking tranquility and a connection with nature without sacrificing modern comforts.',
  425000.00,
  'Mountain Ridge',
  3,
  2.0,
  1650,
  'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce',
  'Fireplace,Hiking Trails,Outdoor Deck,Solar Panels',
  'mountains@dreamsproperty.com',
  '+1 (555) 765-4321'
); 