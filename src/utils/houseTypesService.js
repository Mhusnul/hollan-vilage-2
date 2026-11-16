import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";
import { houseTypes as fallbackHouseTypes } from "../data/config";

import type6096Img from "../assets/type-60-96.png";
import type4572Img from "../assets/type-45-72.png";
import type3672Img from "../assets/type-36-72.png";
import denah60116Img from "../assets/denah-type-60-116.png";
import denah6096Img from "../assets/denah-type-60-96.png";
import denah4572Img from "../assets/denah-type-45-75.png";
import denah3672Img from "../assets/denah-type-36-72.png";

export const PRESET_IMAGES = {
  "preset:type-60-96": {
    label: "Default Fasad Type 60",
    src: type6096Img,
  },
  "preset:type-45-72": {
    label: "Default Fasad Type 45/72",
    src: type4572Img,
  },
  "preset:type-36-72": {
    label: "Default Fasad Type 36/72",
    src: type3672Img,
  },
  "preset:denah-60-116": {
    label: "Default Denah Type 60/116",
    src: denah60116Img,
  },
  "preset:denah-60-96": {
    label: "Default Denah Type 60/96",
    src: denah6096Img,
  },
  "preset:denah-45-72": {
    label: "Default Denah Type 45/72",
    src: denah4572Img,
  },
  "preset:denah-36-72": {
    label: "Default Denah Type 36/72",
    src: denah3672Img,
  },
};

export function resolveImageUrl(rawUrl, fallbackImg = type6096Img) {
  if (!rawUrl) return fallbackImg;
  if (PRESET_IMAGES[rawUrl]) {
    return PRESET_IMAGES[rawUrl].src;
  }
  return rawUrl;
}

export function mapDbRowToHouseType(row) {
  return {
    id: row.id,
    sortOrder: row.sort_order ?? 0,
    name: row.name,
    badge: row.badge || "",
    buildingArea: row.building_area,
    landArea: row.land_area,
    bedroom: Number(row.bedroom ?? 2),
    bathroom: Number(row.bathroom ?? 1),
    floor: Number(row.floor ?? 1),
    carport: Number(row.carport ?? 1),
    priceStartFrom: row.price_start_from,
    dpAmount: row.dp_amount || "",
    kprAmount: row.kpr_amount || "",
    bookingFee: row.booking_fee || "",
    allInPrice: row.all_in_price || "",
    roomDetails: row.room_details || "",
    specification: Array.isArray(row.specification) ? row.specification : [],
    image: resolveImageUrl(row.image_url, type6096Img),
    floorPlan: resolveImageUrl(row.floor_plan_url, denah6096Img),
    imageUrlRaw: row.image_url || "preset:type-60-96",
    floorPlanUrlRaw: row.floor_plan_url || "preset:denah-60-96",
  };
}

export function mapHouseTypeToDbPayload(form) {
  return {
    sort_order: Number(form.sortOrder ?? 0),
    name: form.name.trim(),
    badge: form.badge.trim(),
    building_area: form.buildingArea.trim(),
    land_area: form.landArea.trim(),
    bedroom: Number(form.bedroom ?? 2),
    bathroom: Number(form.bathroom ?? 1),
    floor: Number(form.floor ?? 1),
    carport: Number(form.carport ?? 1),
    price_start_from: form.priceStartFrom.trim(),
    dp_amount: form.dpAmount.trim(),
    kpr_amount: form.kprAmount.trim(),
    booking_fee: form.bookingFee.trim(),
    all_in_price: form.allInPrice.trim(),
    room_details: form.roomDetails.trim(),
    specification: Array.isArray(form.specification)
      ? form.specification.map((s) => s.trim()).filter(Boolean)
      : [],
    image_url: form.imageUrlRaw || "preset:type-60-96",
    floor_plan_url: form.floorPlanUrlRaw || "preset:denah-60-96",
    updated_at: new Date().toISOString(),
  };
}

export async function fetchHouseTypes() {
  const { data, error } = await supabase
    .from("house_types")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error) throw error;
  return (data || []).map(mapDbRowToHouseType);
}

export async function createHouseType(form) {
  const payload = mapHouseTypeToDbPayload(form);
  const { data, error } = await supabase
    .from("house_types")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return mapDbRowToHouseType(data);
}

export async function updateHouseType(id, form) {
  const payload = mapHouseTypeToDbPayload(form);
  const { data, error } = await supabase
    .from("house_types")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return mapDbRowToHouseType(data);
}

export async function deleteHouseType(id) {
  const { error } = await supabase.from("house_types").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadPropertyImage(file, folder = "house-types") {
  const ext = file.name.split(".").pop() || "png";
  const safeName = `${folder}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("property-images")
    .upload(safeName, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from("property-images")
    .getPublicUrl(safeName);

  return data.publicUrl;
}

export function useHouseTypes() {
  const [items, setItems] = useState(fallbackHouseTypes);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchHouseTypes();
      if (data.length > 0) {
        setItems(data);
      }
    } catch (err) {
      console.error("Failed to fetch house_types from Supabase:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { houseTypes: items, loading, reload };
}
