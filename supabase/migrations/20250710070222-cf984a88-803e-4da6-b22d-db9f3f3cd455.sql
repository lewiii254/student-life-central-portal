
-- Create admin users table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rental requests table
CREATE TABLE public.rental_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  preferred_location TEXT,
  budget INTEGER,
  status TEXT DEFAULT 'pending',
  assigned_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rental settings table
CREATE TABLE public.rental_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  search_fee INTEGER DEFAULT 200,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rental locations table
CREATE TABLE public.rental_locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table for study essentials
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  category TEXT DEFAULT 'study_essentials',
  image_url TEXT,
  stock_quantity INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 5,
  is_combo BOOLEAN DEFAULT false,
  combo_items JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_contact TEXT NOT NULL,
  items JSONB NOT NULL,
  total_amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  payment_method TEXT,
  delivery_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create partner shops table
CREATE TABLE public.partner_shops (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  location TEXT,
  commission_rate DECIMAL(5,2) DEFAULT 10.00,
  whatsapp_link TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create household items table
CREATE TABLE public.household_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_shop_id UUID REFERENCES public.partner_shops,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  condition TEXT DEFAULT 'new',
  image_url TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create delivery requests table
CREATE TABLE public.delivery_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_contact TEXT NOT NULL,
  service_type TEXT NOT NULL,
  pickup_address TEXT,
  delivery_address TEXT,
  status TEXT DEFAULT 'pending',
  assigned_rider TEXT,
  delivery_fee INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bicycles table
CREATE TABLE public.bicycles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  hourly_rate INTEGER NOT NULL,
  daily_rate INTEGER NOT NULL,
  image_url TEXT,
  status TEXT DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bicycle bookings table
CREATE TABLE public.bicycle_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bicycle_id UUID REFERENCES public.bicycles,
  customer_name TEXT NOT NULL,
  customer_contact TEXT NOT NULL,
  rental_start TIMESTAMP WITH TIME ZONE NOT NULL,
  rental_end TIMESTAMP WITH TIME ZONE NOT NULL,
  total_cost INTEGER NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  banner_image_url TEXT,
  ticket_price INTEGER DEFAULT 0,
  max_attendees INTEGER,
  current_attendees INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create advertisements table
CREATE TABLE public.advertisements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  advertiser_contact TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  amount_paid INTEGER DEFAULT 100,
  status TEXT DEFAULT 'pending_approval',
  display_start DATE,
  display_end DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customer inquiries table
CREATE TABLE public.customer_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_contact TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  response TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.household_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bicycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bicycle_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access (admin users can access everything)
CREATE POLICY "Admin full access" ON public.admin_users FOR ALL USING (true);
CREATE POLICY "Admin full access" ON public.rental_requests FOR ALL USING (true);
CREATE POLICY "Admin full access" ON public.rental_settings FOR ALL USING (true);
CREATE POLICY "Admin full access" ON public.rental_locations FOR ALL USING (true);
CREATE POLICY "Admin full access" ON public.products FOR ALL USING (true);
CREATE POLICY "Admin full access" ON public.orders FOR ALL USING (true);
CREATE POLICY "Admin full access" ON public.partner_shops FOR ALL USING (true);
CREATE POLICY "Admin full access" ON public.household_items FOR ALL USING (true);
CREATE POLICY "Admin full access" ON public.delivery_requests FOR ALL USING (true);
CREATE POLICY "Admin full access" ON public.bicycles FOR ALL USING (true);
CREATE POLICY "Admin full access" ON public.bicycle_bookings FOR ALL USING (true);
CREATE POLICY "Admin full access" ON public.events FOR ALL USING (true);
CREATE POLICY "Admin full access" ON public.advertisements FOR ALL USING (true);
CREATE POLICY "Admin full access" ON public.customer_inquiries FOR ALL USING (true);

-- Insert initial data
INSERT INTO public.rental_settings (search_fee) VALUES (200);

-- Insert some sample data for testing
INSERT INTO public.rental_requests (name, contact, preferred_location, budget) VALUES 
('John Doe', '+254790767347', 'Westlands', 15000),
('Jane Smith', '+254712345678', 'Karen', 20000);

INSERT INTO public.products (name, description, price, stock_quantity, category) VALUES 
('Scientific Calculator', 'Advanced calculator for engineering students', 2500, 15, 'study_essentials'),
('Notebook Set', 'Pack of 5 quality notebooks', 800, 50, 'study_essentials');

INSERT INTO public.rental_locations (name, description) VALUES 
('Westlands', 'Prime location near shopping centers'),
('Karen', 'Quiet residential area'),
('Kilimani', 'Close to universities and colleges');
