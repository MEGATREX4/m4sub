// src/components/donate/components/PurchaseButton.jsx
export const PurchaseButton = ({ 
  canPurchase, 
  purchasing, 
  selectedItem, 
  nickname,
  nicknameValid,
  onClick,
  isSupport = false
}) => {
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
  const showNicknameWarning = selectedItem && nicknameWarning;

  // Button colors based on type
  const buttonColors = isSupport
    ? "bg-pink-500 hover:bg-pink-400"
    : "bg-[#c5629a] hover:bg-[#f390d0]";

  return (
    <div className="p-6 bg-[#130217]">
      {/* Warning message if no nickname but item selected */}
      
      <button
        onClick={onClick}
        disabled={!canPurchase}
        className={`
          w-full py-4 text-xl font-bold minecraftFont transition-all flex items-center justify-center gap-2
          ${canPurchase
            ? `${buttonColors} text-white hover:translate-y-[-2px]`
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
          ) : isSupport ? (
            <>
              <i className="hn hn-heart-solid"></i>
              <span>Підтримати на {selectedItem.price}₴</span>
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
            <span>Виберіть товар або підтримку</span>
          </>
        )}
      </button>

      <p className="text-center text-gray-500 text-sm mt-4">
        {isSupport 
          ? "Оплата через Monobank • Роль SUPPORTER буде додано після оплати"
          : "Оплата через Monobank • Товар буде додано автоматично після оплати"
        }
      </p>
    </div>
  );
};