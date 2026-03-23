import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

/**
 * Custom hook untuk fetch content sections dari Supabase
 */
export const useContentSections = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch sections
  const fetchSections = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("content_sections")
        .select("*")
        .order("order", { ascending: true });

      if (fetchError) throw fetchError;
      setSections(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get section by key
  const getSectionByKey = (key) => {
    return sections.find((s) => s.section_key === key);
  };

  useEffect(() => {
    fetchSections();
  }, []);

  // Add section
  const addSection = async (sectionData) => {
    try {
      const { data, error: addError } = await supabase
        .from("content_sections")
        .insert([sectionData])
        .select();

      if (addError) throw addError;
      setSections([...sections, data[0]]);
      return data[0];
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update section
  const updateSection = async (id, sectionData) => {
    try {
      const { error: updateError } = await supabase
        .from("content_sections")
        .update(sectionData)
        .eq("id", id);

      if (updateError) throw updateError;
      const updated = sections.map((s) =>
        s.id === id ? { ...s, ...sectionData } : s,
      );
      setSections(updated);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete section
  const deleteSection = async (id) => {
    try {
      const { error: deleteError } = await supabase
        .from("content_sections")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;
      setSections(sections.filter((s) => s.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    sections,
    loading,
    error,
    fetchSections,
    getSectionByKey,
    addSection,
    updateSection,
    deleteSection,
  };
};
