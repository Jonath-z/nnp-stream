// import { createClient } from "@supabase/supabase-js";
import { Category, SavedVideo } from "@/utils/type";
import { createClient } from "./component";


export const supabase = createClient(); // default supabase calling-> from client components


export enum Tables {
  FAVORITES = "favorites",
  VIDEOS = "videos",
  USERS = "users",
}

export const saveUserEmail = async (email: string) => {
  return await supabase.from(Tables.USERS).insert({ email });
};

export const loginWithMagicLink = async (email: string) => {
  const {data, error} =  await supabase.auth.signInWithOtp({ 
    email : email,
    options : {
      shouldCreateUser : true,
    }
  });
  if (error) {
    console.error('Error logging in:', error.message); // only in dev
  }
  return data;
};


export const getVideosByCategory = async (type: Category) => {
  return await supabase.from(Tables.VIDEOS).select<any, SavedVideo>().textSearch("type", type, {
    type: "websearch",
    config: "french",
  });
};

export const searchVideos = async (query: string) => {
  const searchQuery = query
    .trim()
    .split(" ")
    .map((text) => {
      return `'${text}'`;
    })
    .join(" | ");

  return await supabase.from(Tables.VIDEOS).select<any, SavedVideo>().textSearch("description", `${searchQuery}`, {
    type: "websearch",
    config: "french",
  });
};

export const getVideoById = async (id: string) => {
  return await supabase.from(Tables.VIDEOS).select<any, SavedVideo>("*").eq("id", id).single();
};

export const getVideosByCategoryExceptById = async (type: Category, exceptionId: string) => {
  return await supabase.from(Tables.VIDEOS).select<any, SavedVideo>("*").neq("id", exceptionId);
};
