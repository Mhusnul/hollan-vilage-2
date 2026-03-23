import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

/**
 * Custom hook untuk fetch promotions dari Supabase
 */
export const usePromotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch active promotions
  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("promotions")
        .select("*")
        .eq("active", true)
        .order("display_order", { ascending: true });

      if (fetchError) throw fetchError;
      setPromotions(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  // Add promotion
  const addPromotion = async (promoData) => {
    try {
      const { data, error: addError } = await supabase
        .from("promotions")
        .insert([promoData])
        .select();

      if (addError) throw addError;
      setPromotions([...promotions, data[0]]);
      return data[0];
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update promotion
  const updatePromotion = async (id, promoData) => {
    try {
      const { error: updateError } = await supabase
        .from("promotions")
        .update(promoData)
        .eq("id", id);

      if (updateError) throw updateError;
      const updated = promotions.map((p) =>
        p.id === id ? { ...p, ...promoData } : p,
      );
      setPromotions(updated);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete promotion
  const deletePromotion = async (id) => {
    try {
      const { error: deleteError } = await supabase
        .from("promotions")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;
      setPromotions(promotions.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    promotions,
    loading,
    error,
    fetchPromotions,
    addPromotion,
    updatePromotion,
    deletePromotion,
  };
};
