// src/components/donate/components/HowItWorks.jsx
import { PurchaseStats } from './PurchaseStats';

export const HowItWorks = () => (
  <div className="mt-8 bg-gray-600 p-[2px]">
    <div className="bg-gray-700 p-[2px]">
      <div className="bg-[#1a1a2e] p-8">
        <h3 className="text-2xl font-bold text-[#c5629a] minecraftFont mb-6 text-center">
          <i className="hn hn-edit"></i> Як це працює?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { step: "1", icon: "hn-shopping-cart", title: "Виберіть товар", desc: "Оберіть плащ, значок або набір зі списку" },
            { step: "2", icon: "hn-credit-card", title: "Оплатіть", desc: "Перейдіть на Monobank та оплатіть покупку" },
            { step: "3", icon: "hn-badge-check", title: "Отримайте!", desc: "Товар з'явиться автоматично протягом хвилини" },
          ].map((item) => (
            <div key={item.step} className="bg-gray-600 p-[3px]">
              <div className="bg-[#12121f] text-center p-6">
                <div className="text-5xl mb-4"><i className={`hn ${item.icon}`}></i></div>
                <div className="bg-[#c5629a] p-[2px] inline-block mb-2">
                  <div className="bg-[#130217] px-3 py-1">
                    <span className="text-sm text-[#c5629a] minecraftFont">Крок {item.step}</span>
                  </div>
                </div>
                <h4 className="font-bold text-white text-lg mb-2 minecraftFont">{item.title}</h4>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-700 h-[2px] mb-8" />
        
        <h4 className="text-xl font-bold text-white minecraftFont mb-4 text-center">
          <i className="hn hn-shield-check text-green-400 mr-2"></i>
          Наші гарантії
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { 
              icon: "hn-refresh", 
              title: "Зберігається після вайпу", 
              desc: "Всі куплені предмети залишаються з вами назавжди, навіть після вайпу світу",
              color: "text-blue-400"
            },
            { 
              icon: "hn-bolt", 
              title: "Оновлення безкоштовно", 
              desc: "Придбані предмети можуть бути покращені або оновлені, але ніколи не відібрані",
              color: "text-green-400"
            },
            { 
              icon: "hn-eye", 
              title: "Прозорість", 
              desc: "Проєкт веде відкриту звітність — всі покупки та витрати доступні для перегляду",
              color: "text-purple-400"
            },
            { 
              icon: "hn-heart-solid", 
              title: "Підтримка розвитку", 
              desc: "100% коштів йде на розвиток сервера, оплату хостингу та створення нового контенту",
              color: "text-pink-400"
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-800/50 p-[2px]">
              <div className="bg-[#12121f] p-4 h-full">
                <div className={`text-2xl mb-2 ${item.color}`}>
                  <i className={`hn ${item.icon}`}></i>
                </div>
                <h5 className="font-bold text-white text-sm mb-1 minecraftFont">{item.title}</h5>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Purchase Statistics */}
        <PurchaseStats />
      </div>
    </div>
  </div>
);