import { supabase } from "./supabase";

export const INQUIRY_STATUSES = [
  "Baru",
  "Dihubungi",
  "Survey",
  "Closing",
  "Batal",
];

export async function submitInquiry(formData) {
  const payload = {
    name: (formData.name || "").trim(),
    phone: (formData.phone || "").trim(),
    email: (formData.email || "").trim(),
    house_type: (formData.houseType || "").trim(),
    message: (formData.message || "").trim(),
    status: "Baru",
  };

  const { error } = await supabase.from("inquiries").insert([payload]);
  if (error) throw error;
}

export async function fetchInquiries() {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function updateInquiry(id, updates) {
  const payload = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("inquiries")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteInquiry(id) {
  const { error } = await supabase.from("inquiries").delete().eq("id", id);
  if (error) throw error;
}
