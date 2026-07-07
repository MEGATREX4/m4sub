// src/components/ServerHealth.jsx
import { useState, useEffect } from "react";
import { BorderBox } from "./donate/components/BorderBox";
import { SERVER_HEALTH_API_URL } from "./donate/constants";

const HealthBar = ({ value, max = 100, color = "bg-green-500", label }) => {
  const percentage = (value / max) * 100;
  const barColor = percentage > 75 ? "bg-green-500" : percentage > 50 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-xs font-bold text-white">{value.toFixed(1)} / {max}</span>
      </div>
      <div className="w-full bg-[#1a1a2e] border border-[#c5629a]/30 h-3 overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-300`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
};

const StatBox = ({ icon, label, value, unit = "", color = "text-gray-400" }) => (
  <div className="bg-[#1a1a2e] border border-[#c5629a]/20 p-3 rounded-sm">
    <div className="flex items-center gap-2 mb-1">
      <i className={`hn ${icon} text-[#c5629a]`}></i>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
    <div className={`text-lg font-bold ${color}`}>
      {value} <span className="text-xs text-gray-500">{unit}</span>
    </div>
  </div>
);

const getTPSColor = (tps) => {
  if (tps >= 19) return "text-green-400";
  if (tps >= 15) return "text-yellow-400";
  return "text-red-400";
};

const getMSPTColor = (mspt) => {
  if (mspt <= 50) return "text-green-400";
  if (mspt <= 100) return "text-yellow-400";
  return "text-red-400";
};

// Weather Icon Component
const WeatherIcon = ({ weather }) => {
  const weatherConfig = {
    clear: { icon: "hn-sun-solid", color: "text-yellow-400", bg: "bg-yellow-500/20" },
    raining: { icon: "hn-cloud-rain", color: "text-blue-400", bg: "bg-blue-500/20" },
    thundering: { icon: "hn-cloud-lightning", color: "text-purple-400", bg: "bg-purple-500/20" }
  };
  
  const config = weatherConfig[weather] || weatherConfig.clear;
  
  return (
    <span className={`text-xs px-2 py-1 rounded-sm flex items-center gap-1 ${config.bg}`}>
      <i className={`hn ${config.icon} ${config.color}`}></i>
      <span className={config.color}>{weather === 'clear' ? 'Ясно' : weather === 'raining' ? 'Дощ' : 'Гроза'}</span>
    </span>
  );
};

export default function ServerHealth() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchHealth = async () => {
    try {
      const response = await fetch(SERVER_HEALTH_API_URL);
      if (!response.ok) throw new Error("Failed to fetch health");
      const data = await response.json();
      setHealth(data);
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      setError(err.message);
      setHealth(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const performance = health?.performance || {};
  const players = health?.players || {};
  const memory = health?.memory || {};
  const uptime = health?.uptime || {};
  const system = health?.system || {};
  const playerList = Array.isArray(players.list) ? players.list : [];
  const tps = Number(performance.tps ?? 0);
  const mspt = Number(performance.mspt ?? 0);
  const msptMin = Number(performance.mspt_min ?? 0);
  const msptMax = Number(performance.mspt_max ?? 0);
  const onlinePlayers = Number(players.online ?? 0);
  const maxPlayers = Number(players.max ?? 0);
  const usedMemory = Number(memory.used_mb ?? 0);
  const totalMemory = Number(memory.total_mb ?? 0);
  const freeMemory = Number(memory.free_mb ?? 0);
  const maxMemory = Number(memory.max_mb ?? 0);
  const memoryUsage = Number(memory.usage_percent ?? 0);
  const uptimeFormatted = uptime?.formatted || "Н/Д";
  const minecraftVersion = health?.minecraftVersion || "Н/Д";

  if (loading) {
    return (
      <BorderBox borderColor="bg-[#c5629a]/50" innerBg="bg-[#0a0a12]">
        <div className="p-6 text-center">
          <i className="hn hn-loader text-2xl text-[#c5629a] animate-spin"></i>
          <p className="text-gray-400 mt-2">Завантаження даних серверу...</p>
        </div>
      </BorderBox>
    );
  }

  if (error || !health) {
    return (
      <BorderBox borderColor="bg-red-500/50" innerBg="bg-[#0a0a12]">
        <div className="p-6 text-center">
          <i className="hn hn-alert-circle text-2xl text-red-400 mb-2"></i>
          <p className="text-gray-400">Сервер в даний момент недоступний</p>
          <p className="text-xs text-gray-500 mt-1">{error}</p>
          <button
            onClick={fetchHealth}
            className="mt-3 px-4 py-2 bg-[#c5629a] hover:bg-[#f390d0] text-white text-sm font-bold transition-colors flex items-center gap-2 mx-auto"
          >
            <i className="hn hn-refresh-cw"></i>
            Спробувати ще раз
          </button>
        </div>
      </BorderBox>
    );
  }

  return (
    <BorderBox borderColor="bg-[#c5629a]/50" innerBg="bg-[#0a0a12]">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white minecraftFont flex items-center gap-2">
            <i className="hn hn-activity text-[#c5629a]"></i>
            Статус серверу
          </h2>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-xs text-green-400 font-bold">ОНЛАЙН</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Оновлено {lastUpdate?.toLocaleTimeString("uk-UA")}
            </p>
          </div>
        </div>

        {/* Performance Metrics */}
        <div>
          <h3 className="text-sm font-bold text-gray-400 minecraftFont mb-3 flex items-center gap-2">
            <i className="hn hn-lightning-bolt text-[#c5629a]"></i>
            Продуктивність
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <StatBox
              icon="hn-gauge"
              label="TPS"
              value={tps}
              color={getTPSColor(tps)}
            />
            <StatBox
              icon="hn-hourglass"
              label="MSPT"
              value={mspt}
              unit="ms"
              color={getMSPTColor(mspt)}
            />
            <StatBox
              icon="hn-trending-down"
              label="Мін MSPT"
              value={msptMin}
              unit="ms"
              color="text-blue-400"
            />
            <StatBox
              icon="hn-trending-up"
              label="Макс MSPT"
              value={msptMax}
              unit="ms"
              color="text-purple-400"
            />
          </div>
          <HealthBar
            value={tps}
            max={20}
            label="TPS (цільове значення: 20)"
            color={getTPSColor(tps)}
          />
        </div>

        {/* Players */}
        <div>
          <h3 className="text-sm font-bold text-gray-400 minecraftFont mb-3 flex items-center gap-2">
            <i className="hn hn-users text-[#c5629a]"></i>
            Гравці ({onlinePlayers}/{maxPlayers})
          </h3>
          <HealthBar
            value={onlinePlayers}
            max={maxPlayers}
            label="Онлайн гравців"
          />
          {playerList.length > 0 ? (
            <div className="bg-[#1a1a2e] border border-[#c5629a]/20 p-3 rounded-sm">
              <div className="flex flex-wrap gap-2">
                {playerList.map((player) => (
                  <span
                    key={player}
                    className="px-2 py-1 bg-[#0a0a12] border border-[#c5629a]/30 text-xs text-gray-300 rounded-sm flex items-center gap-1.5"
                  >
                    <i className="hn hn-user-solid text-[#c5629a] text-xs"></i>
                    {player}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-500 italic flex items-center gap-1.5">
              <i className="hn hn-user-x text-gray-500"></i>
              Немає онлайн гравців
            </p>
          )}
        </div>

        {/* Memory */}
        <div>
          <h3 className="text-sm font-bold text-gray-400 minecraftFont mb-3 flex items-center gap-2">
            <i className="hn hn-hard-drive text-[#c5629a]"></i>
            Пам'ять
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <StatBox
              icon="hn-database"
              label="Використано"
              value={usedMemory}
              unit="MB"
            />
            <StatBox
              icon="hn-hard-drive"
              label="Всього"
              value={totalMemory}
              unit="MB"
            />
            <StatBox
              icon="hn-trash-2"
              label="Вільно"
              value={freeMemory}
              unit="MB"
              color="text-green-400"
            />
            <StatBox
              icon="hn-maximize-2"
              label="Максимум"
              value={maxMemory}
              unit="MB"
            />
          </div>
          <HealthBar
            value={memoryUsage}
            max={100}
            label="Використання пам'яті"
          />
        </div>

        {/* Worlds */}
        {health.worlds && health.worlds.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-400 minecraftFont mb-3 flex items-center gap-2">
              <i className="hn hn-map text-[#c5629a]"></i>
              Світи ({health.worlds.length})
            </h3>
            <div className="space-y-2">
              {health.worlds.map((world, idx) => (
                <div key={idx} className="bg-[#1a1a2e] border border-[#c5629a]/20 p-3 rounded-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-bold text-white flex items-center gap-1.5">
                        <i className="hn hn-globe text-[#c5629a]"></i>
                        {world.name}
                      </p>
                      <p className="text-xs text-gray-500 ml-5">{world.dimension}</p>
                    </div>
                    <WeatherIcon weather={world.weather} />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      <i className="hn hn-grid text-[#c5629a]/50"></i>
                      <div>
                        <span className="text-gray-500">Чанки</span>
                        <p className="font-bold text-gray-300">{world.loadedChunks}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <i className="hn hn-zap text-[#c5629a]/50"></i>
                      <div>
                        <span className="text-gray-500">Сутності</span>
                        <p className="font-bold text-gray-300">{world.entities}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <i className="hn hn-users text-[#c5629a]/50"></i>
                      <div>
                        <span className="text-gray-500">Гравців</span>
                        <p className="font-bold text-gray-300">{world.players}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Uptime */}
        <div className="bg-[#1a1a2e] border border-[#c5629a]/20 p-3 rounded-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="hn hn-clock text-[#c5629a]"></i>
              <span className="text-sm text-gray-400">Час роботи серверу</span>
            </div>
            <span className="font-bold text-white flex items-center gap-1.5">
              <i className="hn hn-check-circle-solid text-green-400"></i>
              {uptimeFormatted}
            </span>
          </div>
        </div>

        {/* System Info */}
        {Object.keys(system).length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-400 minecraftFont mb-3 flex items-center gap-2">
              <i className="text-[#c5629a]"></i>
              Системна інформація
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-gray-500 flex items-center gap-1.5">
                <i className="text-[#c5629a]/50"></i>
                <div>
                  ОС: <span className="text-gray-300">{system.os || "Н/Д"}</span>
                </div>
              </div>
              <div className="text-gray-500 flex items-center gap-1.5">
                <i className="text-[#c5629a]/50"></i>
                <div>
                  Java: <span className="text-gray-300">{system.java_version || "Н/Д"}</span>
                </div>
              </div>
              <div className="text-gray-500 flex items-center gap-1.5">
                <i className="text-[#c5629a]/50"></i>
                <div>
                  CPU: <span className="text-gray-300">{system.available_processors || "Н/Д"}</span>
                </div>
              </div>
              <div className="text-gray-500 flex items-center gap-1.5">
                <i className="text-[#c5629a]/50"></i>
                <div>
                  MC: <span className="text-gray-300">{minecraftVersion}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </BorderBox>
  );
}