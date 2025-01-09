import { createClient } from "@supabase/supabase-js";
import { SUPABASE_API_KEY, SUPABASE_PROJECT_URL } from "@/utils/constant";

export const supabase = createClient(SUPABASE_PROJECT_URL || "", SUPABASE_API_KEY || "");

enum Tables {
  FAVORITES = "favorites",
  VIDEOS = "videos",
  USERS = "users",
}

export const saveUserEmail = async (email: string) => {
  return await supabase.from(Tables.USERS).insert({ email });
};
