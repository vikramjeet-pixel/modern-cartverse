// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://iocasjpumdvcynftoiok.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvY2FzanB1bWR2Y3luZnRvaW9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0Nzk2ODksImV4cCI6MjA1NzA1NTY4OX0.kz0yimOFq-jsHkYICAZH0GAeHDhmYMpNGqO3MMOEhwI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);