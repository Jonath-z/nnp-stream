import { createClient } from "@supabase/supabase-js";
import { SUPABASE_API_KEY, SUPABASE_PROJECT_URL } from "@/utils/constant";
import { Category, SavedVideo } from "@/utils/type";

export const supabase = createClient(SUPABASE_PROJECT_URL || "", SUPABASE_API_KEY || "");

export enum Tables {
  FAVORITES = "favorites",
  VIDEOS = "videos",
  USERS = "users",
}

export const saveUserEmail = async (email: string) => {
  return await supabase.from(Tables.USERS).insert({ email });
};

export const getVideosByCategory = async (category: Category) => {
  return await supabase.from(Tables.VIDEOS).select<any, SavedVideo>("*");
};

export const getVideoById = async (id: string) => {
  return await supabase.from(Tables.VIDEOS).select<any, SavedVideo>("*").eq("id", id).single();
};

export const getVideosByCategoryExceptById = async (type: Category, exceptionId: string) => {
  return await supabase.from(Tables.VIDEOS).select<any, SavedVideo>("*").neq("id", exceptionId);
};
