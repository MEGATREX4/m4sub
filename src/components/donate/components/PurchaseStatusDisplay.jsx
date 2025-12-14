// src/components/donate/components/PurchaseStatusDisplay.jsx
export const PurchaseStatusDisplay = ({ purchaseStatus }) => {
  if (!purchaseStatus) return null;

  const bgColors = {
    error: "bg-red-500",
    pending: "bg-yellow-500",
    success: "bg-green-500"
  };

  const innerBgColors = {
    error: "bg-red-900/80",
    pending: "bg-yellow-900/80",
    success: "bg-green-900/80"
  };

  const textColors = {
    error: "text-red-200",
    pending: "text-yellow-200",
    success: "text-green-200"
  };

  return (
    <div className="mx-6 mb-4">
      <div className={`${bgColors[purchaseStatus.type]} p-[3px]`}>
        <div className={`${innerBgColors[purchaseStatus.type]} p-4 text-center`}>
          <p className={`font-bold minecraftFont ${textColors[purchaseStatus.type]}`}>
            {purchaseStatus.message}
          </p>
          {purchaseStatus.purchaseId && (
            <p className="mt-2 text-sm opacity-80 text-white">
              ID: <code className="bg-black/30 px-2 py-1">{purchaseStatus.purchaseId}</code>
            </p>
          )}
          {purchaseStatus.paymentUrl && (
            <a
              href={purchaseStatus.paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-2 font-bold transition-colors minecraftFont"
            >
              <i className="hn hn-credit-card"></i>
              Відкрити оплату
            </a>
          )}
        </div>
      </div>
    </div>
  );
};