import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

/**
 * Custom hook untuk manage properties (tipe rumah)
 */
export const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch semua properties
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (err) throw err;
      setProperties(data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single property by id
  const fetchPropertyById = async (id) => {
    try {
      const { data, error: err } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (err) throw err;
      return data;
    } catch (err) {
      console.error("Error fetching property:", err);
      throw err;
    }
  };

  // Create new property
  const addProperty = async (propertyData) => {
    try {
      setError(null);
      const { data, error: err } = await supabase
        .from("properties")
        .insert([
          {
            ...propertyData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select();

      if (err) throw err;
      await fetchProperties();
      return data[0];
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update property
  const updateProperty = async (id, propertyData) => {
    try {
      setError(null);
      const { data, error: err } = await supabase
        .from("properties")
        .update({
          ...propertyData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select();

      if (err) throw err;
      await fetchProperties();
      return data[0];
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete property
  const deleteProperty = async (id) => {
    try {
      setError(null);
      const { error: err } = await supabase
        .from("properties")
        .delete()
        .eq("id", id);

      if (err) throw err;
      await fetchProperties();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Auto fetch on mount
  useEffect(() => {
    fetchProperties();
  }, []);

  return {
    properties,
    loading,
    error,
    fetchProperties,
    fetchPropertyById,
    addProperty,
    updateProperty,
    deleteProperty,
  };
};
