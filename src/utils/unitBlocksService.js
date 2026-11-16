import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";
import { denahPerumahan } from "../data/config";

export const BLOCK_STATUSES = ["Tersedia", "Terbatas", "Sold Out"];

const FALLBACK_BLOCKS = denahPerumahan.unitDetails.map((u) => ({
  id: u.no,
  sortOrder: u.no,
  no: u.no,
  block: u.block,
  landArea: u.landArea,
  unit: u.unit,
  availableUnits: u.unit,
  luasUnit: u.luasUnit,
  status: "Tersedia",
}));

export function mapDbRowToBlock(row, index = 0) {
  return {
    id: row.id,
    sortOrder: row.sort_order ?? index + 1,
    no: row.sort_order ?? index + 1,
    block: row.block,
    landArea: row.land_area,
    unit: Number(row.total_units ?? 0),
    availableUnits: Number(row.available_units ?? 0),
    luasUnit: row.luas_unit || "",
    status: row.status || "Tersedia",
    updatedAt: row.updated_at,
  };
}

export async function fetchUnitBlocks() {
  const { data, error } = await supabase
    .from("unit_blocks")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error) throw error;
  return (data || []).map((row, idx) => mapDbRowToBlock(row, idx));
}

export async function createUnitBlock(form) {
  const payload = {
    sort_order: Number(form.sortOrder ?? 1),
    block: (form.block || "").trim().toUpperCase(),
    land_area: (form.landArea || "").trim(),
    total_units: Number(form.unit ?? 0),
    available_units: Number(form.availableUnits ?? 0),
    luas_unit: (form.luasUnit || "").trim(),
    status: form.status || "Tersedia",
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("unit_blocks")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return mapDbRowToBlock(data);
}

export async function updateUnitBlock(id, form) {
  const payload = {
    sort_order: Number(form.sortOrder ?? 1),
    block: (form.block || "").trim().toUpperCase(),
    land_area: (form.landArea || "").trim(),
    total_units: Number(form.unit ?? 0),
    available_units: Number(form.availableUnits ?? 0),
    luas_unit: (form.luasUnit || "").trim(),
    status: form.status || "Tersedia",
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("unit_blocks")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return mapDbRowToBlock(data);
}

export async function deleteUnitBlock(id) {
  const { error } = await supabase.from("unit_blocks").delete().eq("id", id);
  if (error) throw error;
}

export function useUnitBlocks() {
  const [blocks, setBlocks] = useState(FALLBACK_BLOCKS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchUnitBlocks();
      if (data.length > 0) {
        setBlocks(data);
      }
    } catch (err) {
      console.error("Failed to fetch unit_blocks from Supabase:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { unitBlocks: blocks, loading, reload };
}
