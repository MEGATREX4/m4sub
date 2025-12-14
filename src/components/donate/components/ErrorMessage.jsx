// src/components/donate/components/ErrorMessage.jsx
export const ErrorMessage = ({ message, onRetry }) => (
  <div className="text-center p-12">
    <div className="text-6xl mb-4"><i className="hn hn-alert-octagon"></i></div>
    <h3 className="text-xl font-bold text-red-400 mb-2 minecraftFont">Щось пішло не так</h3>
    <p className="text-gray-400 mb-6">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-[#c5629a] hover:bg-[#f390d0] text-white px-6 py-3 font-bold transition-colors minecraftFont flex items-center gap-2 justify-center mx-auto"
      >
        <i className="hn hn-refresh-cw"></i>
        Спробувати знову
      </button>
    )}
  </div>
);