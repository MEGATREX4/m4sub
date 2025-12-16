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
import { format, parseISO } from 'date-fns';
import { uk } from 'date-fns/locale';
import PlayerAvatar from '../../PlayerAvatar';
import { ServerFundingProgress } from './ServerFundingProgress';

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

  const billingPeriodRevenue = useMemo(() => {
    if (stats?.billingPeriodRevenue !== undefined) {
      return stats.billingPeriodRevenue;
    }
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
    <div className="mt-8 max-w-full overflow-hidden">
      <div className="bg-gray-700 h-[2px] mb-8" />
      
      <h4 className="text-xl font-bold text-white minecraftFont mb-6 text-center">
        <i className="hn hn-chart-bar text-[#c5629a] mr-2"></i>
        Прозора звітність
      </h4>
      
      <ServerFundingProgress 
        currentRevenue={billingPeriodRevenue} 
        serverCost={SERVER_COST} 
      />
      
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          icon="hn-shopping-cart"
          label="Всього покупок"
          value={stats.summary?.totalPurchases || 0}
          color="text-blue-400"
        />
        <StatCard
          icon="hn-box-usd"
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

      {/* ВИПРАВЛЕНО: Додано min-w-0 для запобігання overflow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 min-w-0">
        <div className="lg:col-span-2 bg-gray-800/50 p-[2px] min-w-0">
          <div className="bg-[#12121f] p-4 min-w-0">
            <h5 className="text-sm font-bold text-gray-300 minecraftFont mb-4">
              {chartType === 'revenue' ? 'Дохід за період' : 'Покупки за період'}
            </h5>
            {/* ВИПРАВЛЕНО: Явно встановлено w-full та обмежено батьківським контейнером */}
            <div className="h-64 w-full">
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

        <div className="bg-gray-800/50 p-[2px] min-w-0">
          <div className="bg-[#12121f] p-4 min-w-0">
            <h5 className="text-sm font-bold text-gray-300 minecraftFont mb-4">
              Розподіл за типом
            </h5>
            {/* ВИПРАВЛЕНО: Додано w-full */}
            <div className="h-64 w-full">
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

      {/* ВИПРАВЛЕНО: Обгорнуто таблицю в контейнер з обмеженою шириною */}
      <div className="bg-gray-800/50 p-[2px] min-w-0 w-full">
        <div className="bg-[#12121f] p-4 min-w-0">
          <h5 className="text-sm font-bold text-gray-300 minecraftFont mb-4">
            <i className="hn hn-clock mr-2"></i>
            Останні покупки
          </h5>
          
          {/* ВИПРАВЛЕНО: Додано -mx-4 для компенсації padding */}
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="text-left py-2 px-2 whitespace-nowrap">ID</th>
                  <th className="text-left py-2 px-2 whitespace-nowrap">Гравець</th>
                  <th className="text-left py-2 px-2 whitespace-nowrap">Товар</th>
                  <th className="text-right py-2 px-2 whitespace-nowrap">Сума</th>
                  <th className="text-right py-2 px-2 whitespace-nowrap">Дата</th>
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
                        <div className="w-5 h-5 flex-shrink-0">
                          <PlayerAvatar size="fill" username={purchase.playerName} />
                        </div>
                        <span className="text-white whitespace-nowrap">{purchase.playerName}</span>
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <span 
                        className="px-2 py-0.5 text-xs rounded whitespace-nowrap inline-block"
                        style={{ 
                          backgroundColor: `${COLORS[purchase.itemType]}20`,
                          color: COLORS[purchase.itemType]
                        }}
                      >
                        {TYPE_LABELS[purchase.itemType]} - {purchase.itemId}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-right">
                      <span className="text-green-400 font-bold whitespace-nowrap">
                        {purchase.price}₴
                      </span>
                    </td>
                    <td className="py-2 px-2 text-right text-gray-400 whitespace-nowrap">
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