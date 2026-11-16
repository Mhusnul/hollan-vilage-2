import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";
import {
  gallery as fallbackGallery,
  facilities as fallbackFacilities,
} from "../data/config";

import type60Img from "../assets/type60.png";
import type45Img from "../assets/type45.png";
import type36Img from "../assets/type36.png";
import denah60116Img from "../assets/denah-type-60-116.png";
import denah6096Img from "../assets/denah-type-60-96.png";
import denah4572Img from "../assets/denah-type-45-75.png";
import denah3672Img from "../assets/denah-type-36-72.png";
import fasilitasSecurityImg from "../assets/fasilitas_security.jpg";
import fasilitasOneGateImg from "../assets/bg1.jpeg";
import fasilitasMasjidImg from "../assets/fasilitas_masjid.jpg";
import fasilitasTamanImg from "../assets/fasilitas_taman.jpg";
import fasilitasJoggingImg from "../assets/fasilitas_joggingtrack.jpg";
import background2Img from "../assets/background2.jpg";

export const MEDIA_PRESETS = {
  "preset:galeri-type60": { label: "Fasad Type 60", src: type60Img },
  "preset:galeri-type45": { label: "Fasad Type 45/72", src: type45Img },
  "preset:galeri-type36": { label: "Fasad Type 36/72", src: type36Img },
  "preset:denah-60-116": { label: "Denah Type 60/116", src: denah60116Img },
  "preset:denah-60-96": { label: "Denah Type 60/96", src: denah6096Img },
  "preset:denah-45-72": { label: "Denah Type 45/72", src: denah4572Img },
  "preset:denah-36-72": { label: "Denah Type 36/72", src: denah3672Img },
  "preset:fasilitas-onegate": {
    label: "Gerbang One Gate System",
    src: fasilitasOneGateImg,
  },
  "preset:fasilitas-security": {
    label: "Pos Security 24 Jam",
    src: fasilitasSecurityImg,
  },
  "preset:fasilitas-masjid": { label: "Masjid Kawasan", src: fasilitasMasjidImg },
  "preset:fasilitas-taman": {
    label: "Taman Bermain & RTH",
    src: fasilitasTamanImg,
  },
  "preset:fasilitas-jogging": {
    label: "Jogging Track Asri",
    src: fasilitasJoggingImg,
  },
  "preset:fasilitas-komersial": {
    label: "Area Komersial",
    src: background2Img,
  },
};

export function resolveMediaUrl(rawUrl, fallbackImg = type60Img) {
  if (!rawUrl) return fallbackImg;
  if (MEDIA_PRESETS[rawUrl]) {
    return MEDIA_PRESETS[rawUrl].src;
  }
  return rawUrl;
}

// ==================== GALLERY ====================
export function mapDbRowToGalleryItem(row) {
  return {
    id: row.id,
    sortOrder: row.sort_order ?? 0,
    title: row.title,
    category: row.category || "house",
    description: row.description || "",
    image: resolveMediaUrl(row.image_url, type60Img),
    imageUrlRaw: row.image_url || "preset:galeri-type60",
  };
}

export async function fetchGalleryItems() {
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error) throw error;
  return (data || []).map(mapDbRowToGalleryItem);
}

export async function createGalleryItem(form) {
  const payload = {
    sort_order: Number(form.sortOrder ?? 1),
    title: form.title.trim(),
    category: form.category || "house",
    description: (form.description || "").trim(),
    image_url: form.imageUrlRaw || "preset:galeri-type60",
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("gallery_items")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return mapDbRowToGalleryItem(data);
}

export async function updateGalleryItem(id, form) {
  const payload = {
    sort_order: Number(form.sortOrder ?? 1),
    title: form.title.trim(),
    category: form.category || "house",
    description: (form.description || "").trim(),
    image_url: form.imageUrlRaw || "preset:galeri-type60",
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("gallery_items")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return mapDbRowToGalleryItem(data);
}

export async function deleteGalleryItem(id) {
  const { error } = await supabase.from("gallery_items").delete().eq("id", id);
  if (error) throw error;
}

export function useGalleryItems() {
  const [items, setItems] = useState(fallbackGallery);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchGalleryItems();
      if (data.length > 0) setItems(data);
    } catch (err) {
      console.error("Failed to fetch gallery_items from Supabase:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { gallery: items, loading, reload };
}

// ==================== FACILITIES ====================
export function mapDbRowToFacility(row) {
  return {
    id: row.id,
    sortOrder: row.sort_order ?? 0,
    name: row.name,
    description: row.description || "",
    icon: row.icon || "building",
    image: resolveMediaUrl(row.image_url, fasilitasSecurityImg),
    imageUrlRaw: row.image_url || "preset:fasilitas-security",
  };
}

export async function fetchFacilities() {
  const { data, error } = await supabase
    .from("facilities")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  if (error) throw error;
  return (data || []).map(mapDbRowToFacility);
}

export async function createFacility(form) {
  const payload = {
    sort_order: Number(form.sortOrder ?? 1),
    name: form.name.trim(),
    description: (form.description || "").trim(),
    icon: form.icon || "building",
    image_url: form.imageUrlRaw || "preset:fasilitas-security",
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("facilities")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return mapDbRowToFacility(data);
}

export async function updateFacility(id, form) {
  const payload = {
    sort_order: Number(form.sortOrder ?? 1),
    name: form.name.trim(),
    description: (form.description || "").trim(),
    icon: form.icon || "building",
    image_url: form.imageUrlRaw || "preset:fasilitas-security",
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("facilities")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return mapDbRowToFacility(data);
}

export async function deleteFacility(id) {
  const { error } = await supabase.from("facilities").delete().eq("id", id);
  if (error) throw error;
}

export function useFacilities() {
  const [items, setItems] = useState(fallbackFacilities);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchFacilities();
      if (data.length > 0) setItems(data);
    } catch (err) {
      console.error("Failed to fetch facilities from Supabase:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { facilities: items, loading, reload };
}
