// src/components/donate/hooks/useShopData.js
import { useState, useEffect, useCallback } from 'react';
import { SHOP_API_URL } from '../constants';

export const useShopData = () => {
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchShopData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(SHOP_API_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      
      console.log("Shop data received:", data);
      setShopData(data);
    } catch (err) {
      console.error("Failed to fetch shop data:", err);
      setError("Не вдалося завантажити магазин. Сервер недоступний.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShopData();
  }, [fetchShopData]);

  return { shopData, loading, error, refetch: fetchShopData };
};