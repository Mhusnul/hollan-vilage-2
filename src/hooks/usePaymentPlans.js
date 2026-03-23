import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

/**
 * Custom hook untuk fetch payment plans dari Supabase
 */
export const usePaymentPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch plans
  const fetchPlans = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("payment_plans")
        .select("*")
        .order("created_at", { ascending: true });

      if (fetchError) throw fetchError;
      setPlans(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Add plan
  const addPlan = async (planData) => {
    try {
      const { data, error: addError } = await supabase
        .from("payment_plans")
        .insert([planData])
        .select();

      if (addError) throw addError;
      setPlans([...plans, data[0]]);
      return data[0];
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update plan
  const updatePlan = async (id, planData) => {
    try {
      const { error: updateError } = await supabase
        .from("payment_plans")
        .update(planData)
        .eq("id", id);

      if (updateError) throw updateError;
      const updated = plans.map((p) =>
        p.id === id ? { ...p, ...planData } : p,
      );
      setPlans(updated);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete plan
  const deletePlan = async (id) => {
    try {
      const { error: deleteError } = await supabase
        .from("payment_plans")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;
      setPlans(plans.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    plans,
    loading,
    error,
    fetchPlans,
    addPlan,
    updatePlan,
    deletePlan,
  };
};
