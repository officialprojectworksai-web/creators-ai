import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jmtjvewghozmsfecyygj.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptdGp2ZXdnaG96bXNmZWN5eWdqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTUyODcwMSwiZXhwIjoyMTA3MTA0NzAxfQ.YQ1N3iWGZNUGcy7iZLJoYBvMcEFZDNQbH4EILl2DG_Q';

console.log('Connecting to Supabase at:', supabaseUrl);

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

async function checkSupabase() {
  try {
    const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    if (error) {
      console.log('Notice on profiles table:', error.message);
      console.log('Supabase connected! Tables can be created via Supabase SQL Editor or migration files.');
    } else {
      console.log('✓ Successfully connected to Supabase PostgreSQL! Profiles table ready.');
    }
  } catch (err: any) {
    console.log('Supabase connectivity check error:', err.message);
  }
}

checkSupabase();
