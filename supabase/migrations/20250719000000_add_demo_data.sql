-- =====================================================
-- DEMO DATA MIGRATION
-- This migration adds comprehensive sample/demo data
-- for testing and demonstration purposes
-- =====================================================

-- =====================================================
-- RENTAL LOCATIONS - Sample campus areas
-- =====================================================
INSERT INTO public.rental_locations (name, description, available) VALUES 
('Westlands', 'Prime location near shopping centers and restaurants. Close to campus with excellent public transport.', true),
('Karen', 'Quiet residential area, perfect for students who prefer peaceful studying environment.', true),
('Kilimani', 'Close to universities and colleges, vibrant student community.', true),
('Parklands', 'Affordable housing options with good amenities and security.', true),
('Lavington', 'Upmarket area with modern housing facilities.', true),
('South B', 'Student-friendly area with many shops and eateries nearby.', true),
('South C', 'Safe neighborhood with good transport links.', true),
('Ngara', 'Budget-friendly area close to multiple campuses.', true),
('Eastleigh', 'Diverse community with affordable housing options.', true),
('Kasarani', 'Growing student area with new developments.', true);

-- =====================================================
-- PRODUCTS - Study Essentials
-- =====================================================
INSERT INTO public.products (name, description, price, stock_quantity, category, image_url, low_stock_threshold) VALUES 
-- Calculators
('Casio FX-991EX Scientific Calculator', 'Advanced scientific calculator with 552 functions, perfect for engineering and science students', 3500, 25, 'study_essentials', 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=400', 5),
('Texas Instruments TI-84 Plus', 'Graphing calculator ideal for mathematics and statistics courses', 12000, 10, 'study_essentials', 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=400', 3),

-- Stationery
('Premium Notebook Set (5 Pack)', 'High-quality A4 notebooks with 200 pages each, perfect for note-taking', 800, 100, 'study_essentials', 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400', 20),
('Ballpoint Pen Pack (12 pcs)', 'Smooth writing blue and black ballpoint pens', 350, 150, 'study_essentials', 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400', 30),
('Highlighter Set (6 colors)', 'Fluorescent highlighters for effective studying', 450, 80, 'study_essentials', 'https://images.unsplash.com/photo-1604933834215-2a64950311bd?w=400', 15),
('Scientific Drawing Set', 'Complete geometry set with compass, protractor, rulers, and pencils', 1200, 40, 'study_essentials', 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400', 10),

-- Tech Accessories
('Laptop Stand Adjustable', 'Ergonomic aluminum laptop stand for better posture', 2500, 30, 'study_essentials', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', 5),
('USB Flash Drive 64GB', 'High-speed USB 3.0 flash drive for file storage', 1500, 60, 'study_essentials', 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=400', 10),
('Phone Charging Cable 3-Pack', 'Durable USB-C and Lightning cables', 800, 70, 'study_essentials', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400', 15),
('Wireless Mouse', 'Comfortable wireless mouse for laptop users', 1800, 45, 'study_essentials', 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400', 8),

-- Study Materials
('Medical Terminology Flashcards', '500 flashcards covering essential medical terms', 2000, 25, 'study_essentials', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400', 5),
('Engineering Reference Guide', 'Comprehensive reference book for engineering students', 3500, 20, 'study_essentials', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', 5),
('Study Planner 2024', 'Academic year planner with goal-setting templates', 650, 90, 'study_essentials', 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400', 15),

-- Combo Deals
('Freshman Starter Pack', 'Complete starter pack: 5 notebooks, 12 pens, 1 calculator, 1 planner', 4500, 35, 'study_essentials', 'https://images.unsplash.com/photo-1513001900722-370f803f498d?w=400', 5)
ON CONFLICT DO NOTHING;

-- Mark combo deal
UPDATE public.products 
SET is_combo = true, 
    combo_items = '[{"name": "Notebook Set", "quantity": 1}, {"name": "Pen Pack", "quantity": 1}, {"name": "Calculator", "quantity": 1}, {"name": "Study Planner", "quantity": 1}]'::jsonb
WHERE name = 'Freshman Starter Pack';

-- =====================================================
-- PARTNER SHOPS - Settle Box Partners
-- =====================================================
INSERT INTO public.partner_shops (name, contact, location, commission_rate, whatsapp_link, active) VALUES 
('Campus Furniture Hub', '+254790123456', 'Westlands Plaza, Ground Floor', 12.00, 'https://wa.me/254790123456', true),
('Student Essentials Store', '+254791234567', 'Kilimani Shopping Center', 10.00, 'https://wa.me/254791234567', true),
('HomeComfort Kenya', '+254792345678', 'Karen Village Market', 15.00, 'https://wa.me/254792345678', true),
('Quick Kitchen Supplies', '+254793456789', 'South B Shopping Mall', 11.00, 'https://wa.me/254793456789', true),
('Budget Living Stores', '+254794567890', 'Ngara Market', 8.00, 'https://wa.me/254794567890', true);

-- =====================================================
-- HOUSEHOLD ITEMS - Settle Box Products
-- =====================================================
-- Get partner shop IDs for reference
DO $$
DECLARE
    shop1_id UUID;
    shop2_id UUID;
    shop3_id UUID;
    shop4_id UUID;
    shop5_id UUID;
BEGIN
    SELECT id INTO shop1_id FROM public.partner_shops WHERE name = 'Campus Furniture Hub' LIMIT 1;
    SELECT id INTO shop2_id FROM public.partner_shops WHERE name = 'Student Essentials Store' LIMIT 1;
    SELECT id INTO shop3_id FROM public.partner_shops WHERE name = 'HomeComfort Kenya' LIMIT 1;
    SELECT id INTO shop4_id FROM public.partner_shops WHERE name = 'Quick Kitchen Supplies' LIMIT 1;
    SELECT id INTO shop5_id FROM public.partner_shops WHERE name = 'Budget Living Stores' LIMIT 1;

    -- Furniture Items
    INSERT INTO public.household_items (partner_shop_id, name, price, condition, image_url, available) VALUES 
    (shop1_id, 'Study Desk with Drawer', 5500, 'new', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400', true),
    (shop1_id, 'Ergonomic Study Chair', 4200, 'new', 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=400', true),
    (shop1_id, 'Wooden Wardrobe', 12000, 'used', 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400', true),
    (shop1_id, 'Bookshelf 5-Tier', 3800, 'new', 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400', true),
    (shop1_id, 'Bed Frame (Single)', 8500, 'new', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400', true),
    
    -- Kitchen Items
    (shop4_id, 'Cooking Pot Set (5 pieces)', 3500, 'new', 'https://images.unsplash.com/photo-1584990347449-39b6aa4f2f93?w=400', true),
    (shop4_id, 'Cutlery Set (24 pieces)', 2200, 'new', 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=400', true),
    (shop4_id, 'Dinner Plate Set (6 pcs)', 1800, 'new', 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400', true),
    (shop4_id, 'Electric Kettle 1.8L', 2500, 'new', 'https://images.unsplash.com/photo-1564694202883-46e7d38e4322?w=400', true),
    (shop4_id, 'Rice Cooker', 4500, 'new', 'https://images.unsplash.com/photo-1563822249548-9a72b6a73f95?w=400', true),
    
    -- Cleaning Supplies
    (shop2_id, 'Laundry Basket', 800, 'new', 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400', true),
    (shop2_id, 'Cleaning Supplies Bundle', 1500, 'new', 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400', true),
    (shop2_id, 'Mop and Bucket Set', 1200, 'new', 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400', true),
    
    -- Comfort Items
    (shop3_id, 'Throw Pillows (Set of 4)', 2000, 'new', 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400', true),
    (shop3_id, 'Area Rug 5x7ft', 3500, 'new', 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=400', true),
    (shop3_id, 'Bedding Set (Comforter + Sheets)', 4500, 'new', 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=400', true),
    (shop3_id, 'Study Lamp LED', 1800, 'new', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', true),
    
    -- Storage Solutions
    (shop5_id, 'Plastic Storage Boxes (3 pack)', 1200, 'new', 'https://images.unsplash.com/photo-1600425420829-6d6c5bca5827?w=400', true),
    (shop5_id, 'Shoe Rack 4-Tier', 2200, 'new', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400', true),
    (shop5_id, 'Hanging Closet Organizer', 950, 'new', 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400', true);
END $$;

-- =====================================================
-- BICYCLES - Fleet for Rental
-- =====================================================
INSERT INTO public.bicycles (name, description, hourly_rate, daily_rate, image_url, status) VALUES 
('Mountain Bike Pro', 'Durable mountain bike perfect for rough terrain and long rides', 150, 800, 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400', 'available'),
('City Cruiser Classic', 'Comfortable city bike ideal for campus commutes', 100, 500, 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=400', 'available'),
('Speed Racer Elite', 'Lightweight racing bike for speed enthusiasts', 200, 1000, 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400', 'available'),
('Eco Commuter', 'Electric-assist bicycle for easy campus navigation', 250, 1200, 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=400', 'available'),
('Campus Cruiser', 'Reliable bike for everyday student use', 80, 400, 'https://images.unsplash.com/photo-1511994714008-b6fa15bb8b8e?w=400', 'available'),
('Lady''s Comfort Bike', 'Specially designed comfortable bike for female students', 120, 600, 'https://images.unsplash.com/photo-1559826257-403348325a59?w=400', 'available'),
('Folding Bike Compact', 'Space-saving folding bike, perfect for small apartments', 180, 900, 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400', 'available'),
('Student Special', 'Budget-friendly option for daily campus rides', 70, 350, 'https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?w=400', 'available'),
('Hybrid All-Terrain', 'Versatile bike suitable for both city and trail riding', 140, 700, 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=400', 'available'),
('BMX Stunt Bike', 'Sturdy BMX for those who love tricks and stunts', 160, 800, 'https://images.unsplash.com/photo-1475666675596-cca2035b3d79?w=400', 'available'),
('Tandem Bike', 'Two-seater bike for riding with friends', 300, 1500, 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=400', 'available'),
('Kids Bike Small', 'Small bike suitable for shorter riders', 60, 300, 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400', 'available');

-- =====================================================
-- EVENTS - Campus Activities
-- =====================================================
INSERT INTO public.events (title, description, event_date, banner_image_url, ticket_price, max_attendees, current_attendees, status) VALUES 
('Freshers Week Carnival', 'Welcome party for new students with live music, food, and entertainment', '2025-01-15 18:00:00+00', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800', 500, 500, 234, 'active'),
('Tech Summit 2025', 'Annual technology conference featuring industry leaders and workshops', '2025-02-20 09:00:00+00', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', 1000, 300, 156, 'active'),
('Sports Day Championship', 'Inter-faculty sports competition with multiple events', '2025-03-10 08:00:00+00', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800', 0, 1000, 678, 'active'),
('Career Fair 2025', 'Meet top employers and explore career opportunities', '2025-04-05 10:00:00+00', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800', 0, 800, 423, 'active'),
('Cultural Night', 'Celebrate diversity with music, dance, and food from around the world', '2025-05-12 19:00:00+00', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', 300, 400, 189, 'active'),
('Hackathon Weekend', '48-hour coding competition with prizes and mentorship', '2025-06-15 09:00:00+00', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800', 200, 150, 97, 'active'),
('Business Pitch Competition', 'Showcase your startup idea and win seed funding', '2025-07-20 14:00:00+00', 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800', 500, 100, 45, 'active'),
('Music Festival', 'End of semester music festival featuring top local artists', '2025-08-25 17:00:00+00', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800', 800, 1500, 1234, 'active'),
('Science Exhibition', 'Students showcase innovative research projects', '2025-09-10 10:00:00+00', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800', 0, 500, 234, 'active'),
('Alumni Networking Night', 'Connect with successful alumni and build your network', '2025-10-15 18:00:00+00', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800', 1500, 200, 87, 'active');

-- =====================================================
-- HOUSES - Available Rentals
-- =====================================================
INSERT INTO public.houses (title, description, price, location, sub_area, bedrooms, bathrooms, features, image_urls, landlord_name, landlord_contact, landlord_whatsapp, available) VALUES 
-- Westlands Properties
('Cozy Studio Apartment', 'Modern studio perfect for single students. Fully furnished with WiFi included.', 18000, 'Westlands', 'Parklands Road', 0, 1, ARRAY['WiFi', 'Furnished', 'Security', 'Water 24/7', 'Parking'], ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'], 'Jane Kamau', '+254790111222', 'https://wa.me/254790111222', true),
('1 Bedroom Apartment', 'Spacious one bedroom in secure compound. Walking distance to campus.', 25000, 'Westlands', 'Lower Kabete', 1, 1, ARRAY['WiFi', 'Furnished', 'Security Guard', 'Backup Generator', 'CCTV'], ARRAY['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'], 'Peter Mwangi', '+254791222333', 'https://wa.me/254791222333', true),
('2 Bedroom Apartment', 'Perfect for sharing. Near shopping centers and public transport.', 35000, 'Westlands', 'Westlands Plaza', 2, 2, ARRAY['WiFi', 'Gym', 'Swimming Pool', 'Security', 'Parking', 'Elevator'], ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], 'Sarah Omondi', '+254792333444', 'https://wa.me/254792333444', true),

-- Karen Properties
('Bedsitter Karen', 'Affordable bedsitter in quiet neighborhood. Great for focused studying.', 12000, 'Karen', 'Karen East', 0, 1, ARRAY['WiFi', 'Security', 'Water 24/7'], ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'], 'David Kipchoge', '+254793444555', 'https://wa.me/254793444555', true),
('Spacious 1BR Karen', 'Large one bedroom with modern kitchen and balcony.', 28000, 'Karen', 'Karen Hardy', 1, 1, ARRAY['WiFi', 'Furnished', 'Balcony', 'Security', 'Garden Access'], ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'], 'Grace Wanjiru', '+254794555666', 'https://wa.me/254794555666', true),

-- Kilimani Properties
('Student Studio Kilimani', 'Newly renovated studio near multiple universities.', 16000, 'Kilimani', 'Kilimani Road', 0, 1, ARRAY['WiFi', 'Furnished', 'Security', 'Laundry Area'], ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], 'John Mutua', '+254795666777', 'https://wa.me/254795666777', true),
('1BR Kilimani Centre', 'Close to supermarkets and entertainment spots.', 23000, 'Kilimani', 'Kindaruma Road', 1, 1, ARRAY['WiFi', 'Security 24/7', 'Parking', 'Backup Water'], ARRAY['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'], 'Mary Achieng', '+254796777888', 'https://wa.me/254796777888', true),
('Shared 3BR Apartment', 'Looking for 2 more roommates. Rent per room: KES 15,000', 45000, 'Kilimani', 'Argwings Kodhek', 3, 2, ARRAY['WiFi', 'Furnished', 'Security', 'Kitchen', 'Living Room'], ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], 'James Otieno', '+254797888999', 'https://wa.me/254797888999', true),

-- Parklands Properties
('Budget Bedsitter', 'Affordable option for students on a budget.', 10000, 'Parklands', 'Parklands Avenue', 0, 1, ARRAY['Security', 'Water'], ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'], 'Anne Njeri', '+254798999000', 'https://wa.me/254798999000', true),
('1BR Parklands', 'Clean and comfortable one bedroom apartment.', 20000, 'Parklands', '3rd Parklands', 1, 1, ARRAY['WiFi', 'Security', 'Water', 'Parking'], ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'], 'Robert Kimani', '+254799000111', 'https://wa.me/254799000111', true),

-- South B Properties  
('Furnished Studio South B', 'Move-in ready with all appliances included.', 17000, 'South B', 'South B Estate', 0, 1, ARRAY['WiFi', 'Furnished', 'Security', 'Appliances', 'Water 24/7'], ARRAY['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'], 'Lucy Wambui', '+254790222333', 'https://wa.me/254790222333', true),
('2BR Family Apartment', 'Suitable for small families or sharing students.', 32000, 'South B', 'South B Shopping', 2, 1, ARRAY['WiFi', 'Security', 'Parking', 'Playground', 'Water'], ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], 'Michael Odhiambo', '+254791333444', 'https://wa.me/254791333444', true),

-- Ngara Properties
('Single Room Ngara', 'Very affordable single room near market.', 8000, 'Ngara', 'Ngara Market', 0, 1, ARRAY['Security', 'Water'], ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'], 'Paul Wekesa', '+254792444555', 'https://wa.me/254792444555', true),

-- Kasarani Properties
('Modern Bedsitter', 'Newly built bedsitter in upcoming area.', 13000, 'Kasarani', 'Kasarani Mwiki', 0, 1, ARRAY['WiFi', 'Security', 'Water', 'Modern Fittings'], ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'], 'Esther Nyambura', '+254793555666', 'https://wa.me/254793555666', true),
('1BR Kasarani', 'Affordable one bedroom with great amenities.', 19000, 'Kasarani', 'Kasarani Santon', 1, 1, ARRAY['WiFi', 'Security 24/7', 'Water', 'Parking', 'Gate'], ARRAY['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'], 'Francis Kariuki', '+254794666777', 'https://wa.me/254794666777', true);

-- =====================================================
-- SAMPLE RENTAL REQUESTS - For admin dashboard demo
-- =====================================================
INSERT INTO public.rental_requests (name, contact, preferred_location, budget, status, assigned_agent) VALUES 
('Alice Muthoni', '+254700111222', 'Westlands', 20000, 'pending', NULL),
('Bob Kariuki', '+254701222333', 'Kilimani', 15000, 'assigned', 'Agent Sarah'),
('Carol Wanjiku', '+254702333444', 'Karen', 25000, 'completed', 'Agent John'),
('Dennis Ochieng', '+254703444555', 'Parklands', 12000, 'pending', NULL),
('Emma Akinyi', '+254704555666', 'South B', 18000, 'assigned', 'Agent Mary');

-- =====================================================
-- SAMPLE ORDERS - For admin dashboard demo
-- =====================================================
INSERT INTO public.orders (customer_name, customer_contact, items, total_amount, status, payment_status, payment_method, delivery_address) VALUES 
('John Kamau', '+254705666777', '[{"name": "Scientific Calculator", "quantity": 1, "price": 2500}]'::jsonb, 2500, 'delivered', 'completed', 'M-Pesa', 'Westlands Campus'),
('Jane Wambui', '+254706777888', '[{"name": "Notebook Set", "quantity": 2, "price": 800}, {"name": "Pen Pack", "quantity": 1, "price": 350}]'::jsonb, 1950, 'processing', 'completed', 'M-Pesa', 'Kilimani Hostel'),
('Peter Omondi', '+254707888999', '[{"name": "Laptop Stand", "quantity": 1, "price": 2500}, {"name": "Wireless Mouse", "quantity": 1, "price": 1800}]'::jsonb, 4300, 'pending', 'pending', 'Cash', 'Karen Apartments');

-- =====================================================
-- SAMPLE DELIVERY REQUESTS
-- =====================================================
INSERT INTO public.delivery_requests (customer_name, customer_contact, service_type, pickup_address, delivery_address, status, assigned_rider, delivery_fee) VALUES 
('Mary Njeri', '+254708999000', 'parcel', 'Westlands Plaza', 'Karen Estate Block B', 'in_transit', 'Rider #3', 350),
('David Kiprop', '+254709000111', 'document', 'City Center', 'Kilimani Office', 'completed', 'Rider #1', 200),
('Grace Moraa', '+254700111222', 'food', 'Java Westlands', 'Parklands Hostel', 'pending', NULL, 150);

-- =====================================================
-- SAMPLE BICYCLE BOOKINGS
-- =====================================================
DO $$
DECLARE
    bike1_id UUID;
    bike2_id UUID;
    bike3_id UUID;
BEGIN
    SELECT id INTO bike1_id FROM public.bicycles WHERE name = 'City Cruiser Classic' LIMIT 1;
    SELECT id INTO bike2_id FROM public.bicycles WHERE name = 'Mountain Bike Pro' LIMIT 1;
    SELECT id INTO bike3_id FROM public.bicycles WHERE name = 'Campus Cruiser' LIMIT 1;
    
    INSERT INTO public.bicycle_bookings (bicycle_id, customer_name, customer_contact, rental_start, rental_end, total_cost, status) VALUES 
    (bike1_id, 'Kevin Mutua', '+254711222333', NOW() - INTERVAL '2 hours', NOW() + INTERVAL '2 hours', 400, 'active'),
    (bike2_id, 'Linda Wangari', '+254712333444', NOW() + INTERVAL '1 day', NOW() + INTERVAL '2 days', 1600, 'active'),
    (bike3_id, 'Mark Otieno', '+254713444555', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 hour', 400, 'completed');
END $$;

-- =====================================================
-- SAMPLE ADVERTISEMENTS
-- =====================================================
INSERT INTO public.advertisements (title, content, image_url, advertiser_contact, payment_status, amount_paid, status, display_start, display_end) VALUES 
('Campus Bookstore Sale', 'Get 20% off all textbooks this week only! Visit Campus Bookstore.', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800', '+254714555666', 'completed', 2000, 'active', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days'),
('Student Laptop Deals', 'Special student discounts on laptops and accessories. Free delivery!', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800', '+254715666777', 'completed', 3000, 'active', CURRENT_DATE, CURRENT_DATE + INTERVAL '14 days'),
('Pizza Night Special', 'Every Friday - Buy 1 Get 1 Free! Pizza Inn Student Special.', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800', '+254716777888', 'completed', 1500, 'active', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days');

-- =====================================================
-- SAMPLE CUSTOMER INQUIRIES
-- =====================================================
INSERT INTO public.customer_inquiries (customer_name, customer_contact, subject, message, status, response) VALUES 
('Sarah Mutua', '+254717888999', 'Delivery Delay', 'My order #12345 has not arrived yet. When will it be delivered?', 'resolved', 'Your order is out for delivery and will arrive today by 5 PM.'),
('Tom Mwangi', '+254718999000', 'Payment Issue', 'I paid via M-Pesa but my order shows pending payment.', 'in_progress', NULL),
('Nancy Auma', '+254719000111', 'Product Inquiry', 'Do you have engineering calculators in stock?', 'unread', NULL);

-- =====================================================
-- END OF DEMO DATA MIGRATION
-- =====================================================
-- Summary:
-- - 10 Rental Locations
-- - 14 Study Essential Products
-- - 5 Partner Shops
-- - 20 Household Items
-- - 12 Bicycles
-- - 10 Campus Events
-- - 15 Houses for Rent
-- - 5 Rental Requests
-- - 3 Orders
-- - 3 Delivery Requests
-- - 3 Bicycle Bookings
-- - 3 Advertisements
-- - 3 Customer Inquiries
-- =====================================================
