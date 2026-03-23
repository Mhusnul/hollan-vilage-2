import { useState } from "react";
import { supabase } from "../lib/supabase";

/**
 * Custom hook untuk Supabase Storage upload
 */
export const useStorage = (bucket) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Upload file dan return public URL
   * @param {string} path - Path di bucket (misal: 'house-images/type-60.png')
   * @param {File} file - File object
   * @returns {Promise<string>} Public URL
   */
  const uploadFile = async (path, file) => {
    try {
      setUploading(true);
      setError(null);

      // Upload file
      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: "3600",
          upsert: true, // Overwrite jika sudah ada
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      return urlData.publicUrl;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  /**
   * Delete file dari storage
   * @param {string} path - Path file di bucket
   */
  const deleteFile = async (path) => {
    try {
      setError(null);
      const { error: deleteError } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (deleteError) throw deleteError;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    uploading,
    error,
    uploadFile,
    deleteFile,
  };
};
