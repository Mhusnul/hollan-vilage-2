import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

/**
 * Custom hook untuk fetch sales contacts (agents) dari Supabase
 */
export const useSalesContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch active contacts
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("sales_contacts")
        .select("*")
        .eq("active", true);

      if (fetchError) throw fetchError;
      setContacts(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Add contact
  const addContact = async (contactData) => {
    try {
      const { data, error: addError } = await supabase
        .from("sales_contacts")
        .insert([contactData])
        .select();

      if (addError) throw addError;
      setContacts([...contacts, data[0]]);
      return data[0];
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update contact
  const updateContact = async (id, contactData) => {
    try {
      const { error: updateError } = await supabase
        .from("sales_contacts")
        .update(contactData)
        .eq("id", id);

      if (updateError) throw updateError;
      const updated = contacts.map((c) =>
        c.id === id ? { ...c, ...contactData } : c,
      );
      setContacts(updated);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    try {
      const { error: deleteError } = await supabase
        .from("sales_contacts")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;
      setContacts(contacts.filter((c) => c.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    addContact,
    updateContact,
    deleteContact,
  };
};
