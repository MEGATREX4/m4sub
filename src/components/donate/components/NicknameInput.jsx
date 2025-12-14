// src/components/donate/components/NicknameInput.jsx
export const NicknameInput = ({ 
  nickname, 
  nicknameError, 
  nicknameValid, 
  isChecking,
  playerExists,
  onChange 
}) => {
  return (
    <div className="p-6 bg-[#0f0f1a]">
      <div className="max-w-md mx-auto">
        <label className="block text-gray-300 mb-2 font-bold minecraftFont flex items-center gap-2">
          <i className="hn hn-edit"></i>
          Ваш нікнейм на сервері
        </label>
        <div className={`${
          nicknameError ? "bg-red-500" : 
          nicknameValid ? "bg-green-500" : 
          "bg-gray-600"
        } p-[3px] transition-colors`}>
          <div className="bg-[#130217] relative">
            <input
              type="text"
              value={nickname}
              onChange={onChange}
              placeholder="Наприклад: MEGATREX4"
              maxLength={16}
              className="w-full px-4 py-3 bg-transparent text-white focus:outline-none minecraftFont"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {isChecking && (
                <span className="text-gray-400 text-xl animate-spin">
                  <i className="hn hn-brightness-low"></i>
                </span>
              )}
              {!isChecking && nicknameValid && (
                <span className="text-green-400 text-xl">
                  <i className="hn hn-check"></i>
                </span>
              )}
            </div>
          </div>
        </div>
        
        {nicknameError && (
          <p className="mt-2 text-red-400 text-sm">{nicknameError}</p>
        )}
        
        {!nicknameError && nicknameValid && playerExists === false && (
          <p className="mt-2 text-yellow-400 text-sm flex items-center gap-1">
            <i className="hn hn-alert-circle text-sm"></i>
            Гравець не знайдений на сервері. Переконайтеся, що ви вже заходили на сервер.
          </p>
        )}
        
        {!nicknameError && nicknameValid && playerExists === true && (
          <p className="mt-2 text-green-400 text-sm flex items-center gap-1">
            <i className="hn hn-check-circle text-sm"></i>
            Гравця знайдено
          </p>
        )}
        
        <p className="mt-2 text-gray-500 text-sm flex items-center gap-1">
          <i className="hn hn-alert-circle text-sm"></i>
          Переконайтеся, що нікнейм введено правильно!
        </p>
      </div>
    </div>
  );
};