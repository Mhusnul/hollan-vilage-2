import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";
import { marketing as fallbackMarketing } from "../data/config";

export function buildWhatsappUrl(phoneOrUrl) {
  const raw = (phoneOrUrl || "").trim();
  if (!raw) return fallbackMarketing.agents[0].whatsapp;
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw;
  }
  const digits = raw.replace(/\D/g, "");
  if (!digits) return fallbackMarketing.agents[0].whatsapp;
  const normalized = digits.startsWith("0")
    ? "62" + digits.slice(1)
    : digits.startsWith("8")
    ? "62" + digits
    : digits;
  return `https://wa.me/${normalized}`;
}

export const DEFAULT_MARKETING_SETTINGS = {
  id: 1,
  name: fallbackMarketing.name,
  phone: fallbackMarketing.phone,
  email: fallbackMarketing.email,
  officeAddress: fallbackMarketing.officeAddress,
  operationalHours: fallbackMarketing.operationalHours,
  website: fallbackMarketing.website,
  instagram: fallbackMarketing.instagram,
  agents: fallbackMarketing.agents,
  bankTransfer: fallbackMarketing.bankTransfer,
};

export function mapDbRowToMarketing(row) {
  if (!row) return DEFAULT_MARKETING_SETTINGS;
  const agents =
    Array.isArray(row.agents) && row.agents.length > 0
      ? row.agents.map((a, idx) => ({
          id: a.id ?? idx + 1,
          name: a.name || "",
          role: a.role || "Property Advisor Resmi",
          phone: a.phone || "",
          whatsapp: buildWhatsappUrl(a.whatsapp || a.phone),
        }))
      : DEFAULT_MARKETING_SETTINGS.agents;

  return {
    id: row.id,
    name: row.office_name || DEFAULT_MARKETING_SETTINGS.name,
    phone: row.phone || DEFAULT_MARKETING_SETTINGS.phone,
    email: row.email || DEFAULT_MARKETING_SETTINGS.email,
    officeAddress:
      row.office_address || DEFAULT_MARKETING_SETTINGS.officeAddress,
    operationalHours:
      row.operational_hours || DEFAULT_MARKETING_SETTINGS.operationalHours,
    website: row.website || DEFAULT_MARKETING_SETTINGS.website,
    instagram: row.instagram || DEFAULT_MARKETING_SETTINGS.instagram,
    agents,
    bankTransfer: fallbackMarketing.bankTransfer,
  };
}

export async function fetchMarketingSettings() {
  const { data, error } = await supabase
    .from("marketing_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) throw error;
  return mapDbRowToMarketing(data);
}

export async function updateMarketingSettings(form) {
  const cleanedAgents = (form.agents || [])
    .filter((a) => (a.name || "").trim() || (a.phone || "").trim())
    .map((a, idx) => ({
      id: a.id ?? idx + 1,
      name: (a.name || "").trim(),
      role: (a.role || "Property Advisor Resmi").trim(),
      phone: (a.phone || "").trim(),
      whatsapp: buildWhatsappUrl(a.whatsapp || a.phone),
    }));

  const payload = {
    id: 1,
    office_name: (form.name || "").trim(),
    phone: (form.phone || "").trim(),
    email: (form.email || "").trim(),
    office_address: (form.officeAddress || "").trim(),
    operational_hours: (form.operationalHours || "").trim(),
    website: (form.website || "").trim(),
    instagram: (form.instagram || "").trim(),
    agents:
      cleanedAgents.length > 0
        ? cleanedAgents
        : DEFAULT_MARKETING_SETTINGS.agents,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("marketing_settings")
    .upsert(payload, { onConflict: "id" })
    .select()
    .single();

  if (error) throw error;
  return mapDbRowToMarketing(data);
}

export function useMarketingSettings() {
  const [marketing, setMarketing] = useState(DEFAULT_MARKETING_SETTINGS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchMarketingSettings();
      setMarketing(data);
    } catch (err) {
      console.error("Failed to fetch marketing_settings from Supabase:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { marketing, loading, reload };
}
