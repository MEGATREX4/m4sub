// src/components/donate/components/PurchaseButton.jsx
export const PurchaseButton = ({ 
  canPurchase, 
  purchasing, 
  selectedItem, 
  nickname,
  nicknameValid,
  onClick 
}) => {
  // Determine what message/state to show
  const getNicknameWarning = () => {
    if (!nickname || nickname.trim().length === 0) {
      return "Спочатку введіть нікнейм";
    }
    if (!nicknameValid) {
      return "Введіть коректний нікнейм";
    }
    return null;
  };

  const nicknameWarning = getNicknameWarning();
  const showNicknameWarning = !selectedItem && nicknameWarning;

  return (
    <div className="p-6 bg-[#130217]">
      {/* Warning message if no nickname */}
      {showNicknameWarning && (
        <div className="mb-4 bg-yellow-500/20 border border-yellow-500/50 p-3 flex items-center gap-2 justify-center">
          <i className="hn hn-alert-triangle text-yellow-400"></i>
          <span className="text-yellow-300 text-sm minecraftFont">{nicknameWarning}</span>
        </div>
      )}
      
      <button
        onClick={onClick}
        disabled={!canPurchase}
        className={`
          w-full py-4 text-xl font-bold minecraftFont transition-all flex items-center justify-center gap-2
          ${canPurchase
            ? "bg-[#c5629a] hover:bg-[#f390d0] text-white hover:translate-y-[-2px]"
            : "bg-gray-700 text-gray-500 cursor-not-allowed"}
        `}
      >
        {purchasing ? (
          <>
            <span className="animate-spin"><i className="hn hn-brightness-low"></i></span>
            <span>Обробка...</span>
          </>
        ) : selectedItem ? (
          nicknameWarning ? (
            <>
              <i className="hn hn-alert-triangle"></i>
              <span>{nicknameWarning}</span>
            </>
          ) : (
            <>
              <i className="hn hn-credit-card"></i>
              <span>Оплатити {selectedItem.price}₴</span>
            </>
          )
        ) : (
          <>
            <i className="hn hn-arrow-up-solid"></i>
            <span>Виберіть товар</span>
          </>
        )}
      </button>

      <p className="text-center text-gray-500 text-sm mt-4">
        Оплата через Monobank • Товар буде додано автоматично після оплати
      </p>
    </div>
  );
};