-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE phrases ENABLE ROW LEVEL SECURITY;

-- Users table policies
-- Users can only see and update their own record
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Sessions table policies
-- Users can only access their own sessions
CREATE POLICY "Users can view own sessions" ON sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON sessions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions" ON sessions
    FOR DELETE USING (auth.uid() = user_id);

-- Phrases table policies
-- Users can only access their own phrases
CREATE POLICY "Users can view own phrases" ON phrases
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own phrases" ON phrases
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own phrases" ON phrases
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own phrases" ON phrases
    FOR DELETE USING (auth.uid() = user_id);