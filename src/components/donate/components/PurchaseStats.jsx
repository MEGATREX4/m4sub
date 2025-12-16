// src/components/donate/components/PurchaseStats.jsx
import { useState, useEffect, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { format, parseISO, differenceInDays } from 'date-fns';
import { uk } from 'date-fns/locale';
import PlayerAvatar from '../../PlayerAvatar';

// Константи
const SERVER_COST = 900;

const COLORS = {
  cape: '#c5629a',
  icon: '#5865f2',
  bundle: '#f59e0b',
  support: '#ec4899'
};

const TYPE_LABELS = {
  cape: 'Плащі',
  icon: 'Значки',
  bundle: 'Набори',
  support: 'Підтримка'
};

const PERIOD_OPTIONS = [
  { value: 7, label: '7 днів' },
  { value: 14, label: '14 днів' },
  { value: 30, label: '30 днів' },
  { value: 90, label: '90 днів' },
];

// Функція для розрахунку періоду оплати (10-го по 10-те)
const getBillingPeriod = () => {
  const now = new Date();
  const currentDay = now.getDate();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  let periodStart, periodEnd;
  
  if (currentDay >= 10) {
    // Ми в періоді з 10-го поточного місяця по 9-те наступного
    periodStart = new Date(currentYear, currentMonth, 10);
    periodEnd = new Date(currentYear, currentMonth + 1, 9, 23, 59, 59);
  } else {
    // Ми в періоді з 10-го минулого місяця по 9-те поточного
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

// Компонент прогрес-бару для оплати сервера
const ServerFundingProgress = ({ currentRevenue, serverCost = SERVER_COST }) => {
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
          <div className="bg-gray-700 p-[2px] rounded-sm">
            <div className="bg-[#0a0a12] h-8 relative overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ease-out relative ${
                  isComplete 
                    ? 'bg-gradient-to-r from-green-600 to-green-400' 
                    : 'bg-gradient-to-r from-[#8a3d6e] to-[#c5629a]'
                }`}
                style={{ width: `${percentage}%` }}
              >
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    animation: 'shimmer 2s infinite'
                  }}
                />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold minecraftFont text-sm drop-shadow-lg">
                  {percentage.toFixed(0)}%
                </span>
              </div>
              
              <div className="absolute inset-0 flex">
                {[25, 50, 75].map(milestone => (
                  <div 
                    key={milestone}
                    className="absolute top-0 bottom-0 w-[2px] bg-gray-600/50"
                    style={{ left: `${milestone}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Status & Timer */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {isComplete ? (
              <>
                <i className="hn hn-party-popper text-yellow-400"></i>
                <span className="text-green-400 minecraftFont">
                  Ціль досягнута! 🎉
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
          
          {/* Days countdown */}
          <div className={`flex items-center gap-2 px-3 py-1 rounded ${
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
          <div className="bg-gray-800/50 p-3 rounded text-center">
            <div className="text-[#c5629a] font-bold minecraftFont text-lg">{currentRevenue}₴</div>
            <div className="text-gray-500 text-xs">Зібрано</div>
          </div>
          <div className="bg-gray-800/50 p-3 rounded text-center">
            <div className="text-yellow-400 font-bold minecraftFont text-lg">{remaining}₴</div>
            <div className="text-gray-500 text-xs">Залишилось</div>
          </div>
          <div className="bg-gray-800/50 p-3 rounded text-center">
            <div className="text-blue-400 font-bold minecraftFont text-lg">{billingPeriod.daysLeft}</div>
            <div className="text-gray-500 text-xs">Днів</div>
          </div>
          <div className="bg-gray-800/50 p-3 rounded text-center">
            <div className="text-green-400 font-bold minecraftFont text-lg">10-го</div>
            <div className="text-gray-500 text-xs">Дата оплати</div>
          </div>
        </div>
        
        {/* Payment info */}
        <div className="mt-4 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
          <i className="hn hn-alert-circle"></i>
          Оплата сервера відбувається кожного 10-го числа місяця
        </div>
      </div>
    </div>
  );
};

export const PurchaseStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState(30);
  const [chartType, setChartType] = useState('revenue');

  useEffect(() => {
    fetchStats();
  }, [period]);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `/.netlify/functions/purchase-stats?days=${period}&groupBy=day`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Stats error:', err);
      setError('Не вдалося завантажити статистику');
    } finally {
      setLoading(false);
    }
  };

  // Дохід за поточний білінговий період (10-10)
  const billingPeriodRevenue = useMemo(() => {
    if (stats?.billingPeriodRevenue !== undefined) {
      return stats.billingPeriodRevenue;
    }
    // Fallback to monthly if API doesn't support billing period
    return stats?.monthlyRevenue || stats?.summary?.totalRevenue || 0;
  }, [stats]);

  const chartData = useMemo(() => {
    if (!stats?.timeline) return [];
    
    return stats.timeline.map(point => ({
      ...point,
      date: point.period,
      displayDate: formatPeriod(point.period)
    }));
  }, [stats]);

  const pieData = useMemo(() => {
    if (!stats?.breakdown) return [];
    
    return Object.entries(stats.breakdown).map(([type, data]) => ({
      name: TYPE_LABELS[type] || type,
      value: chartType === 'revenue' ? data.revenue : data.count,
      type,
      count: data.count,
      revenue: data.revenue
    }));
  }, [stats, chartType]);

  if (loading) {
    return (
      <div className="bg-gray-800/50 p-[2px] mt-8">
        <div className="bg-[#12121f] p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-[#c5629a] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Завантаження статистики...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/30 p-[2px] mt-8">
        <div className="bg-[#12121f] p-8 text-center">
          <i className="hn hn-alert-circle text-red-400 text-3xl mb-2"></i>
          <p className="text-red-400">{error}</p>
          <button 
            onClick={fetchStats}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white minecraftFont transition-colors"
          >
            Спробувати знову
          </button>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="mt-8">
      <div className="bg-gray-700 h-[2px] mb-8" />
      
      <h4 className="text-xl font-bold text-white minecraftFont mb-6 text-center">
        <i className="hn hn-chart-bar text-[#c5629a] mr-2"></i>
        Прозора звітність
      </h4>
      
      {/* Server Funding Progress */}
      <ServerFundingProgress 
        currentRevenue={billingPeriodRevenue} 
        serverCost={SERVER_COST} 
      />
      
      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <div className="flex gap-2">
          {PERIOD_OPTIONS.map(option => (
            <button
              key={option.value}
              onClick={() => setPeriod(option.value)}
              className={`px-3 py-1 text-sm minecraftFont transition-colors ${
                period === option.value
                  ? 'bg-[#c5629a] text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setChartType('revenue')}
            className={`px-3 py-1 text-sm minecraftFont transition-colors ${
              chartType === 'revenue'
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <i className="hn hn-currency-dollar mr-1"></i>
            Дохід
          </button>
          <button
            onClick={() => setChartType('purchases')}
            className={`px-3 py-1 text-sm minecraftFont transition-colors ${
              chartType === 'purchases'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <i className="hn hn-shopping-cart mr-1"></i>
            Покупки
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          icon="hn-shopping-cart"
          label="Всього покупок"
          value={stats.summary?.totalPurchases || 0}
          color="text-blue-400"
        />
        <StatCard
          icon="hn-currency-dollar"
          label="Загальний дохід"
          value={`${stats.summary?.totalRevenue || 0}₴`}
          color="text-green-400"
        />
        <StatCard
          icon="hn-users"
          label="Унікальних покупців"
          value={stats.summary?.uniqueBuyers || 0}
          color="text-purple-400"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-gray-800/50 p-[2px]">
          <div className="bg-[#12121f] p-4">
            <h5 className="text-sm font-bold text-gray-300 minecraftFont mb-4">
              {chartType === 'revenue' ? 'Дохід за період' : 'Покупки за період'}
            </h5>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c5629a" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#c5629a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="displayDate" 
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(value) => chartType === 'revenue' ? `${value}₴` : value}
                  />
                  <Tooltip content={<CustomTooltip chartType={chartType} />} />
                  <Area
                    type="monotone"
                    dataKey={chartType === 'revenue' ? 'revenue' : 'purchases'}
                    stroke="#c5629a"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 p-[2px]">
          <div className="bg-[#12121f] p-4">
            <h5 className="text-sm font-bold text-gray-300 minecraftFont mb-4">
              Розподіл за типом
            </h5>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[entry.type] || '#6b7280'} 
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                  <Legend 
                    formatter={(value) => <span className="text-gray-300 text-xs">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Purchases */}
      <div className="bg-gray-800/50 p-[2px]">
        <div className="bg-[#12121f] p-4">
          <h5 className="text-sm font-bold text-gray-300 minecraftFont mb-4">
            <i className="hn hn-clock mr-2"></i>
            Останні покупки
          </h5>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="text-left py-2 px-2">ID</th>
                  <th className="text-left py-2 px-2">Гравець</th>
                  <th className="text-left py-2 px-2">Товар</th>
                  <th className="text-right py-2 px-2">Сума</th>
                  <th className="text-right py-2 px-2">Дата</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentPurchases?.slice(0, 10).map((purchase) => (
                  <tr 
                    key={purchase.id} 
                    className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-2 px-2">
                      <span className="text-gray-500 font-mono text-xs">
                        {purchase.anonymizedId}
                      </span>
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5">
                          <PlayerAvatar size="fill" username={purchase.playerName} />
                        </div>
                        <span className="text-white">{purchase.playerName}</span>
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <span 
                        className="px-2 py-0.5 text-xs rounded"
                        style={{ 
                          backgroundColor: `${COLORS[purchase.itemType]}20`,
                          color: COLORS[purchase.itemType]
                        }}
                      >
                        {TYPE_LABELS[purchase.itemType]} - {purchase.itemId}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-right">
                      <span className="text-green-400 font-bold">
                        {purchase.price}₴
                      </span>
                    </td>
                    <td className="py-2 px-2 text-right text-gray-400">
                      {formatDate(purchase.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {stats.recentPurchases?.length > 10 && (
            <p className="text-center text-gray-500 text-xs mt-4">
              Показано 10 з {stats.recentPurchases.length} покупок
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper Components
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-gray-800/50 p-[2px]">
    <div className="bg-[#12121f] p-4 text-center">
      <i className={`hn ${icon} ${color} text-2xl mb-2`}></i>
      <div className={`text-2xl font-bold ${color} minecraftFont`}>{value}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label, chartType }) => {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="bg-gray-900 border border-gray-700 p-3 rounded shadow-lg">
      <p className="text-gray-300 text-sm mb-1">{label}</p>
      <p className="text-[#c5629a] font-bold">
        {chartType === 'revenue' 
          ? `${payload[0].value}₴` 
          : `${payload[0].value} покупок`
        }
      </p>
    </div>
  );
};

const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  
  const data = payload[0].payload;
  
  return (
    <div className="bg-gray-900 border border-gray-700 p-3 rounded shadow-lg">
      <p className="text-white font-bold text-sm mb-1">{data.name}</p>
      <p className="text-gray-300 text-xs">
        {data.count} покупок • {data.revenue}₴
      </p>
    </div>
  );
};

const formatPeriod = (period) => {
  if (!period) return '';
  
  if (period.includes('-') && period.length === 10) {
    try {
      return format(parseISO(period), 'd MMM', { locale: uk });
    } catch {
      return period;
    }
  }
  
  return period;
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  
  try {
    return format(parseISO(dateStr), 'd MMM, HH:mm', { locale: uk });
  } catch {
    return dateStr;
  }
};

export default PurchaseStats;