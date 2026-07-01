// src/components/HealthPage.jsx
import ServerHealth from "./ServerHealth";
import { BorderBox } from "./donate/components/BorderBox";

export default function HealthPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <ServerHealth />
        
        {/* Info Box */}
        <BorderBox borderColor="bg-blue-500/50" innerBg="bg-[#0a0a12]">
          <div className="p-6">
            <h3 className="text-lg font-bold text-blue-400 minecraftFont mb-3 flex items-center gap-2">
              <i className="hn hn-info text-xl"></i>
              Що означають метрики?
            </h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div>
                <span className="font-bold text-white">TPS (Ticks Per Second)</span>
                <p>Кількість ігрових тактів за секунду. Ідеально: 20 TPS. Нижче 15 - серверу важко.</p>
              </div>
              <div>
                <span className="font-bold text-white">MSPT (Milliseconds Per Tick)</span>
                <p>Час обробки одного такту. Ідеально: &lt;50ms. Вище 100ms - проблеми з затримками.</p>
              </div>
              <div>
                <span className="font-bold text-white">Пам'ять</span>
                <p>Використання оперативної пам'яті. При 95%+ буває утримання та лаги.</p>
              </div>
              <div>
                <span className="font-bold text-white">Чанки</span>
                <p>Завантажені 16×16 блоків світу. Більше = більше ресурсів.</p>
              </div>
            </div>
          </div>
        </BorderBox>
      </div>
    </div>
  );
}