// src/components/donate/components/ServerFundingProgress.jsx
import { format, differenceInDays } from 'date-fns';
import { uk } from 'date-fns/locale';

const SERVER_COST = 900;

const getBillingPeriod = () => {
  const now = new Date();
  const currentDay = now.getDate();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  let periodStart, periodEnd;
  
  if (currentDay >= 10) {
    periodStart = new Date(currentYear, currentMonth, 10);
    periodEnd = new Date(currentYear, currentMonth + 1, 9, 23, 59, 59);
  } else {
    periodStart = new Date(currentYear, currentMonth - 1, 10);
    periodEnd = new Date(currentYear, currentMonth, 9, 23, 59, 59);
  }
  
  const daysLeft = differenceInDays(periodEnd, now);
  const totalDays = differenceInDays(periodEnd, periodStart);
  const daysPassed = totalDays - daysLeft;
  
  return {
    start: periodStart,
    end: periodEnd,
    daysLeft: Math.max(0, daysLeft),
    totalDays,
    daysPassed,
    paymentDate: new Date(periodEnd.getFullYear(), periodEnd.getMonth(), 10)
  };
};

export const ServerFundingProgress = ({ currentRevenue, serverCost = SERVER_COST }) => {
  const billingPeriod = getBillingPeriod();
  const percentage = Math.min((currentRevenue / serverCost) * 100, 100);
  const remaining = Math.max(serverCost - currentRevenue, 0);
  const isComplete = currentRevenue >= serverCost;
  const excess = Math.max(currentRevenue - serverCost, 0);
  
  const formatPeriodDate = (date) => format(date, 'd MMMM', { locale: uk });
  
  return (
    <div className="bg-gray-800/50 p-[2px] mb-6">
      <div className="bg-[#12121f] p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h5 className="text-lg font-bold text-white minecraftFont flex items-center gap-2">
              <i className={`hn ${isComplete ? 'hn-check-circle text-green-400' : 'hn-server text-[#c5629a]'}`}></i>
              Оплата сервера
            </h5>
            <p className="text-gray-400 text-sm mt-1">
              Період: {formatPeriodDate(billingPeriod.start)} — {formatPeriodDate(billingPeriod.end)}
            </p>
          </div>
          <div className="text-right">
            <span className={`text-2xl font-bold minecraftFont ${isComplete ? 'text-green-400' : 'text-[#c5629a]'}`}>
              {currentRevenue}₴
            </span>
            <span className="text-gray-400"> / {serverCost}₴</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="relative">
          <div className="bg-gray-700/50 h-6 overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${
                isComplete 
                  ? 'bg-gradient-to-r from-green-600 to-green-500' 
                  : 'bg-gradient-to-r from-[#8a3d6e] to-[#c5629a]'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <span className="text-white text-sm minecraftFont drop-shadow-lg">
              {percentage.toFixed(0)}%
            </span>
          </div>
        </div>
        
        {/* Status & Timer */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {isComplete ? (
              <>
                <i className="hn hn-party-popper text-yellow-400"></i>
                <span className="text-green-400 minecraftFont">
                  Ціль досягнута! <i className="hn hn-sparkles"></i>
                </span>
                {excess > 0 && (
                  <span className="text-gray-400 text-sm">
                    (+{excess}₴ на розвиток)
                  </span>
                )}
              </>
            ) : (
              <>
                <i className="hn hn-clock text-gray-400"></i>
                <span className="text-gray-300">
                  Залишилось зібрати: <span className="text-[#c5629a] font-bold">{remaining}₴</span>
                </span>
              </>
            )}
          </div>
          
          <div className={`flex items-center gap-2 px-3 py-1 ${
            billingPeriod.daysLeft <= 3 
              ? 'bg-red-900/50 text-red-400' 
              : billingPeriod.daysLeft <= 7 
                ? 'bg-yellow-900/50 text-yellow-400'
                : 'bg-gray-800/50 text-gray-400'
          }`}>
            <i className="hn hn-calendar"></i>
            <span className="text-sm minecraftFont">
              {billingPeriod.daysLeft === 0 
                ? 'Оплата сьогодні!' 
                : billingPeriod.daysLeft === 1 
                  ? '1 день до оплати'
                  : `${billingPeriod.daysLeft} днів до оплати`
              }
            </span>
          </div>
        </div>
        
        {/* Info cards */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-gray-800/50 p-3 text-center">
            <div className="text-[#c5629a] font-bold minecraftFont text-lg">{currentRevenue}₴</div>
            <div className="text-gray-500 text-xs">Зібрано</div>
          </div>
          <div className="bg-gray-800/50 p-3 text-center">
            <div className="text-yellow-400 font-bold minecraftFont text-lg">{remaining}₴</div>
            <div className="text-gray-500 text-xs">Залишилось</div>
          </div>
          <div className="bg-gray-800/50 p-3 text-center">
            <div className="text-blue-400 font-bold minecraftFont text-lg">{billingPeriod.daysLeft}</div>
            <div className="text-gray-500 text-xs">Днів</div>
          </div>
          <div className="bg-gray-800/50 p-3 text-center">
            <div className="text-green-400 font-bold minecraftFont text-lg">10-го</div>
            <div className="text-gray-500 text-xs">Дата оплати</div>
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
          <i className="hn hn-alert-circle"></i>
          Оплата сервера відбувається кожного 10-го числа місяця
        </div>
      </div>
    </div>
  );
};

export default ServerFundingProgress;