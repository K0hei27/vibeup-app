-- Create phrases table
CREATE TABLE IF NOT EXISTS phrases (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    phrase TEXT NOT NULL,
    context TEXT,
    usage_example TEXT,
    learned_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_phrases_user_id ON phrases(user_id);
CREATE INDEX IF NOT EXISTS idx_phrases_learned_date ON phrases(learned_date DESC);
CREATE INDEX IF NOT EXISTS idx_phrases_phrase ON phrases(phrase);

-- Create trigger for phrases table
CREATE TRIGGER update_phrases_updated_at 
    BEFORE UPDATE ON phrases 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();