// src/components/donate/hooks/useNickname.js
import { useState, useEffect, useCallback, useRef } from 'react';
import { CHECK_OWNERSHIP_URL, NICKNAME_DEBOUNCE_MS } from '../constants';
import { validateNickname, hasSupporter as checkHasSupporter } from '../utils/helpers';

export const useNickname = () => {
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [nicknameValid, setNicknameValid] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [ownedItems, setOwnedItems] = useState([]);
  const [playerExists, setPlayerExists] = useState(null);
  const [hasSupporter, setHasSupporter] = useState(false);
  
  const debounceRef = useRef(null);
  const abortControllerRef = useRef(null);

  const checkOwnership = useCallback(async (name) => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsChecking(true);

    try {
      const response = await fetch(
        `${CHECK_OWNERSHIP_URL}?playerName=${encodeURIComponent(name)}`,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      
      setPlayerExists(data.exists);
      setOwnedItems(data.ownedItems || []);
      setHasSupporter(checkHasSupporter(data.ownedItems));
      
      if (data.exists) {
        console.log(`Player ${name} owns ${data.ownedItems?.length || 0} items, supporter: ${checkHasSupporter(data.ownedItems)}`);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        return; // Cancelled, ignore
      }
      console.warn("Failed to check ownership:", err);
      // Don't block purchase on ownership check failure
      setOwnedItems([]);
      setPlayerExists(null);
      setHasSupporter(false);
    } finally {
      setIsChecking(false);
    }
  }, []);

  const handleNicknameChange = useCallback((e) => {
    const value = e.target.value;
    setNickname(value);

    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Validate format immediately
    if (value.length === 0) {
      setNicknameError("");
      setNicknameValid(false);
      setOwnedItems([]);
      setPlayerExists(null);
      setHasSupporter(false);
      return;
    }

    const validationError = validateNickname(value);
    setNicknameError(validationError);
    setNicknameValid(validationError === "");

    // Debounce ownership check
    if (validationError === "") {
      debounceRef.current = setTimeout(() => {
        checkOwnership(value);
      }, NICKNAME_DEBOUNCE_MS);
    } else {
      setOwnedItems([]);
      setPlayerExists(null);
      setHasSupporter(false);
    }
  }, [checkOwnership]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    nickname,
    nicknameError,
    nicknameValid,
    isChecking,
    ownedItems,
    playerExists,
    hasSupporter,
    handleNicknameChange,
    setNicknameError,
  };
};