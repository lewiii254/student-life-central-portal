-- Create houses table for rental management
CREATE TABLE public.houses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  location TEXT NOT NULL,
  sub_area TEXT,
  bedrooms INTEGER,
  bathrooms INTEGER,
  features TEXT[],
  image_urls TEXT[],
  landlord_name TEXT NOT NULL,
  landlord_contact TEXT NOT NULL,
  landlord_whatsapp TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.houses ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access
CREATE POLICY "Admin full access on houses" 
ON public.houses 
FOR ALL 
USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_houses_updated_at
BEFORE UPDATE ON public.houses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();