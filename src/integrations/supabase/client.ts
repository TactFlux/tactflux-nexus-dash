// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qcszoetnsqmrcdankful.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjc3pvZXRuc3FtcmNkYW5rZnVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNTcyNzQsImV4cCI6MjA1OTkzMzI3NH0.7TNRzDwXzw13Kb2uT4TgqKrFdwcJDX4sb22Ep-uxzB0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);