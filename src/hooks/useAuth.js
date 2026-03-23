import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

/**
 * Custom hook untuk Supabase Authentication
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;
        setUser(session?.user || null);
      } catch (err) {
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setError(null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) throw loginError;
      setUser(data.user);
      return data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setLoading(true);
      const { error: logoutError } = await supabase.auth.signOut();
      if (logoutError) throw logoutError;
      setUser(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Sign up (optional)
  const signup = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signupError) throw signupError;
      return data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    signup,
    isAuthenticated: !!user,
  };
};
