/// <reference types="vite/client" />
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://fxtpagntksqhdfjchefw.supabase.co";
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_MUdBgHOQ8wvUnSqUvgenYg_t_sCB0KI";

export const supabase = createClient(supabaseUrl, supabaseKey);
