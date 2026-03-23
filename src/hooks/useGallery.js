import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

/**
 * Custom hook untuk manage gallery (galeri foto)
 */
export const useGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("gallery")
        .select("*")
        .order("display_order", { ascending: true });

      if (err) throw err;
      setGallery(data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  const addGalleryItem = async (galleryData) => {
    try {
      setError(null);
      const { data, error: err } = await supabase
        .from("gallery")
        .insert([
          {
            ...galleryData,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (err) throw err;
      await fetchGallery();
      return data[0];
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateGalleryItem = async (id, galleryData) => {
    try {
      setError(null);
      const { data, error: err } = await supabase
        .from("gallery")
        .update(galleryData)
        .eq("id", id)
        .select();

      if (err) throw err;
      await fetchGallery();
      return data[0];
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteGalleryItem = async (id) => {
    try {
      setError(null);
      const { error: err } = await supabase
        .from("gallery")
        .delete()
        .eq("id", id);

      if (err) throw err;
      await fetchGallery();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return {
    gallery,
    loading,
    error,
    fetchGallery,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
  };
};
