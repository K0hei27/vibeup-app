-- Create anonymous_usage table to track transformations from non-logged-in users
CREATE TABLE IF NOT EXISTS public.anonymous_usage (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    original_text TEXT NOT NULL,
    transformed_text TEXT NOT NULL,
    key_phrases JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    ip_address INET,
    user_agent TEXT
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_anonymous_usage_created_at ON public.anonymous_usage(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_anonymous_usage_original_text ON public.anonymous_usage USING gin(to_tsvector('english', original_text));

-- Enable RLS (Row Level Security) but allow anonymous inserts
ALTER TABLE public.anonymous_usage ENABLE ROW LEVEL SECURITY;

-- Policy to allow anonymous inserts (no authentication required)
CREATE POLICY "Allow anonymous usage tracking" ON public.anonymous_usage
    FOR INSERT 
    TO anon 
    WITH CHECK (true);

-- Policy to allow service role to read all data (for admin analytics)
CREATE POLICY "Allow service role to read all anonymous usage" ON public.anonymous_usage
    FOR SELECT 
    TO service_role 
    USING (true);

-- Grant necessary permissions
GRANT INSERT ON public.anonymous_usage TO anon;
GRANT ALL ON public.anonymous_usage TO service_role;