import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";
import { pricing as fallbackPricing, marketing as fallbackMarketing } from "../data/config";

export const DEFAULT_PRICING_SETTINGS = {
  id: 1,
  startingPrice: fallbackPricing.startingPrice,
  minimalDP: fallbackPricing.minimalDP,
  bookingFeeStart: fallbackPricing.bookingFeeStart,
  allInStart: fallbackPricing.allInStart,
  kprInterestRate: "5.99% Fixed 1 Tahun",
  promo: fallbackPricing.promo || [],
  paymentScheme: fallbackPricing.paymentScheme || [],
  persyaratanKaryawan: fallbackPricing.persyaratanKaryawan || [],
  warningPembatalan: fallbackPricing.warningPembatalan || "",
  bankTransfer: {
    bank: fallbackMarketing.bankTransfer.bank,
    accountNumber: fallbackMarketing.bankTransfer.accountNumber,
    accountName: fallbackMarketing.bankTransfer.accountName,
  },
};

export function mapDbRowToPricing(row) {
  if (!row) return DEFAULT_PRICING_SETTINGS;
  return {
    id: row.id,
    startingPrice: row.starting_price || DEFAULT_PRICING_SETTINGS.startingPrice,
    minimalDP: row.minimal_dp || DEFAULT_PRICING_SETTINGS.minimalDP,
    bookingFeeStart:
      row.booking_fee_start || DEFAULT_PRICING_SETTINGS.bookingFeeStart,
    allInStart: row.all_in_start || DEFAULT_PRICING_SETTINGS.allInStart,
    kprInterestRate:
      row.kpr_interest_rate || DEFAULT_PRICING_SETTINGS.kprInterestRate,
    promo: Array.isArray(row.promo) ? row.promo : DEFAULT_PRICING_SETTINGS.promo,
    paymentScheme: Array.isArray(row.payment_schemes)
      ? row.payment_schemes
      : DEFAULT_PRICING_SETTINGS.paymentScheme,
    persyaratanKaryawan: Array.isArray(row.persyaratan_kpr)
      ? row.persyaratan_kpr
      : DEFAULT_PRICING_SETTINGS.persyaratanKaryawan,
    warningPembatalan:
      row.warning_pembatalan || DEFAULT_PRICING_SETTINGS.warningPembatalan,
    bankTransfer: {
      bank: row.bank_name || DEFAULT_PRICING_SETTINGS.bankTransfer.bank,
      accountNumber:
        row.bank_account_number ||
        DEFAULT_PRICING_SETTINGS.bankTransfer.accountNumber,
      accountName:
        row.bank_account_name ||
        DEFAULT_PRICING_SETTINGS.bankTransfer.accountName,
    },
    updatedAt: row.updated_at,
  };
}

export async function fetchPricingSettings() {
  const { data, error } = await supabase
    .from("pricing_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) throw error;
  return mapDbRowToPricing(data);
}

export async function updatePricingSettings(form) {
  const payload = {
    id: 1,
    starting_price: form.startingPrice.trim(),
    minimal_dp: form.minimalDP.trim(),
    booking_fee_start: form.bookingFeeStart.trim(),
    all_in_start: form.allInStart.trim(),
    kpr_interest_rate: form.kprInterestRate.trim(),
    promo: Array.isArray(form.promo)
      ? form.promo.map((s) => s.trim()).filter(Boolean)
      : [],
    payment_schemes: Array.isArray(form.paymentScheme)
      ? form.paymentScheme.map((s) => ({
          type: (s.type || "").trim(),
          discount: (s.discount || "").trim(),
          description: (s.description || "").trim(),
        }))
      : [],
    persyaratan_kpr: Array.isArray(form.persyaratanKaryawan)
      ? form.persyaratanKaryawan.map((s) => s.trim()).filter(Boolean)
      : [],
    warning_pembatalan: form.warningPembatalan.trim(),
    bank_name: form.bankTransfer.bank.trim(),
    bank_account_number: form.bankTransfer.accountNumber.trim(),
    bank_account_name: form.bankTransfer.accountName.trim(),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("pricing_settings")
    .upsert(payload, { onConflict: "id" })
    .select()
    .single();

  if (error) throw error;
  return mapDbRowToPricing(data);
}

export function usePricingSettings() {
  const [settings, setSettings] = useState(DEFAULT_PRICING_SETTINGS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchPricingSettings();
      setSettings(data);
    } catch (err) {
      console.error("Failed to fetch pricing_settings from Supabase:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { pricingSettings: settings, loading, reload };
}
