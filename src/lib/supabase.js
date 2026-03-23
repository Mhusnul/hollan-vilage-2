import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vhcshbihiiojxbfrpsfb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoY3NoYmloaWlvanhiZnJwc2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMjE3NTgsImV4cCI6MjA4OTc5Nzc1OH0.CxaES-uqQNetmnnUGY4trMrrPOMkNdGbtlC56n1hlYM";

export const supabase = createClient(supabaseUrl, supabaseKey);
