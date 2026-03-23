import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

/**
 * Custom hook untuk manage facilities (fasilitas)
 */
export const useFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFacilities = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("facilities")
        .select("*")
        .order("display_order", { ascending: true });

      if (err) throw err;
      setFacilities(data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching facilities:", err);
    } finally {
      setLoading(false);
    }
  };

  const addFacility = async (facilityData) => {
    try {
      setError(null);
      const { data, error: err } = await supabase
        .from("facilities")
        .insert([
          {
            ...facilityData,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (err) throw err;
      await fetchFacilities();
      return data[0];
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateFacility = async (id, facilityData) => {
    try {
      setError(null);
      const { data, error: err } = await supabase
        .from("facilities")
        .update(facilityData)
        .eq("id", id)
        .select();

      if (err) throw err;
      await fetchFacilities();
      return data[0];
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteFacility = async (id) => {
    try {
      setError(null);
      const { error: err } = await supabase
        .from("facilities")
        .delete()
        .eq("id", id);

      if (err) throw err;
      await fetchFacilities();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  return {
    facilities,
    loading,
    error,
    fetchFacilities,
    addFacility,
    updateFacility,
    deleteFacility,
  };
};
