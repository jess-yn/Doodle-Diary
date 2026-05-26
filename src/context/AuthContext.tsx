import { createContext, useEffect, useState, useContext } from "react";
import supabase from "../services/supabaseClient";
import type { LoginRequest, SignupRequest } from "../types/auth.types";
import type { User, Session } from "@supabase/supabase-js";

const AuthContext = createContext<
  | {
      session: Session | null;
      user: User | undefined;
      signUpUser: (
        payload: SignupRequest,
      ) => Promise<{ success: boolean; data?: any; error?: any }>;
      signInUser: (
        payload: LoginRequest,
      ) => Promise<{ success: boolean; data?: any; error?: any }>;
      signOutUser: () => Promise<void>;
    }
  | undefined
>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | undefined>(undefined);

  const signUpUser = async (userPayload: SignupRequest) => {
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

    if (error) {
      console.error("we got error");
      return { success: false, error };
    }
    return { success: true, data };
  };

  const signInUser = async (userPayload: LoginRequest) => {
    const { data, error } = await supabase.auth.signInWithPassword(userPayload);

    if (error) {
      console.error("There was an error signing in: ", error);
      return { success: false, error };
    }

    return { success: true, data };
  };

  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("There was an error: ", error);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? undefined);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, user, signUpUser, signInUser, signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("UserAuth must be used within an AuthContextProvider");
  return context;
};
