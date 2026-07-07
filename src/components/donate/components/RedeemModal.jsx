import React, { useState, useMemo } from "react";
import { REDEEM_API_URL } from "../constants";
import { validateNickname } from "../utils/helpers";

export const RedeemModal = ({ isOpen, onClose }) => {
  const [localNickname, setLocalNickname] = useState("");
  const [redeemCode, setRedeemCode] = useState("");
  const [redeemStatus, setRedeemStatus] = useState(null);
  const [isRedeeming, setIsRedeeming] = useState(false);

  const nicknameError = useMemo(() => {
    if (localNickname.length === 0) return "";
    return validateNickname(localNickname);
  }, [localNickname]);

  const isFormValid = localNickname.length >= 3 && nicknameError === "" && redeemCode.length > 0;

  const handleRedeem = async () => {
    if (!isFormValid) return;
    
    setIsRedeeming(true);
    setRedeemStatus(null);
    try {
      const response = await fetch(REDEEM_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerName: localNickname, code: redeemCode }),
      });
      const data = await response.json();
      setRedeemStatus({ success: data.success, message: data.message || data.error });
      if (data.success) {
        setRedeemCode("");
      }
    } catch (err) {
      setRedeemStatus({ success: false, message: "Помилка мережі" });
    } finally {
      setIsRedeeming(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#1a1a2e] border-2 border-[#c5629a] w-full max-w-md p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-[#c5629a] minecraftFont flex items-center gap-2">
            <i className="hn hn-gift"></i>
            Активувати код
          </h3>
          <button 
            onClick={() => { 
              onClose(); 
              setRedeemStatus(null); 
              setRedeemCode("");
              setLocalNickname("");
            }} 
            className="text-gray-400 hover:text-white"
          >
            <i className="hn hn-times text-xl"></i>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1 minecraftFont">Ваш нікнейм</label>
            <input 
              type="text" 
              placeholder="Введіть нікнейм"
              value={localNickname} 
              onChange={(e) => setLocalNickname(e.target.value)}
              className={`w-full bg-[#12121f] border p-3 text-white minecraftFont focus:outline-none focus:ring-1 
                ${nicknameError ? 'border-red-500 focus:ring-red-500' : 'border-[#c5629a] focus:ring-[#c5629a]'}`}
            />
            {nicknameError && (
              <p className="text-red-400 text-xs mt-1">{nicknameError}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1 minecraftFont">Промокод</label>
            <input 
              type="text" 
              placeholder="Введіть ваш код" 
              value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
              className="w-full bg-[#12121f] border border-[#c5629a] p-3 text-white minecraftFont focus:outline-none focus:ring-1 focus:ring-[#c5629a]"
            />
          </div>

          {redeemStatus && (
            <div className={`p-3 text-sm minecraftFont ${
              redeemStatus.success 
                ? 'bg-green-900/30 text-green-400 border border-green-800' 
                : 'bg-red-900/30 text-red-400 border border-red-800'
            }`}>
              {redeemStatus.message}
            </div>
          )}

          <button 
            onClick={handleRedeem}
            disabled={isRedeeming || !isFormValid}
            className={`w-full py-4 minecraftFont text-lg font-bold transition-all
              ${isRedeeming || !isFormValid
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-[#c5629a] text-white hover:bg-[#d473ab] active:translate-y-1'}
            `}
          >
            {isRedeeming ? 'Обробка...' : 'Активувати'}
          </button>
        </div>
      </div>
    </div>
  );
};
