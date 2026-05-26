import supabase from "./supabaseClient";
import type { SignupRequest } from "../types/auth.types";

// const REDIRECT_URL = import.meta.env.VITE_SUPABASE_REDIRECT_URL;

export const signUp = async (userPayload: SignupRequest) => {
  console.log(userPayload);
  const { data, error } = await supabase.auth.signUp({
    email: userPayload.email,
    password: userPayload.password,
    options: {
      data: {
        full_name: userPayload.username,
      },
    },
  });

  console.log("did we finish?");

  if (error) {
    console.log("we got error");
    return { success: false, error };
  }

  if (data) {
    console.log("we got data");
    console.log(data);
  }

  return { success: true, data };
};

export const login = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  return { error };
};
