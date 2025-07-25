import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({path: 'variables.env'});

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
